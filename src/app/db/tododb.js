const Database =require( 'better-sqlite3');

const tododb = new Database('todo.db', { verbose: console.log });

tododb.exec(`
  CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT ,
    notes TEXT DEFAULT ''
  );
`);

export default tododb;
