import React, { useState, useCallback, Fragment } from 'react';
import { useStore } from '../store';
// const ClosureCompiler = require('google-closure-compiler-js'); //

// console.log(ClosureCompiler.CONTRIB_PATH); // absolute path to the contrib folder which contains externs
// const closureCompiler = new ClosureCompiler({
//   compilation_level: 'ADVANCED_OPTIMIZATIONS'
// });
// const compilerProcess = closureCompiler.run([{
//  path: 'file-one.js',
//  src: 'alert("hello world")',
//  sourceMap: null // optional input source map
// }], (...args) => {
//     console.log(...args)
// });


export default function Closure() {
    const [store, setStore] = useStore();
    const [loading, setLoading] = useState(false);

    const handleClick = useCallback(() => {
        if (!loading) {
            // setLoading(true);
            // import(/* webpackChunkName: "jscrush" */ 'worker-loader?inline!../transforms/jscrush')
            //     .then(({ default: Worker }) => {
            //         const worker = new Worker();
            //         worker.addEventListener('message', ({ data: { code } }) => {
            //             setStore({ code });
            //             worker.terminate();
            //             setLoading(false);
            //         });
            //         worker.postMessage({ code: store.code });
            //     })
            //     .catch(() => setLoading(false));
        }
    }, [store.code, loading]);

    return (
        <button onClick={handleClick}>
            {loading ? 'closureing...' : 'closure'}
        </button>
    );
}
