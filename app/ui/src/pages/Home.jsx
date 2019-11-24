import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Activity from '../components/activity';
import APIClient from '../api';
import '../styles/style.css'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { activities: [] }
  }

  async componentDidMount() {
    this.apiClient = new APIClient();
    this.apiClient.getActivities().
      then((data) => {
        this.setState({ ...this.state, activities: data })
      });
  }

  handleClick = (activity) => {
    this.props.history.push(`/activity/${activity}`)
    //return <Link to={`/${activity}`}></Link>
  }

  renderActivities = (activities) => {
    if (!activities) { return [] }
    return activities.map((activity) => {
      return <Activity
       key={activity}
       title={activity} 
       handleClick={this.handleClick} />
    })
  }

  render() {
    return (
      <div>
        <header id="app-header">
          <span>locator</span>
        </header>
        <div id="pill-container">
          {this.renderActivities(this.state.activities)}
        </div>
      </div>
    );
  }
}

export default Home;