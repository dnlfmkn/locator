import React, { useState, useEffect } from 'react';
import APIClient from '../api'

export default function ActivityPage(props) {
  const initialState = {
    locations: {},
  }

  const apiClient = new APIClient();
  const [locations, setLocations] = useState(initialState);
  
  useEffect(() => {
    const fetchLocations = async () => {
      console.log(props.match.params.activity)
      const locations = await apiClient.getLocations(props.match.params.activity)
      setLocations(locations)
    }
    fetchLocations()
  }, []);

  return <div></div>;
}