import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { usePostsContext } from "../../../context/PostsContext";
import { PostsContext } from "../../../context/PostsContext";
import { POSTS } from "../../../api/Queries";
import PostCard from "../post";
import { any } from "prop-types";

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
        console.log("in the PostList consumer");
        return <PostCard key={eachPost.postId} post={eachPost} />;
      })}
    </div>
  );
};

const PostList = () => {
  const { updatePostsState } = usePostsContext();

  const { data, error, loading } = useQuery(POSTS);

  useEffect(() => {
    if (!loading && !error) {
      //console.log(data.posts);

      const dataPosts = data.posts.map((post: any) => ({
        ...post,
        author: post.author[0],
      }));

      //console.log(dataPosts)

      updatePostsState(dataPosts);
    }
  }, [data]);

  // const fakePost = [
  //   {
  //     id: "post id",
  //     title: "post title",
  //     createdAt: "post date",
  //     description: "post description",
  //     youtube_url: "youtube url",
  //     author: {
  //       id: "author id",
  //       username: "fake username",
  //       avatar_url: "avatar uri",
  //     },
  //     comments: [
  //       {
  //         id: "comment id",
  //         comment: "comment body #1",
  //         createdAt: "comment date",
  //         user: {
  //           id: "user id",
  //           username: "fake username #1",
  //           avatar_url: "avatar uri",
  //         },
  //       },
  //       {
  //         id: "comment id",
  //         comment: "comment body #2",
  //         createdAt: "comment date",
  //         user: {
  //           id: "user id",
  //           username: "fake username #2",
  //           avatar_url: "avatar uri",
  //         },
  //       },
  //     ],
  //   },
  // ];

  return (
    <ListContainer>
      <ComponentUsingUseContext />
      {/* <PostsContext.Consumer>
        {({ posts }) =>
          posts.map((eachPost) => {
            console.log("in the PostList consumer");
            return <PostCard post={eachPost} />;
          })
        }
      </PostsContext.Consumer> */}
    </ListContainer>
  );
};

export default PostList;
