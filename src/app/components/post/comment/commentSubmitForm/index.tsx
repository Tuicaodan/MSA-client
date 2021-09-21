import React, { useState, FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { usePostsContext } from "../../../../../context/PostsContext";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../../../../api/Mutations";

interface SubmitCommentProps {
  postId: string;
}

const SubmissionForm = styled.form`
  ${tw`
    flex
    flex-row
    shadow
    py-1

    justify-between
`}
  button {
    ${tw`
    bg-yellow-300
    border-2
     hover:border-yellow-400
      hover:border-2
      hover:bg-gray-50
      w-12
      rounded-md
      mx-4
      text-gray-500
    `}
  }
  input {
    ${tw`
      w-10/12
      rounded-md
      focus:bg-gray-50
      px-3
      text-sm
      overflow-scroll
      text-gray-500
    `}
  }
  input:focus {
    outline: none;
  }
`;

const SubmitCommentForm: FC<SubmitCommentProps> = (props) => {
  const { findAndUpdatePostCommentState } = usePostsContext();

  const [commentContent, setCommentContent] = useState("");
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  const [addComment, { data, loading, error }] = useMutation(ADD_COMMENT);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const hasContent = commentContent !== "";

    if (!hasContent) {
      alert("Did you forgot to comment before submitting?");
    }
    if (hasContent) {
      setIsReadyToSubmit(true);
      try {
        const returnedData = await addComment({
          variables: {
            comment: commentContent,
            postId: props.postId,
          },
        });
        const returnedComment = returnedData.data.addComment;
        findAndUpdatePostCommentState(returnedComment, props.postId);
      } catch (err) {
        console.log("This is the addComment error: " + err);
      }
      setIsReadyToSubmit(false);
      setCommentContent("")
    }
  };

  return (
    <SubmissionForm>
      <input
        type="text"
        id="title"
        placeholder="Any comment?"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />

      <button onClick={handleSubmit}>Post</button>
    </SubmissionForm>
  );
};

export default SubmitCommentForm;
