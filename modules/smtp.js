//let Mail = require("lazysmtp").Mail;

var smtpd = require('smtpd-lite');



let MailParser = require("mailparser").MailParser;
let database = require('./database');

database.run('CREATE TABLE IF NOT EXISTS `mail` (id INTEGER PRIMARY KEY AUTOINCREMENT, "from" TEXT, "to" TEXT, subject TEXT, date TEXT, text TEXT, html TEXT, headers TEXT);');

module.exports = function(config) {

    let port = config.dev ? config.port.devsmtp : config.port.smtp;

    //let mail = new Mail("fuk.nu", false);
    //mail.start(port);

    var mailserver = new smtpd({
        host: 'fuk.nu',
        domain: 'fuk.nu'
    });

    mailserver.on('receive', function(mail) {
        console.log(mail);
    });

    mailserver.listen(port);

    console.log('smtpd:'+port);

    ////

    // var mailparser = new MailParser();

    // mail.on("mail", function(email) {

    //     mailparser.write(email);
    //     mailparser.end();

    // });

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
