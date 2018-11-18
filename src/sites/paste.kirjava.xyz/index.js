const fs = require('fs');

module.exports = ({type}) => ({
    type: type.VHOST,
    init: ({ app, getStatic, getDatabase, hostname }) => {
        const db = getDatabase('pastes', `
            CREATE TABLE IF NOT EXISTS pastes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                route TEXT UNIQUE,
                code TEXT
            );
        `);

        const insert = db.prepare(`
            INSERT OR REPLACE INTO pastes(route,code)
            VALUES (?,?)
        `);
        const code = db.prepare(`
            SELECT code FROM pastes WHERE route = ?
        `);
        const routes = db.prepare(`
            SELECT route FROM pastes
        `);

        app.use(require('body-parser').json());

        app.get('/', (req, res) => {
            res.redirect('/aaaa');
        });

        app.use('/', getStatic());

        app.post('/save/:hash', (req, res) => {
            const result = insert.run(req.params.hash, req.body.value);
            res.json({ result });
        })

        app.get('/archive', (req, res) => {
            res.send(routes.all().map(datum=> `
                <a href="/${datum.route}">${datum.route}</a>
                <br/>
            `).join(''));
        });

        const html = fs.readFileSync(__dirname + '/templates/index.html', 'utf-8');

        app.use((req, res) => {
            const hash = req.url.slice(1);
            const data = code.get(hash);
            // todo: fix closing script tag

            res.send(html.replace(/<inject-scripts\s*\/>/, `
                <script
                    id="data"
                    type="text/code"
                >
                    ${JSON.stringify({hash, ...data})}
                </script>
            `));
        });
    },
});
