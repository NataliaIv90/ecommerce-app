import { Image, Price } from '@commercetools/platform-sdk';
import { FC, useState } from 'react';
import { OutlinedButton } from '../../../shared/button/outlinedButton/OutlinedButton';
import './ProductCard.css';
import { ImageGallery } from './imageGallery/ImageGallery';
import { RateStarIcon } from '../../../shared/icons/rateStarIcon/RateStarIcon';
import { QuantityController } from '../../../shared/button/quantityController/QuantityController';

export interface IProductCardProps {
  name: string | '';
  description: string | '';
  images: Image[] | [];
  prices: Price | undefined;
  rate?: number;
  id: string;
}

const addToCart = (id: string, name: string, amount: number) => {
  alert(
    `You want to add to cart:\n id - ${id}, \nname - ${name} \namount - ${amount}. \nThis functionality is on the way`
  );
};

export const ProductCard: FC<IProductCardProps> = ({ name, description, images, id, rate = 5 }): JSX.Element => {
  const [amount, setAmount] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='product-card'>
      <div className='product-card__imageContainer'>
        <img
          className='product-card__image'
          src={images[0].url}
          alt={images[0].label}
        />
      </div>

      <div className='product-card__description'>
        <h1 className='product-card__title'>{name}</h1>
        <div className='product-card__reviews'>
          <div className='product-card__rate'>
            <RateStarIcon />
            <RateStarIcon />
            <RateStarIcon />
            <RateStarIcon />
            <RateStarIcon />
          </div>
          <div className='product-card__reviews-number'>0 reviews</div>
        </div>
        <div className='product-card__price-container'>
          <div className='product-card__price-value'>$ 20</div>
          <div>In stock</div>
        </div>
        <div className='product-card__cart-button-container'>
          <OutlinedButton
            text='Add to cart'
            onClick={() => addToCart(id, name, amount)}
          />
          <QuantityController
            amount={amount}
            setAmount={setAmount}
          />
        </div>

        {description ? (
          <>
            <h3 className='product-card__description-title'>Description:</h3>
            <p className={`product-card__description-text ${isExpanded ? 'expanded' : 'collapsed'}`}>{description}</p>
            <button
              className='product-card__description-btn'
              onClick={handleToggleDescription}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          </>
        ) : null}
      </div>

      {images.length > 1 ? <ImageGallery images={images} /> : null}
    </div>
  );
};
