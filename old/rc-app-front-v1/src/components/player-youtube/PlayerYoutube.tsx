import { styled } from '@mui/material';
import React from 'react';

interface PlayerYoutubeProps {
    embed: string;
}

const PlayerYoutube: React.FC <PlayerYoutubeProps> = ({embed}) => {
  return (
    <VideoContainer>
      <ResponsiveIframe
        src={embed}
        title="Multimedia"
        allowFullScreen
      />
    </VideoContainer>
  )
}

export default PlayerYoutube;


const VideoContainer = styled('div')`
  position: relative;
  padding-bottom: 56.25%; /* Proporción 16:9 para el video */
  height: 0;
  overflow: hidden;
  max-width: 100%;
`;

const ResponsiveIframe = styled('iframe')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;