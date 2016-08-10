let Mail = require("lazysmtp").Mail;
let MailParser = require("mailparser").MailParser;
let database = require('./database');

database.run('CREATE TABLE IF NOT EXISTS `mail` (id INTEGER PRIMARY KEY AUTOINCREMENT, "from" TEXT, "to" TEXT, subject TEXT, date TEXT, text TEXT, html TEXT, headers TEXT);');

module.exports = function(config) {    

    let port = config.dev ? config.port.devsmtp : config.port.smtp;
    
    let mail = new Mail("fuk.nu", false);
    var mailparser = new MailParser();
    mail.start(port);

    console.log('smtp:'+port);
     
    mail.on("mail", function(email) {

        mailparser.write(email);
        mailparser.end();
     
    });

    mailparser.on("end", obj => {
        save2db(obj);
    });
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
        obj.date,
        obj.text,
        obj.html,
        JSON.stringify(obj.headers)
    ]);

}
