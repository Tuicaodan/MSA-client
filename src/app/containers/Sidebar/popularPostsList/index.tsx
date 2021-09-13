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
`}
`;

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

  let sortedPosts = fakePosts.map((a) => {
    return { ...a };
  });
  sortedPosts.sort((a: any, b: any) => {
    if ((a.comments == null, b.comments != null)) {
      return 1;
    } else if ((a.comments != null, b.comments == null)) {
      return -1;
    } else if ((a.comments == null, b.comments == null)) {
      return 0;
    } else if (a.comments.length > b.comments.length) {
      console.log(a.comments.length)
      console.log(b.comments.length)
      return -1;
    } else if (a.comments.length < b.comments.length) {
      return 1;
    }
    return 0;
  });

  return (
    <PopularPostsContainer>
      {sortedPosts.map((eachPost) => {
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
