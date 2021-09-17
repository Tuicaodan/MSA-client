import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import PopularPost from "./popularPost";

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
  const fakePosts = [
    {
      title: "this is a test",
      comments: null,
    },
    {
      title:
        "#14 Using the Token | Build a Complete App with GraphQL, Node.js, MongoDB and React.js",
      comments: null,
    },
    {
      title:
        "#16 Adding Events | Build a Complete App with GraphQL, Node.js, MongoDB and React.js",
      comments: [
        {
          comment: "1",
        },
        {
          comment: "5",
        },
        {
          comment: "6",
        },
        {
          comment: "6",
        },
      ],
    },
    {
      title: "What a REAL web developer interview is like (Front End)",
      comments: [
        {
          comment: "2",
        },
      ],
    },
    {
      title: "JavaScript Trivia With Dev Ed - Who Wants To Be A Megabit",
      comments: null,
    },
    {
      title:
        "I Challenged The AlgoExpert To A Trivia Game - Who Wants To Be A Megabit",
      comments: [
        {
          comment: "3",
        },
        {
          comment: "1",
        },
        {
          comment: "5",
        },
        {
          comment: "6",
        },
        {
          comment: "6",
        },
        {
          comment: "1",
        },
        {
          comment: "5",
        },
        {
          comment: "6",
        },
        {
          comment: "6",
        },
        {
          comment: "1",
        },
        {
          comment: "5",
        },
        {
          comment: "6",
        },
        {
          comment: "6",
        },
      ],
    },
    {
      title: "Node.js Ultimate Beginner’s Guide in 7 Easy Steps",
      comments: [
        {
          comment: "4",
        },
      ],
    },
  ];

  let hasCommentsPosts = fakePosts.filter((post) => {
    if (post.comments != null) {
      return post;
    }
  });

  //console.log(hasCommentsPosts);

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
          <PopularPost
            title={eachPost.title}
            commentNum={
              eachPost.comments != null ? eachPost.comments.length : 0
            }
          />
        );
      })}
    </PopularPostsContainer>
  );
};

export default PostsContainer;
