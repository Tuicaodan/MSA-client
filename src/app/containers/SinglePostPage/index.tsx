import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useHistory } from "react-router-dom";
import { usePostsContext } from "../../../context/PostsContext";

const SinglePostPage = (props: any) => {
  const { posts } = usePostsContext();
  const { id } = props.match.params;

  const singlePost = posts.find((post) => post.id == id);

  console.log(singlePost);

  return <h1>this is the single react page</h1>;
};

export default SinglePostPage;
