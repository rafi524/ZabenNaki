const oracledb = require('oracledb');
oracledb.autoCommit = true;
const router = require('express').Router();
async function execute(sql, binds, options)
{
    console.log(' executing');
    let connection, results;
    try {
        // Get a connection from the default pool
        connection = await oracledb.getConnection({ user: "ors", password: "ors77", connectionString: "localhost/orcl" });
        results = await connection.execute(sql, binds, options);
        console.log(results);
        console.log('dbmain');
    } catch (err) {
        console.log("ERROR executing sql: " + err.message);
    } finally {
        if (connection) {
            try {
                // Put the connection back in the pool
                await connection.close();
            } catch (err) {
                console.log("ERROR closing connection: " + err);
            }
        }
    }
    return results;
}

// code to execute many sql
async function executeMany(sql, binds, options){
    let connection;
    try {
        // Get a connection from the default pool
        connection = await oracledb.getConnection({user: "ors", password: "ors77", connectionString: "localhost/orcl" });
        await connection.executeMany(sql, binds, options);
    } catch (err) {
        console.log("ERROR executing sql: " + err.message);
    } finally {
        if (connection) {
            try {
                // Put the connection back in the pool
                await connection.close();
            } catch (err) {
                console.log("ERROR closing connection: " + err);
            }
        }
    }

    return;
}
const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT
}
module.exports = {
    
    execute,
    executeMany,
    options
};