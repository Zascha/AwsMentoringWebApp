const mysql = require('mysql');
const config = require('./imagesConfig');

module.exports = {
    execute: runQuery,
};

const pool = mysql.createPool({
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword
});

//pool.getConnection((err, connection) => { initDatabase(err, connection) });

function initDatabase(err, connection) {
    if (err) throw err;

    console.log(`Connected to RDS.`);

    createDatabase(connection);
    createTable(connection);
}

function createDatabase(connection) {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${config.dbName}`);
    console.log(`Database ${config.dbName} was created.`);
}

function createTable(connection) {
    connection.query(`USE ${config.dbName};`);

    query = `CREATE TABLE IF NOT EXISTS ${config.dbTableName}(id INT AUTO_INCREMENT PRIMARY KEY, guid VARCHAR(50) NOT NULL, name varchar(255) NOT NULL, format varchar(5) NOT NULL, size INT NOT NULL, createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    connection.query(query, function (error, result, fields) {
        if (error) {
            console.log(error);
            throw err;
        }
        console.log(result);
    });
    console.log(`Table ${config.dbTableName} was created.`);
}

function runQuery(query, callback) {
    console.log(`Query received: ${query}`);

    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query(`USE ${config.dbName};`);
        connection.query(query, function (err, result, fields) {
            if(callback){
                if (err) callback(err);
                if (result) callback(result);
                if (fields) console.log(fields);
            }       
        });
    });
}