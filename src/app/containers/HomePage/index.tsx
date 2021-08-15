import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import SubmitForm from "../../components/submtForm";


const PageContainer = styled.div`
  ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        overflow-x-hidden
    `}
`;

function HomePage() {
  return <PageContainer>
    <SubmitForm />
  </PageContainer>;
};

export default HomePage;
