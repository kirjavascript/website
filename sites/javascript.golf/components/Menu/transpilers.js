import $script from 'scriptjs';

import jscrush from 'jscrush';

let uglifyLoaded = false;

export function uglify(callback) {
    if (uglifyLoaded) {
        callback(UglifyJS);
    }
    else {
        $script('/uglifyjs.js', function() {
            callback(UglifyJS);
            uglifyLoaded = true;
        });
    }
}

let beautifyLoaded = false;

export function beautify(callback) {
    if (beautifyLoaded) {
        callback();
    }
    else {
        $script('/beautify.js', function(asd) {
            callback();
            beautifyLoaded = true;
        });
    }
}

export function crush(code) {
    return jscrush(code);
}

let babelLoaded = false;

export function babel(callback) {
    if (babelLoaded) {
        callback();
    }
    else {
        $script('/babel.min.js', function(asd) {
            callback();
            babelLoaded = true;
        });
    }
}