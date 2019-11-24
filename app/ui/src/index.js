import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import Home from './pages/Home';
import ActivityPage from './pages/ActivityPage';

const history = createBrowserHistory();
ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/activity/:activity' component={ActivityPage}/>
        </Switch>
    </Router>, document.getElementById('root'));
