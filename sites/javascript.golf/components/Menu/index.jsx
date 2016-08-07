import styles from './styles.scss';

import themeData from '../Editor/themeData';

import { uglify, crush, regpack, beautify, babel, lebab } from './transpilers';
import { getEditor, setEditor, updateEditor } from '../Editor/index.jsx';
import initialConfig from '../util/initialConfig';

// support error handling
// async loading msg?
// validate first?
// character/filesize count
// files too large

class Menu extends React.Component {

    constructor (props) {
        super(props);

        // state

        this.state = initialConfig();

        this.setTheme = (e) => {
            let obj = {theme: e.target.value};
            this.setState(obj);
            updateEditor(obj);
        };
        this.setIndent = (e) => {
            this.setState({indent: e.target.value});
        };
        this.setWrap = (e) => {
            let obj = {wrap: e.target.value == "true"};
            this.setState(obj);
            updateEditor(obj);
        }
        this.setBabel = (e) => {
            let babel = this.state.babel;
            babel[+e.target.value].enabled = e.target.checked;
            this.setState({babel});
        }
        this.setLebab = (e) => {
            let lebab = this.state.lebab;
            lebab[+e.target.value].enabled = e.target.checked;
            this.setState({lebab});
        }

        // transpilation

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

        this.jscrush = () => {
            this.props.setCode(crush(getEditor()));
        }

        this.beautify = () => {
            beautify(() => {

                let indent_size = this.state.indent;

                this.props.setCode(js_beautify(getEditor(), {indent_size}));

            })
        }

        this.babelTransform = () => {
            babel(() => {

                let presets = this.state.babel
                    .filter(obj => obj.enabled)
                    .map(obj => obj.preset);

                let output = Babel.transform(getEditor(),{ presets }).code;

                this.props.setCode(output);
            })
        }

        this.lebabTransform = () => {
            lebab(() => {

                let options = {};

                this.state.lebab.forEach(obj => {
                    if (obj.enabled) {
                        options[obj.option] = true;
                    }
                })

                var transformer = new Lebab.Transformer(options);

                let output = transformer.run(getEditor());

                this.props.setCode(output);

            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('config', JSON.stringify(nextState));
    }

    render () {
        let aceClass = `ace-${this.state.theme.replace(/_/g,'-')}`;
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
                Editor Settings
            </div>

            <select 
                className={aceSelectClass}
                style={{width:'100%'}}
                value={this.state.theme}
                onChange={this.setTheme}>
                {themeData.map((datum,i) => (
                    <option key={i} value={datum.value}>
                        {datum.name}
                    </option>
                ))}
            </select>

            <select 
                className={aceSelectClass}
                style={{width:'100%'}}
                onChange={this.setWrap}
                value={this.state.wrap}>
                <option value="true">Word Wrap On</option>
                <option value="false">Word Wrap Off</option>
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
                onChange={this.setIndent}
                value={this.state.indent}>
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
                Crushers
            </div>

            <button 
                className={aceSelectClass}
                onClick={this.jscrush}>
                JSCrush
            </button>

            <div className={headerClass}>
                Babel
            </div>
            
            <div className={styles.boxList}>
                {this.state.babel.map((obj,i) => (
                    <div key={i}>
                        <input 
                            type="checkbox"
                            value={i}
                            onChange={this.setBabel}
                            checked={obj.enabled}/> {obj.preset}
                    </div>
                ))}
            </div>
            
            <button 
                className={aceSelectClass}
                onClick={this.babelTransform}>
                Transform
            </button>

            <div className={headerClass}>
                Lebab
            </div>

            <div className={styles.boxList}>
                {this.state.lebab.map((obj,i) => (
                    <div key={i}>
                        <input 
                            type="checkbox"
                            value={i}
                            onChange={this.setLebab}
                            checked={obj.enabled}/> {obj.option}
                    </div>
                ))}
            </div>

            <button 
                className={aceSelectClass}
                onClick={this.lebabTransform}>
                Transform
            </button>



        {/*

crushers: regpack, jscrush

deobfuscate
packer
jsmin
jscompressor

lint
fix semicolons, etc
validate

save indent in state
public/private
browse pastes
.golf logo at bottom.

        */}




        </div>;
    }
}

export default Menu;