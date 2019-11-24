import React, { useState, useEffect } from 'react';
import APIClient from '../api'
import Location from '../components/location';

/**
 * Functional component rendering locations where an 
 * activity may be performed. 
 * @param {*} props 
 */
export default function ActivityPage(props) {
  const apiClient = new APIClient();
  const [locations, setLocations] = useState([]);
  
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

  const renderLocations = (locations) => {
    if (!locations) { return []; }
    return locations.map((location) => {
      return <Location
       key={location.location_id}
       activity={props.match.params.activity}
       title={location.title}
       imageUrl={location.img_url}
       distance={location.distance}
       locationId={location.location_id}
       isBookmarked={location.bookmarked}/>
    });
  }

return <div class="cards">
  {renderLocations(locations)}
</div>;
}