import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation UserLogin($code: String!) {
    userLogin(code: $code)
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($postId: String!, $comment: String!) {
    addComment(postId: $postId, comment: $comment) {
      id
      comment
      createdAt
      user {
        id
        username
        avatar_url
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost(
    $title: String!
    $youtube_url: String!
    $description: String!
  ) {
    addPost(
      title: $title
      youtube_url: $youtube_url
      description: $description
    ) {
      id
      title
      youtube_url
      description
      createdAt
      author {
        id
        username
        avatar_url
      }
      comments {
        id
        comment
        createdAt
        user {
          id
          username
          avatar_url
        }
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: String!
    $title: String!
    $youtube_url: String!
    $description: String!
  ){
    updatePost(
      id: $id
      title: $title
      youtube_url: $youtube_url
      description: $description
    ){
      id
      title
      youtube_url
      description
      createdAt
      author {
        id
        username
        avatar_url
      }
      comments {
        id
        comment
        createdAt
        user {
          id
          username
          avatar_url
        }
      }
    }
  }
`
