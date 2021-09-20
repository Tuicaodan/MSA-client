import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

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
    hover:text-gray-400
`}
`;

const Image = styled.div`
  ${tw`
    h-6
    w-6
    rounded-full
    ml-2
    mr-2
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
    cursor-pointer
`}
  svg {
    ${tw`
    text-gray-400    
    my-auto
    mx-2
  `}
  }
`;

const PostHeader: FC<InfoProps> = ({ postInfo, authorInfo }: InfoProps) => {
  const postId = postInfo.id;
  const userId = authorInfo.id;

  return (
    <HeaderContainer>
      <Link to={`/user/${userId}`}>
        <UserHeader>
          <Image>
            <img src={authorInfo.avatar_url} />
          </Image>
          <Username>{authorInfo.username}</Username>
        </UserHeader>
      </Link>
      <Link to={`/post/${postId}`}>
        <PostPageButton>
          <svg
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              transform="translate(3 3)"
            >
              <path d="m6.5 10.5 3-3-3-3" />
              <path d="m5 3v9" transform="matrix(0 1 -1 0 12.5 2.5)" />
              <path d="m1.5 5.5v-3.0079176c0-1.10147263.89060277-1.99561512 1.99206673-1.99998427l7.95228497-.03160773c1.1045608-.00432011 2.0035361.8875515 2.0079175 1.99211231l.0398162 10.02918369c.0043323 1.1045608-.8875404 2.003535-1.9921012 2.0079309-.0026436 0-.0052873 0-.0079309 0h-7.9920533c-1.1045695 0-2-.8954305-2-2v-2.9897173" />
            </g>
          </svg>
        </PostPageButton>
      </Link>
    </HeaderContainer>
  );
};

export default PostHeader;
