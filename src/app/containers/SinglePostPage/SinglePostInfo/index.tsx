import { Link } from "react-router-dom";
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
      justify-center
      my-2
  `}
`;

const PostInfo = styled.div`
  ${tw`
      w-full
      flex
      flex-col
      justify-start
  `}
  h2 {
    ${tw`
      font-bold
    `}
  }
  h6 {
    ${tw`
      text-gray-400
    `}
  }
  p {
    ${tw`
    my-2
    text-justify
      text-sm
    `}
  }
`;

const AuthorInfo = styled.div`
  ${tw`
      w-full
      flex
      flex-row
      justify-start
      hover:text-gray-400
  `}
`;

const Image = styled.div`
  ${tw`
    h-10
    w-10
    rounded-full
    my-2
    mr-2
    overflow-hidden
`}
`;
const Username = styled.div`
  ${tw`
    my-auto
`}
`;

const SinglePostInfo = ({ postInfo, authorInfo }: any) => {
  const date = new Date(parseInt(postInfo.createdAt)).toLocaleDateString();

  return (
    <InfoContainer>
      <PostInfo>
        <h2>{postInfo.title}</h2>
        <Link to={`/user/${authorInfo.id}`}>
        <AuthorInfo>
        <Image>
          <img src={authorInfo.avatar_url} />
        </Image>
        <Username>{authorInfo.username}</Username>
      </AuthorInfo>
        </Link>
        
        <h6>Posted on: {date}</h6>
        <p>{postInfo.description}</p>
      </PostInfo>
      
    </InfoContainer>
  );
};

export default SinglePostInfo;
