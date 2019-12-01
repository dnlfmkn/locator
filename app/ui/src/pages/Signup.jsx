import React, { useState, useEffect, useRef } from 'react';
import Input from '../components/input';
import { useForm } from '../helpers/hooks';
import { Link } from 'react-router-dom';
import validate from '../helpers/validate';
import APIClient from '../api';

export default function Signup(props) {
  const [valid, setIsValid] = useState(false);
  const apiClient = new APIClient();
  const { 
    handleChange,
    values,
    errors
  } = useForm(validate);
  const initialMount = useRef(true);

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

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }

  const hasValidMembers = (obj) => {
    for (var key in obj) {
      if (obj[key] === "") {
        return false
      }
    }
    return true
  }

  const signup = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    for (var [key, value] of data.entries()) { 
      console.log(key, value);
    }
    //signup here
  }

  return <form onSubmit={signup}>
    <h3>Sign Up</h3>
    <Input
      type="text"
      label="Username"
      id="username"
      onChange={handleChange}
      value={values.username || ''}
      message={errors.username}/>
    <Input
      type="email"
      label="Email"
      id="email"
      onChange={handleChange}
      value={values.email || ''}
      message={errors.email}/>
    <Input
      type="password"
      label="Password"
      id="password"
      onChange={handleChange}
      value={values.password || ''}
      message={errors.password}/>
    <button
     type="submit"
     className="btn btn-primary btn-block"
     disabled={!valid}>
      Sign Up
    </button>
    <p className="forgot-password text-right">
      Have an account? <Link to='/login'>log in</Link>
    </p>
  </form>
}