const Database = require('better-sqlite3');
const db = new Database('data/wedding.db');
db.prepare("DELETE FROM wishes WHERE name = 'ufgauf'").run();
console.log("Deleted");
