import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Info from "./postInfo";
import Video from "./video";
import PostHeader from "./postHeader";
import Comment from "./comment";

interface IUser {
  id: string;
  username: string;
  avatar_url: string;
}
interface IComment {
  id: string;
  comment: string;
  createdAt: string;
  user: IUser;
}

interface IPost {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  youtube_url: string;
  author: IUser;
  comments: IComment[];
}

interface PostProps {
  post: IPost;
}

const CardContainer = styled.div`
  ${tw`
    flex
    flex-col
    rounded-b-lg
    shadow-md
    mx-10
    md:mx-2
    my-4
`}
`;

const PostCard: FC<any> = ({ post }: PostProps) => {
  const youtube_url = post.youtube_url;

  const postInfo = {
    id: post.id,
    title: post.title,
    description: post.description,
    createdAt: post.createdAt,
  };

  const authorInfo = {
    id: post.author.id,
    username: post.author.username,
    avatar_url: post.author.avatar_url,
  };

  return (
    <CardContainer>
      <PostHeader postInfo={postInfo} authorInfo={authorInfo} />
      <Video youtube_url={youtube_url} />
      <Info postInfo={postInfo} authorInfo={authorInfo} />
      <Comment comments={post.comments} postId={post.id}/>
    </CardContainer>
  );
};

export default PostCard;
