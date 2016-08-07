let fs = require('fs');
let vhost = require('vhost');
let connect = require('connect');
let initdb = require('./initdb');
let api = require('./api');

module.exports = function({app, config, express, database, site}) {

    // populate tables if they don't exist
    initdb(database);

    let hostname = config.dev ? 'localhost' : site;

    let local = connect();

    // routes for ajax functions
    api({ local, database });

    local.use('/', express.static(`sites/${site}/static`));

    let baseHTML = fs.readFileSync(`sites/${site}/static/index.html`, 'utf-8');

    // wildcard
    local.use(function (req, res, next) {

        // inject requested code into the document
        
        if (/\/(.*?)-(.*?)-(.*?)-(.*)/.test(req.path)) {

            let hash = req.path.slice(1)

            database.get('SELECT code FROM snippets WHERE route = ?',
                [hash],
                (err, data) => {
                    let code;

                    if (data && data.code) {
                        code = data.code;
                    }
                    else {
                        code = 'Error loading data';
                    }

                    let injected = baseHTML.replace('<body>',`
                        <body>
                            <script>
                                __code = ${JSON.stringify(code)};
                                __snippetHash = "${hash}"
                            </script>
                    `);

                    res.send(injected);
                })
        }
        else {
            res.send(baseHTML);
        }
    })

    app.use(vhost(hostname, local));
    
}

// set the code state and snippet has

// for the menu ui, use the same colours as ace editor