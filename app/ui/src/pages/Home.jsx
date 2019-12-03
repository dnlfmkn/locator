import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Activity from '../components/activity';
import APIClient from '../api';
import '../styles/style.css';
import MESSAGES from '../helpers/constants'
import { getLocationError } from '../helpers/utils' 

/**
 * Home page for the locator app.
 * Displays a list of activities that interested users may want 
 * to perform
 */


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activities: [],
      location: {
        lat: 0.0,
        long: 0.0,
      },
     }
  }

  async componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getLocationSuccess, getLocationError
      );
    } else {
      alert(MESSAGES.UNSUPPORTED_BROWSER_ERROR_MSG);
    }
    this.apiClient = new APIClient();
    this.apiClient.getActivities()
      .then((data) => {
        this.setState({ ...this.state, activities: data })
      });
  }

  getLocationSuccess = (location) => {
    this.setState((prevState) => ({
      location: {
        ...prevState.location,
        lat: location.coords.latitude,
        long: location.coords.longitude,
      }
    }))
  }
  
  /**
   * Links to activity page on clicking activity pill
   */
  handleClick = (activity) => {
    this.props.history.push(`/activity/${activity}`, {
      location: this.state.location
    })
  }

  /**
   * Converts activity objects from API into Activity components
   */
  renderActivities = (activities) => {
    if (!activities) { return [] }
    return activities.map((activity) => {
      return <Activity
       key={activity} //this key will be the concise name 
       title={activity} //the title will be the canonical name
       handleClick={this.handleClick} />
    })
  }

  render() {
    return (
        <div id="pill-container">
          {this.renderActivities(this.state.activities)}
        </div>
    );
  }
}

export default withRouter(Home);