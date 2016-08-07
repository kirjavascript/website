import $script from 'scriptjs';

import jscrush from 'jscrush';

let uglifyLoaded = false;

export function uglify(callback) {
    if (uglifyLoaded) {
        callback(UglifyJS);
    }
    else {
        $script('/scripts/uglifyjs.js', function() {
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
        $script('/scripts/beautify.js', function() {
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
        $script('/scripts/babel.min.js', function() {
            callback();
            babelLoaded = true;
        });
    }
}

let lebabLoaded = false;

export function lebab(callback) {
    if (lebabLoaded) {
        callback();
    }
    else {
        $script('/scripts/lebab.min.js', function() {
            callback();
            lebabLoaded = true;
        });
    }
}