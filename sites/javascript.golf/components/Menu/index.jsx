import styles from './styles.scss';

import themeData from '../Editor/themeData';

class Menu extends React.Component {

    constructor (props) {
        super(props);

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
                Transpilers
            </div>

            transpiling pastebin
            browse pastes
            public/private
            jsCRUSH

            format
            tabs (detect, then give option)
            minify<br />
            transpile<br />
            dupe + edit<br/>
            revert unsaved changes
            wrap on/off
            lint / validate
            url

            

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