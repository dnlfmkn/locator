import React, { Component } from 'react';
import Activity from './activity';

const activities = [
    'Golf',
    'Parks',
    'Karaoke',
    'Sports',
];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { activities: this.props.activities }
    }

    handleClick = (activity) => {
        console.log(activity);
    }

    renderActivities = (activities) => {
        if (!activities) { return [] }
        else {
            return activities.map((activity) => {
                return <Activity title={activity} onClick={this.handleClick} />
            })
        }
    }

    render() {
        return (
            <div>{/*TODO*/}</div>
        );
    }
}

export default Home;