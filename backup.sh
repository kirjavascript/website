#!/bin/sh
scp cake@kirjava.xyz:/etc/nginx/nginx.conf .
scp cake@kirjava.xyz:~/.pm2/dump.pm2 .
rsync -ru --delete cake@kirjava.xyz:~/static .
rsync -ru --delete --exclude=node_modules --exclude=mail cake@kirjava.xyz:~/email .
