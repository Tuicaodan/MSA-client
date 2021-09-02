import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

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
    `}
  }
  input
  {
    ${tw`
      w-10/12
      rounded-md
      focus:bg-gray-50
      px-3
      text-sm
    `}
  }
`;

const SubmitCommentForm = () => {
  const [postTitle, setPostTitle] = useState("");


  const handleSubmit = async (event: any) =>{

  }

  return (
    <SubmissionForm>

        <input
          type="text"
          id="title"
          placeholder="Any comment?"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
 
      <button onClick={handleSubmit}>Post</button>
    </SubmissionForm>
  );
};

export default SubmitCommentForm;
