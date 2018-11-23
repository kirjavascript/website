import React, { useState, useEffect, useRef } from 'react';
import CM from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/keymap/vim';
import bytes from './bytes';

export default function Editor({ value, onChange }) {
    const valueRef = useRef();
    const editorRef = useRef();
    useEffect(() => {

        const editor = CM(document.getElementById('editor'), {
            value: value,
            mode:  'javascript',
            theme: 'monokai',
            autofocus: true,
            lineWrapping: true,
            inputStyle: 'contenteditable',
            lineNumbers: true,
            gutters: ["CodeMirror-linenumbers", "breakpoints"],
            // keyMap: 'vim',
        });

        editor.on('changes', () => {
            const code = editor.getValue();
            onChange(code);
            valueRef.current = code;
        });

        editor.on('blur', () => {
            requestAnimationFrame(() => {
                editor.focus();
            });
        });

        valueRef.current = value;
        editorRef.current = editor;

    }, []);

    useEffect(() => {
        if (valueRef.current !== value) {
            if (value.length > 2000000) {
                editorRef.current.setValue(
                    `resulting payload would be ${bytes(value.length)}`
                );
            } else {
                editorRef.current.setValue(value);
            }
        }
    }, [value]);

    return (
        <div id="editor" />
    );
}
