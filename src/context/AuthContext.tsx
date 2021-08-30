import React, { useState, createContext, FC, useContext } from "react";

interface IUser {
  userId: string | null;
  username: string | null;
  avatar_url: string | null;
}

type AuthContextState = {
  authUser: IUser;
  isLogin: boolean;
  login: (user: IUser) => void;
  logout: () => void;
};

const contextDefaultValues: AuthContextState = {
  authUser: {
    userId: null,
    username: null,
    avatar_url: null,
  },
  isLogin: false,
  login: (user: IUser) => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextState>(contextDefaultValues);

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider: FC = ({ children }) => {
  //const [authUser, setAuthUser] = useState<AuthContextState>(contextDefaultValues);
  const [authUser, setAuthUser] = useState<IUser>(
    contextDefaultValues.authUser
  );

  const [isLogin, setIsLogin] = useState<boolean>(contextDefaultValues.isLogin);

  const login = (user: IUser) => {
    setAuthUser(user);
    setIsLogin(true);
  };
  const logout = () => {
    setAuthUser(contextDefaultValues.authUser);
    setIsLogin(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout, isLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
