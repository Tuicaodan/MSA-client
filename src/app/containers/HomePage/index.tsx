import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import SubmitForm from "../../components/postSubmitForm";
import CardList from "../../components/postList";
import { useAuthContext } from "../../../context/AuthContext";
import { useSearchContext } from "../../../context/SearchContext";
import Sidebar from "../Sidebar";

const PageContainer = styled.div`
  ${tw`
        w-full
    h-full
    flex
    flex-row
    px-10
    `}
`;

const MainContentContaner = styled.div`
  ${tw`
  w-full
  md:w-3/4
  flex
  flex-col
  items-center
        overflow-x-hidden
`}
`;

const UserContentContainer = styled.div`
  ${tw`
  hidden
  md:flex
  md:w-1/4
  md:flex-col
`}
`;

function HomePage() {
  const { isLogin } = useAuthContext();

  const { setWordEntered, setFilteredData } = useSearchContext();
  useEffect(() => {
    setWordEntered("");
    setFilteredData([]);
  }, []);

  return (
    <PageContainer>
      <MainContentContaner>
        {isLogin && <SubmitForm />}
        <CardList />
      </MainContentContaner>
      <UserContentContainer>
        <Sidebar />
      </UserContentContainer>
    </PageContainer>
  );
}

export default HomePage;
