import React, { useEffect, useCallback, Fragment } from 'react';
import { render } from 'react-dom';
import debounce from 'lodash/debounce';

import { Store, useStore } from './store';
import Editor from './editor';
import Menu from './menu/container';
import getHash from './hash';
import bytes from './bytes';

// limit length

// useCode codestore
// clipboard
// /raw
// useTween
// gzip size
// run code
// UNDO
// editor bar with settings
// workers for transpilers
// limit fe size / increase be size
// highlight colour
// polyfill padStart / URLSearchParams
// flex-layouter - pane for transpiled result (toggle to transpile target / same target)
//https://github.com/FarhadG/code-mirror-themes
//https://github.com/Aerobird98/codemirror-one-dark-theme
// test all minifiers on a piece of code

// 19:00 <nibblrjr> Kirjava: https://vgdensetsu.tumblr.com/post/179656817318/designing-2d-graphics-in-the-japanese-industry (4 hours ago)

document.title = 'transpiler explorer';

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
                window.history.replaceState({}, '', '/' + hash);
            })
            .catch(console.error);
    }, 500), []);

    const handleChange = useCallback((code) => {
        const hash = getHash(code);
        window.history.replaceState({}, '', '/????');
        setStore({ hash, code, saved: false });
        saveCode({ hash, code });
    }, []);

    return (
        <Fragment>
            <Menu />
            <Editor
                value={store.code}
                onChange={handleChange}
            />
            {store.code && !!store.code.length && (
                <Fragment>
                    {bytes(store.code.length)}
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
