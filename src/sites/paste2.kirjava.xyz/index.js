module.exports = ({type}) => ({
    type: type.VHOST,
    init: ({ app, getStatic, getDatabase, hostname }) => {
        app.get('/', (req, res) => {
            res.redirect('/aaaa');
        });

        app.use('/', getStatic());

        app.use((req, res) => {
            res.sendFile(__dirname + '/templates/index.html');
        });

        // #ffb6c1

        const db = getDatabase('pastes', `
            CREATE TABLE IF NOT EXISTS pastes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                route TEXT UNIQUE,
                code TEXT
            );
        `);

        // app.use(bodyParser.json());

    },
});
