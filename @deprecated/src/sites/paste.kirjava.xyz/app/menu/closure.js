import React, { useState, useCallback, Fragment } from 'react';
import { useStore } from '../store';
//https://developers.google.com/closure/compiler/docs/gettingstarted_api

export default function Closure() {
    const [store, setStore] = useStore();
    const [loading, setLoading] = useState(false);

    const handleClick = useCallback(() => {
        if (!loading) {
            const body = new URLSearchParams();
            body.append('output_format', 'json');
            body.append('output_info', 'compiled_code');
            body.append('compilation_level' , 'ADVANCED_OPTIMIZATIONS');
            body.append('js_code', store.code);

            fetch('https://closure-compiler.appspot.com/compile', {
                method: 'POST',
                body,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                },
            })
                .then(res => res.json())
                .then(console.log)
                .catch(console.error);

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
