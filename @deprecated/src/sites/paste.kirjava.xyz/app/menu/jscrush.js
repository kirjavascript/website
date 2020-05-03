import React, { useState, useCallback, Fragment } from 'react';
import { useStore } from '../store';

export default function JSCrush() {
    const [store, setStore] = useStore();
    const [loading, setLoading] = useState(false);

    const handleClick = useCallback(() => {
        if (!loading) {
            setLoading(true);
            import(/* webpackChunkName: "jscrush" */ 'worker-loader?inline!../transforms/jscrush')
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
