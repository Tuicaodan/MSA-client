import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../../api/Mutations";
import { usePostsContext } from "../../../context/PostsContext";

const FormContainer = styled.div`
  ${tw`
        w-full
        md:w-3/4
        py-5
        px-0
    `};
`;

const SubmissionForm = styled.form`
  ${tw`
        flex
        flex-col
        mx-10
    md:mx-2
        shadow-lg    
        px-2   
        py-2
        bg-gray-100
        rounded
    `}
  input, label, textarea {
    ${tw`
      w-full
      rounded-md
      px-3
      mt-1
      focus:bg-gray-50
    `}
  }
  div {
    ${tw`
      w-full
      flex
      flex-col
      rounded-md
      my-1
    `}
    p {
      ${tw`
        flex
        justify-center
        text-green-800
        font-bold
      `}
    }
  }
  span {
    ${tw`
      flex
      flex-row
      justify-end
      my-2
    `}
  }
  button {
    ${tw`
    bg-yellow-300
    border-2
     hover:border-yellow-400
      hover:border-2
      hover:bg-gray-50
      w-24
      mx-2
      rounded-md
    `}
  }
  button:disabled {
    ${tw`
    bg-gray-300
    hover:border-gray-300
      hover:border-2
      hover:bg-gray-300
    border-2
    cursor-default
      w-24
      mx-2
      rounded-md
    `}
  }
`;

const SubmitForm = () => {
  const [isPosting, setIsPosting] = useState<Boolean>(false);
  const setIsPostingHandler = (result: boolean) => {
    setIsPosting(result);
  };

  const { posts, updatePostsState, setPosts } = usePostsContext();
  const [postTitle, setPostTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [isReadyToPost, setIsReadyToPost] = useState(false);

  const isYoutubeUrl = (value: string) => {
    const urlRegex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;
    return urlRegex.test(value);
  };

  const [addPost, { data, loading, error }] = useMutation(ADD_POST);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const hasTitle = postTitle !== "";
    const hasUrl = isYoutubeUrl(youtubeUrl);
    const hasDescription = postDescription !== "";

    if (!hasTitle || !hasUrl || !hasDescription) {
      alert("missing something");
    }

    if (hasTitle && hasUrl && hasDescription) {
      setIsReadyToPost(true);
      // console.log({
      //   "Post title: ": postTitle,
      //   "Post url: ": youtubeUrl,
      //   "Post description: ": postDescription,
      // });

      try {
        const returnedData = await addPost({
          variables: {
            title: postTitle,
            youtube_url: youtubeUrl,
            description: postDescription,
          },
        });
        //console.log("This is the return data after add post: ")
        //console.log(returnedData);
        const returnedPost = returnedData.data.addPost;
        //console.log(returnedPost)
        returnedPost.author = returnedPost.author[0];
        //console.log(returnedPost)
        // console.log("in the submit form fc, returnedPost:")
        // console.log(returnedPost)

        let updatedPosts = [returnedPost, ...posts];
        setPosts(updatedPosts);

        //updatePostState(returnedPost);
        //console.log(returnedPost)
      } catch (err) {
        console.log("This is the addPost error: " + err);
      }
      setIsSubmited(true);
      setIsPosting(false);
      setPostTitle("");
      setYoutubeUrl("");
      setPostDescription("");
      setIsReadyToPost(false);
    }
  };

  return (
    <FormContainer>
      <SubmissionForm>
        {isSubmited && (
          <div className="inpput-notification">
            <p>Posted!</p>
          </div>
        )}
        {!isPosting && (
          <div>
            <input
              onClick={() => {
                setIsPostingHandler(true);
                setIsSubmited(false);
              }}
              type="text"
              placeholder="Feeling like to post something today?"
            />
          </div>
        )}
        {isPosting && (
          <div>
            <label htmlFor="title">Title</label>
            <input
              onClick={() => {
                setIsPostingHandler(true);
              }}
              type="text"
              id="title"
              placeholder="What't the title of your post?"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>
        )}
        {isPosting && (
          <div>
            <label htmlFor="url">Link</label>
            <input
              type="text"
              id="url"
              placeholder="What's the link address"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </div>
        )}
        {isPosting && (
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Say something?"
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
            />
          </div>
        )}
        {isPosting && (
          <span>
            <button onClick={handleSubmit}>Post</button>
            <button
              onClick={() => {
                setIsPostingHandler(false);
              }}
            >
              Cancel
            </button>
          </span>
        )}
      </SubmissionForm>
    </FormContainer>
  );
};

export default SubmitForm;
