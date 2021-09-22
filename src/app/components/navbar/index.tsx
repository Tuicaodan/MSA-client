import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "../logo";
import NavItems from "./navItems";
import { useQuery } from "@apollo/client";
import { useAuthContext } from "../../../context/AuthContext";
import { useThemeContext } from "../../../context/ThemeContext";
import { LOGINED_USER } from "../../../api/Queries";
import SearchBar from "./SearchBar";
import { Color } from "../../../models/color.modle";

interface StyleProps {
  backgroundColor?: string;
  textColor?: string;
}

const NavbarContainer = styled.div<StyleProps>`
  min-height: 68px;
  ${tw`
      w-96
  sm:w-full
  max-w-7xl
  m-auto
      flex
      flex-row
      items-center
      lg:px-12
      sm:justify-between
      justify-start
      fixed
      top-0
      transition
      duration-300
    `};
  background: ${(p) => p.backgroundColor};
  color: ${(p) => p.textColor};
`;

const LogoContainer = styled.div`
  ${tw`
mt-1
`}
`;

const ThemeButton = styled.div`
  ${tw`
  w-6
  h-6
  fixed
  left-2
  md:left-12
  bottom-1/2
`}
`;

const NavBar = () => {
  const {
    currentTheme,
    currentTextColor,
    changeToDrakTheme,
    changeToLightTheme,
  } = useThemeContext();
  const { data, error, loading } = useQuery(LOGINED_USER);
  // console.log(data)
  const { authUser, login, isLogin } = useAuthContext();

  useEffect(() => {
    const getLoginedUser = async () => {
      if (!loading && !error) {
        const AuthUser = {
          userId: data.loginedUser.id,
          username: data.loginedUser.username,
          avatar_url: data.loginedUser.avatar_url,
        };
        login(AuthUser);
      }
    };
    getLoginedUser();
  }, [data]);

  return (
    <NavbarContainer
      backgroundColor={currentTheme}
      textColor={currentTextColor}
    >
      <ThemeButton>
        {currentTheme == Color.WHITE && (
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
        {currentTheme == Color.GREY && (
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
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <SearchBar />
      <NavItems />
    </NavbarContainer>
  );
};

export default NavBar;
