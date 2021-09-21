import React, { FC, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
import { usePostsContext } from "../../../../context/PostsContext";
import { useMutation } from "@apollo/client";
import { UPDATE_POST, DELECT_POST } from "../../../../api/Mutations";

interface IPostInfo {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  youtube_url: string;
}

interface IAuthorInfo {
  id: string;
  username: string;
  avatar_url: string;
}

interface InfoProps {
  postInfo: IPostInfo;
  authorInfo: IAuthorInfo;
}

const SectionContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-col
    my-4
    px-5
  `}
`;

const InfoContainer = styled.div`
  ${tw`
      w-full
      flex
      flex-col
      justify-start
      ml-0
      
      
  `}
  h2 {
    ${tw`
      font-bold
    `}
  }
  h6 {
    ${tw`
      text-gray-400
    `}
  }
  p {
    ${tw`
    text-justify
      text-sm
    `}
  }
  textarea {
    ${tw`
      h-36
      text-sm
      text-justify
    `}
  }
`;

const ModifyContainer = styled.div`
  ${tw`
  w-full
  flex
  flex-row
  justify-end
`}
  h6 {
    ${tw`
      text-gray-400
      text-sm
      text-right
      cursor-pointer
      ml-3
      border-b-2
    `}
  }
  h6:hover {
    ${tw`
      text-gray-500
    `}
  }
`;

const Info: FC<InfoProps> = ({ postInfo, authorInfo }: InfoProps) => {
  const date = new Date(parseInt(postInfo.createdAt)).toLocaleDateString();

  const [isEditing, setIsEditing] = useState(false);
  const [postDescription, setPostDescription] = useState(postInfo.description);

  const { findAndUpdatePostState, findAndDeletePostState } = usePostsContext();
  const [updatePost] = useMutation(UPDATE_POST);
  const [deletePost] = useMutation(DELECT_POST);

  const { authUser } = useAuthContext();
  const history = useHistory();

  const handleEditClick = (event: any) => {
    setPostDescription("");
    setPostDescription(postInfo.description);
    setIsEditing(true);
  };

  const handleCancelClick = (event: any) => {
    setPostDescription(postInfo.description);
    setIsEditing(false);
  };

  const handleSaveClick = async (event: any) => {
    const hasDescription = postDescription !== "";

    if (!hasDescription) {
      alert("missing description");
    }

    try {
      const returnedData = await updatePost({
        variables: {
          id: postInfo.id,
          title: postInfo.title,
          youtube_url: postInfo.youtube_url,
          description: postDescription,
        },
      });
      const returnedPost = returnedData.data.updatePost;
      returnedPost.author = returnedPost.author[0];

      findAndUpdatePostState(returnedPost);
    } catch (err) {
      console.log("This is the updatePost error: " + err);
    }
    setIsEditing(false);
  };

  const handleDeleteClick = async (event: any) => {
    try {
      const returnedData = await deletePost({
        variables: {
          id: postInfo.id,
        },
      });
      const returnedPost = returnedData.data.deletePost;

      if (returnedPost == "Post deleted") {
        findAndDeletePostState(postInfo.id);
        let path = `/home`;
        history.push(path);
      }
    } catch (err) {
      console.log("This is the deletePost error: " + err);
    }
  };

  return (
    <SectionContainer>
      {!isEditing && (
        <InfoContainer>
          <h2>{postInfo.title}</h2>
          <h6>Posted on: {date}</h6>
          <p>{postInfo.description}</p>
        </InfoContainer>
      )}
      {isEditing && (
        <InfoContainer>
          <h2>{postInfo.title}</h2>
          <h6>Posted on: {date}</h6>
          <textarea
            id="description"
            placeholder={postInfo.description}
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
          />
        </InfoContainer>
      )}
      {authUser.userId == authorInfo.id && (
        <ModifyContainer>
          {!isEditing && <h6 onClick={handleEditClick}>Edit</h6>}
          {isEditing && (
            <>
              <h6 onClick={handleSaveClick}>Save</h6>
              <h6 onClick={handleCancelClick}>Cancel</h6>
            </>
          )}
          <h6 onClick={handleDeleteClick}>Delete Post</h6>
        </ModifyContainer>
      )}
    </SectionContainer>
  );
};

export default Info;
