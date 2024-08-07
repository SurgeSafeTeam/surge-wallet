module surge::surge {
    use moveos_std::account;
    use std::string::String;
    use moveos_std::signer;
    use surge::user;
    use moveos_std::table::{Self, Table};
    use std::vector;
    use moveos_std::tx_context::tx_result;
    use moveos_std::event;
    use moveos_std::tx_result::{Self};
    use moveos_std::timestamp;

    //==============================================================================================
    // Errors
    //==============================================================================================

    /// Error code for when address is not one of the owners of msig wallet.
    const EADDRESS_NOT_OWNER: u64 = 0;

    /// Error for public key mismatched with record on file
    const EPUBLIC_KEY_MISMATCHED: u64 = 1;

    /// Error for psbt expired (i.e: someone else signed and latest psbt is updated)
    const EPSBT_EXPIRED: u64 = 2;

    /// Error for transaction not actually finished excecuted
    const ETXID_NOT_CONFIRMED: u64 = 3;

    //==============================================================================================
    // Constants
    //==============================================================================================

    const BIG_BUCKET_SIZE: u64 = 20; //tbc

    //==============================================================================================
    // Structs
    //==============================================================================================

    /// Data structure stored for each msig wallet, including:
    ///     1. msig wallet info (owners, public keys, threshold, e.t.c.)
    ///     2. TxnBook of pending transactions.
    struct SurgeWallet has key {
        info: Info,
        txn_book: TxnBook,
    }

    /// Basic information of multi-sig wallet.
    /// Including owners, public keys, threshold, and wallet name (as metadata).
    struct Info has store, copy, drop {
        // vector of owners
        owners: vector<address>,
        // vector of public_keys that matches owners
        public_keys: vector<String>,
        // creation nonce of the safe wallet
        //nonce: u64,
        // signing threshold
        threshold: u8,
        // metadata for wallet information
        //metadata: vector<u8>,
    }

    /// Stores the pending transactions of a multi-sig wallet.
    struct TxnBook has store {
        // Minimum sequence_number in the txn_book.
        // The parameter is updated and used in stale transaction pruning.
        //min_sequence_number: u64,
        // Maximum sequence_number in the txn_book.
        // This parameter is updated when adding new transaction,
        // and is used in stale transaction pruning.
        //max_sequence_number: u64,
        // use for getter function to track Transaction index
        order_ids: vector<u64>,
        // A map from transaction psbt to the Transaction information.
        //<order_id, Transaction>
        pendings: Table<u64, Transaction>,
    }

    /// Transaction includes all information needed for a certain transaction
    /// to be executed by the msig wallet, including payload, metadata,
    /// and signatures.
    /// Initially, transaction will have only 1 signature. The signatures are
    /// added when other owners call addSignature. The transaction is ready to
    /// be sent when number of signatures reaches threshold - 1.
    struct Transaction has store {
        // Payload of the transaction to be executed by the msig wallet.
        // Can be an arbitrary transaction payload.
        //payload: vector<u8>,
        // Latest psbt hex
        current_psbt: String,
        // Metadata stored on chain to serve as a transaction identifier or memo.
        //metadata: vector<u8>,
        // Signatures collected so far.
        // Advance model:Table of <address, vote(approve/reject)> of owners who have signed
        signatures: Table<address, bool>,
        approvals: u8,
    }

    //==============================================================================================
    // Events
    //==============================================================================================

    struct SurgeWalletCreatedEvent has copy, drop {
        msig: address,
        owner_addresses: vector<address>,
        threshold: u8,
    }

    struct TransactionInitiatedEvent has copy, drop {
        initiator_address: address,
        msig: address,
        psbt: String,
    }

    struct SignatureSubmitedEvent has copy, drop {
        signer_address: address,
        msig: address,
        psbt: String,
        vote: bool,
        threshold_met: bool
    }

    //==============================================================================================
    // Entry functions
    //==============================================================================================

    /// Register the msig wallet in smart contract
    ///
    /// This shall be the first transaction sent by the msig wallet.
    /// The transaction records basic information of the msig wallet and its owners
    ///
    /// # Parameters
    /// * `msig`: signer object of the surge multi-sig wallet.
    /// * `owners`: address of owners
    /// * `public_keys`: public keys of owners
    /// * `threshold`: approval threshold
    ///
    /// # Aborts
    /// * `creator::EMSIG_NOT_FOUND`: msig address is not found in creator.
    /// * `registry::EADDRESS_NOT_REGISTRERED`: address is not registered at registry.
    /// * `registry::EMSIG_NOT_REGISTERED`: msig is not registered in pendings
    ///         under the owner resource.
    ///
    /// # Emits
    /// * `register_events`
    public entry fun register(
        msig: &signer,
        owners: vector<address>,
        public_keys: vector<String>,
        threshold: u8,
        //metadata: vector<u8>
    ) {
        let msig_address = signer::address_of(msig);
        // HACK: Avoid web wallet throw an error during transaction simulation.
        // msig account is created in account.move at the call
        // `creator::init_wallet_creation`. However, a signature on this transaction
        // from wallet creation initiator is needed before calling
        // `creator::init_wallet_creation`. Thus add this temporary hack to allow
        // user to sign on register transaction.
        if (!account::exists_at(msig_address)) {
            return
        };

        // register to `surge.SurgeWallet`.
        //create_surge(msig, owners, public_keys, nonce, threshold, metadata);
        create_surge(msig, owners, public_keys, threshold);
        // register to each owner's user profile
        //add_to_registry(msig, owners, msig_address)
        add_to_registry(owners, msig_address);
        event::emit(SurgeWalletCreatedEvent{
            msig: msig_address,
            owner_addresses: owners,
            threshold
        })
    }

    /// Accepts pending msig wallet co-owner invitation
    ///
    /// This logs msig wallet in user's msig list
    ///
    /// # Parameters
    /// * `s`: signer object of user
    /// * `msig_address`: address of msig wallet
    /// * `public_keys`: public keys of owners
    /// * `threshold`: approval threshold
    ///
    /// # Aborts
    /// * `creator::EMSIG_NOT_FOUND`: msig address is not found in creator.
    /// * `registry::EADDRESS_NOT_REGISTRERED`: address is not registered at registry.
    /// * `registry::EMSIG_NOT_REGISTERED`: msig is not registered in pendings
    ///         under the owner resource.
    ///
    /// # Emits
    /// * `register_events`
    public entry fun accept_invitation(
        s: &signer,
        msig_address: address
        //metadata: vector<u8>
    ) {
        let owner_address = signer::address_of(s);
        if (!account::exists_at(owner_address)) {
            return
        };
        user::confirm_pending_msig(owner_address, msig_address)
    }

    /// Initiate a new pending transaction. The new transaction data will be validated
    /// and write to `SurgeWallet.TxnBook`.
    ///
    /// # Parameters
    /// * `s`: signer of initiator.
    /// * `msig`: surge msig address.
    /// * `txid`: transaction id.
    /// * `psbt`: transaction psbt to be executed.
    /// * `public_key`: public key of the initiator.
    ///
    /// # Aborts
    /// * `EADDRESS_NOT_OWNER`: initiator not owner of msig address.
    /// * `EPUBLIC_KEY_MISMATCHED`: initiator public_key doesnt match the one stored in profile.
    ///
    /// # Emits
    /// * `TransactionInitiatedEvent`
    public entry fun init_transaction(
        s: &signer,
        msig: address,
        psbt: String,
    ) {
        let surge = account::borrow_mut_resource<SurgeWallet>(msig);
        let owner_address = signer::address_of(s);
        assert!(vector::contains(&surge.info.owners, &owner_address), EADDRESS_NOT_OWNER);
        // // verify public key
        // assert!(user::verify_public_key(owner_address, public_key), EPUBLIC_KEY_MISMATCHED);
        let new_tx = Transaction {
        current_psbt: psbt,
        signatures: table::new(),
        approvals: 1
        };
        table::add(&mut new_tx.signatures, owner_address, true);
        let order_id = timestamp::now_milliseconds();
        vector::push_back(&mut surge.txn_book.order_ids, order_id);
        table::add(&mut surge.txn_book.pendings, order_id, new_tx);
        event::emit(TransactionInitiatedEvent{
            initiator_address: owner_address,
            msig,
            psbt,
        });
    }

    /// Other owners submit the signature of a pending transaction.
    ///
    /// # Parameters
    /// * `msig_address`: surge msig address.
    /// * `index`: transaction index position.
    /// * `last_psbt`: last psbt logged on-chain
    /// * `new_psbt`: transaction psbt to be executed.
    /// * `public_key`: public key of the initiator.
    ///
    /// # Aborts
    /// * `EADDRESS_NOT_OWNER`: initiator not owner of msig address.
    /// * `EPUBLIC_KEY_MISMATCHED`: initiator public_key doesnt match the one stored in profile.
    /// * `EPSBT_EXPIRED`: psbt expired, someone else signed before you.
    ///
    /// # Emits
    /// * `TransactionInitiatedEvent`
    public entry fun submit_signature(
        s: signer,
        msig: address,
        order_id: u64,
        last_psbt: String,
        new_psbt: String,
        vote: bool,
    ) {
        let surge = account::borrow_mut_resource<SurgeWallet>(msig);
        let owner_address = signer::address_of(&s);
        assert!(vector::contains(&surge.info.owners, &owner_address), EADDRESS_NOT_OWNER);
        let txn = table::borrow_mut(&mut surge.txn_book.pendings, order_id);
        // verify current_psbt
        assert!(txn.current_psbt == last_psbt, EPSBT_EXPIRED);
        txn.current_psbt = new_psbt;
        if(vote){
            txn.approvals = txn.approvals + 1;
        };
        table::add(&mut txn.signatures, owner_address, vote);
        event::emit(SignatureSubmitedEvent{
            signer_address: owner_address,
            msig,
            psbt: new_psbt,
            vote,
            threshold_met: (txn.approvals >= surge.info.threshold)
        })
    }

    /// Transaction completed.
    ///
    /// # Parameters
    /// * `msig_address`: surge msig address.
    /// * `index`: transaction index position.
    /// * `txresult`: completed TxResult.
    ///
    /// # Aborts
    /// * `ETXID_NOT_CONFIRMED`: txid not confirmed, transaction not finished executed.
    // public entry fun transaction_complete_confirmed(
    //     msig: address,
    //     first_psbt: String,
    //     tx_result: TxResult, //fixme
    // ) {
    //     let surge = account::borrow_mut_resource<SurgeWallet>(msig);
    //     // verify txid
    //     assert!(tx_result::is_executed(&tx_result), ETXID_NOT_CONFIRMED);
    //     let (_found, index) = vector::index_of(&surge.txn_book.pending_psbts, &first_psbt);
    //     vector::swap_remove(&mut surge.txn_book.pending_psbts, index);
    //     let Transaction {
    //         current_psbt: _,
    //         signatures,
    //         approvals: _
    //     } = table::remove(&mut surge.txn_book.pendings, first_psbt);
    //     table::drop(signatures)
    // }

    //==============================================================================================
    // Internal functions
    //==============================================================================================

    /// Create and publish the data at msig wallet. Called by register function.
    ///
    /// # Parameters
    /// * `msig`: signer object of the msig wallet.
    /// * `owners`: owner address vector.
    /// * `public_keys`: owner public keys.
    /// * `nonce`: creation nonce.
    /// * `threshold`: signing threshold.
    /// * `metadata`: wallet information.
    ///
    /// # Emits
    /// * `register_events`
    fun create_surge(
        msig: &signer,
        owners: vector<address>,
        public_keys: vector<String>,
        threshold: u8,
    ) {
        let info = Info {
            owners,
            public_keys,
            threshold,
        };
        account::move_resource_to(msig, SurgeWallet {
            info,
            txn_book: TxnBook {
                order_ids: vector::empty(),
                pendings: table::new(),
            },
        });
    }

    /// Move the msig addresses from `pendings` to `msigs` in registry data
    /// when msig wallet is successfully registered.
    ///
    /// # Parameters
    /// * `msig`: signer object of the surge multi-sig wallet.
    /// * `owners`: owner address vector.
    /// * `msig_address`: address of msig wallet.
    ///
    /// # Emits
    /// * `RegisterEvent`
    fun add_to_registry(
        owners: vector<address>,
        msig_address: address
    ) {
        user::register_msig(&owners, msig_address)
    }

    //==============================================================================================
    // Helper functions
    //==============================================================================================


    //==============================================================================================
    // Getter functions
    //==============================================================================================

    public fun get_owners(msig_address: address): vector<address>{
        let surge = account::borrow_resource<SurgeWallet>(msig_address);
        surge.info.owners
    }

    public fun get_transactions(msig_address: address): vector<u64> { //vector<order_ids>
        let surge = account::borrow_resource<SurgeWallet>(msig_address);
        surge.txn_book.order_ids
    }

}