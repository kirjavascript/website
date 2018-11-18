import ace from 'brace';
import 'brace/keybinding/vim';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import React, { Component, useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import { hash } from './hash';

function Editor() {
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

        editor.getSession().on('change', (e) => {

            window.history.replaceState({}, '', '/' + hash(editor.getValue()));
        });
    }, []);

    return (
        <div id="editor" />
    );
}


render(
    <Editor />,
    document.body.appendChild(document.createElement('div')),
);

// ctrl c copy
//
// golf better hash and have hash change instantly
// useTween
