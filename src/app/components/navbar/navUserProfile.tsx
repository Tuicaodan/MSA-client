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
`}
`;
const Image = styled.div`
  ${tw`
    h-5
    w-5
    rounded-full
    m-1
`}
`;
const UsernameContainer = styled.div`
  ${tw`
    h-5
    text-sm
`}
`;

interface NavUserProfileProps {
  username: string | null;
  avatar_url: string | null;
}

const NavUserProfile: FC<NavUserProfileProps> = ({ username, avatar_url }) => {
    avatar_url = (avatar_url) ? avatar_url: ""
  return (
    <ProfileContainer>
      <Image>
        <img src={avatar_url} alt="user avatar" />
      </Image>
      <UsernameContainer>
          {username}
      </UsernameContainer>
    </ProfileContainer>  );
};

export default NavUserProfile;
