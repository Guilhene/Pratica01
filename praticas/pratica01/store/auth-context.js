import { createContext, useState } from 'react';

export const AuthContext = createContext({
  userName: '',
  authenticate: (name) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [userName, setUserName] = useState('');

  function authenticate(name) {
    setUserName(name);
  }

  function logout() {
    setUserName('');
  }

  const value = {
    userName: userName,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
