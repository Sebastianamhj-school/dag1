const initSqlJs = require('sql.js');

var database;

class databaseSqlLite {
    constructor() {
        const SQL = await initSqlJs({});
        this.database = new SQL.Database();
    }
    
    
    startDatabase = async () => {
        
        const createTableQuery = "DROP TABLE IF EXISTS persons; \
        CREATE TABLE person( \
            id          integer primary key autoincrement, \
            name        text not null, \
            email       text not null, \
            note        text, \
            isStudent   boolean default true, \
            lastUpdated  datetime default current_timestamp); " 

            database.run(createTableQuery); 
            
            const insertDefaultDataQuery = " INSERT INTO person (name, email, note, isStudent ) VALUES('Benny bo', 'benny@email.com' , 'benny kan lide jul', true); \
            INSERT INTO person (name, email, note, isStudent ) VALUES('lis nielsen', 'lis@email.com' , 'lis cykler ofte', true); \
            INSERT INTO person (name, email, note, isStudent ) VALUES('Lars larsen', 'lars@email.com' , 'lars kan godt lide dyner', true); \
            INSERT INTO person (name, email, isStudent ) VALUES('hanne stål', 'hanne@email.com' ,  true); \
            "
            
            database.exec(insertDefaultDataQuery); 
            
            
            
    }
        
}
        exports.get = async () => {
            const stmt = database.exec("SELECT * FROM person");
            
            stmt.forEach(element => {
                console.log(element);
                
    });
}






/* exports.Database = async () => {

    
    // Execute a single SQL string that contains multiple statements
    let sqlstr = "CREATE TABLE hello (a int, b char); \
    INSERT INTO hello VALUES (0, 'hello'); \
    INSERT INTO hello VALUES (1, 'world');";
    db.run(sqlstr); // Run the query without returning anything
    
    // Prepare an sql statement
    const stmt = db.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");
    
// Bind values to the parameters and fetch the results of the query
const result = stmt.getAsObject({':aval' : 1, ':bval' : 'world'});
console.log(result); // Will print {a:1, b:'world'}

// Bind other values
stmt.bind([0, 'hello']);
while (stmt.step()) console.log(stmt.get()); // Will print [0, 'hello']
// free the memory used by the statement
stmt.free();
// You can not use your statement anymore once it has been freed.
// But not freeing your statements causes memory leaks. You don't want that.

const res = db.exec("SELECT * FROM hello");
console.log(res);
/*
[
    {columns:['a','b'], values:[[0,'hello'],[1,'world']]}
]
}
*/

/* // Export the database to an Uint8Array containing the SQLite database file
const binaryArray = db.export(); */ 