import React, { useState, useEffect, useRef } from 'react';
import APIClient from '../api';
import { useAuth } from '../helpers/AuthContext';
import { withRouter } from 'react-router-dom';
import { isEmpty } from '../helpers/utils';
import { Toast } from 'react-bootstrap';
import MESSAGES from '../helpers/constants';
import Location from '../components/location';
import { getLocationError } from '../helpers/utils'

/**
 * Bookmarks page for app
 * @param {*} props 
 */
function Bookmarks(props) {
  const auth = useAuth()
  const apiClient = new APIClient();
  const initialMount = useRef(true);
  const _initialMount = useRef(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [showToast, setShowToast] = useState(true)
  const [location, setLocation] = useState({
    lat: 0.0,
    long: 0.0,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getLocationSuccess, getLocationError
      );
    } else {
      alert(MESSAGES.UNSUPPORTED_BROWSER_ERROR_MSG);
    }
  }, [])

  useEffect(() => {
    if (_initialMount.current) {
      _initialMount.current = false;
      return;
    }
    fetchBookmarks()
  }, [location])

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
    renderPage()
  }, [bookmarks, isLoading])

  useEffect(() => {
    if (auth.authState.auth === null) {
      const location = {
        pathname: '/login',
        state: { from: '/bookmarks'}
      }
      props.history.push(location)
    }
  }, [auth.authState.auth])

  const fetchBookmarks = async() => {
    try {
      setIsLoading(true)
      const bookmarks = await apiClient.getBookmarks()
      const refinedBookmarks = []
      bookmarks.forEach(async(bookmark) => {
        const bookmarkDetail = await apiClient
          .getBookmarkDetails(bookmark['location_id'], location)
        refinedBookmarks.push(bookmarkDetail)
        if (refinedBookmarks.length === bookmarks.length) {
          setBookmarks(refinedBookmarks)
        }
      })
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const getLocationSuccess = (result) => {
    setLocation({...location,
      lat: result.coords.latitude,
      long: result.coords.longitude
    })
  }

  const renderBookmarks = (locations) => {
    if (!locations) { return []; }
    return locations.map((location) => {
      return <Location
       key={location['location_id']}
       activity={props.match.params.activity}
       title={location['title']}
       imageUrl={location['img_url']}
       distance={location['distance']}
       locationId={location['location_id']}
       isBookmarked={location['bookmarked']}/>
    });
  }

  const renderPage = () => {
    return isEmpty(bookmarks) ?
    <div>
      <h1>You have no bookmarks</h1>
      <div>
      <Toast show={showToast}
        animation={true}
        onClose={toggleShowToast}
        delay={3000} autohide>
        <Toast.Header>
          <a className="rounded mr-2">🧭</a>
          <strong className="mr-auto">locator</strong>
        </Toast.Header>
        <Toast.Body>You have no bookmarks</Toast.Body>
      </Toast>
      </div>
    </div>
   : <div className="cards">{renderBookmarks(bookmarks)}</div>
  }

  const toggleShowToast = () => setShowToast(!showToast)

  return isLoading
   ? <div><span>Loading...</span></div>
   : (renderPage());
}

export default withRouter(Bookmarks)