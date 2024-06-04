import './ProductModal.css';
import { ImageCarousel } from '../swiper/Swiper';
import { Image } from '@commercetools/platform-sdk';

interface IProductModalProps {
  // src: string;
  // alt: string;
  images: Image[];
  onClick: () => void;
  currentIndex: number;
}

export const ProductModal = ({ images, onClick, currentIndex }: IProductModalProps): JSX.Element => {
  return (
    <div className='product-modal__container'>
      <div className='product-modal'>
        <button
          className='product-modal__btn'
          onClick={onClick}
          title='close modal'
        >
          X
        </button>
        <div className='product-modal__img-container'>
          {images.length > 1 ? (
            <ImageCarousel
              currentIndex={currentIndex}
              images={images}
            />
          ) : (
            <img
              className='product-modal__img'
              src={images[0].url || ''}
              alt={images[0].label || ''}
            />
          )}
        </div>
      </div>
    </div>
  );
};
