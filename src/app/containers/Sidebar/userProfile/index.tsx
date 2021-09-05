import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const ProfileContainer = styled.div`
  ${tw`
    flex
    flex-col
    items-center
    justify-between
    w-full`}
`;

const Image = styled.div`
  ${tw`
    h-20
    w-20
    rounded-full
    m-auto
    mt-3
`}
`;
const UsernameContainer = styled.div`
  ${tw`
    h-10
    text-xl
    my-3
    flex
    justify-center
`}
`;

interface UserProfileProps {
  username: string | null | undefined;
  avatar_url: string | null | undefined;
}

const UserProfile: FC<UserProfileProps> = ({ username, avatar_url }) => {
  avatar_url = avatar_url ? avatar_url : "";
  return (
    <ProfileContainer>
      <Image>
        <img src={avatar_url} />
      </Image>
      <UsernameContainer>{username}</UsernameContainer>
    </ProfileContainer>
  );
};

export default UserProfile;
