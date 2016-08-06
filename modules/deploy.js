let deploying = false;
var child = require('child_process');


module.exports = function() {

    // check origin request

    if (deploying) {
        return 'deployment is already in progress';
    }
    else {
        deploying = true;
        return 'starting deployment';

        child.exec('uptime', function (error, stdout, stderr) {
            res.send(stdout);
        });

        console.log()
    }


}