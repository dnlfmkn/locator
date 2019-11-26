import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import Home from './pages/Home';
import ActivityPage from './pages/ActivityPage';
import Bookmarks from './pages/Bookmarks';
import { ThemeProvider } from './helpers/ThemeContext';
import NavBar from './components/navbar';
import styled from '@emotion/styled';

const Wrapper = styled("div")`
  transition: background 0.4s ease;
  background: ${props => props.theme.background};
  width: 100vw;
  height: 100vh;
  & nav {
    color: ${props => props.theme.body};
  }
`;

const history = createBrowserHistory();
ReactDOM.render(
  <ThemeProvider>
    <Router history={history}>
      <Wrapper>
      <NavBar history={history} appName={"🧭"} />
      <hr className="divider"/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/activity/:activity' component={ActivityPage} />
        <Route path='/bookmarks' component={Bookmarks} />
      </Switch>
      </Wrapper>
    </Router>
  </ThemeProvider>, document.getElementById('root'));
