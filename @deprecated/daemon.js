(function daemon() {
    const proc = require('child_process')
        .spawn('node', ['src/main.js', '--dev'], {
            stdio: 'inherit',
        });

    const rip = () => {
        if (process.argv.includes('--reload')) {
            daemon();
        }
        else {
            process.exit();
        }
    };

    proc.on('exit', rip);

    require('chokidar')
        .watch('src/**/*')
        .on('change', () => {
            proc.removeListener('exit', rip);
            proc.on('exit', daemon);
            proc.kill('SIGINT');
        });
}())
