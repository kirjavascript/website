import styles from './styles.scss';

class Window extends React.Component {

    constructor (props) {
        super(props);

        // on error, move cursor (!)

    }

    render () {
        return do { if (this.props.error) {

            <div className={styles.error}>

                <pre>
                    {this.props.error}
                </pre>

                <button 
                    onClick={this.props.close}
                    className={styles.close}>
                    Close
                </button>

            </div>

        } else null }
    }
}

export default Window;