import type { Hash32 } from "./types.js";

/** RFC 6962 domain-separation byte for leaf hashes. Must match merkle.rs. */
export const LEAF_PREFIX = 0x00;
/** RFC 6962 domain-separation byte for internal node hashes. Must match merkle.rs. */
export const NODE_PREFIX = 0x01;

/**
 * Compute the canonical YieldStream leaf hash.
 *
 * Format (pinned by the Rust contract, do not deviate):
 *   SHA-256( 0x00 || XDR(distribution_id:u32) || XDR(index:u32)
                 || XDR(recipient:Address) || XDR(amount:i128) )
 *
 * XDR encoding: big-endian fixed-width, address in its SCAddress XDR form.
 *
 * Not yet implemented — tracked in yieldstream-sdk issue #1.
 */
export function computeLeaf(
  _distributionId: number,
  _index: number,
  _recipientAddress: string,
  _amount: bigint,
): Hash32 {
  throw new Error("not implemented: see issue #1 (leaf hashing conformance)");
}

/**
 * Build the tree over canonical leaves and return root + per-index proofs.
 * Internal nodes: SHA-256(0x01 || min(a,b) || max(a,b)) — sorted pairs.
 *
 * Not yet implemented — tracked in yieldstream-sdk issue #2.
 */
export function buildTree(_leaves: readonly Hash32[]): {
  root: Hash32;
  proofs: Hash32[][];
} {
  throw new Error("not implemented: see issue #2 (tree builder + proofs)");
}
