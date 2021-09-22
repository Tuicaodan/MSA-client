import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import SkeletonCard from "./HomePageCard";
import SkeletonSideBar from "./HomePageSideBar";
import Shimmer from "./Shimmer";

const PageContainer = styled.div`
  ${tw`
    w-3/4
    flex
    flex-row
    pt-16
    m-auto
`}
`;

const CardsContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-col
    mt-10
    mx-2
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

const SkeletonHomePage = () => {
  return (
    <PageContainer>
      <CardsContainer>
        <SkeletonForm />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </CardsContainer>
      <SkeletonSideBar />
      <Shimmer />
    </PageContainer>
  );
};

export default SkeletonHomePage;
