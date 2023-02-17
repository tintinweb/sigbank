# SigBank - A Database of Smart Contract Function Signatures

SigBank is a database of smart contract function signatures for the Ethereum ecosystem. It is based on the [🐦🌴🌴🌴🦕 smart-contract-sanctuary](https://github.com/tintinweb/smart-contract-sanctuary) dataset. 

Best effort, no guarantees on accuracy & completeness. Just signatures, lot's of signatures ...


→ [What is a function signature and function selector in solidity (and EVM languages)](https://ethereum.stackexchange.com/questions/135205/what-is-a-function-signature-and-function-selector-in-solidity-and-evm-language).

&nbsp;

## 📈 Stats

[Latest Snapshot](./releases)

```
Date:                 Feb 17 2023
Database Size:                 96 MB
Distinct Signatures:       924244
Distinct SignatureHashes:  924117
SignatureHash Collisions:     118
```

## 🎓 Getting Started

Download the latest [Database Snapshot](./releases). Use your favorite `sqlite3` explorer/query tool to explore.

<details>
  <summary style='font-size:12pt'>🔸 Lookup Sighashes starting with <code>0x000000..</code></summary>

```sql
SELECT sighash, signature
FROM signatures
WHERE sighash LIKE "000000%";
```

</details>

<details>
  <summary style='font-size:12pt'>🔸 Function Signature Sorted by Hash</summary>

```sql
SELECT sighash, signature
FROM signatures
ORDER BY sighash;
```

</details>

<details>
  <summary style='font-size:12pt'>🔸 Find Colliding Sighashes</summary>

```sql
SELECT 
    sighash,
    signature,
    COUNT(sighash) as `cnt`
FROM signatures
GROUP by sighash
HAVING cnt > 1
order by cnt DESC
```

</details>

&nbsp;

## 💡 FAQ


<details>
  <summary style='font-size:12pt'>🔸 How to build the database from scratch?</summary>

1. clone the [🐦🌴🌴🌴🦕 smart-contract-sanctuary](https://github.com/tintinweb/smart-contract-sanctuary)
2. ensure submodules are all checked out, else run `git submodule init [ethereum|polygon|...] --depth=1`
3. run the signature extraction tool on all solidity files. hint: split up the work, run multiple processes and let them feed into the same database.

here's an example:

```
⚡ ⇒ git clone --recursive --depth1 https://github.com/tintinweb/smart-contract-sanctuary
⚡ ⇒ _utils/signaturesToDb.js "./smart-contract-sanctuary/**/*.sol" 
```

</details>


<details>
  <summary style='font-size:12pt'>🔸 How to dump the database into a well formed file-system structure?</summary>

TBD

</details>

&nbsp;

## 📚 Other Datasets

* [ethereum-lists/4bytes](https://github.com/ethereum-lists/4bytes)


## 🎓 Citation

If you are using this dataset in your research and paper, here's how you can cite this dataset: 

- APA6
```
Ortner, M. (n.d.). SigBank - A Database of Smart Contract Function Signatures. Retrieved from https://github.com/tintinweb/sigbank.
```

- LateX (Bib)
```
 @article{sigbank, 
          title={SigBank - A Database of Smart Contract Function Signatures}, 
          url={https://github.com/tintinweb/sigbank}, 
          author={Ortner, Martin}} 
 ```
