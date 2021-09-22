import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Shimmer from "./Shimmer";

interface StyleProps {
  avatarSize?: any;
  textLength?: any;
}

const PageContainder = styled.div`
  ${tw`
        w-full
        flex
        flex-col
        mt-10
        mx-10
    `}
`;
const SkeletonForm = styled.div`
  ${tw`
        bg-gray-200
        overflow-hidden
        h-16
        w-full
        mb-10
        rounded-md
    `}
`;

const SkeletonCardContainer = styled.div`
  ${tw`
        bg-gray-200
        overflow-hidden
        my-3
        rounded
        flex
        flex-col
        justify-start
    `}
  height:400px;
`;

const SkeletonCardHeader = styled.div`
  ${tw`
        w-full
        flex
        flex-row
        justify-start
        h-8
    `}
`;

const SkeletonCardAvatar = styled.div<StyleProps>`
  ${tw`
        rounded-full
        ml-5
        bg-gray-300
        my-auto
    `}
  width:${(p) => p.avatarSize};
  height: ${(p) => p.avatarSize};
`;

const SkeletonText = styled.div<StyleProps>`
  ${tw`
        bg-gray-300
        h-5
        my-auto
        mx-5
        rounded
    `}
  width:${(p) => p.textLength};
`;

const SkeletonVideo = styled.div`
  ${tw`
    bg-gray-300
    h-56
    w-full
    `}
`;

const SkeletonCard = () => {
  return (
    <PageContainder>
      <SkeletonForm />
      <SkeletonCardContainer>
        <SkeletonCardHeader>
          <SkeletonCardAvatar avatarSize={`24px`} />
          <SkeletonText textLength={`75px`} />
        </SkeletonCardHeader>
        <SkeletonVideo />
        <SkeletonText textLength={`120px`} />
        <SkeletonText textLength={`93%`} />
        <SkeletonText textLength={`93%`} />
        <SkeletonText textLength={`47%`} />
      </SkeletonCardContainer>
    </PageContainder>
  );
};

export default SkeletonCard;
