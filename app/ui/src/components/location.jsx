import React, { useState, useEffect, useRef } from 'react';
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
  const [isBookmarked, setIsBookmarked] = useState(props.isBookmarked);
  const initialMount = useRef(true);

  const apiClient = new APIClient();
  const locationId = props.locationId;
  const activity = props.activity;

  useEffect(() => {
    const bookmark = async () => {
        var result;
        // prevent hook from running on initial load
        if (initialMount.current) {
          initialMount.current = false;
          return;
        }
        if (!isBookmarked) {
          result = await apiClient.addBookmark(activity, locationId);
        } else {
          result = await apiClient.deleteBookmark(activity, locationId);
        }
        setIsBookmarked(result);
      }
      bookmark();
  }, [isBookmarked]);

  return <article className="card">
    <img src={props.imageUrl} alt=""/>
    <div className="info">
      <h2 className="title">{props.title}</h2>
      <p className="distance">{props.distance}</p>
    </div>
    <button className="bookmark" onClick={() => setIsBookmarked(!isBookmarked)}>
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  </article>;
}