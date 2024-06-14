/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const login = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    setToken(token);
  }, [token]);

  const logout = () => {
    setToken("");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
