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
    justify-between
    py-1
  `}
`;

const AvatarAndCommentContainer = styled.div`
  ${tw`
    flex
    flex-row
    justify-start
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
  ml-2
  my-auto
  text-sm
`}
`;

const PublishDate = styled.div`
  ${tw`
  my-auto
  ml-3
  mr-1
  text-gray-500
  text-xs
`}
`;

const CommentDisplay: FC<any> = ({ comment, createDate, userAvatar }) => {
  //console.log(commentProps)

  const commentContent = comment;
  const commentDate = createDate == undefined ? "" : createDate;
  const date = new Date(parseInt(commentDate)).toLocaleDateString();
  const userAvaterUrl = userAvatar == undefined ? "" : userAvatar;

  return (
    <SingleCommentContainer>
      <AvatarAndCommentContainer>
      <Image>
        <img src={userAvaterUrl} />
      </Image>
      <CommentContent>{commentContent}</CommentContent>
      </AvatarAndCommentContainer>
      <PublishDate>{date}</PublishDate>
    </SingleCommentContainer>
  );
};

export default CommentDisplay;
