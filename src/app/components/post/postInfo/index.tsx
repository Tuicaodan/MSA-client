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
      flex-col
      justify-start
      ml-0
      my-4
      px-5
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

const Info: FC<InfoProps> = ({ postInfo }: InfoProps) => {
  const date = new Date(parseInt(postInfo.createdAt)).toLocaleDateString();

  return (
    <InfoContainer>
      <h2>{postInfo.title}</h2>
      <h6>Posted on: {date}</h6>
      <p>{postInfo.description}</p>
    </InfoContainer>
  );
};

export default Info;
