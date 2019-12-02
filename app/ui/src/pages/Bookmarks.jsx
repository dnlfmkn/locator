import React, { useState, useEffect } from 'react';
import APIClient from '../api';
import { useAuth } from '../helpers/AuthContext';
import { withRouter } from 'react-router-dom';
import { isEmpty } from '../helpers/utils';
import { Toast } from 'react-bootstrap';

/**
 * Bookmarks page for app
 * @param {*} props 
 */
function Bookmarks(props) {
  const auth = useAuth()
  const apiClient = new APIClient();
  const [bookmarks, setBookmarks] = useState([]);
  const [showToast, setShowToast] = useState(true)

  useEffect(() => {
    const fetchBookmarks = async() => {
      await apiClient.getBookmarks()
        .then((bookmarks) => {
          console.log(bookmarks)
          setBookmarks(bookmarks)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    if (auth.authState.auth) {
      fetchBookmarks()
    } else {
      const location = {
        pathname: '/login',
        state: { from: '/bookmarks'}
      }
      props.history.push(location)
    }
  }, [auth.authState.auth])

  const toggleShowToast = () => setShowToast(!showToast)

  return isEmpty(bookmarks)
   ? 
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
   : <div>

  </div>;
}

export default withRouter(Bookmarks)