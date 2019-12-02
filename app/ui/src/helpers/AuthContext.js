import React, { useEffect, useState, createContext, useContext } from 'react';
import APIClient from '../api';

const apiClient = new APIClient()

const AuthContext = createContext()
const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    console.log("Use within a context")
  }
  return context
}

const useEffectAuth = () => {
  const [authState, setAuthState] = useState({
    auth: null,
    hasAuthMounted: false
  });
  useEffect(() => {
    const lsAuthState = localStorage.getItem("authState")
    setAuthState({...authState, auth: lsAuthState, hasAuthMounted: true})
  }, [])

  const signin = async(email, password) => {
    return await apiClient
      .signin(email, password)
      .then((response) => {
        localStorage.setItem("authState", JSON.stringify(response))
        setAuthState({...authState, auth: response})
        return authState
      })
      .catch((err) => {
        throw err
      })
  }

  const signup = async(params) => {
    return await apiClient
      .signup(params)
      .then((response) => {
        localStorage.setItem("authState", JSON.stringify(response))
        setAuthState({...authState, auth: response})
        return authState
      })
  }

  const signout = async() => {
    return await apiClient
      .signout()
      .then((response) => {
        localStorage.removeItem("authState")
        setAuthState({...authState, auth: null})
      })
  }
  return {
    authState,
    signin,
    signup,
    signout,
  }
}

const AuthProvider = ({children}) => {
  const auth = useEffectAuth();
  if (!auth.authState.hasAuthMounted) {
    return <div />
  }

  return (
   <AuthContext.Provider value={auth}>
    {children}
  </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth }