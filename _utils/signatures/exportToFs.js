const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./signatures.sqlite3');



db.each("SELECT sighash, signature FROM signatures ORDER BY sighash", (err, row) => {
    let indexbyte = row.sighash.slice(0,2);

    let targeDir = path.join(process.cwd(), 'signatures', indexbyte);
    let targetPath = path.join(targeDir, row.sighash);
    fs.mkdirSync(targeDir, { recursive: true });
    fs.appendFileSync(targetPath, `${row.signature}\n`);
    console.log(row.sighash + ": " + row.signature);
});