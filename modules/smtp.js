//let SMTPServer = require('smtp-server').SMTPServer;
//let MailParser = require("mailparser").MailParser;
let database = require('./database');

let mailin = require('mailin');

database.run('CREATE TABLE IF NOT EXISTS `mail` (id INTEGER PRIMARY KEY AUTOINCREMENT, "from" TEXT, "to" TEXT, subject TEXT, date TEXT, text TEXT, html TEXT, headers TEXT);');

module.exports = function(config) {

    let port = config.dev ? config.port.devsmtp : config.port.smtp;




    /* Start the Mailin server. The available options are:
     *  options = {
     *     port: 25,
     *     webhook: 'http://mydomain.com/mailin/incoming,
     *     disableWebhook: false,
     *     logFile: '/some/local/path',
     *     logLevel: 'warn', // One of silly, info, debug, warn, error
     *     smtpOptions: { // Set of options directly passed to simplesmtp.createServer(smtpOptions)
     *        SMTPBanner: 'Hi from a custom Mailin instance'
     *     }
     *  };
     * Here disable the webhook posting so that you can do what you want with the
     * parsed message. */
    mailin.start({
      port: 25,
      disableWebhook: true // Disable the webhook posting.
    });

    console.log('smtpd:'+port);

    /* Access simplesmtp server instance. */
    mailin.on('authorizeUser', function(connection, username, password, done) {

        console.log('user')
        done(null, true);
    });

    /* Event emitted when a connection with the Mailin smtp server is initiated. */
    mailin.on('startMessage', function (connection) {
      /* connection = {
          from: 'sender@somedomain.com',
          to: 'someaddress@yourdomain.com',
          id: 't84h5ugf',
          authentication: { username: null, authenticated: false, status: 'NORMAL' }
      }
      }; */
      console.log(connection);
    });

    /* Event emitted after a message was received and parsed. */
    mailin.on('message', function (connection, data, content) {
      console.log(data);
      /* Do something useful with the parsed message here.
       * Use parsed message `data` directly or use raw message `content`. */
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
