import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import PopularPost from "./popularPost";
import { usePostsContext } from "../../../../context/PostsContext";

const PopularPostsContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-full
    items-start
    overflow-x-hidden
    px-4
`}
`;

const ContainerTitle = styled.div`
${tw`
  mx-auto
  align-middle
  text-center
  font-extrabold
  p-1
`}
`

const PostsContainer = () => {

  const { posts } = usePostsContext();


  let hasCommentsPosts = posts.filter((post) => {
    if (post.comments != null) {
      return post;
    }
  });

  hasCommentsPosts.sort((a: any, b: any) => {
    if (a.comments.length > b.comments.length) {
      return -1;
    } else if (a.comments.length < b.comments.length) {
      return 1;
    }
    return 0;
  });

  return (
    <PopularPostsContainer>
      <ContainerTitle>
        The popular posts:
      </ContainerTitle>
      {hasCommentsPosts.map((eachPost) => {
        return (
          <Link to={`/post/${eachPost.id}`}>
          <PopularPost
            title={eachPost.title}
            commentNum={
              eachPost.comments != null ? eachPost.comments.length : 0
            }
          /></Link>
        );
      })}
    </PopularPostsContainer>
  );
};

export default PostsContainer;
