let fs = require('fs');
let sqlite3 = require("sqlite3");

// create database if it doesn't already exist
fs.openSync('database.db','a');

var database = new sqlite3.Database('database.db');

module.exports = database;