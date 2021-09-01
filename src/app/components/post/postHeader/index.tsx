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

const HeaderContainer = styled.div`
  ${tw`
    w-full
    p-2
    m-auto
    flex
    flex-row
    justify-start
`}
`;

const Image = styled.div`
  ${tw`
    h-6
    w-6
    rounded-full
    ml-2
    mr-4
    overflow-hidden
`}
`;
const Username = styled.div`
  ${tw`
    my-auto
`}
`;

const PostHeader: FC<InfoProps> = ({authorInfo}: InfoProps) => {
  return (
    <HeaderContainer>
      <Image>
        <img src={authorInfo.avatar_url} />
      </Image>
      <Username>{authorInfo.username}</Username>
    </HeaderContainer>
  );
};

export default PostHeader;
