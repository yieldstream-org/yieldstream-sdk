export type Hash32 = Uint8Array;

export interface Recipient {
  /** Stellar address (G... or C... for contracts) */
  address: string;
  /** Token amount in contract scale (i128 as string to avoid float loss) */
  amount: string;
}

export interface ClaimVector {
  index: number;
  recipient: string;
  amount: number;
  leaf_hex: string;
  proof_hex: string[];
}

export interface TreeVector {
  name: string;
  distribution_id: number;
  total_amount: number;
  num_recipients: number;
  root_hex: string;
  claims: ClaimVector[];
}

export interface VectorFile {
  version: string;
  description: string;
  trees: TreeVector[];
}
