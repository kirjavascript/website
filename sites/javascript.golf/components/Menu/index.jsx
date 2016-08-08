import styles from './styles.scss';

import themeData from '../Editor/themeData';

import { jscrush, beautify, minify, mangle, babelTransform, lebabTransform } from '../util/transpilers';
import { updateEditor } from '../Editor/index.jsx';
import initialConfig from '../util/initialConfig';

// support error handling
// async loading msg?
// validate first?
// character/filesize count + gzip
// files too large
// run in new window?

class Menu extends React.Component {

    constructor (props) {
        super(props);

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

        this.beautify = () => beautify(this.state, this.props.onError);
        this.minify = () => minify(this.state, this.props.onError);
        this.jscrush = () => jscrush(this.state, this.props.onError);
        this.mangle = () => mangle(this.state, this.props.onError);
        this.babelTransform = () => babelTransform(this.state, this.props.onError);
        this.lebabTransform = () => lebabTransform(this.state, this.props.onError);
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

            <div>New: Ctrl + Enter</div>
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

crushers: regpack

deobfuscate
packer
jsmin
jscompressor

typescript
coffeescript

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