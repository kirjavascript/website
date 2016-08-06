let fs = require('fs');
let express = require('express');
let vhost = require('vhost');
let bodyParser = require('body-parser');
let deploy = require('./deploy');
let database = require('./database');

module.exports = function(config) {

    let app = express();

    // get list of sites
    let sites = fs.readdirSync('sites');

    let server = app
        .use(bodyParser.json())
        .listen(config.port.express, function () {
            console.log('express:'+config.port.express)
        });

    // deployment

    app.post('/github-deploy', (req,res) => {
        res.json({});
        deploy(req.body);
    })

    // catch unknown vhosts

    app.use('*', (req,res,next) => {
        let host = req.headers.host.split(':').shift();

        if (!config.dev && sites.indexOf(host) == -1) {
            res.send('error 418');
        }
        else {
            next();
        }
    })

    // vhost router

    if (config.dev) {
        // just load one site @ localhost's hostname
        require(`../sites/${config.devSite}/site.js`)({
            app,
            config,
            express,
            database,
            site:config.devSite
        });
    }
    else {
        // load them all
        sites.forEach(site => {

            require(`../sites/${site}/site.js`)
                ({
                    app,
                    config,
                    express,
                    database,
                    site
                });

        });
    }

}
