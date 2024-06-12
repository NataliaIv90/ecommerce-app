import { type ProductProjection } from '@commercetools/platform-sdk';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { setRightPrice } from '../../../utils/price-formatting-functions';
import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { Grid, Card, CardMedia } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks';
import { addProductToCart, changeProductQuantityInCart, setLoader } from '../../../store/slices/cartSlice';

const ProductItem: React.FC<{ product: ProductProjection }> = ({ product }) => {
  const language = 'en-US';
  const imageOrPriceNumber = 0;
  const id = product?.id;
  const name = product.name[language];
  const [open, setOpen] = useState(false);

  const cart = useAppSelector((state) => state.carts.cart);
  const dispatch = useAppDispatch();

  // const addToCartFunc = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   if (!isColorBasket) {
  //     addToCart(id, name, amount);
  //   } else {
  //     setOpen(true);
  //   }
  //   setIsColorBasket((prevValue) => !prevValue);
  // };

  const snackbarInfo = useAppSelector((state) => state.carts.snackbarInfo);

  useEffect(() => {
    // eslint-disable-next-line
    if (!!snackbarInfo.message || !!snackbarInfo.errorMessage) {
      setOpen(true);
    }
  }, [snackbarInfo]);

  const removeFromCart = () => {
    dispatch(setLoader());
    idCartProduct && void dispatch(changeProductQuantityInCart({ productId: idCartProduct.id, quantity: 0 }));
  };

  const addToCartFunc = () => {
    dispatch(setLoader());
    if (product?.id) {
      void dispatch(addProductToCart(product.id));
    }
  };

  const idCartProduct = cart.lineItems ? cart.lineItems.find((item) => item.productId === id) : false;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        data-testid={'message'}
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarInfo.errorMessage ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbarInfo.errorMessage ? snackbarInfo.errorMessage : `${snackbarInfo.message}`}
        </Alert>
      </Snackbar>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        sx={{
          position: 'relative',
        }}
      >
        <RouterLink to={id}>
          <Card
            className='catalog-card'
            sx={{ transition: 'all 0.3s', '&:hover': { boxShadow: 10, transform: 'scale(1.05)' } }}
          >
            <CardMedia
              component='img'
              image={
                product.masterVariant.images?.length
                  ? `${product.masterVariant.images[imageOrPriceNumber].url}`
                  : 'https://media.istockphoto.com/id/1216251206/vector/no-image-available-icon.jpg?s=612x612&w=0&k=20&c=6C0wzKp_NZgexxoECc8HD4jRpXATfcu__peSYecAwt0='
              }
              alt={product.name[language]}
              sx={{ maxHeight: 250, minHeight: 250 }}
            />

            <div className='catalog-content'>
              <div>
                <h2 className='catalog-card__title'>{name}</h2>
                <p className='catalog-card__description'>{product.description && product.description[language]}</p>
              </div>
              <div className='catalog-card__info'>
                <span className='catalog-card__price'>
                  {product.masterVariant?.prices
                    ? setRightPrice(
                        product.masterVariant.prices[imageOrPriceNumber].value.centAmount,
                        product.masterVariant.prices[0].discounted?.value.centAmount
                      )
                    : '0.00'}
                </span>
                <div>
                  {idCartProduct ? (
                    <button
                      className='catalog-card__button'
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromCart();
                      }}
                    >
                      <ShoppingCartIcon />
                    </button>
                  ) : (
                    <button
                      className='catalog-card__button'
                      onClick={(e) => {
                        e.preventDefault();
                        addToCartFunc();
                      }}
                    >
                      <ShoppingCartOutlinedIcon />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </RouterLink>
      </Grid>
    </>
  );
};

export default ProductItem;
