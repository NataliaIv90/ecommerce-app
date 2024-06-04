import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Swiper.css';

interface IImageCarousel {
  images: { url: string }[];
  currentIndex: number;
}

const renderSwiperSlides = (images: { url: string }[], currentIndex: number) => {
  return images.map((image, index) => (
    <SwiperSlide key={index}>
      <div className='image-container'>
        <img
          src={image.url}
          alt={`Slide ${index + 1}`}
          className='carousel-image'
          slot={index === currentIndex ? 'container-start' : undefined}
        />
      </div>
    </SwiperSlide>
  ));
};

export const ImageCarousel: FC<IImageCarousel> = ({ images, currentIndex }) => {
  return (
    <div className='carousel-wrapper'>
      <div className='image-carousel'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          initialSlide={currentIndex}
          navigation={true}
        >
          {renderSwiperSlides(images, currentIndex)}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageCarousel;
