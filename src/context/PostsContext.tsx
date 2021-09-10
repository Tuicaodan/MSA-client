import React, { useState, createContext, FC, useContext } from "react";

interface IUser {
  userId: string | null;
  username: string | null;
  avatar_url: string | null;
}

interface IComment {
  commentId: string | null;
  comment: string | null;
  createdAt: string | null;
  user: IUser | null;
}

interface IPost {
  postId: string | null;
  title: string | null;
  youtube_url: string | null;
  description: string | null;
  createdAt: string | null;
  author: IUser | null;
  comments: IComment[] | null;
}

type PostsContextState = {
  posts: IPost[];
  updatePostsState: (posts: IPost[]) => void;
  updatePostState: (post: IPost) => void;
  findAndUpdatePostState: (post: IPost) => void;
  findAndUpdatePostCommentState: (comment: IComment, postId: string) => void;
};

const contextDefaultValues: PostsContextState = {
  posts: [],
  updatePostsState: (posts: IPost[]) => {},
  updatePostState: (post: IPost) => {},
  findAndUpdatePostState: (post: IPost) => {},
  findAndUpdatePostCommentState: (comment: IComment, postId: string) => {},
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
    const updatedPosts = [apiReturnPost, ...posts];
    setPosts(updatedPosts);
  };

  const findAndUpdatePostState = (apiReturnPost: IPost) => {
    console.log("post id from PostsContext");
    const updatedPosts = posts.map((post) => {
      console.log(post.postId);
      console.log(apiReturnPost.postId);
      if (post.postId === apiReturnPost.postId) {
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
      if (post.postId == postId) {
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
