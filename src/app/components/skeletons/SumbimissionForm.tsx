import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Shimmer from "./Shimmer";

const SkeletonFormContainer = styled.div`
  ${tw`
        bg-gray-200
        overflow-hidden
        h-16
        w-full
    `}
`;

const SkeletonSubmissionForm = () => {
  return (
    <SkeletonFormContainer>
      <Shimmer />
    </SkeletonFormContainer>
  );
};

export default SkeletonSubmissionForm;
