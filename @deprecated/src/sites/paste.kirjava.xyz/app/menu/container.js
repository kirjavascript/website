import React, { useState, useCallback, Fragment } from 'react';
import { useStore } from '../store';
import JSFuck from './jsfuck';
import JSCrush from './jscrush';
import Packer from './packer';
import Closure from './closure';

export default function Container() {

    return (
        <div>
            <JSFuck />
            <JSCrush />
            <Packer />
            <Closure />
            {/*
    https://github.com/google/closure-compiler-js
    https://siorki.github.io/regPack.html
    http://compressorrater.thruhere.net/
    http://dean.edwards.name/packer/
http://www.brainjar.com/js/crunch/demo.html
http://refresh-sf.com/
                dojo
                regpack
                uglify v2, v3
                obfuscators
                babel
                lebab
                typescript
                flow
                coffeescript /decaffinate
                opal
                js unfuck
                caffinating / babling
            */}

        </div>
    );
}
