let fs = require('fs');
let vhost = require('vhost');
let connect = require('connect');
let initdb = require('./initdb');
let api = require('./api');

module.exports = function({app, config, express, database, site}) {

    // populate tables if they don't exist
    initdb(database);

    let hostname = config.dev ? 'localhost' : site;

    let local = connect();

    // routes for ajax functions
    api({ local, database });

    local.use('/', express.static(`sites/${site}/static`));

    let baseHTML = fs.readFileSync(`sites/${site}/static/index.html`, 'utf-8');

    // wildcard
    local.use(function (req, res, next) {
        res.send(baseHTML);
    })

    app.use(vhost(hostname, local));
    
}
