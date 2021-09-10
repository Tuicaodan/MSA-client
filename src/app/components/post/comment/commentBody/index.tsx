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
    flex-row
    justify-start
    py-1
  `}
`;

const Image = styled.div`
  ${tw`
  h-5
  w-5
  rounded-full
  my-auto
  mx-1
  overflow-hidden
`}
`;

const CommentContent = styled.div`
  ${tw`
  my-auto
  text-sm
`}
`;

const PublishDate = styled.div`
  ${tw`
  my-auto
  ml-3
  text-gray-500
  text-xs
`}
`;

const CommentDisplay: FC<any> = ({ comment, createDate, userAvatar }) => {
  //console.log(commentProps)

  const commentContent = comment;
  const commentDate = createDate == undefined ? "" : createDate.createdAt;
  const userAvaterUrl = userAvatar == undefined ? "" : userAvatar;

  return (
    <SingleCommentContainer>
      <Image>
        <img src={userAvaterUrl} />
      </Image>
      <CommentContent>{commentContent}</CommentContent>
      <PublishDate>{commentDate}</PublishDate>
    </SingleCommentContainer>
  );
};

export default CommentDisplay;
