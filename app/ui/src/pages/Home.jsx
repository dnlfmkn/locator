import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Activity from '../components/activity';
import APIClient from '../api';
import '../styles/style.css';

/**
 * Home page for the locator app.
 * Displays a list of activities that interested users may want 
 * to perform
 */
const UNSUPPORTED_BROWSER_ERROR_MSG = `Seems like your browser does
  not support geolocation which is required for this app.`

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
        this.getLocationSuccess, this.getLocationError
      );
    } else {
      alert(UNSUPPORTED_BROWSER_ERROR_MSG);
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
  
  getLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('User denied geolocation permission')
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('Cannot find current position')
        break;
      case error.TIMEOUT:
        console.log('The request to get user location timed out')
        break;
      case error.UNKNOWN_ERROR:
        console.log('An unknown error occured')
        break;
    }
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