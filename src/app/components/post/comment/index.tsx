import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import CommentDisplay from "./commentBody";
import SubmitCommentForm from "./commentSubmitForm"

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

interface ICommentList {
  comments: IComment[];
}

interface CommentsProps {
  commentsInfo: ICommentList;
}

const CommentContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-col
    px-5
    py-3
    ml-0
    my-1
`}
  h6 {
    ${tw`
      text-gray-500
      text-sm
    `}
  }
  p {
    ${tw`
    text-justify
      text-sm
    `}
  }
`;

const Comment: FC<any> = (CommentsProps: CommentsProps) => {
  //console.log(CommentsProps.commentsInfo.comments);
  const comments = CommentsProps.commentsInfo.comments;
  const commentsNum = comments.length;

  return (
    <CommentContainer>
      <h6>...there are {commentsNum} comments</h6>
      {commentsNum > 2 && <h6>...there are {commentsNum} comments</h6>}
      <CommentDisplay comment={comments[0]} />
      <CommentDisplay comment={comments[1]} />
      <SubmitCommentForm />
    </CommentContainer>
  );
};

export default Comment;
