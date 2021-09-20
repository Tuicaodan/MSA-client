import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { usePostsContext } from "../../../context/PostsContext";
import { POSTS } from "../../../api/Queries";
import PostCard from "../post";

const ListContainer = styled.div`
  ${tw`
    w-full
    md:w-3/4
    flex
    flex-col
    justify-center
`}
`;

const ComponentUsingUseContext = () => {
  const { posts } = usePostsContext();

  return (
    <div>
      {posts.map((eachPost) => {
        return <PostCard key={eachPost.id} post={eachPost} />;
      })}
    </div>
  );
};

const PostList = () => {
  const { updatePostsState } = usePostsContext();

  const { data, error, loading } = useQuery(POSTS);

  useEffect(() => {
    if (!loading && !error) {
      const dataPosts = data.posts.map((post: any) => ({
        ...post,
        author: post.author[0],
      }));

      updatePostsState(dataPosts);
    }
  }, [data]);

  return (
    <ListContainer>
      <ComponentUsingUseContext />
    </ListContainer>
  );
};

export default PostList;
