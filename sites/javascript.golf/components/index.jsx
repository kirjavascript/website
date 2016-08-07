import { Router, Route, Link, browserHistory } from 'react-router';
import {render} from 'react-dom';
import styles from './root.scss';

import Editor from './Editor/index.jsx';
import Menu from './Menu/index.jsx';

import { saveAjax, loadAjax } from './util/ajax.js';

function initialState() {
    let partialState;

    // grab code from the document if included

    if (typeof __code != 'undefined') {

        partialState = {
            code: __code,
            snippetHash: __snippetHash
        }
    }
    else {
        partialState = {
            code: '',
            snippetHash: null
        }
    }

    return Object.assign({

        colourscheme: 'monokai',

    }, partialState);
}

class App extends React.Component {

    constructor (props) {
        super(props);

        this.state = initialState();

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