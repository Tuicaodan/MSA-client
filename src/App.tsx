import React from "react";
import "./App.css";
import styled from "styled-components";
import tw from "twin.macro";
import HomePage from "./app/containers/HomePage";
import AuthContext from "./context/auth-context";

const AppContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
  `}
`;

function App() {
  return (
    <AppContainer>
      <AuthContext.Provider>
        <HomePage />
      </AuthContext.Provider>
    </AppContainer>
  );
}

export default App;
