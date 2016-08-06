import { Router, Route, Link, browserHistory } from 'react-router';
import {render} from 'react-dom';
import styles from './root.scss';

import Editor from './Editor/index.jsx';
import Menu from './Menu/index.jsx';

import { saveNew } from './util/file.js';

let App = props => {

    return <div>
        <Editor onSave={saveNew} />
        <Menu />
    </div>;

}

render((
    <Router history={browserHistory}>
        <Route component={App} path="/">
        </Route>
    </Router>
), document.getElementById('app'));


// add /edited to route

// tinyurl algorithm / dictionary

// ctrl + S saves & resaves (check if already exists)

// use javascripty words

// load routes from db (???)