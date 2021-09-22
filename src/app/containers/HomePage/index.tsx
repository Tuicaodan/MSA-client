import React, { useEffect, Fragment } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import SubmitForm from "../../components/postSubmitForm";
import CardList from "../../components/postList";
import { usePostsContext } from "../../../context/PostsContext";
import { useAuthContext } from "../../../context/AuthContext";
import { useSearchContext } from "../../../context/SearchContext";
import { POSTS } from "../../../api/Queries";
import Sidebar from "../Sidebar";
import { useQuery } from "@apollo/client";
import SkeletonHomePage from "../../components/skeletons/SkeletonHomePage";

const PageContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-row
    px-0
    md:px-10
    mt-16
    h-auto
    mx-10
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

  const { posts, updatePostsState } = usePostsContext();
  //console.log(posts);

  const needFetching = posts.length == 0;

  const { data, error, loading } = useQuery(POSTS, { skip: !needFetching });

  useEffect(() => {
    if (!loading && !error && needFetching) {
      const dataPosts = data.posts.map((post: any) => ({
        ...post,
        author: post.author[0],
      }));
      updatePostsState(dataPosts);
    }
  }, [data]);

  return (
    <Fragment>
      {loading && <SkeletonHomePage />}
      {!loading && (
        <PageContainer>
          <MainContentContaner>
            {isLogin && <SubmitForm />}
            <CardList />
          </MainContentContaner>
          <UserContentContainer>
            <Sidebar />
          </UserContentContainer>
        </PageContainer>
      )}
    </Fragment>
  );
}

export default HomePage;
