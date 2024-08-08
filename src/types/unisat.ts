export interface BitcoinBalance {
  confirm_amount: string;
  pending_amount: string;
  amount: string;
  confirm_btc_amount: string;
  pending_btc_amount: string;
  btc_amount: string;
  confirm_inscription_amount: string;
  pending_inscription_amount: string;
  inscription_amount: string;
  usd_value: string;
}

export interface TokenBalance {
  availableBalance: string;
  overallBalance: string;
  ticker: string;
  transferableBalance: string;
  availableBalanceSafe: string;
  availableBalanceUnSafe: string;
}

export interface RuneBalance {
  amount: string;
  runeid: string;
  rune: string;
  spacedRune: string;
  symbol: string;
  divisibility: number;
}

export enum AddressType {
  P2PKH,
  P2WPKH,
  P2TR,
  P2SH_P2WPKH,
  M44_P2WPKH,
  M44_P2TR,
}

export interface UTXO {
  txid: string;
  vout: number;
  satoshis: number;
  scriptPk: string;
  addressType: AddressType;
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

export interface TokenInfo {
  totalSupply: string;
  totalMinted: string;
  decimal: number;
  holder: string;
  inscriptionId: string;
}

export enum TokenInscriptionType {
  INSCRIBE_TRANSFER,
  INSCRIBE_MINT,
}
export interface TokenTransfer {
  ticker: string;
  amount: string;
  inscriptionId: string;
  inscriptionNumber: number;
  timestamp: number;
}

export interface AddressTokenSummary {
  tokenInfo: TokenInfo;
  tokenBalance: TokenBalance;
  historyList: TokenTransfer[];
  transferableList: TokenTransfer[];
}

export interface RuneBalance {
  amount: string;
  runeid: string;
  rune: string;
  spacedRune: string;
  symbol: string;
  divisibility: number;
}

export interface RuneInfo {
  runeid: string;
  rune: string;
  spacedRune: string;
  number: number;
  height: number;
  txidx: number;
  timestamp: number;
  divisibility: number;
  symbol: string;
  etching: string;
  premine: string;
  terms: {
    amount: string;
    cap: string;
    heightStart: number;
    heightEnd: number;
    offsetStart: number;
    offsetEnd: number;
  };
  mints: string;
  burned: string;
  holders: number;
  transactions: number;
  mintable: boolean;
  remaining: string;
  start: number;
  end: number;
  supply: string;
  parent?: string;
}

export interface AddressRunesTokenSummary {
  runeInfo: RuneInfo;
  runeBalance: RuneBalance;
  runeLogo?: Inscription;
}

export interface Inscription {
  inscriptionId: string;
  inscriptionNumber: number;
  address: string;
  outputValue: number;
  preview: string;
  content: string;
  contentType: string;
  contentLength: number;
  timestamp: number;
  genesisTransaction: string;
  location: string;
  output: string;
  offset: number;
  contentBody: string;
  utxoHeight: number;
  utxoConfirmation: number;
  brc20?: {
    op: string;
    tick: string;
    lim: string;
    amt: string;
    decimal: string;
  };
}
