import './ProductModal.css';

interface IProductModalProps {
  src: string;
  alt: string;
  onClick: () => void;
}

export const ProductModal = ({ src, alt, onClick }: IProductModalProps): JSX.Element => {
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
      </div>
    </div>
  );
};
