import React from 'react';
import '../styles/style.css'

/**
 * Component representing an activity. Very basic/no frills
 */
export default function Activity(props) {
    const handleClick = () => {
      props.handleClick(this.props.title);
    }

    return(
      <button className="pill" onClick={() => handleClick()}>
        {this.props.title}
      </button>
    );
}