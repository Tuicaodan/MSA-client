import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { usePostsContext } from "../../../context/PostsContext";
import { POSTS } from "../../../api/Queries";
import PostCard from "../post";

const ListContainer = styled.div`
  ${tw`
    w-5/6
    md:w-2/3
    lg:w-1/2
    flex
    flex-col
    justify-center
`}
`;

const PostList = () => {
  const { posts, updatePostsState } = usePostsContext();

  const { data, error, loading } = useQuery(POSTS);

  useEffect(() => {
    if (!loading && !error) {
      //console.log(data.posts);
      updatePostsState(data.posts);
    }
  }, [data]);

  const fakePost = {
    id: "post id",
    title: "post title",
    createdAt: "post date",
    description: "post description",
    youtube_url: "youtube url",
    author: {
      id: "author id",
      username: "author username",
      avatar_url: "avatar uri",
    },
    comments: [
      {
        id: "comment id",
        comment: "comment body",
        createdAt: "comment date",
        user: {
          id: "user id",
          username: "user username",
          avatar_url: "avatar uri",
        },
      },
    ],
  };
  

  return (
    <ListContainer>
      {posts.map((eachPost) => {
        console.log(eachPost);
        return <PostCard post={eachPost} />
      })}
    </ListContainer>
  );
};

export default PostList;
