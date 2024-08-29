#[test_only]
module surge::funcs_tests {
    use std::vector;
    use surge::surge;
    use rooch_framework::genesis;
    use std::debug;

    const EWrongProposalId: u64 = 0;

    #[test]
    fun test_create_wallet_success() {
        genesis::init_for_test();
        let public_keys = vector::empty();
        vector::push_back(&mut public_keys, x"0308839c624d3da34ae240086f60196409d619f285365cc3498fdd3a90b72599e4");
        vector::push_back(&mut public_keys, x"0338121decf4ea2dbfd2ad1fe05a32a67448e78bf97a18bc107b4da177c27af752");        
        let msig_address = surge::create_surge_wallet(1, public_keys);
        debug::print(&msig_address);
    }

    #[test(sender=@0x9073de1b127b24fff7d3d94026773f6acac14a6eff69f87be475568e93145ad8)]
    fun test_init_transaction_success(sender :&signer) {
        genesis::init_for_test();
        let public_keys = vector::empty();
        vector::push_back(&mut public_keys, x"0308839c624d3da34ae240086f60196409d619f285365cc3498fdd3a90b72599e4");
        vector::push_back(&mut public_keys, x"0338121decf4ea2dbfd2ad1fe05a32a67448e78bf97a18bc107b4da177c27af752");   
        vector::push_back(&mut public_keys, x"03bb91d1c91cbe195a76e621fec891d54b7e5fca6c37ff6777ed6d8e02a1ebad1e");        
        let msig_address = surge::create_surge_wallet(1, public_keys);
        let psbt = @0x42;
        surge::init_transaction(sender, msig_address, psbt, b"tx_data");
    }

}
