import React, { useState, useEffect } from 'react';
import APIClient from '../api';

/**
 * Functional component representing a location where
 *  an {@link activity} may be found.
 * UI is in a card form with an image of the location on top,
 * weather and distance information attached as well as an option
 * to bookmark the location 
 * @param {*} props 
 */
export default function Location(props) {
  const apiClient = new APIClient();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const locationId = props.locationId;
  const activity = props.activity;

  useEffect(() => {
    const updateBookmarks = async () => {
      const result;
      if (isBookmarked) {
        result = await apiClient.addBookmark(activity, locationId);
      } else {
        result = await apiClient.deleteBookmark(activity, locationId);
      }
      setIsBookmarked(result);
    }
    updateBookmarks();
  }, [isBookmarked]);

  return <article>

  </article>;
}