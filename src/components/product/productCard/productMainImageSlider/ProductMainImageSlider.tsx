import React, { FC } from 'react';
import { Image } from '@commercetools/platform-sdk';
import SvgCircleIcon from '../../../../shared/icons/circle/CircleIcon';

interface IProductMainImageSliderProps {
  currentImageIndex: number;
  images: Image[];
  setImageIndex: (index: number) => void;
  modal?: boolean;
}

export const ProductMainImageSlider: FC<IProductMainImageSliderProps> = ({
  images,
  setImageIndex,
  currentImageIndex,
  modal,
}) => (
  <ul className='product-card__main-slider-container'>
    {images.map((__, index) => (
      <li key={index}>
        <button
          className='product-card__main-image-slider'
          onClick={() => setImageIndex(index)}
        >
          <SvgCircleIcon
            modal={modal}
            selected={currentImageIndex === index}
          />
        </button>
      </li>
    ))}
  </ul>
);
