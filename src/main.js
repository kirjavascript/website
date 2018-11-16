const SQLite = require('better-sqlite3');
const express = require('express');
const vhost = require('vhost');
const fs = require('fs');

const dev = ~process.argv.indexOf('--dev');

const config = {
    dev,
    devHost: 'mail.kirjava.xyz',
    port: {
        bouncy: dev ? 8000 : 80,
        express: 9000,
    }
};

const type = {
    STATIC: 'STATIC',
    VHOST: 'VHOST',
    BOUNCE: 'BOUNCE',
};

const sites = fs.readdirSync(`${__dirname}/sites`)
    .map((name) => {
        const site = require(`${__dirname}/sites/${name}/index.js`)({ type, config })
        site.hostname = name;
        return site;
    });

// bounce hostnames

const bouncers = sites.filter(site => site.type === type.BOUNCE);
bouncers.forEach(site => {
    console.info(`${site.hostname}: ${site.port}`)
});
// key-value of host-port
const bounceKV = bouncers.reduce((acc, cur) => (acc[cur.hostname]=cur.port), {});

require('bouncy')((req, res, bounce) => {
    const host = req.headers.host.split(':').shift();
    if (bounceKV[host]) {
        bounce(bounceKV[host]);
    } else {
        bounce(config.port.express);
    }
}).listen(config.port.bouncy);

// load express

const app = express();
const server = app
    .use(require('compression')())
    .use(require('body-parser').json())
    .listen(config.port.express, function () {
        console.info(`express: ${config.port.express}`)
    });

// ensure storage folder exists
const storageDir = __dirname + '/../storage/';
!fs.existsSync(storageDir) && fs.mkdirSync(storageDir);

function loadSite(site) {
    console.info(`vhost: ${site.hostname}`);
    const getStatic = (path = 'static') => express.static(
        `${__dirname}/sites/${site.hostname}/${path || 'static'}`,
        { extensions: ['html', 'htm'] },
    );
    const getDatabase = (name, schema) => {
        const filename = `${__dirname}/../storage/${name}`;
        fs.openSync(filename, 'a');
        const db = new SQLite(filename);
        schema && db.exec(schema);
        return db;
    };
    const hostname = config.dev ? '*' : site.hostname;
    if (site.type === type.STATIC) {
        app.use(vhost(hostname, getStatic(site.path)));
    } else {
        const localApp = express();
        site.init({ dev, app: localApp, getStatic, getDatabase });
        app.use(vhost(hostname, localApp));
    }
}

// load vhosts

const vhosts = sites.filter(site => site.type !== type.BOUNCE);

if (config.dev) {
    loadSite(vhosts.find(site => site.hostname === config.devHost));
} else {
    vhosts.forEach(loadSite);
}

// deployment

app.post('/github-deploy', (req,res) => {
    res.json({});
    if (req.body.ref === 'refs/heads/master') {
        require('child_process').exec('npm run update');
        console.info('updating')
    }
})

// catch all unknown vhosts
app.use((req,res,next) => {
    res.status(418).send(`
        <span style="color:#060">
            &gt ${req.get('host') + req.originalUrl}
            <br />
            &gt trying fake url
        </span>
    `);
});

// click on a link, open iframe in background -refresh title, url
// golf better hash and have hash change instantly
// useTween
// lets encrypt
