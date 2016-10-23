let vhost = require('vhost');

module.exports = function({app, config, express, site}) {

    let hostname = config.dev ? 'localhost' : site;

    app.use(vhost(hostname, express.static(`sites/${site}/static`)));
    
}