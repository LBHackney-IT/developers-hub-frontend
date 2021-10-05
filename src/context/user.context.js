import { createContext, useContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const UserContext = createContext(null);

// Create Usercontext

const parseToken = () => {
    const token = Cookies.get('hackneyToken') || null;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch(e) {
      return null;
    }
}

export const UserProvider = ({ children }) => {
  // decode cookie value
  const history = useHistory()
  const [ user, setUser ]= useState(parseToken())

  const logoutUser = useCallback(() => {
    setUser(null);
    // delete cookie
    Cookies.remove('hackneyToken');
    history.push("/");
  }, [history])

  return <UserContext.Provider value={{ user, logout: logoutUser }}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
}

/* eslint-disable no-unused-vars */
export const SignOut = () => {
  const { logout } = useContext(UserContext);
  return <a href="#" onClick={logout} className="nav-item lbh-body-m">SIGN OUT</a>;
}

export default UserContext
