// import React from 'react';
// import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

// import { config } from '../config';
const Authorisation = () => {
   return (
     <
export interface JWTPayload {
  sub: string;
  email: string;
  iss: string;
  name: string;
  groups: string[];
  iat: number;
}

export interface AuthUser extends JWTPayload {
  token: string;
}

const voidUser: AuthUser = {
  token: '',
  sub: '',
  email: '',
  iss: '',
  name: '',
  groups: [],
  iat: Number.NaN,
};

const parseToken = (): AuthUser => {
  const token = Cookies.get(config.authToken) || null;

  if (!token) {
    return voidUser;
  }

  try {
    const decodedToken = jwtDecode<JWTPayload>(token);
    return {
      ...decodedToken,
      token,
    };
  } catch {
    return voidUser;
  }
};

);
};
/>
};
export const $auth = new BehaviorSubject(parseToken());
// export default voidUser;
export default Authorisation;
