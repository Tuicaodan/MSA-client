import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "../logo";
import NavItems from "./navItems";
import { useQuery } from "@apollo/client";
import { useAuthContext } from "../../../context/AuthContext";
import { LOGINED_USER } from "../../../api/Queries";
import SearchBar from "./SearchBar";

const NavbarContainer = styled.div`
  min-height: 68px;
  ${tw`
        w-full
        flex
        flex-row
        items-center
        lg:px-12
        justify-between
    `};
`;

const LogoContainer = styled.div``;

const NavBar = () => {
  const { data, error, loading } = useQuery(LOGINED_USER);
  // console.log(data)
  const { authUser, login, isLogin } = useAuthContext();

  useEffect(() => {
    const getLoginedUser = async () => {
      if (!loading && !error) {
        //console.log("in the sidebar useEffect");
        const AuthUser = {
          userId: data.loginedUser.id,
          username: data.loginedUser.username,
          avatar_url: data.loginedUser.avatar_url,
        };
        //console.log(AuthUser)
        login(AuthUser);
      }
    };
    getLoginedUser();
  }, [data]);

  return (
    <NavbarContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <SearchBar />
      <NavItems />
    </NavbarContainer>
  );
};

export default NavBar;
