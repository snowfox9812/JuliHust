import React from "react";
// here we can initialise with any value we want.
const AuthContext = React.createContext();
export const UserProvider = AuthContext.Provider;
export const UserConsumer = AuthContext.Consumer;
export default AuthContext;
