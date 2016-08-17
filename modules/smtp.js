//let SMTPServer = require('smtp-server').SMTPServer;
//let MailParser = require("mailparser").MailParser;
let database = require('./database');

let mailin = require('mailin');

database.run('CREATE TABLE IF NOT EXISTS `mail` (id INTEGER PRIMARY KEY AUTOINCREMENT, "from" TEXT, "to" TEXT, subject TEXT, date TEXT, text TEXT, html TEXT, headers TEXT);');

module.exports = function(config) {

    let port = config.dev ? config.port.devsmtp : config.port.smtp;

    mailin.start({
        port,
        disableWebhook: true // Disable the webhook posting.
    });

    console.log('smtpd:'+port);

    mailin.on('message', function (connection, data, content) {
        console.log(data);
    });



    // let mailparser = new MailParser();

    // let server = new SMTPServer({

    //     secure: false,
    //     disabledCommands: ['AUTH'],

    //     onData (stream, session, callback) {
    //         stream.pipe(mailparser);
    //         stream.on('end', callback);
    //     }

    // });

    // server.listen(port);

    // console.log('smtpd:'+port);

    // mailparser.on("end", obj => {
    //     save2db(obj);
    // });
}

function save2db(obj) {

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
