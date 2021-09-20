import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import UserProfile from "./userProfile";
import { useAuthContext } from "../../../context/AuthContext";
import PostsContainer from "./popularPostsList";

const SidebarContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-auto
    items-center
    overflow-x-hidden
    shadow-lg
    mt-10
    px-3
    pb-5
    sticky
    top-28
`}
`;

const Sidebar = () => {
  const { authUser, isLogin } = useAuthContext();

  return (
    <SidebarContainer>
      {isLogin && (
        <UserProfile
          username={authUser.username}
          avatar_url={authUser.avatar_url}
          userId={authUser.userId}
        />
      )}
      <PostsContainer />
    </SidebarContainer>
  );
};

export default Sidebar;
