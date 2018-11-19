import React, { Component, useEffect, useCallback, Fragment } from 'react';
import { render } from 'react-dom';
import debounce from 'lodash/debounce';

import { Store, useStore } from './store';
import Editor from './editor';
import getHash from './hash';

document.title = 'pastestuff';

function App() {
    const [store, setStore] = useStore();

    useEffect(() => {
        if (store.hash) { // set initial URL if it's wrong
            window.history.replaceState({}, '', '/' + store.hash);
        }
    }, []);

    const saveCode = useCallback(debounce(({hash, code}) => {
        fetch(`/save/${hash}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({code}),
        })
            .then(res => res.json())
            .then(() => {
                setStore({ saved: true });
            })
            .catch(console.error);
    }, 500), []);

    const handleChange = useCallback((code) => {
        const hash = getHash(code);
        window.history.replaceState({}, '', '/' + hash);
        setStore({ hash, code, saved: false });
        saveCode({ hash, code });
    }, []);

    return (
        <Fragment>
            <Editor
                value={store.code}
                onChange={handleChange}
            />
            <hr />
            <pre>
                {JSON.stringify(store,0,4)}
            </pre>

            <button onClick={() => {
                // setStore({code: 'function() {}' });

                import(/* webpackChunkName: "jsfuck" */ './transforms/jsfuck')
                    .then((obj) => {
                        setStore({code: obj.default(store.code) });
                    })
            }}>jsfuck</button>

            {store.code && !!store.code.length && (
                <Fragment>
                    {store.code.length} bytes
                </Fragment>
            )}
        </Fragment>
    );
}

render((
    <Store>
        <App />
    </Store>
), document.body.appendChild(document.createElement('div')));
