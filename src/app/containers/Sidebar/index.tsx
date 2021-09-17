import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import UserProfile from "./userProfile";
import { useAuthContext } from "../../../context/AuthContext";
import PopularPost from "./popularPostsList/popularPost";
import PostsContainer from "./popularPostsList";
import { useQuery } from "@apollo/client";
import { LOGINED_USER } from "../../../api/Queries";

const SidebarContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-full
    items-center
    overflow-x-hidden
    shadow-lg
    mt-10
`}
`;

const Sidebar = () => {
  // const { data, error, loading } = useQuery(LOGINED_USER);
  // console.log("in the sidebar fc");
  // console.log(data)
  const { authUser, login, isLogin } = useAuthContext();

  // useEffect(() => {
  //   const getLoginedUser = async () => {
  //     if (!loading && !error) {
  //       console.log("in the sidebar useEffect");
  //       const AuthUser = {
  //         userId: data.loginedUser.id,
  //         username: data.loginedUser.username,
  //         avatar_url: data.loginedUser.avatar_url,
  //       };
  //       //console.log(AuthUser)
  //       login(AuthUser);
  //     }
  //   };
  //   getLoginedUser();
  // }, [data]);

  return (
    <SidebarContainer>
      {isLogin && (
        <UserProfile
          username={authUser.username}
          avatar_url={authUser.avatar_url}
        />
      )}
      <PostsContainer />
    </SidebarContainer>
  );
};

export default Sidebar;
