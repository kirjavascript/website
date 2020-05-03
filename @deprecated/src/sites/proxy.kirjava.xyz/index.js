const fetch = require('node-fetch');
const parseWeb = require('./parse-web');

module.exports = ({type}) => ({
    type: type.VHOST,
    init: ({ app }) => {
        app.use(async (req, res) => {

            res.status(451).send('unavailable for legal reasons');
            const url = req.url.slice(1);

            if (
                // efirstbank.com and namecheap think we're phishing
                /https:\/\/www\.efirstbank.com/.test(url)
                // MGA entertainment thinks we're committing copyright infringement
                || /https:\/\/www\.labirint.ru/.test(url)
                || /https:\/\/lol-surprise-pedia.fandom.com/.test(url)
            ) {
                res.status(451).send('unavailable for legal reasons');
            }
            //

            if (!url) return res.send(`
                <a href="/http://www.google.com">browse the web</a>
            `);

            const hostname = req.headers.host;

            const options = {
                headers: {
                    'user-agent': req.headers['user-agent'],
                },
                method: req.method,
                body: req.method.toUpperCase() === 'POST' ? req.body : undefined,
            };

            try {
                const response = await fetch(url, options);
                const text = await response.text();
                res.status(response.status);
                const contentType = String(response.headers.get('content-type'));
                const headers = [...response.headers.entries()];
                res.set('content-type', contentType);
                res.send(parseWeb({
                    hostname,
                    url: response.url,
                    contentType,
                    body: text,
                }));
            } catch(err) {
                res.status(418).send(String(err));
            }
        });
    },
});
