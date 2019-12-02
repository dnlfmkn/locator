import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../helpers/ThemeContext';
import { Toggle } from './toggle';
import { useAuth } from '../helpers/AuthContext';
import styled from '@emotion/styled';

/**
 * Navigation Bar for the app. Contains quick links to Home and Bookmarks
 * As well as a toggle for dark mode
 * @param {*} props 
 */
export default function NavBar(props) {
  const themeState = useTheme();
  const {
    authState,
    _signin,
    _signup,
    signout
  } = useAuth();
  const tabs = [
    { id: 0, title: 'Home', path: '/' },
    { id: 1, title: 'Bookmarks', path: '/bookmarks' },
  ]

  const [, setCurrentIndex] = useState(0);

  const Button = styled("a")`
    background: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.body};
    color: ${props => props.theme.body};
    border-radius: 10px;
    padding: 4px 10px 5px 10px;
    cursor: pointer;
  `
  const Container = styled("div")`
    display: flex;
    flex-direction: row;
    align-items: center;"
  `
  //console.log(authState.auth)
  return <nav className="navbar">
    <Link
      to="/"
      className="banner"
      replace={props.history.location.pathname === '/'}>
      {props.appName}
    </Link>
    <div className="tabs">
      {tabs.map((tab, index) => {
        return <Link
          to={tabs[index].path}
          replace={tab.path === props.history.location.pathname}
          key={tab.id}
          className={"tab" +
           (tab.path === props.history.location.pathname ?
             " active" :
              "")}
          onClick={() => setCurrentIndex(index)}>
          {tab.title}
        </Link>
      })}
    </div>
    <Container>
      <Toggle
      id="toggle"
      isDark={themeState.dark}
      onChange={() => themeState.toggle()} />
      {console.log(authState.auth)}
      {authState.auth ? (
          <Button onClick={() => signout()}>Sign out</Button>
        ) : (
          <Link to="/login">Log In</Link>
      )}
    </Container>
  </nav>;
}