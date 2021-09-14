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
    justify-between
    my-auto
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

const UserHeader = styled.div`
  ${tw`
    flex
    flex-row
    justify-start
`}
`;

const PostPageButton = styled.div`
  ${tw`
    my-auto
`}
svg{
  ${tw`
    text-gray-400    
    my-auto
  `}
}
`;

const PostHeader: FC<InfoProps> = ({ authorInfo }: InfoProps) => {
  return (
    <HeaderContainer>
      <UserHeader>
        <Image>
          <img src={authorInfo.avatar_url} />
        </Image>
        <Username>{authorInfo.username}</Username>
      </UserHeader>

      <PostPageButton>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 10.0367L8.00002 10.0367L8 16.0367L14 16.0367L14 14.0367L11.4143 14.0366L16.7438 8.7071L15.3296 7.29289L10 12.6224L10 10.0367Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            fill="currentColor"
          />
        </svg>
      </PostPageButton>
    </HeaderContainer>
  );
};

export default PostHeader;
