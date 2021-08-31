import { createContext } from "react";
import { useContext } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const UserContext = createContext(null);

// Create Usercontext

const UserProvider = ({ children }) => {
  // get cookie
  // decode cookie value
  const [ user, setUser ]= useState(jwtDecode || null)

  const logoutUser = () => {
    setUser(null);
    // delete cookie
  }

  return <UserContext.Provider value={{ user, logout: logoutUser }}>{children}</UserContext.Provider>;
}

const useLoggedInUser = () => {
  const { user } = useContext(UserContext);
  return user;
}

const SignOut = () => {
  const { logout } = useContext(UserContext);
  return <button onClick={logout}>Logout</button>;
}

export default UserContext
