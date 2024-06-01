import { type ProductProjection } from '@commercetools/platform-sdk';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';
import { addToCart } from '../../../utils/addToCart';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ProductItem: React.FC<{ product: ProductProjection }> = ({ product }) => {
  const language = 'en-US';
  const imageOrPriceNumber = 0;
  const id = product.id;
  const name = product.name[language];
  // eslint-disable-next-line
  const [amount, setAmount] = useState<number>(1);
  const [isColorBasket, setIsColorBasket] = useState(false);
  const [open, setOpen] = useState(false);

  const addToCartFunc = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isColorBasket) {
      addToCart(id, name, amount);
    } else {
      setOpen(true);
    }
    setIsColorBasket((prevValue) => !prevValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <>
      <Button
        color='secondary'
        size='small'
        onClick={handleClose}
      />
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  );
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message='Do you want to remove from cart?'
        action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <RouterLink
        to={id}
        className='catalog-card'
      >
        {product ? (
          <img
            className='catalog-card__image'
            src={
              product.masterVariant.images?.length
                ? `${product.masterVariant.images[imageOrPriceNumber].url}`
                : 'https://media.istockphoto.com/id/1216251206/vector/no-image-available-icon.jpg?s=612x612&w=0&k=20&c=6C0wzKp_NZgexxoECc8HD4jRpXATfcu__peSYecAwt0='
            }
            alt={name}
          />
        ) : (
          <Skeleton
            variant='rectangular'
            width={210}
            height={118}
          />
        )}

        <h2 className='catalog-card__title'>{name}</h2>
        <p className='catalog-card__description'>{product.description && product.description[language]}</p>
        <div className='catalog-card__info'>
          <span className='catalog-card__price'>
            ${product.masterVariant.prices && product.masterVariant.prices[imageOrPriceNumber].value.centAmount}
          </span>
          <div>
            <button
              className='catalog-card__button'
              onClick={addToCartFunc}
            >
              {isColorBasket ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />}
            </button>
          </div>
        </div>
      </RouterLink>
    </>
  );
};

export default ProductItem;
