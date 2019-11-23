import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import Home from './jsx/home';
import Activity from './jsx/activity';

const history = createBrowserHistory();
ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/:activity' component={Activity}/>
        </Switch>
    </Router>, document.getElementById('root'));
