import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../helpers/ThemeContext';

export default function NavBar(props) {
  const themeState = useTheme();
  const tabs = [
    {id: 0, title: 'Home'},
    {id: 1, title: 'Bookmarks'}
  ]
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateTab = (index) => {
      setCurrentIndex(index)
    }
    updateTab(currentIndex)
  }, [currentIndex])

  return <nav className="navbar">
    <Link to="/">{props.appName}</Link>
    <div className="tabs">
      {tabs.map((tab, index) => {
        return <Link
         to={index === 0 ? "/" : "/bookmarks"}
         key={tab.id}
         className={"tab" + (currentIndex === index ? " active" : "")}
         onClick={() => setCurrentIndex(index)}>
          {tab.title}
        </Link>
      })}
    </div>
    <button onClick={() => themeState.toggle()}>
      {themeState.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  </nav>;
}