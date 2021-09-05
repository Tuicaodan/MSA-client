import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface PopularPostProps {
  title: string;
  commentNum: number;
}

const PostContainer = styled.div`
  ${tw`
    items-center
    justify-start
    w-full`}
`;

const Title = styled.span`
  ${tw`
    text-sm
    mx-1
    my-auto
`}
`;

const CommentNum = styled.span`
  ${tw`
    text-sm
    text-gray-400
    mx-1
    my-auto
`}
`;

const PopularPost: FC<PopularPostProps> = ({ title, commentNum }) => {
  return (
    <PostContainer>
      <Title>{title}</Title>
      <CommentNum>{commentNum}</CommentNum>
    </PostContainer>
  );
};
export default PopularPost;
