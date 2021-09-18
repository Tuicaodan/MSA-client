import React, { useState, createContext, FC, useContext } from "react";

interface IUser {
  id: string;
  username: string;
  avatar_url: string;
}

interface IComment {
  id: string | null;
  comment: string | null;
  createdAt: string | null;
  user: IUser | null;
}

interface IPost {
  id: string | null;
  title: string | null;
  youtube_url: string | null;
  description: string | null;
  createdAt: string | null;
  author: IUser;
  comments: IComment[] | null;
}

type PostsContextState = {
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
  updatePostsState: (posts: IPost[]) => void;
  updatePostState: (post: IPost) => void;
  findAndUpdatePostState: (post: IPost) => void;
  findAndUpdatePostCommentState: (comment: IComment, postId: string) => void;
};

const contextDefaultValues: PostsContextState = {
  posts: [],
  setPosts: (posts: IPost[]) => {},
  updatePostsState: (posts: IPost[]) => {},
  updatePostState: (post: IPost) => {},
  findAndUpdatePostState: (post: IPost) => {},
  findAndUpdatePostCommentState: (comment: IComment, postId: string) => {},
};

export const PostsContext =
  createContext<PostsContextState>(contextDefaultValues);

export const usePostsContext = () => useContext(PostsContext);

const PostsContextProvider: FC = ({ children }) => {
  const [posts, setPosts] = useState(contextDefaultValues.posts);

  const updatePostsState = (apiReturnPosts: IPost[]) => {
    const updatedPosts = [...apiReturnPosts];
    setPosts(updatedPosts);
  };

  const updatePostState = (apiReturnPost: IPost) => {
    console.log("before updatePostState posts[]:");
    console.log(posts);
    const updatedPosts = [apiReturnPost, ...posts];
    console.log("after combine the return post to exsiting posts:");
    console.log(updatedPosts);
    setPosts(updatedPosts);
    console.log("after updatePostState posts[]:");
    console.log(posts);
  };

  const findAndUpdatePostState = (apiReturnPost: IPost) => {
    console.log("post id from PostsContext");
    const updatedPosts = posts.map((post) => {
      console.log(post.id);
      console.log(apiReturnPost.id);
      if (post.id === apiReturnPost.id) {
        return apiReturnPost;
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);
  };

  const findAndUpdatePostCommentState = (
    apiReturnComment: IComment,
    postId: string
  ) => {
    const updatedPosts = posts.map((post) => {
      if (post.id == postId) {
        if (post.comments == null) {
          post.comments = [apiReturnComment];
        } else if (post.comments != null) {
          post.comments = [apiReturnComment, ...post.comments];
        }
        return post;
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        updatePostsState,
        updatePostState,
        findAndUpdatePostState,
        findAndUpdatePostCommentState,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
