import './ProductModal.css';
import { ProductMainImageSlider } from '../productMainImageSlider/ProductMainImageSlider';
import { Image } from '@commercetools/platform-sdk';

interface IProductModalProps {
  src: string;
  alt: string;
  onClick: () => void;
  currentImageIndex: number;
  setImageIndex: (index: number) => void;
  images: Image[];
}

export const ProductModal = ({
  src,
  alt,
  onClick,
  currentImageIndex,
  setImageIndex,
  images,
}: IProductModalProps): JSX.Element => {
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
          <img
            className='product-modal__img'
            src={src}
            alt={alt}
          />
        </div>
        {images.length > 1 ? (
          <div className='product-modal__slider-container'>
            <ProductMainImageSlider
              currentImageIndex={currentImageIndex}
              images={images}
              setImageIndex={setImageIndex}
              modal={true}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
