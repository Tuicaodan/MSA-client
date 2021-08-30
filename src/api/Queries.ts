import { gql } from "@apollo/client";

export const POSTS = gql`
  query Posts {
    posts {
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
