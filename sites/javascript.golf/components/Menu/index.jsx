// 1) fix state
// 2) move transpiler code


import styles from './styles.scss';

import themeData from '../Editor/themeData';

import { uglify, crush, beautify, babel, lebab } from './transpilers';
import { getEditor, setEditor } from '../Editor/index.jsx';

class Menu extends React.Component {

    constructor (props) {
        super(props);

        // support error handling
        // async loading msg?
        // validate first?

        this.minify = () => {

            uglify(UglifyJS => {

                let ast = UglifyJS.parse(getEditor());
                ast.figure_out_scope();
                let compressor = UglifyJS.Compressor();
                ast = ast.transform(compressor);
                let output = ast.print_to_string();

                this.props.setCode(output);
            });
            
        }

        this.mangle = () => {

            uglify(UglifyJS => {

                let ast = UglifyJS.parse(getEditor());
                ast.figure_out_scope();
                ast.compute_char_frequency();
                ast.mangle_names();
                let output = ast.print_to_string();

                this.props.setCode(output);
            });

        }

        this.crush = () => {
            this.props.setCode(crush(getEditor()));
        }

        this.beautify = () => {
            beautify(() => {

                let indent_size = this.props.state.indent;

                this.props.setCode(js_beautify(getEditor(), {indent_size}));

            })
        }

        this.babel = () => {
            babel(() => {
                let output = Babel.transform(getEditor(),
                    { presets: ['es2015'] }).code;

                this.props.setCode(output);
            })
        }
    }

    render () {
        let aceClass = `ace-${this.props.state.theme.replace(/_/g,'-')}`;
        let aceSelectClass = `${aceClass} ace_selection`;
        let rootClass = [styles.menu,aceClass].join(' ');
        let headerClass = `${aceClass} ace_keyword ${styles.header}`;

        return <div className={rootClass}>

            <div className={headerClass}>
                Keyboard Shortcuts
            </div>

            <div>New: Ctrl + N</div>
            <div>Save: Ctrl + S</div>

            <div className={headerClass}>
                Settings
            </div>

            <select 
                className={aceSelectClass}
                value={this.props.state.theme}
                onChange={this.props.setTheme}>
                {themeData.map((datum,i) => (
                    <option key={i} value={datum.value}>
                        {datum.name}
                    </option>
                ))}
            </select>

            <div className={headerClass}>
                js-beautify
            </div>

            <button 
                className={aceSelectClass}
                onClick={this.beautify}>
                Beautify
            </button>

            <select 
                className={aceSelectClass}
                onChange={this.props.setIndent}
                value={this.props.state.indent}>
                <option value="4">4 Spaces</option>
                <option value="2">2 Spaces</option>
            </select>

            <div className={headerClass}>
                UglifyJS
            </div>

            <button 
                className={aceSelectClass}
                onClick={this.minify}>
                Minify
            </button>

            <button 
                className={aceSelectClass}
                onClick={this.mangle}>
                Mangle
            </button>

            <div className={headerClass}>
                JSCrush
            </div>

            <button 
                className={aceSelectClass}
                onClick={this.crush}>
                Crush
            </button>

            <div className={headerClass}>
                Babel
            </div>
            <div><input type="checkbox"/> es2015</div>
            <div><input type="checkbox"/> react</div>
            <div><input type="checkbox"/> stage-0</div>
            <div><input type="checkbox"/> stage-1</div>
            <div><input type="checkbox"/> stage-2</div>
            <div><input type="checkbox"/> stage-3</div>   
            
            <button 
                className={aceSelectClass}
                onClick={this.babel}>
                Transform
            </button>

            <div className={headerClass}>
                Lebab
            </div>

            <button 
                className={aceSelectClass}
                onClick={this.es2015}>
                es2015
            </button>



        {/*

have babel/lebab in columns
the rest of babel
https://github.com/mohebifar/lebab
deobfuscate
packer
jsmin
jscompressor
regpack
lint
fix semicolons, etc
validate

save indent in state
Word Wrap
public/private
browse pastes
.golf logo at bottom.

        */}




        </div>;
    }
}

export default Menu;