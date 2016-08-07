import styles from './styles.scss';

import themeData from '../Editor/themeData';

import { uglify, crush, beautify } from './transpilers';
import { getEditor, setEditor } from '../Editor/index.jsx';

class Menu extends React.Component {

    constructor (props) {
        super(props);

        // support error handling
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

                let indent_size = this.refs.indent.value;

                this.props.setCode(js_beautify(getEditor(), {indent_size}));

            })
        }
    }

    render () {
        let aceClass = `ace-${this.props.theme.replace(/_/g,'-')}`;
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
                js-beautify
            </div>

            <button 
                className={aceSelectClass}
                onClick={this.beautify}>
                Beautify
            </button>

            <select 
                className={aceSelectClass}
                ref="indent">
                <option value="4">4 Spaces</option>
                <option value="2">2 Spaces</option>
            </select>

        {/*

babel
lebab
deobfuscate
jscompressor
regpack
lint
validate            

Word Wrap
public/private
browse pastes
.golf logo at bottom.

        */}


            <div className={headerClass}>
                Settings
            </div>

            <select 
                className={aceSelectClass}
                value={this.props.theme}
                onChange={this.props.setTheme}>
                {themeData.map((datum,i) => (
                    <option key={i} value={datum.value}>
                        {datum.name}
                    </option>
                ))}
            </select>

        </div>;
    }
}

export default Menu;