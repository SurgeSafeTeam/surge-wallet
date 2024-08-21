export interface UTXO {
  txid: string;
  vout: number;
  satoshis: number;
  confirmed: boolean;
  rawTx?: string;
  // addressType: AddressType;
}
