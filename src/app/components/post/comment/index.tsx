import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface IPostInfo {
    id: string;
    title: string;
    description: string;
    createdAt: string;
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




const Comment:FC<InfoProps> = ({ postInfo, authorInfo }: InfoProps) => {


    return (

    )
}

export default Comment;