import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import SubmitForm from "../../components/postSubmitForm";
import CardList from "../../components/postList"

const PageContainer = styled.div`
  ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        overflow-x-hidden
        bg-gray-400
    `}
`;

function HomePage() {
  return <PageContainer>
    <SubmitForm />
    <CardList />
  </PageContainer>;
};

export default HomePage;
