import React, { useState, createContext, FC, useContext } from "react";

interface IUser {
  userId: string | null;
  username: string | null;
  avatar_url: string | null;
}

interface IComment {
  commentId: string | null;
  comment: string | null;
  user: IUser | null;
}

interface IPost {
  postId: string | null;
  title: string | null;
  youtube_url: string | null;
  description: string | null;
  author: IUser | null;
  comments: IComment[] | null;
}

type PostsContextState = {
  posts: IPost[];
  updatePostsState: (posts: IPost[]) => void;
  updatePostState:(post: IPost) => void;
};

const contextDefaultValues: PostsContextState = {
  posts: [],
  updatePostsState: (posts: IPost[]) => {},
  updatePostState:(post: IPost) => {},
};

const PostsContext = createContext<PostsContextState>(contextDefaultValues);

export const usePostsContext = () => useContext(PostsContext);

const PostsContextProvider: FC = ({ children }) => {
  const [posts, setPosts] = useState(contextDefaultValues.posts);

  const updatePostsState = (apiReturnPosts: IPost[]) => {
    const updatedPosts = [...apiReturnPosts, ...posts];
    setPosts(updatedPosts);
  };

  const updatePostState = (apiReturnPost: IPost) => {
    const updatedPosts = [apiReturnPost,...posts];
    setPosts(updatedPosts);
  };

  return (
    <PostsContext.Provider value={{ posts, updatePostsState, updatePostState }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
