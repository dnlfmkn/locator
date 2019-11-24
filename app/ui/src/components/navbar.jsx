import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
  const tabs = [
    {id: 0, title: 'Home'},
    {id: 1, title: 'Bookmarks'}
  ]
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const switchTabs = (index) => {
      if (currentIndex !== index) {
        setCurrentIndex(index);
      }
    }
    switchTabs()
  }, [currentIndex]);

  return <nav className="navbar">
    <Link to="/">{props.appName}</Link>
    <div className="tabs">
      {tabs.map((tab, index) => {
        const active = currentIndex === index;
        <Link
         to={currentIndex === 0 ? "/" : "/bookmarks"}
         key={tab.id}
         className={"tab" + (active ? " active" : "")}
         onClick={() => setCurrentIndex(index)}>
          {tab.title}
        </Link>
      })}
    </div>
    {/* Add dark mode toggle here 🌑 */}
  </nav>
}