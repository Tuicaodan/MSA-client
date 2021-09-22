import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { usePostsContext } from "../../../context/PostsContext";
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

const PostList = () => {
  const { posts } = usePostsContext();

  return (
    <ListContainer>
      {posts.map((eachPost) => {
        return <PostCard key={eachPost.id} post={eachPost} />;
      })}
    </ListContainer>
  );
};

export default PostList;
