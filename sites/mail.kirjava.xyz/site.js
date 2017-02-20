let vhost = require('vhost');
let layout = require('./layout');

module.exports = function({app, config, express, site, database}) {

    let hostname = config.dev ? 'localhost' : site;

    let local = express();

    local.use((req,res,next) => {

        if (req.path == '/') {
            database.all('SELECT DISTINCT "to" FROM mail', (err, data) => {

                let output = `<h1>Addresses</h1>`;

                output += data.map(datum => `

                    <a href="/${datum.to}">${datum.to}</a>

                `).join('<br />')

                res.send(layout(output));

            })
        }
        else if (/\/(.*?)/.test(req.path)) {

            let dirs = req.path.slice(1).split('/');

            if (dirs.length == 1) {
                let address = dirs.pop();

                database.all('SELECT "from","to",subject,date,id FROM mail WHERE "to" = ?',
                    [address],
                    (err, data) => {

                    let output = `<h1>${address}</h1>`;

                    output += data.map(datum => `

                        Subject: <strong>${datum.subject}</strong>
                        From: <strong>${datum.from}</strong>
                        <a href="/${address}/${datum.id}">
                            <strong>${new Date(datum.date).toString()}</strong>
                        </a>

                    `).join('<br />')

                    res.send(layout(output));

                })
            }
            else {
                let id = dirs.pop()|0;
                let address = dirs.pop();

                database.get('SELECT "from","to",subject,date,id,text,html,headers FROM mail WHERE id = ?',
                    [id],
                    (err, data) => {

                    let output;

                    if (data) {
                        output = `
                            <h1>${address} - ${data.subject}</h1>
                            From: <strong>${data.from}</strong><br />
                            Date: <strong>${new Date(data.date).toString()}</strong><br />
                            Message: <div style="padding:40px">
                                ${data.html || data.text}
                            </div>
                            Headers: <pre style="white-space: pre-wrap">${JSON.stringify(JSON.parse(data.headers),null,4)}</pre>
                        `;
                    }
                    else {
                        output = 'email not found (!)';
                    }

                    res.send(layout(output));

                })
            }
        }

    });

    app.use(vhost(hostname, local));

}
