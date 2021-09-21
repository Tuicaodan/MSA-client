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
import NavBar from "./app/components/navbar";
import AuthContextProvider from "./context/AuthContext";
import PostsContextProvider from "./context/PostsContext";
import SearchContextProvider from "./context/SearchContext";
import { useThemeContext } from "./context/ThemeContext";
import SinglePostPage from "./app/containers/SinglePostPage";
import UserPage from "./app/containers/UserPage";

interface StyleProps {
  backgroundColor?: string;
  textColor?: string;
}

const PageContainer = styled.div<StyleProps>`
  ${tw`
  w-full
  h-full
  flex
  flex-row
  transition
  duration-300
  ease-in-out
  
`}
  background: ${(p) => p.backgroundColor};
  color: ${(p) => p.textColor};
`;

const AppContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-row
    justify-start
    px-0
    md:px-10
    mb-0
  `}
`;

const App = () => {
  const { currentTheme, currentTextColor } = useThemeContext();

  useEffect(() => {
  }, [currentTheme]);

  return (
    <Router>
      <AuthContextProvider>
        <PostsContextProvider>
          <SearchContextProvider>
            <PageContainer
              backgroundColor={currentTheme}
              textColor={currentTextColor}
            >
              <NavBar />
              <AppContainer>
                <Switch>
                  <Route path="/home" exact>
                    <HomePage />
                  </Route>
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
            </PageContainer>
          </SearchContextProvider>
        </PostsContextProvider>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
