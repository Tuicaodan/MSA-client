import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface StyleProps {
  textLength?: any;
}

const BarContainer = styled.div`
  ${tw`
        flex
        flex-col
        mt-7
    `}
`;

const SkeletonAvatar = styled.div<StyleProps>`
  ${tw`
        rounded-full
        ml-5
        bg-gray-300
        m-auto
        w-24
        h-24
    `}
`;

const SkeletonTitle = styled.div<StyleProps>`
  ${tw`
        bg-gray-300
        h-5
        m-auto
        mx-5
        rounded
        text-center
    `}
  width:${(p) => p.textLength};
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

const SkeletonSideBar = () => {
  return (
    <BarContainer>
      <SkeletonAvatar />
      <SkeletonTitle textLength={`130px`} />
      <SkeletonTitle textLength={`170px`} />
      <SkeletonText textLength={`93%`} />
      <SkeletonText textLength={`47%`} />
      <SkeletonText textLength={`93%`} />
      <SkeletonText textLength={`31%`} />
      <SkeletonText textLength={`93%`} />
      <SkeletonText textLength={`47%`} />
    </BarContainer>
  );
};

export default SkeletonSideBar;
