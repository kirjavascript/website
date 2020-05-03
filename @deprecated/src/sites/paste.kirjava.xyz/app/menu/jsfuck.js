import React, { useState, useCallback, Fragment } from 'react';
import { useStore } from '../store';

export default function JSFuck() {
    const [store, setStore] = useStore();
    const [loading, setLoading] = useState(false);
    const [shouldEval, setShouldEval] = useState(false);

    const handleClick = useCallback(() => {
        if (!loading) {
            setLoading(true);
            import(/* webpackChunkName: "jsfuck" */ 'worker-loader?inline!../transforms/jsfuck')
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
