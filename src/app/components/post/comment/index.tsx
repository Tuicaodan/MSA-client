import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import CommentDisplay from "./commentBody";
import SubmitCommentForm from "./commentSubmitForm";

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
  comments: IComment[];
  postId: string;
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

const Comment: FC<any> = ({ comments, postId }: CommentProps) => {

  const commentsNum = comments == null ? 0 : comments.length;

  return (
    <CommentContainer>
      {commentsNum == 0 && <div>No comments</div>}
      {commentsNum != 0 &&
        comments.map((eachComment, i) => {
          if (i <= 1) {
            return (
              <CommentDisplay
                comment={eachComment.comment}
                createDate={eachComment.createdAt}
                userAvatar={eachComment.user.avatar_url}
              />
            );
          }
        })}


      <SubmitCommentForm postId={postId} />
    </CommentContainer>
  );
};

export default Comment;
