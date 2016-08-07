import styles from './root.scss';
import { Router, Route, Link, browserHistory } from 'react-router';
import {render} from 'react-dom';

import Editor from './Editor/index.jsx';
import Menu from './Menu/index.jsx';

import { saveAjax, loadAjax } from './util/ajax.js';
import { getEditor, setEditor } from './Editor/index.jsx';

function initialState() {
    let state;

    // grab code from the document if included

    if (typeof __code != 'undefined') {

        state = {
            code: __code,
            snippetHash: location.pathname.slice(1)
        }
    }
    else {
        state = {
            code: '',
            snippetHash: null
        }
    }

    return state;
    
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

        this.setCode = (code) => {
            setEditor(code);
            //this.setState({code});
        }

        this.handleCommands = (command, value) => {
            if (command == 'save') {
                this.saveSnippet(value);
            }
            else if (command == 'new') {
                this.resetApp();
            }
        }

    }

    render () {
        return <div>

            <Editor 
                onChange={this.onChange}
                onCommand={this.handleCommands}
                data={this.state.code} />
            
            <Menu 
                setCode={this.setCode}
                state={this.state} />

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