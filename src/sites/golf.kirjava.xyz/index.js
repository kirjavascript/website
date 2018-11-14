const fs = require('fs');
// var favicon = require('serve-favicon');
// let initdb = require('./initdb');
// let api = require('./api');

module.exports = ({type}) => ({
    type: type.VHOST,
    init: ({ app, getStatic, getDatabase }) => {

        app.use('/', getStatic());

        const db = getDatabase`
            CREATE TABLE IF NOT EXISTS snippets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                route TEXT UNIQUE,
                code TEXT
            );
        `;

        // app.use(favicon(__dirname + '/static/favicon.ico'))

        // routes for ajax functions
        // api({ local: app, database });


        // app.get('/archive', (req, res) => {
        //     database.all('SELECT route FROM snippets', (err, data) => {
        //         let archive = data.map(datum=> (
        //             `<a href="/${datum.route}">${datum.route}</a><br/>`
        //         )).join('');
        //         res.send(archive);
        //     });
        // });

        // let baseHTML = fs.readFileSync(`sites/${site}/static/index.html`, 'utf-8');

        // // wildcard
        // app.use(function (req, res, next) {

        //     // inject requested code into the document

        //     if (/\/(.*?)-(.*?)-(.*?)-(.*)/.test(req.path)) {

        //         database.get('SELECT code FROM snippets WHERE route = ?',
        //             [req.path.slice(1)],
        //             (err, data) => {
        //                 let code;

        //                 if (data && data.code) {
        //                     code = data.code;
        //                 }
        //                 else {
        //                     code = 'Error loading data';
        //                 }

        //                 let injected = baseHTML.replace('<body>',`
        //                     <body>
        //                         <script>
        //                         __code = ${JSON.stringify(code).replace(/<\/script>/g,`<"+"/script>`)};
        //                     </script>
        //                 `);

        //                 res.send(injected);
        //             })
        //     }
        //     else {
        //         res.send(baseHTML);
        //     }
        // });

    },
});
