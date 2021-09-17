import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
const getYouTubeID = require("get-youtube-id");

interface IUser {
  userId: string;
  username: string;
  avatar_url: string;
}

interface IComment {
  commentId: string;
  comment: string;
  createdAt: string;
  user: IUser;
}

interface IPost {
  id: string;
  title: string;
  youtube_url: string;
  description: string;
  createdAt: string;
  author: IUser;
  comments: IComment[] | null;
}

interface Props {
  userPosts: IPost[];
}

const UserPostsContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-wrap
`}
`;

const SinglePostContainer = styled.div`
  ${tw`
    my-3
    md:w-52
    w-28
    shadow-lg
    mr-6
`}
  img {
    ${tw`
    w-full
    `}
  }
`;

const UserPosts = ({ userPosts }: any) => {
  const postThumbnails = userPosts.map((post: any) => {
    const videoId = getYouTubeID(post.youtube_url);
    return {
      postId: post.id,
      thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
    };
  });

  return (
    <UserPostsContainer>
      {postThumbnails.map((post: any, index: number) => {
        if (index <= 6) {
          return (
            <Link to={`/post/${post.postId}`}>
              <SinglePostContainer>
                <img src={post.thumbnail} />
              </SinglePostContainer>
            </Link>
          );
        }
      })}
    </UserPostsContainer>
  );
};

export default UserPosts;