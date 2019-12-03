import React from 'react';

/**
 * Dark mode toggle component
 * @param {*} props 
 */
export function Toggle(props) {
  return <div className="toggle">
    <input
     type="checkbox"
     id="switch" 
     checked={props.isDark}
     onChange={props.onChange}/>
    <label htmlFor="switch">
      <span data='🌙'></span>
      <span data='☀️'></span>
    </label>
  </div>
}