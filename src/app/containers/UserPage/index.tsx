import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useParams } from "react-router-dom";
import { usePostsContext } from "../../../context/PostsContext";
import { useQuery } from "@apollo/client";
import { POSTS, USER, LOGINED_USER } from "../../../api/Queries";
import UserPosts from "../SinglePostPage/UserPosts";

const PageContainer = styled.div`
  ${tw`
  mt-60
    w-full
    flex
    flex-col
    h-full
`}
`;

const InfoContainer = styled.div`
  ${tw`
    w-full
    flex
    md:flex-row
    flex-col
    py-5
    md:p-5
    align-middle
    m-auto
    md:justify-center
    mt-10
`}
`;

const UserAvatar = styled.div`
  ${tw`
    h-24
    w-24
    m-auto
    rounded-full
    shadow-md
    overflow-hidden
    md:mx-10`}
`;

const UserInfo = styled.div`
  ${tw`
  text-center
  mx-10
`}
  h1 {
    ${tw`
      font-bold
      text-2xl
      mb-4
  `}
  }
  span {
    ${tw`
    inline-block
    mr-3
  `}
  }
`;

const PostsContainer = styled.div`
  ${tw`
  mt-14
   mx-auto
   w-11/12
   mb-72
`}
  h2 {
    ${tw`
    text-center
    text-lg
    font-bold
    border-b-4
    mb-2
  `}
  }
`;

const UserPage = () => {
  const { posts, updatePostsState } = usePostsContext();

  const needFetching = posts.length == 0;
  console.log(needFetching);

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

  const userPostsNum = userPosts.length;
  let userCommentsNum = 0;
  posts.map((post) => {
    if (post.comments != null) {
      post.comments.map((comment) => {
        if (comment.user?.id == id) {
          userCommentsNum++;
        }
      });
    }
  });

  const userInfo = {
    avatar_url: !userPosts[0] ? "" : userPosts[0].author.avatar_url,
    username: !userPosts[0] ? "" : userPosts[0].author.username,
    commentsNum: !userPosts[0] ? 0 : userCommentsNum,
    postsNum: !userPosts[0] ? 0 : userPostsNum,
  };

  return (
    <PageContainer>
      <InfoContainer>
        <UserAvatar>
          <img src={userInfo.avatar_url} />
        </UserAvatar>
        <UserInfo>
          <h1>{userInfo.username}</h1>
          <span>{userInfo.postsNum} posts </span>
          <span> {userInfo.commentsNum} comments</span>
        </UserInfo>
      </InfoContainer>
      <PostsContainer>
        <h2>Posts</h2>
        {userPosts.length > 0 && (
          <UserPosts userPosts={userPosts} showAllPost={true} />
        )}
      </PostsContainer>
    </PageContainer>
  );
};

export default UserPage;
