import React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";
import HomePage from "./app/containers/HomePage";
import AuthContext from "./context/AuthContext";
import NavBar from "./app/components/navbar";
import AuthContextProvider from "./context/AuthContext";
import PostsContextProvider from "./context/PostsContext";

const AppContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
  `}
`;

const App = () => {
  return (
    <AppContainer>
      <AuthContextProvider>
        <NavBar />
        <PostsContextProvider>
        <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route
          path="/home"
          render={() => <HomePage />}
        />
        </Switch>
        </PostsContextProvider>
      </AuthContextProvider>
    </AppContainer>
  );
};

export default App;
