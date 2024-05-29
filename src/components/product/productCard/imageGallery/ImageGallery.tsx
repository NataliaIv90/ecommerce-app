import React from 'react';
import { Image } from '@commercetools/platform-sdk';
import './ImageGallery.css';

interface ImageGalleryProps {
  images: Image[];
  // onClick: (index: number) => void;
  // currentIndex: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => (
  <div className='product-card__imagesGallery'>
    <h2 className='product-card__gallery-title'>More images: </h2>
    <div className='product-card__imagesGallery__images-container'>
      {images.map((image, index) => (
        // <button
        //   className='image-gallery-btn'
        //   key={index}
        //   // onClick={() => onClick(index)}
        // >
        <img
          className='product-card__image-gallery-item'
          src={image.url}
          alt={image.label || `Image ${index + 1}`}
          key={index}
        />
        // </button>
      ))}
    </div>
  </div>
);
