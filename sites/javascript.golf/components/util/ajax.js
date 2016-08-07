import { getHash } from './hash';
import request from 'superagent';

export function saveAjax(value) {

    let hash = getHash(value);

    request
        .post('/api/save')
        .send({ hash, value })
        .end((err, res) => {
            //console.log(res.body);
        });

    return hash;
}

export function loadAjax(hash, callback) {

    request
        .post('/api/load')
        .send({ hash })
        .end((err, res) => {
            !err && callback(res.body);
        });
}