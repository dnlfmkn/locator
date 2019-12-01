import React, { useEffect, useState, createContext, useContext } from 'react';
import APIClient from '../api';

const defaultContext = {
  auth: null,
}

const apiClient = new APIClient()

const AuthContext = createContext(defaultContext)
const useAuth = () => useContext(AuthContext)

const useEffectAuth = () => {
  const [authState, setAuthState] = useState(null)
  useEffect(() => {
    const lsAuthState = localStorage.getItem("authState")
    setAuthState({...authState, auth: lsAuthState})
  }, [])

  const signin = async(email, password) => {
    return await apiClient
      .signin(email, password)
      .then((response) => {
        localStorage.setItem("authState", JSON.stringify(response))
        setAuthState({...authState, auth: response})
      })
  }

  const signup = async(params) => {
    return await apiClient
      .signup(params)
      .then((response) => {
        localStorage.setItem("authState", JSON.stringify(response))
        setAuthState({...authState, auth: response})
      })
  }

  const signout = async() => {
    return await apiClient
      .signout()
      .then((response) => {
        if (response.success) setAuthState({...authState, auth: null})
      })
  }
  return {
    authState,
    signin,
    signup,
    signout
  }
}

const AuthProvider = ({children}) => {
  const auth = useEffectAuth();
  return (
   <AuthContext.Provider value={auth}>
    {children}
  </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth }