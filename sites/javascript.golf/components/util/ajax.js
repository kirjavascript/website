import { getHash } from './hash';
import request from 'superagent';

export function saveAjax(value) {

    let hash = getHash(value);

    request
        .post('/api/saveNew')
        .send({ hash, value })
        .end(function(err, res){
            console.log(res.body);
        });
}