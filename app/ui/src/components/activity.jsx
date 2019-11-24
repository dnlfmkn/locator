import React from 'react';
import '../styles/style.css'

/**
 * Component representing an activity. Very basic/no frills
 */
class Activity extends React.Component {
    constructor(props) {
      super(props);
    }

    handleClick = () => {
      this.props.handleClick(this.props.title);
    }

    render() {
      return(
       <button className="pill" onClick={() => this.handleClick()}>
         {this.props.title}
       </button>
      );
    }
}

export default Activity;