import { createContext  } from 'react';

// Creating a context object for the data we want to share
// accross the component tree which we will import
// in the root component; i.e App.js
const UserContext = createContext();

// Setting the `displayName` property of the object so that
// we can easily identify the context in the component tree
// in case we are using multiple context objects
UserContext.displayName = 'UserContext';

export default UserContext;
