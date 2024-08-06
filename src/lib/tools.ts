import { AddressType, BaseHotWallet } from "@metalet/utxo-wallet-sdk";

export function getAddressFromPublickey(publicKey: string) {
  if (publicKey.length !== 66) {
    return "--";
  }
  try {
    const wallet = new BaseHotWallet({
      addressType: AddressType.Taproot,
      network: "testnet",
      publicKey,
    });
    return wallet.getAddress();
  } catch (error) {
    return "Invalid Address";
  }
}
