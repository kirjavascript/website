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
            $script(`/scripts/${name}.js`, () => {
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

function jscrush() {
    setEditor(crush(getEditor()));
}

function beautifyFunc(state) {

    beautify(() => {

        let indent_size = state.indent;

        setEditor(js_beautify(getEditor(), {indent_size}));

    })

}

function minify() {

    uglify(() => {

        let ast = UglifyJS.parse(getEditor());
        ast.figure_out_scope();
        let compressor = UglifyJS.Compressor();
        ast = ast.transform(compressor);
        let output = ast.print_to_string();

        setEditor(output);
    });

}

function mangle() {

    uglify(UglifyJS => {

        let ast = UglifyJS.parse(getEditor());
        ast.figure_out_scope();
        ast.compute_char_frequency();
        ast.mangle_names();
        let output = ast.print_to_string();

        setEditor(output);
    });

}

function babelTransform(state) {

    babel(() => {

        let presets = state.babel
            .filter(obj => obj.enabled)
            .map(obj => obj.preset);

        let output = Babel.transform(getEditor(),{ presets }).code;

        setEditor(output);
    })

}
function lebabTransform(state) {

    lebab(() => {

        let options = {};

        state.lebab.forEach(obj => {
            if (obj.enabled) {
                options[obj.option] = true;
            }
        })

        var transformer = new Lebab.Transformer(options);

        let output = transformer.run(getEditor());

        setEditor(output);

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