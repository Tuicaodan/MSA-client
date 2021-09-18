import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import CommentDisplay from "../../../components/post/comment/commentBody";
import SubmitCommentForm from "../../../components/post/comment/commentSubmitForm";

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
    h-full
    flex
    flex-col
    px-1
    py-3
    ml-0
    my-1
    justify-between
`}
  h6 {
    ${tw`
      text-gray-500
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

const CommentBody = styled.div`
  ${tw`
    overflow-scroll
    `}
`;

const CommentSubmissionContainer = styled.div`
  ${tw`

`}
`;

const Comment: FC<any> = ({ comments, postId }: CommentProps) => {
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
      <CommentBody>
        {clonedComments == null && <div>No comments</div>}

        {clonedComments != null &&
          clonedComments.map((eachComment) => {
            return (
              <CommentDisplay
                comment={eachComment.comment}
                createDate={eachComment.createdAt}
                userAvatar={eachComment.user.avatar_url}
                userId={eachComment.user.id}
              />
            );
          })}
      </CommentBody>
      <CommentSubmissionContainer>
        <SubmitCommentForm postId={postId} />
      </CommentSubmissionContainer>
    </CommentContainer>
  );
};

export default Comment;
