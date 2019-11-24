import React, { useState, useEffect } from 'react';
import APIClient from '../api'

/**
 * Functional component rendering locations where an 
 * activity may be performed. 
 * @param {*} props 
 */
export default function ActivityPage(props) {
  const initialState = {
    locations: {},
  }

  const apiClient = new APIClient();
  const [locations, setLocations] = useState(initialState);
  
  /**
   * Alternative to @function componentDidMount
   * Fetches the locations from the API backend
   */
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