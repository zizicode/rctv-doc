import React from 'react';
import { Container } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface carouselVideoPlayerProps{
    items: { url: string }[];
}

const carouselVideoPlayer: React.FC <carouselVideoPlayerProps> = ({items}) => {
  return (
    <Container>
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        emulateTouch={true}
        dynamicHeight={false}
      >
        {items.map((item, index) => (
          <div key={index}>
            <iframe
              width="100%"
              height="315"
              src={item.url}
              title={`YouTube Video ${index + 1}`}
            ></iframe>
          </div>
        ))}
      </Carousel>
    </Container>
  );
};

export default carouselVideoPlayer;
