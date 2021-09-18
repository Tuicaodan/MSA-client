import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import CommentDisplay from "./commentBody";
import SubmitCommentForm from "./commentSubmitForm";
import { useAuthContext } from "../../../../context/AuthContext"


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
      text-gray-400
      text-sm
      pl-6
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

  const { isLogin } = useAuthContext();
  
  let clonedComments = null;

  //clone comments and then sort by date(reverse)
  if (comments != null) {
    clonedComments = comments.map((a) => {
      return { ...a };
    });
    clonedComments.sort((object1: IComment, object2: IComment) => {
      const date1 = parseInt(object1.createdAt);
      const date2 = parseInt(object2.createdAt);
      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
      return 0;
    });
  }

  return (
    <CommentContainer>
      {clonedComments == null && <div>No comments</div>}

      {clonedComments != null &&
        clonedComments.map((eachComment, i) => {
          if (i <= 1) {
            return (
              <CommentDisplay
                comment={eachComment.comment}
                createDate={eachComment.createdAt}
                userAvatar={eachComment.user.avatar_url}
                userId={eachComment.user.id}
              />
            );
          }
        })}
      {clonedComments != null && clonedComments.length > 2 && (
        <h6>...There are {clonedComments.length-2} more comments</h6>
      )}
      {isLogin && <SubmitCommentForm postId={postId} />}
    </CommentContainer>
  );
};

export default Comment;
