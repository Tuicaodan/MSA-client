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

// interface CommentsProps {
//   commentsInfo: ICommentList;
// }

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
  //console.log(CommentsProps.commentsInfo.comments);
  // const comments = CommentsProps.commentsInfo.comments;
  // const postId = CommentsProps.commentsInfo.postId;
  const commentsNum = comments == null ? 0 : comments.length;

  if (commentsNum == 0) {
    console.log("no comment");
  }
  if (commentsNum == 1) {
    console.log(comments[0]);
  }
  if (commentsNum >= 2) {
    console.log(comments[0]);
    console.log(comments[1]);
  }

  // const displayComment0 = comments != null && comments[0] != undefined;
  // const displayComment1 = comments != null && comments[1] != undefined;

  // let comment0;
  // let comment1;
  // if (displayComment0) {
  //   comment0 = comments[0];
  // } else {
  //   comment0 = {
  //     id: "",
  //     comment: "",
  //     createdAt: "",
  //     user: { id: "", username: "", avatar_url: "" },
  //   };
  // }
  // if (displayComment1) {
  //   comment1 = comments[1];
  // }

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
      {/* {commentsNum==1 &&  <CommentDisplay comment={comments[0]} />} */}

      {/* {commentsNum > 2 && <h6>...there are {commentsNum} comments</h6>} */}
      {/* {comments &&
        comments.map((comment) => {
          return <CommentDisplay comment={comment} />;
        })} */}

      <SubmitCommentForm postId={postId} />
    </CommentContainer>
  );
};

export default Comment;
