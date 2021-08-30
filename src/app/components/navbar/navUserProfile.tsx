import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import AuthContext from "../../../context/AuthContext";

const ProfileContainer = styled.div`
  ${tw`
    flex
    flex-row
    items-center
    justify-between
    w-40
`}
`;
const Image = styled.div`
  ${tw`
    h-12
    w-12
    rounded-full
    m-1
`}
`;
const UsernameContainer = styled.div`
  ${tw`
    h-7
    text-xl
    my-auto
    flex
    justify-center
`}
`;

interface NavUserProfileProps {
  username: string | null;
  avatar_url: string | null;
}

const NavUserProfile: FC<NavUserProfileProps> = ({ username, avatar_url }) => {
  avatar_url = avatar_url ? avatar_url : "";
  return (
    <ProfileContainer>
      <Image>
        <img src={avatar_url}/>
      </Image>
      <UsernameContainer>{username}</UsernameContainer>
    </ProfileContainer>
  );
};

export default NavUserProfile;
