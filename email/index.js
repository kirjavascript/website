const mailin = require('mailin');
const SQLite = require('better-sqlite3');
const express = require('express');

const layout = (body) => `
    <!doctype html>
    <html class="no-js" lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>throwaway email service</title>
            <meta name="description" content="">
            <meta name="theme-color" content="#000000">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet' type='text/css'>
            <style>html{font-family: 'Source Sans Pro', sans-serif;}</style>
        </head>
        <body>
            ${body}
        </body>
    </html>
`;

const filename = `${__dirname}/mail`;
const db = new SQLite(filename);

db.exec(`
    CREATE TABLE IF NOT EXISTS mail (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        "from" TEXT, "to" TEXT, subject TEXT,
        date TEXT,
        text TEXT,
        html TEXT,
        headers TEXT
    );
`);

const insert = db.prepare(`
    INSERT INTO mail("from", "to", subject, date, text, html, headers)
    VALUES (?,?,?,?,?,?,?)
`);

const targets = db.prepare(`
    SELECT DISTINCT "to" FROM mail
`);

const target = db.prepare(`
    SELECT * FROM mail WHERE "to" = ?
`);

const deleteTarget = db.prepare(`
    DELETE FROM mail WHERE "to" = ?
`);

const message = db.prepare(`
    SELECT * FROM mail WHERE id = ?
`);

const app = express();

app.listen(8002, console.log);

mailin.start({
    port: 25,
    disableWebhook: true,
});

mailin.on('message', (connection, obj, content) => {
    if (!obj.from || !obj.to || !obj.date) return;

    insert.run(
        obj.from[0].address,
        obj.to[0].address,
        obj.subject,
        obj.date.toString(),
        obj.text,
        obj.html,
        JSON.stringify(obj.headers),
    );
});

app.use('/delete/:to', (req, res) => {
    deleteTarget.run(req.params.to);
    res.redirect('/');
});

app.use((req, res) => {
    if (req.path == '/') {
        const output =
            `<h1>Addresses</h1>` +
            targets
            .all()
            .map(
                (datum) => `
                <a href="/${datum.to}">${datum.to}</a>&emsp;
                <a href="/delete/${datum.to}">(delete)</a>
                    `,
            )
            .join('<br />');
        res.send(layout(output));
    } else if (/\/(.*?)/.test(req.path)) {
        const dirs = req.path.slice(1).split('/');

        if (dirs.length == 1) {
            const address = dirs.pop();
            const output =
                `<h1>${address}</h1>` +
                target
                .all(address)
                .map(
                    (datum) => `
                            Subject: <strong>${datum.subject}</strong>
                            From: <strong>${datum.from}</strong>
                            <a href="/${address}/${datum.id}">
                                <strong>${new Date(
                                    datum.date,
                                ).toString()}</strong>
                        </a>
                        `,
                )
                .join('<br />');
            res.send(layout(output));
        } else {
            const id = dirs.pop() | 0;
            const address = dirs.pop();
            const data = message.get(id) || {};
            const mkJSON = (obj) => {
                try {
                    return JSON.stringify(JSON.parse(object), 0, 4);
                } catch (e) { }
            };
            const output = `
                <h1>${address} - ${data.subject}</h1>
                From: <strong>${data.from}</strong><br />
                Date: <strong>${new Date(
                    data.date,
                ).toString()}</strong><br />
                Message: <div style="padding:40px">
                    ${data.html || data.text}
                </div>
                Headers: <pre style="white-space: pre-wrap">
                ${mkJSON(data.headers)}</pre>
            `;

            res.send(layout(output));
        }
    }
});
