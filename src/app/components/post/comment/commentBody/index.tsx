import { Link } from "react-router-dom";
import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface IUser {
  id: string;
  username: string;
  avatar_url: string;
}
interface IComment {
  id: string;
  comment: string;
  createdAt: string;
  user: IUser;
}

interface CommentProps {
  comment: IComment | undefined;
}

const SingleCommentContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-col
    py-1
    justify-start
  `}
`;

const AvatarAndCommentContainer = styled.div`
  ${tw`
    flex
    flex-wrap
    w-full
`}
`;

const CommentContent = styled.div`
  ${tw`
  w-full
  ml-2
  my-auto
  text-sm
  border-b-2
`}
  p {
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }
  img {
    ${tw`
    rounded-full
  h-5
  w-5
  inline
  mx-1`}
  }
`;

const PublishDate = styled.span`
  ${tw`
  my-auto
  ml-3
  mr-1
  text-gray-300
  text-xs
`}
`;

const CommentDisplay: FC<any> = ({
  comment,
  createDate,
  userAvatar,
  userId,
}) => {
  const commentContent = comment;
  const commentDate = createDate == undefined ? "" : createDate;
  const date = new Date(parseInt(commentDate)).toLocaleDateString();
  const userAvaterUrl = userAvatar == undefined ? "" : userAvatar;

  return (
    <SingleCommentContainer>
      <AvatarAndCommentContainer>
        <CommentContent>
          <p>
            <Link to={`/user/${userId}`}>
              <img src={userAvaterUrl} />
            </Link>
            {commentContent}
            <PublishDate>{date}</PublishDate>
          </p>
        </CommentContent>
      </AvatarAndCommentContainer>
    </SingleCommentContainer>
  );
};

export default CommentDisplay;
