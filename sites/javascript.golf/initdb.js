module.exports = function(database) {

    database.run('CREATE TABLE IF NOT EXISTS `javascript.golf` (id INTEGER PRIMARY KEY AUTOINCREMENT, route TEXT, code TEXT, public BOOLEAN);');

}
