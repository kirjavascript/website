let vhost = require('vhost');
var child = require('child_process');

module.exports = function({app, config, express, site}) {

    let hostname = config.dev ? 'localhost' : site;

    let local = express();

    local.use('/', express.static(`sites/${site}/static`));

    local.get('/uptime', (req, res) => {
        child.exec('uptime', function (error, stdout, stderr) {
            res.send(stdout);
        });
    })

    app.use(vhost(hostname, local));

}


