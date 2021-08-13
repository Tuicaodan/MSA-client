import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { slide as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../responsive";
import menuStyles from "./menuStyles";

const ListContainer = styled.ul`
  ${tw`
    flex
    list-none
`}
`;

const NavItem = styled.li<{ menu?: any }>`
  ${tw`
    text-xs
    md:text-base
    text-black
    mr-1
    md:mr-5
    cursor-pointer
    transition
    duration-300
    ease-in-out
    hover:text-gray-700
`}
  ${({ menu }) =>
    menu &&
    css`
      ${tw`
    text-white
    text-xl
    mb-3
    focus:text-white
  `}
    `}
`;

const NavItems = () => {
  const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  //const [data, setData] = useState({ errorMessage: "", isLoading: false });

  useEffect(() => {
    const loginMethod = async () => {
      const params = new URLSearchParams(window.location.search);
      let code = params.get("code");
      if (code != null) {
        try {
          const requestBody = {
            query: `
              mutation {
                login(access_code: "${code}")
              }
            `,
          };
          fetch("http://localhost:4000/graphql", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (res.status !== 200 && res.status !== 201) {
                throw new Error("Login Failed");
              }
              return res.json();
            })
            .then((resData) => {
              const loginedUser = JSON.parse(resData.data["login"]);  
              console.log(loginedUser);
            });
        } catch (err) {
          console.log(err);
        }
      }
    };
    loginMethod();
  }, []);

  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  if (isMobile)
    return (
      <Menu right styles={menuStyles}>
        <ListContainer>
          <NavItem menu>
            <a href="./">Home</a>
          </NavItem>
          <NavItem menu>Login</NavItem>
          <NavItem menu>About</NavItem>
        </ListContainer>
      </Menu>
    );

  return (
    <ListContainer>
      <NavItem>
        <a href="./">Home</a>
      </NavItem>
      <NavItem>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
        >
          Login
        </a>
      </NavItem>
      <NavItem>About</NavItem>
    </ListContainer>
  );
};

export default NavItems;
