import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useHistory, useParams } from "react-router-dom";
import { usePostsContext } from "../../../context/PostsContext";
import { useQuery } from "@apollo/client";
import { POSTS, USER, LOGINED_USER } from "../../../api/Queries";

const PageContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-col
`}
`;

const InfoContainer = styled.div`
  ${tw`

`}
`;

const UserAvatar = styled.div`
  ${tw`

`}
`;

const UserInfo = styled.div`
  ${tw`

`}
`;

const PostsContainer = styled.div`
  ${tw`

`}
`;

const UserPage = () => {
  const { posts, updatePostsState } = usePostsContext();

  const needFetching = posts.length == 0;

  const { id } = useParams<{ id: string }>();

  //   const { loading, error, data } = useQuery(USER, {
  //     variables: { id: "611b00a269dadb532b9799cc" },
  //   });

  //   useEffect(() => {
  //     if (!loading && !error) {
  //       console.log(data.user);
  //     }
  //   }, [data]);

  //   console.log(data.user);

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

  const userPosts = posts.filter((post) => post.author.id == id);

  return <PageContainer>{id}</PageContainer>;
};

export default UserPage;
