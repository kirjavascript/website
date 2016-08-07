import styles from './root.scss';
import { Router, Route, Link, browserHistory } from 'react-router';
import {render} from 'react-dom';

import Editor from './Editor/index.jsx';
import Menu from './Menu/index.jsx';

import { saveAjax, loadAjax } from './util/ajax.js';

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

    // check localstorage

    let storedState = localStorage.getItem('state');

    if (storedState) {
        try {
            storedState = JSON.parse(storedState);
        }
        catch(e) { 
            localStorage.removeItem('state');
            console.error('Error: localStorage is corrupted')
        }
        delete storedState.code;
        delete storedState.snippetHash;

        return Object.assign(storedState, state);
    }
    else {

        // default state

        return Object.assign({

            theme: 'monokai',

        }, state);
    }
    
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

        this.setTheme = (e) => {
            this.setState({theme: e.target.value});
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

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('state', JSON.stringify(nextState));    
    }

    render () {
        return <div>

            <Editor 
                theme={this.state.theme}
                onChange={this.onChange}
                onCommand={this.handleCommands}
                data={this.state.code} />
            
            <Menu 
                setTheme={this.setTheme}
                theme={this.state.theme}/>

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