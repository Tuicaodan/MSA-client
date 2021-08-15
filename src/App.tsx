import React from "react";
import "./App.css";
import styled from "styled-components";
import tw from "twin.macro";
import HomePage from "./app/containers/HomePage";
import AuthContext from "./context/AuthContext";
import NavBar from "./app/components/navbar";
import AuthContextProvider from "./context/AuthContext";

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
        <HomePage />
      </AuthContextProvider>
    </AppContainer>
  );
};

export default App;
