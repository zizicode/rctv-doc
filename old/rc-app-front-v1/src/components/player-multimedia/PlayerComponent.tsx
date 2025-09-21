import { styled } from '@mui/material';
import React from 'react';

interface PlayerProps {
  // ...
}

const PlayerComponent: React.FC<PlayerProps> = () => {
  const iframeAttributes = {
   // src: "https://player.castr.com/live_cc0f90705c7011f0af5a8df4b07bfd36",
    src: "https://player.castr.com/live_cc0f90705c7011f0af5a8df4b07bfd36",
    width: "100%",
    style: { aspectRatio: '16/9', minHeight: '340px' },
    frameBorder: "0",
    scrolling: "no",
    allow: "autoplay",
    allowFullScreen: true,
    webkitallowfullscreen: "true",
    mozallowfullscreen: "true",
    oallowfullscreen: "true",
    msallowfullscreen: "true",
  };

  return (
    <Player>
      <iframe {...iframeAttributes}></iframe>
    </Player>
  );
};

export default PlayerComponent;

const Player = styled('div')`
  width: calc(100% - 10px);
  max-width: 640px; /* Ancho máximo del contenedor del reproductor */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  position: relative;
  margin-left: 50%;
  transform: translateX(-50%);
  background-color: #000;

  .video-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* Misma proporción de aspecto para el video */
    margin: auto;
  }

  video {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
