import React, { useState, useEffect, useRef } from 'react';
import CM from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/keymap/vim';

export default function Editor({ value, onChange }) {
    const valueRef = useRef();
    const editorRef = useRef();
    useEffect(() => {

        const editor = CM(document.getElementById('editor'), {
            value: value,
            mode:  'javascript',
            theme: 'monokai',
            autofocus: true,
            // keyMap: 'vim',
        });

        editor.on('changes', () => {
            const code = editor.getValue();
            onChange(code);
            valueRef.current = code;
        });

        valueRef.current = value;
        editorRef.current = editor;

    }, []);

    useEffect(() => {
        if (valueRef.current !== value) {
            editorRef.current.setValue(value);
        }
    }, [value]);

    return (
        <div id="editor" />
    );
}
