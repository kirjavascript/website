import React, { useState, useCallback, Fragment } from 'react';
import { useStore } from '../store';

export default function Container() {

    return (
        <div>
            <JSFuck />
            <JSCrush />
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
            */}

        </div>
    );
}

function JSFuck() {
    const [store, setStore] = useStore();
    const [loading, setLoading] = useState(false);
    const [shouldEval, setShouldEval] = useState(false);

    const handleClick = useCallback(() => {
        if (!loading) {
            setLoading(true);
            import(/* webpackChunkName: "jsfuck" */
                'worker-loader?inline!../transforms/jsfuck')
                .then(({ default: Worker }) => {
                    const worker = new Worker();
                    worker.addEventListener('message', ({ data: { code } }) => {
                        setStore({ code });
                        worker.terminate();
                        setLoading(false);
                    });
                    worker.postMessage({ code: store.code, shouldEval });
                })
                .catch(() => setLoading(false));
        }
    }, [store.code, loading, shouldEval]);

    return (
        <Fragment>
            <input
                type="checkbox"
                checked={shouldEval}
                onChange={() => {
                    setShouldEval(val => !val);
                }}
            />
            (eval)
            <button onClick={handleClick}>
                {loading ? 'fucking...' : 'jsfuck'}
            </button>
        </Fragment>
    );
}

function JSCrush() {
    const [store, setStore] = useStore();
    const [loading, setLoading] = useState(false);

    const handleClick = useCallback(() => {
        if (!loading) {
            setLoading(true);
            import(/* webpackChunkName: "jscrush" */
                'worker-loader?inline!../transforms/jscrush')
                .then(({ default: Worker }) => {
                    const worker = new Worker();
                    worker.addEventListener('message', ({ data: { code } }) => {
                        setStore({ code });
                        worker.terminate();
                        setLoading(false);
                    });
                    worker.postMessage({ code: store.code });
                })
                .catch(() => setLoading(false));
        }
    }, [store.code, loading]);

    return (
        <button onClick={handleClick}>
            {loading ? 'crushing...' : 'jscrush'}
        </button>
    );
}
