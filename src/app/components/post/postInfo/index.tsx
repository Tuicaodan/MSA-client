import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface IPostInfo {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface IAuthorInfo {
  id: string;
  username: string;
  avatar_url: string;
}

interface InfoProps {
  postInfo: IPostInfo;
  authorInfo: IAuthorInfo;
}

const InfoContainer = styled.div`
  ${tw`
      w-full
      flex
      flex-row
      justify-start
      ml-0
      my-4
  `}
  h2 {
    ${tw`
      font-bold
    `}
  }
  h6 {
    ${tw`
      text-gray-500
    `}
  }
  p {
    ${tw`
    text-justify
      text-sm
    `}
  }
`;

const LeftInfoContainer = styled.div`
  ${tw`
  w-3/4
  text-left
  my-auto
  pl-5
  flex
  flex-col
  justify-center
`}
`;

const RighttInfoContainer = styled.div`
  ${tw`
  w-1/5
  text-left
  my-auto
  pl-5
  flex
  flex-row
  justify-items-start
`}
`;

const Image = styled.div`
  ${tw`
    h-12
    w-12
    rounded-full
    m-1
    overflow-hidden
`}
`;
const UsernameContainer = styled.div`
  ${tw`
    my-auto
    flex
    justify-center
`}
`;

const Info: FC<InfoProps> = ({ postInfo, authorInfo }: InfoProps) => {
  const date = new Date(parseInt(postInfo.createdAt)).toLocaleDateString();

  return (
    <InfoContainer>
      <LeftInfoContainer>
        <h2>{postInfo.title}</h2>
        <h6>Posted on: {date}</h6>
        <p>{postInfo.description}</p>
      </LeftInfoContainer>

      <RighttInfoContainer>
        <Image>
          <img src={authorInfo.avatar_url} />
        </Image>
        <UsernameContainer>{authorInfo.username}</UsernameContainer>
      </RighttInfoContainer>
    </InfoContainer>
  );
};

export default Info;
