let config = {
    dev: ~process.argv.indexOf('--dev'),
    devSite: 'kirjava.xyz',
    port: {
        prod: 80,
        dev: 8000,
        express: 9000,
        smtp: 25,
        devsmtp: 8025
    }
}

require('./modules/bounce')(config);
require('./modules/express')(config);
require('./modules/smtp')(config);
