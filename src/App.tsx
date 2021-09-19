import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import HomePage from "./app/containers/HomePage";
import AuthContext from "./context/AuthContext";
import NavBar from "./app/components/navbar";
import AuthContextProvider from "./context/AuthContext";
import PostsContextProvider from "./context/PostsContext";
import SearchContextProvider from "./context/SearchContext";
import { useThemeContext } from "./context/ThemeContext";
import Sidebar from "./app/containers/Sidebar";
import SinglePostPage from "./app/containers/SinglePostPage";
import UserPage from "./app/containers/UserPage";

interface StyleProps {
  backgroundColor?: string;
  textColor?: string;
}

const AppContainer = styled.div<StyleProps>`
  ${tw`
    w-full
    h-full
    flex
    flex-row
    px-10
  `}
  background: ${(p) => p.backgroundColor};
  color: ${(p) => p.textColor};
`;

const App = () => {
  const { currentTheme, currentTextColor } = useThemeContext();

  useEffect(() => {
    console.log("color theme changed");
  }, [currentTheme]);

  return (
    <Router>
      <AuthContextProvider>
        <PostsContextProvider>
          <SearchContextProvider>
            <NavBar />
            <AppContainer
              backgroundColor={currentTheme}
              textColor={currentTextColor}
            >
              <Switch>
                <Route path="/home" exact render={() => <HomePage />} />
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route path="/post/:id" exact>
                  <SinglePostPage />
                </Route>
                <Route path="/user/:id" exact>
                  <UserPage />
                </Route>
              </Switch>
            </AppContainer>
          </SearchContextProvider>
        </PostsContextProvider>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
