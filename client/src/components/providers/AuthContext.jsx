/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import { useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const setTokenInLocalStorage = (token) => {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    };

    setTokenInLocalStorage(token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
