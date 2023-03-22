import React, {useState}from 'react';
import Routes from './src/config/routes';
import { UserContext } from './src/config/userContext';

const App = () => {
  const [user, setUser] = useState(null);
  
  
  return <UserContext.Provider value={{ user, setUser }}>
  <Routes />
  </UserContext.Provider>
};

export default App;
