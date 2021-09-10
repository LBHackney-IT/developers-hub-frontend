import React, { useState, useContext } from "react";
import UserContext from "../context/user.context.js";

const withUser = Component => props => (
  <Component currentUser={useContext(UserContext)} {...props} />
);

export default withUser;
