let mailin = require('mailin');
let database = require('./database');

database.run('CREATE TABLE IF NOT EXISTS `mail` (id INTEGER PRIMARY KEY AUTOINCREMENT, "from" TEXT, "to" TEXT, subject TEXT, date TEXT, text TEXT, html TEXT, headers TEXT);');

module.exports = function(config) {

    let port = config.dev ? config.port.devsmtp : config.port.smtp;

    mailin.start({
        port,
        disableWebhook: true
    });

    console.log('smtpd:'+port);

    mailin.on('message', function (connection, data, content) {
        save2db(data);
    });

}

function save2db(obj) {

    if (!obj.from || !obj.to || !obj.date) return;

    let query = `
        INSERT INTO mail("from", "to", subject, date, text, html, headers)
        VALUES (?,?,?,?,?,?,?)
    `;

    database.run(query, [
        obj.from[0].address,
        obj.to[0].address,
        obj.subject,
        obj.date.toString(),
        obj.text,
        obj.html,
        JSON.stringify(obj.headers)
    ]);

}
