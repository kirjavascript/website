const fs = require('fs');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

module.exports = ({type}) => ({
    type: type.VHOST,
    init: ({ app, getStatic, getDatabase, hostname }) => {
        app.use('/', getStatic());
        app.use(bodyParser.json()); // TODO: remove?

        const db = getDatabase('paste-snippets', `
            CREATE TABLE IF NOT EXISTS snippets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                route TEXT UNIQUE,
                code TEXT
            );
        `);

        const insert = db.prepare(`
            INSERT OR REPLACE INTO snippets(route,code)
            VALUES (?,?)
        `);
        const code = db.prepare(`
            SELECT code FROM snippets WHERE route = ?
        `);
        const routes = db.prepare(`
            SELECT route FROM snippets
        `);

        app.post('/api/save', (req, res) => {
            const {hash, value} = req.body;
            insert.run(hash, value);
            res.json({});
        })

        app.post('/api/load', (req, res) => {
            let {hash} = req.body;
            res.json({code:code.get(hash)});
        })

        app.use(favicon(__dirname + '/static/favicon.ico'))

        app.get('/archive', (req, res) => {
            res.send(routes.all().map(datum=> (
                `<a href="/${datum.route}">${datum.route}</a><br/>`
            )).join(''));
        });

        let baseHTML = fs.readFileSync( `${__dirname}/static/index.html`, 'utf-8');

        // // wildcard
        app.use((req, res, next) => {

            // inject requested code into the document

            if (/\/(.*?)-(.*?)-(.*?)-(.*)/.test(req.path)) {

                let injected = baseHTML.replace('<body>',`
                    <body>
                        <script>
                        __code = ${JSON.stringify(code.get(req.path.slice(1)).code).replace(/<\/script>/g,`<"+"/script>`)};
                    </script>
                `);

                res.send(injected);
            }
            else {
                res.send(baseHTML);
            }
        });

    },
});
