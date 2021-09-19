import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import SubmitForm from "../../components/postSubmitForm";
import CardList from "../../components/postList";
import { useAuthContext } from "../../../context/AuthContext";
import { useSearchContext } from "../../../context/SearchContext";
import { useThemeContext } from "../../../context/ThemeContext";
import Sidebar from "../Sidebar";

const PageContainer = styled.div`
  ${tw`
        w-full
    h-full
    flex
    flex-row
    px-10
    `}
`;

const ThemeButton = styled.div`
  ${tw`
  w-6
  h-6
  fixed
  left-12
  bottom-6
`}
`;

const MainContentContaner = styled.div`
  ${tw`
  w-full
  md:w-3/4
  flex
  flex-col
  items-center
  overflow-x-hidden
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

function HomePage() {
  const { isLogin } = useAuthContext();

  const { setWordEntered, setFilteredData } = useSearchContext();
  useEffect(() => {
    setWordEntered("");
    setFilteredData([]);
  }, []);

  const { currentTheme, changeToDrakTheme, changeToLightTheme } =
    useThemeContext();

  return (
    <PageContainer>
      <ThemeButton>
        {currentTheme == "white" && (
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => changeToDrakTheme()}
            cursor="pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            ></path>
          </svg>
        )}
        {currentTheme == "rgba(75, 85, 99, 1)" && (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => changeToLightTheme()}
            cursor="pointer"
            color="white"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        )}
      </ThemeButton>
      <MainContentContaner>
        {isLogin && <SubmitForm />}
        <CardList />
      </MainContentContaner>
      <UserContentContainer>
        <Sidebar />
      </UserContentContainer>
    </PageContainer>
  );
}

export default HomePage;
