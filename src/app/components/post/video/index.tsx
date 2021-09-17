import React, { useEffect, FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import PropTypes from "prop-types";
const getYouTubeID = require("get-youtube-id");

interface VideoProps {
  youtube_url: string | null;
}

const VideoContainer = styled.div`
  ${tw`
      w-full
      flex
  `}
  iframe {
    ${tw`
      w-full
      h-64
      md:h-96
    `}
  }
`;

const Video: FC<VideoProps> = ({ youtube_url }) => {
  youtube_url = youtube_url ? youtube_url : null;
  const embedId = getYouTubeID(youtube_url);
  const embedUrl = `https://www.youtube.com/embed/${embedId}`;

  //console.log(embedId)

  return (
    <VideoContainer>
      {!embedId && "Somthing wrong with the youtube link!"}
      {embedId && (
        <iframe
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      )}
    </VideoContainer>
  );
};

export default Video;
