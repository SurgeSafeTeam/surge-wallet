export interface UTXO {
  txid: string;
  vout: number;
  satoshis: number;
  scriptPk: string;
  // addressType: AddressType;
  inscriptions: {
    inscriptionId: string;
    inscriptionNumber?: number;
    offset: number;
  }[];
  atomicals: {
    atomicalId: string;
    atomicalNumber: number;
    type: "NFT" | "FT";
    ticker?: string;
    atomicalValue?: number;
  }[];

  runes: {
    runeid: string;
    rune: string;
    amount: string;
  }[];
}
