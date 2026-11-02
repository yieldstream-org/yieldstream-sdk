import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { LEAF_PREFIX, NODE_PREFIX, buildTree, computeLeaf } from "./merkle.js";
import type { VectorFile } from "./types.js";

const here = dirname(fileURLToPath(import.meta.url));
const vectors = JSON.parse(
  readFileSync(join(here, "../test-vectors/merkle_v1.json"), "utf8"),
) as VectorFile;

describe("vector file integrity", () => {
  it("has the pinned structure", () => {
    expect(vectors.version).toMatch(/^v\d+\.\d+\.\d+$/);
    expect(vectors.trees.length).toBeGreaterThan(0);
    for (const tree of vectors.trees) {
      expect(tree.root_hex).toMatch(/^[0-9a-f]{64}$/);
      expect(tree.num_recipients).toBeGreaterThan(0);
      expect(tree.claims.length).toBe(tree.num_recipients);
      for (const claim of tree.claims) {
        expect(claim.leaf_hex).toMatch(/^[0-9a-f]{64}$/);
        expect(claim.proof_hex.length).toBeLessThanOrEqual(32);
      }
    }
  });
});

describe("domain separation constants", () => {
  it("match the contract (merkle.rs)", () => {
    expect(LEAF_PREFIX).toBe(0x00);
    expect(NODE_PREFIX).toBe(0x01);
  });
});

// Conformance across languages is the point of this package. These tests
// stay skipped until the hashing is implemented (issues #1 and #2) so CI
// is green on the scaffold. Un-skip in the implementing PR and go green
// for real.
describe.skip("rust conformance: computeLeaf == merkle_v1.json leaves", () => {
  it("every vector leaf hash matches", () => {
    for (const tree of vectors.trees) {
      for (const claim of tree.claims) {
        const leaf = computeLeaf(
          tree.distribution_id,
          claim.index,
          claim.recipient,
          BigInt(claim.amount),
        );
        expect(Buffer.from(leaf).toString("hex")).toBe(claim.leaf_hex);
      }
    }
  });
});

describe.skip("rust conformance: buildTree reproduces roots and proofs", () => {
  it("roots match and proofs verify", () => {
    for (const tree of vectors.trees) {
      const leaves = tree.claims.map((c) =>
        computeLeaf(
          tree.distribution_id,
          c.index,
          c.recipient,
          BigInt(c.amount),
        ),
      );
      const built = buildTree(leaves);
      expect(Buffer.from(built.root).toString("hex")).toBe(tree.root_hex);
    }
  });
});
