import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import Home from './pages/Home';
import ActivityPage from './pages/ActivityPage';
import Bookmarks from './pages/Bookmarks';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ThemeProvider } from './helpers/ThemeContext';
import NavBar from './components/navbar';
import styled from '@emotion/styled';
import PERMISSIONS from './helpers/constants';
import { AuthProvider } from './helpers/AuthContext';


const Wrapper = styled("div")`
  transition: background 0.4s ease;
  background: ${props => props.theme.background};
  width: 100vw;
  height: 100vh;
  overflow: auto;
  & form {
    color: ${props => props.theme.body}
  }
  & nav {
    color: ${props => props.theme.body};
  }
`;

navigator.permissions.query({
  name: 'geolocation'
}).then((permission) => {
  permission.onchange = () => {
    localStorage.setItem(PERMISSIONS.geolocation, 
      permission.state === 'granted');
  }
})

const history = createBrowserHistory();
ReactDOM.render(
  <ThemeProvider>
    <Router history={history}>
      <Wrapper>
      <NavBar history={history} appName={"🧭"} />
      <hr className="divider"/>
      <Switch>
        <AuthProvider>
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/activity/:activity' component={ActivityPage} />
          <Route path='/bookmarks' component={Bookmarks} />
        </AuthProvider>
      </Switch>
      </Wrapper>
    </Router>
  </ThemeProvider>, document.getElementById('root'));
