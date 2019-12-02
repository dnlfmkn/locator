import React, { useRef, useState, useEffect } from 'react';
import { useForm } from '../helpers/hooks';
import { hasValidMembers, isEmpty } from '../helpers/utils';
import validate from '../helpers/validate';
import Input from '../components/input';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { useAuth } from '../helpers/AuthContext';

function Login(props) {
  const [valid, setIsValid] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const referrer = props.location.state || { from: '/bookmarks' }
  const {
    authState,
    signin,
    _signup,
    _signout,
  } = useAuth();
  const { 
    handleChange,
    values,
    errors
  } = useForm({
    email: '',
    password: ''
  }, validate);
  const initialMount = useRef(true);
  const _initMount = useRef(true);

  useEffect(() => {
    const enable = () => {
      if (initialMount.current) {
        initialMount.current = false;
        return;
      }
      setIsValid(isEmpty(errors) && hasValidMembers(values))
    }
    enable()
  }, [errors])

  useEffect(() => {
    if (_initMount.current) {
      _initMount.current = false;
      return;
    }
    setRedirect(true)
  }, [authState.auth])

  const login = async(event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const jsonData = {}
    data.forEach((key, value) => { jsonData[value] = key })
    signin(jsonData.email, jsonData.password)
      .catch((error) => {
         console.log(error.response)
      })
  }

  return (redirect ? <Redirect to="/bookmarks" /> :
  <div className="form-container">
    <form onSubmit={login}>
      <h3>Log In</h3>
      <Input type="email"
        label="Email"
        id="email"
        onChange={handleChange}
        value={values.email || ''}
        message={errors.email}/>
      <Input type="password"
        label="Password"
        id="password"
        onChange={handleChange}
        value={values.password || ''}
        message={errors.password}/>
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={!valid}>
        Log In
      </button>
      <p className="forgot-password text-right">
        Don't have an account? <Link to='/signup'>sign up</Link>
      </p>
    </form>
  </div>);
}

export default withRouter(Login)