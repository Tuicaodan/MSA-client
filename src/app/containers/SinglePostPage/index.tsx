import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useHistory, useParams } from "react-router-dom";
import { usePostsContext } from "../../../context/PostsContext";
import Video from "../../components/post/video";
import Comment from "./SinglePostComments";
import { useQuery } from "@apollo/client";
import { POSTS, LOGINED_USER } from "../../../api/Queries";
import Info from "../../components/post/postInfo";
import SinglePostInfo from "./SinglePostInfo";
import UserPosts from "./UserPosts";

const PageContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
`}
`;

const SinglePostConstainer = styled.div`
  ${tw`
    w-11/12
    p-5
    flex
    flex-col
    rounded-b-md
    justify-center
    m-auto
   shadow-lg
 `}
`;
const VideoAndCommentsContainer = styled.div`
  ${tw`
   flex
   flex-row
   justify-center
   w-full
   m-auto
`}
`;

const VideoContainer = styled.div`
  ${tw`

   w-2/3
    ml-0
    
`}
`;

const CommentsContainer = styled.div`
  ${tw`
   w-1/3
  text-center
  pl-5
   m-auto
   h-96
`}
`;

const PostInfoContainer = styled.div`
  ${tw`
   w-full
   m-auto
`}
`;

const UserInfoContainer = styled.div`
  ${tw`
   w-full
   m-auto
`}
`;

const UserPostsContainer = styled.div`
  ${tw`
   mt-24
   mx-auto

   w-11/12
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

const SinglePostPage = () => {
  const { posts, updatePostsState } = usePostsContext();

  const { id } = useParams<{ id: string }>();

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

  let singlePost;
  singlePost = posts.find((post) => post.id === id);

  const postInfo = {
    id: singlePost ? singlePost.id : "",
    title: singlePost ? singlePost.title : "",
    description: singlePost ? singlePost.description : "",
    createdAt: singlePost ? singlePost.createdAt : "",
  };

  const authorInfo = {
    id: singlePost ? singlePost.author.userId : "",
    username: singlePost ? singlePost.author.username : "",
    avatar_url: singlePost ? singlePost.author.avatar_url : "",
  };

  const youtube_url = singlePost ? singlePost.youtube_url : "";
  const comments = singlePost ? singlePost.comments : [];
  const postId = singlePost ? singlePost.id : "";

  const userPosts = posts.filter((post) => post.author.userId == authorInfo.id);

  console.log(userPosts);

  return (
    <PageContainer>
      <SinglePostConstainer>
        <VideoAndCommentsContainer>
          <VideoContainer>
            <Video youtube_url={youtube_url} />
          </VideoContainer>
          <CommentsContainer>
            <Comment comments={comments} postId={postId} />
          </CommentsContainer>
        </VideoAndCommentsContainer>
        <PostInfoContainer>
          <SinglePostInfo postInfo={postInfo} authorInfo={authorInfo} />
        </PostInfoContainer>
      </SinglePostConstainer>
      <UserPostsContainer>
        <h2>{authorInfo.username}'s Post you may also interested:</h2>
        {userPosts.length > 0 && <UserPosts userPosts={userPosts} />}
      </UserPostsContainer>
    </PageContainer>
  );
};

export default SinglePostPage;
