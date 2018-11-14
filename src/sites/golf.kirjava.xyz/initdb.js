module.exports = function(database) {

    database.run('CREATE TABLE IF NOT EXISTS `snippets` (id INTEGER PRIMARY KEY AUTOINCREMENT, route TEXT UNIQUE, code TEXT, public BOOLEAN);');

}
