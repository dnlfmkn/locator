import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../helpers/ThemeContext';
import { Toggle } from './toggle';

/**
 * Navigation Bar for the app. Contains quick links to Home and Bookmarks
 * As well as a toggle for dark mode
 * @param {*} props 
 */
export default function NavBar(props) {
  const themeState = useTheme();
  const tabs = [
    { id: 0, title: 'Home', path: '/' },
    { id: 1, title: 'Bookmarks', path: '/bookmarks' }
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
          to={index === 0 ? "/" : "/bookmarks"}
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