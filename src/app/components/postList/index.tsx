import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { usePostsContext } from "../../../context/PostsContext";
import { POSTS } from "../../../api/Queries";
import PostCard from "../post";
import SkeletonCard from "../skeletons/HomePageCard";

const ListContainer = styled.div`
  ${tw`
    w-full
    md:w-3/4
    flex
    flex-col
    justify-center
`}
`;

const PostList = () => {
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
    <ListContainer>
      {loading && (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}

      {posts.map((eachPost) => {
        return <PostCard key={eachPost.id} post={eachPost} />;
      })}
    </ListContainer>
  );
};

export default PostList;
