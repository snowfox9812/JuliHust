import React from 'react';
// here we can initialise with any value we want.
const UserContext = React.createContext({}); 
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;
