let vhost = require('vhost');
let connect = require('connect');
var child = require('child_process');

module.exports = function({app, config, express, site}) {

    let hostname = config.dev ? 'localhost' : site;

    let local = connect();

    local.use('/', express.static(`sites/${site}/static`));

    local.use('/uptime', (req, res) => {
        child.exec('uptime', function (error, stdout, stderr) {
            res.send(stdout);
        });
    })

    app.use(vhost(hostname, local));
    
}


