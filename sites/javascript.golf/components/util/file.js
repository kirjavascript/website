import { getHash } from './hash';

export function saveNew(value) {

    let hash = getHash(value);

    console.log(hash)
}