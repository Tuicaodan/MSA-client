import { Link } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useAuthContext } from "../../../../context/AuthContext";
import { usePostsContext } from "../../../../context/PostsContext";
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "../../../../api/Mutations";

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

const InfoContainer = styled.div`
  ${tw`
      w-full
      flex
      flex-col
      justify-center
      my-2
  `}
`;

const PostInfo = styled.div`
  ${tw`
      w-full
      flex
      flex-col
      justify-start
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
    my-2
    text-justify
      text-sm
    `}
  }
`;

const AuthorInfo = styled.div`
  ${tw`
      w-full
      flex
      flex-row
      justify-start
      hover:text-gray-400
  `}
`;

const Image = styled.div`
  ${tw`
    h-10
    w-10
    rounded-full
    my-2
    mr-2
    overflow-hidden
`}
`;
const Username = styled.div`
  ${tw`
    my-auto
`}
`;

const PostSectionContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-col
    mt-4
  `}
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
    `}
  }
  h6:hover {
    ${tw`
      text-gray-500
    `}
  }
`;

const SinglePostInfo = ({ postInfo, authorInfo }: any) => {
  const date = new Date(parseInt(postInfo.createdAt)).toLocaleDateString();

  const [isEditing, setIsEditing] = useState(false);
  const [postDescription, setPostDescription] = useState(postInfo.description);

  const { findAndUpdatePostState } = usePostsContext();
  const [updatePost, { data, loading, error }] = useMutation(UPDATE_POST);

  const { authUser } = useAuthContext();

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

  return (
    <InfoContainer>
      <PostInfo>
        <h2>{postInfo.title}</h2>
        <Link to={`/user/${authorInfo.id}`}>
          <AuthorInfo>
            <Image>
              <img src={authorInfo.avatar_url} />
            </Image>
            <Username>{authorInfo.username}</Username>
          </AuthorInfo>
        </Link>

        <h6>Posted on: {date}</h6>
        {!isEditing && (
          <PostSectionContainer>
            <p>{postInfo.description}</p>
          </PostSectionContainer>
        )}
        {isEditing && (
          <PostSectionContainer>
            <textarea
              id="description"
              placeholder={postInfo.description}
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
            />
          </PostSectionContainer>
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
          </ModifyContainer>
        )}
      </PostInfo>
    </InfoContainer>
  );
};

export default SinglePostInfo;
