module.exports = function(config) {

    // port router

    let port = config.dev ? config.port.dev : config.port.prod;

    // if the site is running on another port and node service, add it here
    // otherwise express will handle it

    let bouncy = require('bouncy');

    let bouncer = bouncy(function (req, res, bounce) {

        if (!req.headers.host) return;

        let host = req.headers.host.split(':').shift();

        if (host === 'nibblr.pw') {
            bounce(8888);
        }
        else if (host == 'mspaint.us') {
            bounce(8889);
        }
        else {
            bounce(config.port.express);
        }
    });
    bouncer.listen(port);

    console.log('bounce:'+port);

}

