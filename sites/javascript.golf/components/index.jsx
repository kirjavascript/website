import { Router, Route, Link, browserHistory } from 'react-router';
import {render} from 'react-dom';
import styles from './root.scss';

import Editor from './Editor/index.jsx';
import Menu from './Menu/index.jsx';

import { saveAjax, loadAjax } from './util/ajax.js';

class App extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            code: '',
            colourscheme: 'monokai',
            snippetHash: null
        }

        this.saveSnippet = (value) => {
            let hash = saveAjax(value);

            this.setState({
                code: value,
                snippetHash: hash
            });
            browserHistory.push(`/${hash}`);

            document.title = 'golfbin';

        }

        this.loadSnippet = (hash) => {

            loadAjax(hash, (obj) => {

                this.setState({
                    code: obj.code,
                    snippetHash: hash
                });

            })

        }

        this.resetApp = () => {
            this.setState({
                code: '',
                snippetHash: null
            });
            browserHistory.push(`/`);
        }

        this.onChange = (value) => {
            if (value != this.state.code) {
                document.title = 'golfbin (unsaved)';
            }
            else {
                document.title = 'golfbin';
            }
        }

    }

    componentWillMount() {
        // check we aren't at root
        if (this.props.params.splat) {

            let currentHash = this.props.params.splat.join('-');

            this.loadSnippet(currentHash);

        }
    }

    render () {
        return <div>

            <Editor 
                onChange={this.onChange}
                onSave={this.saveSnippet}
                data={this.state.code} />
            
            <Menu />

        </div>;
    }
}

render((
    <Router history={browserHistory}>
        <Route component={App} path="/">
            <Route path="/*-*-*-*"/>
        </Route>
    </Router>
), document.getElementById('app'));