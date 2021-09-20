import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { slide as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../responsive";
import menuStyles from "./menuStyles";
import { useAuthContext } from "../../../context/AuthContext";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../api/Mutations";
import { useLocation, Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ListContainer = styled.div`
  ${tw`
    flex
    list-none
    h-14
    text-center
`}
`;

const List = styled.ul`
  ${tw`
    flex
    list-none
`}
`;

const NavItem = styled.li<{ menu?: any }>`
  padding-top: 13px;
  ${tw`
    text-base
    md:text-lg
    text-center
    mr-1
    md:mr-5
    cursor-pointer
    
    hover:text-gray-400
    flex
    justify-center
    my-auto
    h-full
`}
  /* a {
    padding-top: 18px;
  } */

  ${({ menu }) =>
    menu &&
    css`
      padding-top: 13px;
      ${tw`
    text-white
    text-xl
    mb-6
    focus:text-white
  `}
    `}
`;

const Image = styled.div`
  ${tw`
    h-12
    w-12
    rounded-full
    my-2    
    overflow-hidden
`}
`;

const NavItems = () => {
  const query = useQuery();
  const [userLogin, { error }] = useMutation(LOGIN);

  const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  //const [data, setData] = useState({ errorMessage: "", isLoading: false });
  const { authUser, login, isLogin, logout } = useAuthContext();
  //console.log(authUser);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loginMethod = async () => {
      const code = query.get("code");
      //console.log(code);
      if (code != null) {
        try {
          const { data } = await userLogin({
            variables: { code },
          });
          if (data != null) {
            const loginedUser = JSON.parse(data.userLogin);
            if (loginedUser === null) {
              throw new Error("No user retrieved from github");
            }
            const AuthUser = {
              userId: loginedUser.id,
              username: loginedUser.username,
              avatar_url: loginedUser.avatar_url,
            };
            login(AuthUser);
            //console.log(loginedUser.jwt_token);
            localStorage.setItem("token", loginedUser.jwt_token);
          }
        } catch (e) {
          console.log(e);
        }
      }
    };

    loginMethod();
  }, []);

  const logoutHandler = () => {
    logout();
  };

  const avatar_url = authUser.avatar_url;

  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  if (isMobile && !isLogin)
    return (
      <Menu right styles={menuStyles}>
        <ListContainer>
          <NavItem menu>
            <a href="./">Home</a>
          </NavItem>
          <NavItem menu>
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
            >
              Login
            </a>
          </NavItem>
        </ListContainer>
      </Menu>
    );

  if (isMobile && isLogin)
    return (
      <Menu right styles={menuStyles}>
        <ListContainer>
          <NavItem menu>
            <Image>
              <img src={avatar_url ? avatar_url : ""} />
            </Image>
          </NavItem>
          <NavItem menu>
            <a href="./">Home</a>
          </NavItem>
          <NavItem menu>
            <a href="javascript:void(0)" onClick={logoutHandler}>
              Logout
            </a>
          </NavItem>
        </ListContainer>
      </Menu>
    );

  return (
    <ListContainer>
      <List>
        <NavItem>
          <Link to="/home">Home</Link>
        </NavItem>
        {!isLogin && (
          <NavItem>
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
            >
              Login
            </a>
          </NavItem>
        )}
        {isLogin && (
          <NavItem>
            <a href="javascript:void(0)" onClick={logoutHandler}>
              Logout
            </a>
          </NavItem>
        )}
      </List>
    </ListContainer>
  );
};

export default NavItems;
