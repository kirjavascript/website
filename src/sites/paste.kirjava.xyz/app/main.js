import ace from 'brace';
import 'brace/keybinding/vim';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import React, { Component, useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import hash from './hash';

function Editor({ value, onChange }) {
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

        if (value) {
            editor.setValue(value, -1);
        }

        editor.getSession().on('change', (e) => {
            const value = editor.getValue();
            onChange({ value, hash: hash(value) });
        });
    }, []);

    // useEffect(() => {
    //     console.log(value);
    // }, [value]);

    return (
        <div id="editor" />
    );
}

const data = do {
    try {
        JSON.parse(document.getElementById('data').textContent);
    } catch (e) {
        ({});
    }
};

if (data.hash) {
    window.history.replaceState({}, '', '/' + data.hash);
}

render(
    <Editor
        value={data.code}
        onChange={({ hash, value }) => {
            window.history.replaceState({}, '', '/' + hash);
            fetch(`/save/${hash}`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({value}),
            })
                .then(res => res.json())
                .then(() => {

                })
                .catch(console.error);
        }}
    />,
    document.body.appendChild(document.createElement('div')),
);

// clipboard
// /raw
// useTween
