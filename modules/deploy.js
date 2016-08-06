var child = require('child_process');


module.exports = function(gitObj) {

    if (gitObj.ref == 'refs/heads/master') {

        child.exec('npm run update', function (error, stdout, stderr) {
        });

    }

}