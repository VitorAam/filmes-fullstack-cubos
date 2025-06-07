import React, { createContext, useMemo, useState } from "react";

interface AuthContextType {
  token: string | null;
  isLogged: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  isLogged: false,
  login: () => { },
  logout: () => { },
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("auth_token");
  });

  const login = (newToken: string) => {
    localStorage.setItem("auth_token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
  };

  const isLogged = !!token;

  const contextValue = useMemo(() => ({ token, isLogged, login, logout }), [token, isLogged]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };