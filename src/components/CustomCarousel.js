import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';

const CustomCarousel = ({ photoUrls }) => {
  const [animating, setAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const next = (length) => {
    if (animating) return;
    const nextIndex = activeIndex === length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = (length) => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  return (
    <Carousel
      activeIndex={activeIndex}
      next={() => {
        next(photoUrls.length);
      }}
      previous={() => {
        previous(photoUrls.length);
      }}
      id="ImageBox"
      interval={false}
    >
      {(photoUrls || []).map((item, index) => (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={index}
        >
          <img
            src={item}
            alt="propertyImage"
            id="CarouselImage"
            className="rounded-2"
          />
        </CarouselItem>
      ))}

      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={() => {
          previous(photoUrls.length);
        }}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={() => {
          next(photoUrls.length);
        }}
      />
    </Carousel>
  );
};
export default CustomCarousel