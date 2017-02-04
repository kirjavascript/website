let vhost = require('vhost');
let request = require('superagent');
let parseWeb = require('./parse-web');

module.exports = function({app, config, express, site}) {

    let hostname = config.dev ? 'localhost' : site;

    let local = express();

    local.use((req, res) => {

        let url = req.url.slice(1);

        if (!url) res.send(`
            <a href="/http://www.google.com">
                plz specify a URL
            </a>
        `);

        let hostname = req.headers.host;

        request
            .get(url)
            .set('User-Agent', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0')
            .buffer(true) // for JS
            .end((err, response) => {
                if (err) {
                    // parse hollow requests
                    return res.status(418).send(err);
                }

                let { status, header } = response;

                res.status(status)
                    .set('Content-Type', header['content-type'])
                    .send(parseWeb({ hostname, url }, response));
            });

    });

    app.use(vhost(hostname, local));

}


