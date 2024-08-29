module surge::surge {
    use moveos_std::event;
    use std::vector;
    use moveos_std::signer;
    use std::string::{Self, String};
    // use moveos_std::timestamp;
    use bitcoin_move::multisign_account;
    use surge::msign_wallet;

    //==============================================================================================
    // Errors
    //==============================================================================================

    const ErrorMultisignAccountNotFound: u64 = 0;

    //==============================================================================================
    // Constants
    //==============================================================================================


    //==============================================================================================
    // Structs
    //==============================================================================================



    //==============================================================================================
    // Events
    //==============================================================================================

    struct SurgeWalletCreatedEvent has copy, drop {
        msig: address,
        no_of_owners: u64,
        threshold: u64,
    }

    struct TransactionInitiatedEvent has copy, drop {
        initiator_address: address,
        msig: address,
        psbt: address,
        proposal_id: u64
    }

    struct TransactionSignedEvent has copy, drop {
        signer_address: address,
        msig: address,
        new_psbt: address,
        threshold_met: bool
    }

    //==============================================================================================
    // Entry functions
    //==============================================================================================

    // Create and initialize multisign wallet
    // # Parameters
    // * `threshold`: number of signature required to pass a proposal
    // * `participant_public_keys`: public keys of all participants
    // # Aborts
    // * `ErrorInvalidThreshold`: number of participants should be more than threshold.
    // * `ErrorInvalidPublicKey`: length of public key does not match BITCOIN_COMPRESSED_PUBLIC_KEY_LEN = 33.
    // # Emits
    // * `SurgeWalletCreatedEvent`
    public fun create_surge_wallet(
        threshold: u64,
        participant_public_keys: vector<vector<u8>>
    ): address {
        let msig_address = multisign_account::initialize_multisig_account(threshold, participant_public_keys);
        event::emit(SurgeWalletCreatedEvent{
            msig: msig_address,
            no_of_owners: vector::length(&participant_public_keys),
            threshold
        });
        msig_address
    }

    // Initiate a new pending transaction
    // # Parameters
    // * `sender`: initiator
    // * `multisign_address`: rooch address of msig wallet
    // * `psbt`: psbt of transaction
    // * `tx_date`: data of transaction
    // # Aborts
    // * `ErrorMultisignAccountNotFound`: invalid msig address.
    // * `ErrorInvalidParticipant`: sender is not participant of the msig account.
    // # Emits
    /// * `TransactionInitiatedEvent`
    public entry fun init_transaction(
        sender: &signer,
        multisign_address: address,
        psbt: address,
        tx_data: vector<u8>,
    ) {
        let proposal_id = msign_wallet::submit_bitcoin_proposal(sender, multisign_address, psbt, tx_data);
        event::emit(TransactionInitiatedEvent{
            initiator_address: signer::address_of(sender),
            msig: multisign_address,
            psbt,
            proposal_id
        });
    }

    // Signs a new pending transaction
    // # Parameters
    // * `sender`: signer
    // * `multisign_address`: rooch address of msig wallet
    // * `last_psbt`: last psbt to ensure if two participants sign at the same time, one signature won't get erased
    // * `new_psbt`: new psbt after sign
    // * `proposal_id`: proposal id
    // * `signature`: signer signature (psbt?)
    // # Aborts
    // * `ErrorMultisignAccountNotFound`: invalid msig address.
    // * `ErrorInvalidParticipant`: sender is not participant of the msig account.
    // # Emits
    /// * `TransactionInitiatedEvent`
    public entry fun sign_transaction(
        sender: &signer,
        multisign_address: address,
        last_psbt: address,
        new_psbt: address,
        proposal_id: u64,
        signature: vector<u8>,
    ) {
        let proposal_status = msign_wallet::sign_bitcoin_proposal(sender, multisign_address, proposal_id, last_psbt, new_psbt, signature);
        let threshold_met;
        if(proposal_status == 1){
            threshold_met = true;
        }else{
            threshold_met = false;
        };
        event::emit(TransactionSignedEvent{
            signer_address: signer::address_of(sender),
            msig: multisign_address,
            new_psbt,
            threshold_met
        });
    }

    //==============================================================================================
    // Internal functions
    //==============================================================================================

    
    //==============================================================================================
    // Helper functions
    //==============================================================================================


    //==============================================================================================
    // Getter functions
    //==============================================================================================
    // Get current no of signatures collected for a proposal
    public fun get_current_sign_value(multisign_address: address, proposal_id: u64): u64{
        msign_wallet::get_current_no_signatures(multisign_address, proposal_id)
    }

    // Get proposal status
    public fun get_proposal_status(multisign_address: address, proposal_id: u64): String{
        let proposal_status = msign_wallet::get_proposal_status(multisign_address, proposal_id);
        if(proposal_status == 1){
            string::utf8(b"PROPOSAL_STATUS_APPROVED")
        }else if(proposal_status == 0){
            string::utf8(b"PROPOSAL_STATUS_PENDING")
        }else{
            string::utf8(b"PROPOSAL_STATUS_REJECTED")
        }
    }

}