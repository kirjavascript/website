import ace from 'brace';
import 'brace/keybinding/vim';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import React, { Component, useState, useEffect, useRef, Fragment } from 'react';
import { render } from 'react-dom';

import hash from './hash';
import { Store, useStore } from './store';

function Editor({ initialValue, onChange }) {
    // const editor = useRef();
    useEffect(() => {
        const editor = ace.edit('editor');
        editor.session.setUseWorker(false)
        editor.setTheme('ace/theme/tomorrow');
        editor.getSession().setMode('ace/mode/javascript');
        editor.$blockScrolling = Infinity;
        editor.setShowPrintMargin(false);
        editor.setHighlightActiveLine(false);
        editor.setShowFoldWidgets(false);
        editor.renderer.setScrollMargin(10, 10, 10, 10);

        editor.setOptions({
            fontSize: '14px',
            maxLines: Infinity,
            wrap: true,
        });

        if (initialValue) {
            editor.setValue(initialValue, -1);
        }

        editor.getSession().on('change', (e) => {
            const code = editor.getValue();
            onChange({ code, hash: hash(code) });
        });
    }, []);

    // useEffect(() => {
    //     console.log(value);
    // }, [value]);

    return (
        <div id="editor" />
    );
}

function App() {
    const [store, setStore] = useStore();

    useEffect(() => {
        if (store.hash) { // set initial URL if it's wrong
            window.history.replaceState({}, '', '/' + store.hash);
        }
    }, []);

    return (
        <Fragment>
            <Editor
                initialValue={store.code}
                onChange={({ hash, code }) => {
                    window.history.replaceState({}, '', '/' + hash);
                    setStore({ hash, code, saved: false });

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
                }}
            />
            <pre>
                {JSON.stringify(store,0,4)}
            </pre>
        </Fragment>
    );
}

render((
    <Store>
        <App />
    </Store>
), document.body.appendChild(document.createElement('div')));

// clipboard
// /raw
// useTween
// jscrush jsfuck regpack uglify v2, v3
