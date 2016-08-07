import styles from './styles.scss';

class Menu extends React.Component {

    constructor (props) {
        super(props);

    }

    render () {
        return <div className={styles.menu}>
        <h1>transpiling pastebin</h1>
        browse pastes<br />
        new<br />
        public/private<br />
        save<br />
        format<br />
        minify<br />
        transpile<br />
        dupe + edit<br/>
        wrap on/off
        lint / validate
        settings        colourscheme (localstorage)<br/>
        </div>;
    }
}

export default Menu;