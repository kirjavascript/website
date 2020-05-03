import $script from 'scriptjs';

import crush from 'jscrush';

import { getEditor, setEditor } from '../Editor/index.jsx';

function scriptLoader(name) {

    let loaded = false;

    return (callback) => {
        if (loaded) {
            callback();
        }
        else {
            // ugh
            let msg = document.createElement('div');
            msg.className = 'loadingMessage';
            msg.innerHTML = `Loading ${name}.js...`;
            document.body.appendChild(msg);

            $script(`/scripts/${name}.js`, () => {

                document.body.removeChild(msg);
                callback();
                loaded = true;

            });
        }
    }

}

// loaders

let uglify = scriptLoader('uglify');
let beautify = scriptLoader('beautify');
let babel = scriptLoader('babel');
let lebab = scriptLoader('lebab');

// transpilation

function jscrush(state, catchError) {

    try {
        setEditor(crush(getEditor()));
    } catch (e) { catchError(e); }
    
}

function beautifyFunc(state, catchError) {

    beautify(() => {

        try {

            let indent_size = state.indent;

            setEditor(js_beautify(getEditor(), {indent_size}));

        } catch (e) { catchError(e); }

    })

}

function minify(state, catchError) {

    uglify(() => {

        try {

            let ast = UglifyJS.parse(getEditor());
            ast.figure_out_scope();
            let compressor = UglifyJS.Compressor();
            ast = ast.transform(compressor);
            let output = ast.print_to_string();

            setEditor(output);

        } catch (e) { catchError(e); }
    });

}

function mangle(state, catchError) {

    uglify(() => {

        try {

            let ast = UglifyJS.parse(getEditor());
            ast.figure_out_scope();
            ast.compute_char_frequency();
            ast.mangle_names();
            let output = ast.print_to_string();

            setEditor(output);

        } catch (e) { catchError(e); }
    });

}

function babelTransform(state, catchError) {

    babel(() => {

        let presets = state.babel
            .filter(obj => obj.enabled)
            .map(obj => obj.preset);

        let output;

        try {

            output = Babel.transform(getEditor(),{ presets }).code;

            setEditor(output);

        } catch (e) { catchError(e); }
        
    })

}
function lebabTransform(state, catchError) {

    lebab(() => {

        let options = {};

        state.lebab.forEach(obj => {
            if (obj.enabled) {
                options[obj.option] = true;
            }
        })

        var transformer = new Lebab.Transformer(options);

        let output;

        try {

            output = transformer.run(getEditor());

            setEditor(output);

        } catch (e) { catchError(e); }

    });

}

export {
    beautifyFunc as beautify,
    jscrush,
    minify,
    mangle,
    babelTransform,
    lebabTransform
}