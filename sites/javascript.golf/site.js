let fs = require('fs');
let vhost = require('vhost');
let connect = require('connect');

module.exports = function({app, config, express, site}) {

    let hostname = config.dev ? 'localhost' : site;

    let local = connect();

    local.use('/', express.static(`sites/${site}/static`));

    let baseHTML = fs.readFileSync(`sites/${site}/static/index.html`, 'utf-8');

    // wildcard
    local.use(function (req, res, next) {
        res.send(baseHTML);
    })

    app.use(vhost(hostname, local));
    
}

// js golf couchDB? minify/babel/etc build in react? monokai
// generic sockets?

// tinyurl algorithm