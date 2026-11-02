# @yieldstream/sdk

TypeScript client and Merkle tooling for the [YieldStream
distributor](https://github.com/CHASE3020/yieldstream-contract) — a
multi-tenant Merkle claim protocol on Stellar/Soroban.

**Status: scaffold.** The hashing core is deliberately unimplemented — it is
the flagship contributor work in issues #1/#2, pinned by cross-language
conformance tests against the contract's canonical vectors.

## What this package will provide

- `computeLeaf` — leaf hashing byte-identical to the Rust contract
  (SHA-256, RFC 6962 domain separation, XDR encodings)
- `buildTree` / `generateProof` — recipient CSV → root + proofs for frontends
  and issuers
- Transaction builders for `create_distribution` / `claim` / `claim_many` on
  `@stellar/sdk`, Freighter-friendly
- Event decoding helpers matching `docs/EVENTS.md`

## Layout

```
src/
  types.ts            # vector + recipient formats
  merkle.ts           # hashing spec stubs (issues #1, #2)
  conformance.test.ts # pinned to test-vectors/merkle_v1.json (copied from the contract repo)
test-vectors/         # canonical vectors — DO NOT hand-edit; regenerate via the contract suite
```

## Development

```bash
npm install
npm run typecheck
npm test
```

## Contributing

Pick issue #1 (leaf hashing conformance) or #2 (tree builder). The skipped
suites in `conformance.test.ts` define done: un-skip them in your PR and see
them pass. Rules of the road in `CONTRIBUTING.md`; protocol invariants in the
contract repo's `docs/ISSUE_BACKLOG.md`.

## License

Dual MIT / Apache-2.0, at your option.
