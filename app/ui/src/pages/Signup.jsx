import React, { useState, useEffect, useRef } from 'react';
import Input from '../components/input';
import { useForm } from '../helpers/hooks';
import { Link } from 'react-router-dom';
import validate from '../helpers/validate';
import { isEmpty, hasValidMembers } from '../helpers/utils';
import { useAuth } from '../helpers/AuthContext';

export default function Signup(props) {
  const [valid, setIsValid] = useState(false);
  const auth = useAuth();
  const { 
    handleChange,
    values,
    errors
  } = useForm({
    username: '',
    email: '',
    password: ''
  }, validate);
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

  const signup = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const _jsonData = {}
    data.forEach((key, value) => { _jsonData[value] = key })
    auth.signup(_jsonData)
  }

  return <div className="form-container">
      <form onSubmit={signup}>
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
  </div>
}