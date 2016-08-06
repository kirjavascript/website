import styles from './styles.scss';

class Menu extends React.Component {

    constructor (props) {
        super(props);

        this.nextSprite = () => {
            if (this.props.currentTile < this.props.mappings.length-1) {
                let state = this.context.getRootState();
                state.currentTile++;
                this.context.setRootState(state);
            }
        }

    }

    render () {
        return <div className={styles.menu}>
        <h1>transpiling pastebin</h1>
        browse pastes<br />
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