import React, { useEffect } from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";
import HomePage from "./app/containers/HomePage";
import AuthContext from "./context/AuthContext";
import NavBar from "./app/components/navbar";
import AuthContextProvider from "./context/AuthContext";
import PostsContextProvider from "./context/PostsContext";
import Sidebar from "./app/containers/Sidebar";

const AppContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-row
  `}
`;

const MainContentContaner = styled.div`
  ${tw`
  w-full
  md:w-3/4
  flex
  flex-col
`}
`;

const UserContentContainer = styled.div`
  ${tw`
  hidden
  md:flex
  md:w-1/4
  md:flex-col
`}
`;

const App = () => {
  return (
    <AuthContextProvider>
      <PostsContextProvider>
        <NavBar />
        <AppContainer>
          <MainContentContaner>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home" render={() => <HomePage />} />
            </Switch>
          </MainContentContaner>
          <UserContentContainer>
            <Sidebar />
          </UserContentContainer>
        </AppContainer>
      </PostsContextProvider>
    </AuthContextProvider>
  );
};

export default App;
