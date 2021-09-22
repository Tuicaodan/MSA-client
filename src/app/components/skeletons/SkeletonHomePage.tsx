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

const SkeletonHomePage = () => {
  return (
    <PageContainer>
      <SkeletonCard />
      <SkeletonSideBar />
      <Shimmer />
    </PageContainer>
  );
};

export default SkeletonHomePage;
