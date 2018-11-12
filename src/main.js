const express = require('express');
const vhost = require('vhost');
const fs = require('fs');

const dev = ~process.argv.indexOf('--dev');

const config = {
    dev,
    devHost: 'kirjava.xyz',
    port: {
        bouncy: dev ? 8000 : 80,
        express: 9000,
        smtp: dev ? 8025 : 25,
    }
};

const type = {
    STATIC: 'STATIC',
    VHOST: 'VHOST',
    BOUNCE: 'BOUNCE',
};

const sites = fs.readdirSync(`${__dirname}/sites`)
    .map((name) => {
        const site = require(`${__dirname}/sites/${name}/index.js`)({ type })
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

// deployment

app.post('/github-deploy', (req,res) => {
    res.json({});
    if (req.body.ref === 'refs/heads/master') {
        require('child_process').exec('npm run update');
    }
})

// get everything except bouncers
const vhosts = sites.filter(site => site.type !== type.BOUNCE);
// const hasVhost = which => vhost.some(site => site.hostname === which);

// load vhosts

if (config.dev) {
    loadSite(vhosts.find(site => site.hostname === config.devHost));
} else {
    vhosts.forEach(loadSite);
}

function loadSite(site) {
    console.info(`vhost: ${site.hostname}`);
    const hostname = config.dev ? 'localhost' : site.hostname;
    if (site.type === type.STATIC) {
        const path = `${__dirname}/sites/${site.hostname}/${site.path || 'static'}`;
        app.use(vhost(hostname, express.static(path)));
    }
}

// catch all unknow vhosts
app.use((req,res,next) => {
    // const host = req.headers.host.split(':').shift();
    // if (!config.dev && sites.indexOf(host) == -1) {
    res.status(418).send('nope');
    // }
    // else {
    //     next();
    // }
});

// compression
// homebrew dev server
// better bouncy integration
// redirect .htm in kirajva.xyz / type.REDIRECT
// better-lsqlite
// koa
// useTween
// generate README

// module.exports = ({type}) => ({
//     type: type.VHOST,
//     site: app => {
//         // app is 'local'
//     },
// });
