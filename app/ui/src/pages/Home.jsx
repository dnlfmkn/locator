import React, { Component } from 'react';
import Activity from '../components/activity';
import APIClient from '../api';
import '../styles/style.css'

/**
 * Home page for the locator app.
 * Displays a list of activities that interested users may want 
 * to perform
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { activities: [] }
  }

  async componentDidMount() {
    this.apiClient = new APIClient();
    this.apiClient.getActivities()
      .then((data) => {
        this.setState({ ...this.state, activities: data })
      });
  }

  /**
   * Links to activity page on clicking activity pill
   */
  handleClick = (activity) => {
    this.props.history.push(`/activity/${activity}`)
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
      <div>
        <div id="pill-container">
          {this.renderActivities(this.state.activities)}
        </div>
      </div>
    );
  }
}

export default Home;