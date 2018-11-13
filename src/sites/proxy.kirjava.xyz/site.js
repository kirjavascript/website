let vhost = require('vhost');
let request = require('request');
let parseWeb = require('./parse-web');

module.exports = function({app, config, express, site}) {

    let hostname = config.dev ? 'localhost' : site;

    let local = express();

    local.use((req, res) => {

        let url = req.url.slice(1);

        // efirstbank.com and namecheap think we're phishing...?
        if (/https:\/\/www\.efirstbank.com/.test(url)) {
            res.status(451).send('unavailable for legal reasons');
        }

        if (!url) return res.send(`
            <a href="/http://www.google.com">browse the web</a>
        `);

        let hostname = req.headers.host;

        let options = {
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0'
            },
            method: 'GET',
            encoding: null,
            gzip: true
        }

        request(options, (err, response, body) => {

            if (err) {
                // parse hollow requests
                return res.status(418).send(err);
            }

            let { statusCode, headers } = response;

            res.status(statusCode)
                .set('Content-Type', headers['content-type'] || 'text/html')
                .send(parseWeb({ hostname, url }, response));
        })

    });

    app.use(vhost(hostname, local));

}
