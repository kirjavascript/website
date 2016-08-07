import styles from './styles.scss';

class Window extends React.Component {

    constructor (props) {
        super(props);

    }

    render () {
        return <div>
            
            {do { if (this.props.loading)
                <div className={styles.loadingMessage}>
                    Loading {this.props.loading}.js...
                </div>
            }}
            
        </div>;
    }
}

export default Window;