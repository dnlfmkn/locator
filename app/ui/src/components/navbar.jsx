import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../helpers/ThemeContext';
import { Toggle } from './toggle';
import { useAuth } from '../helpers/AuthContext';

/**
 * Navigation Bar for the app. Contains quick links to Home and Bookmarks
 * As well as a toggle for dark mode
 * @param {*} props 
 */
export default function NavBar(props) {
  const themeState = useTheme();
  const authState = useAuth();
  const tabs = [
    { id: 0, title: 'Home', path: '/' },
    { id: 1, title: 'Bookmarks', path: '/bookmarks' },
    { id: 2, title: 'Login', path: '/login' },
    { id: 3, title: 'Signup', path: '/signup' }
  ]

  const [, setCurrentIndex] = useState(0);

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
    <Toggle
     id="toggle"
     isDark={themeState.dark}
     onChange={() => themeState.toggle()} />
  </nav>;
}