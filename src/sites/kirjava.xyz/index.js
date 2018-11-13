const child = require('child_process');

module.exports = ({type}) => ({
    type: type.VHOST,
    init: ({ app, getStatic }) => {
        app.use('/', getStatic());

        app.get('/uptime', (req, res) => {
            child.exec('uptime', function (error, stdout, stderr) {
                res.send(stdout);
            });
        });
    },
});
