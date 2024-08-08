import { UTXO } from "./utxo";
import { UTXO as UnisatUTXO } from "./unisat";

export const formatUnisatUTXO = (utxo: UnisatUTXO, rawTx?: string): UTXO => {
  return {
    txId: utxo.txid,
    outputIndex: utxo.vout,
    satoshis: utxo.satoshis,
    confirmed: true, // TODO: I am not sure if this is correct
    rawTx,
  };
};
