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
import Sidebar from "./app/containers/Sidebar";
import SinglePostPage from "./app/containers/SinglePostPage";

const AppContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-row
    px-10
  `}
`;

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <PostsContextProvider>
          <NavBar />
          <AppContainer>
            <Switch>
              <Route path="/home" exact render={() => <HomePage />} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/post/:id" exact render={(props) => <SinglePostPage {...props}/>} />
            </Switch>
          </AppContainer>
        </PostsContextProvider>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
