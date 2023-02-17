const { Workspace } = require('solidity-workspace');
const glob = require('glob');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./signatures.sqlite3');

let options = [];
let optfiles = [];

process.argv.slice(1,).forEach(f => {
    if (f.startsWith("--")) {
        options.push(f);
    } else {
        // analyze files
        optfiles.push(f);
    }
});

//setup


async function main() {

        db.exec(`CREATE TABLE IF NOT EXISTS signatures (
            sighash TEXT, 
            signature TEXT,
            UNIQUE(sighash,signature)
        );`);
        

        const stmt = db.prepare("INSERT OR IGNORE INTO signatures VALUES (?, ?)");

        /** */
        for await (let fglob of optfiles) {
            let solfiles = await glob.sync(fglob).filter(v => v.endsWith(".sol"));
            let nr = 0;
            for await (let fg of solfiles) {
                try {
                    console.log(`${nr}/${solfiles.length - 1}`);
                    nr += 1;
                    let ws = new Workspace(undefined, { parseImports: false });
                    await ws.add(fg)
                        .then((su) => {
                            ws.update(su, true);
                            const sigdata = su.getAllFunctionSignatures();
                            for (const sig of sigdata) {
                                if (sig.hasOwnProperty('err')) {
                                    errors.push(sig);
                                    //continue; //skip errors
                                    return;
                                }
                                // ad to db; name, signature, sighash
                                //console.log("DBINSERT: " + sig.sighash + " " + sig.signature)
                                //stmt.run(sig.sighash, sig.signature)
                                db.run("INSERT OR IGNORE INTO signatures VALUES (?, ?)", sig.sighash, sig.signature)
                            }
                        });
                } catch (e) {
                    console.error(`ERROR: failed to parse: ${fg} - ${e}`);
                }
                
            }
            
        }
        
}

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })

main().then(() => {
    console.log("DONE")
})

// avalanche, arbitrum, celo, fantom, optimism, (tron), polygon, bsc