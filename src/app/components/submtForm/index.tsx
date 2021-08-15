import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const FormContainer = styled.div`
  ${tw`
        w-2/3
        md:w-1/2
        p-5
 
    `};
`;

const SubmissionForm = styled.form`
  ${tw`
        flex
        flex-col
        m-2
        shadow-lg        
        p-2
        bg-gray-100
    `}
  input {
    width: 100%;
  }
  label {
    width: 100%;
  }
  button {
    justify-content: end;
  }
  div {
    ${tw`
      w-full
      flex
      flex-col
    `}
  }
  span {
    ${tw`
      flex
      flex-row
      justify-end
      m-2
    `}
  }
  button {
    ${tw`
      bg-yellow-400
      w-24
      mx-5
    `}
  }
`;

const SubmitForm = () => {
  const [isPosting, setIsPosting] = useState<Boolean>(false);
  const setIsPostingHandler = (result: boolean) => {
    setIsPosting(result);
  };

  return (
    <FormContainer>
      <SubmissionForm>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            onClick={() => {
              setIsPostingHandler(true);
            }}
            type="text"
            id="title"
            placeholder="What's up"
          />
        </div>
        {isPosting && (
          <div className="form-control">
            <label htmlFor="url">Link</label>
            <input type="text" id="url" />
          </div>
        )}
        {isPosting && (
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <textarea id="description" />
          </div>
        )}
        {isPosting && (
          <span>
            <button>Post</button>
            <button
              onClick={() => {
                setIsPostingHandler(false);
              }}
            >
              Cancel
            </button>
          </span>
        )}
      </SubmissionForm>
    </FormContainer>
  );
};

export default SubmitForm;
