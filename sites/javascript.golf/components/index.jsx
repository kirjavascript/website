import { Router, Route, Link, browserHistory } from 'react-router';
import {render} from 'react-dom';
import styles from './root.scss';

import Editor from './Editor/index.jsx';
import Menu from './Menu/index.jsx';

import { saveAjax } from './util/ajax.js';

// saveNew and route change are different functions

function saveNew(value) {

    saveAjax(value);
    

}

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
// show paste route is *-*-*-* wildcard