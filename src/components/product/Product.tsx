import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchProduct } from '../../hooks/useFetchProduct';
import { ProductCard } from './productCard/ProductCard';
import { ProductCardSkeleton } from '../../shared/ui/skeleton/Skeleton';
import { ErrorPage } from '../errorPage/ErrorPage';
import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addProductToCart, changeProductQuantityInCart, setLoader } from '../../store/slices/cartSlice';
import { scrollToTop } from '../../utils/scrollToTop';

export const ProductCoponent = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { product, errorMsg } = useFetchProduct(id || 'default-product-id');
  const [open, setOpen] = useState(false);
  const snackbarInfo = useAppSelector((state) => state.carts.snackbarInfo);
  const cart = useAppSelector((state) => state.carts.cart);
  const dispatch = useAppDispatch();
  const [lineItemId, setLineItemId] = useState('');
  const [itemIsInCart, setItemIsInCart] = useState(false);
  scrollToTop();

  useEffect(() => {
    setLineItemId('');
    setItemIsInCart(false);

    cart.lineItems.forEach((el) => {
      if (id === el.productId) {
        setLineItemId(el.id);
        setItemIsInCart(true);
      }
    });
  }, [cart.lineItems, product?.id, lineItemId, id]);

  if (errorMsg) {
    return <ErrorPage message={errorMsg} />;
  }

  const setTimer = () => {
    let timer: NodeJS.Timeout;
    if (open) {
      timer = setTimeout(() => {
        setOpen(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  };

  const removeFromCart = (): void => {
    dispatch(setLoader());

    if (product && product.id) {
      dispatch(changeProductQuantityInCart({ productId: lineItemId, quantity: 0 }))
        .then(() => setOpen(true))
        .catch(() => setOpen(true))
        .finally(() => setTimer());
    }
  };

  const addToCart = () => {
    dispatch(setLoader());
    if (product && product.id) {
      void dispatch(addProductToCart(product.id))
        .then(() => setOpen(true))
        .catch(() => setOpen(true))
        .finally(() => setTimer());
    }

    setTimer();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        data-testid={'message'}
        open={open}
        autoHideDuration={1000}
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
      {product ? (
        <ProductCard
          name={product.masterData.current.name['en-US'] || ''}
          description={product.masterData.current.description ? product.masterData.current.description['en-US'] : ''}
          images={product.masterData.current.masterVariant.images || []}
          prices={product.masterData.current.masterVariant.prices}
          id={product.id}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          lineItemId={lineItemId}
          itemIsInCart={itemIsInCart}
        />
      ) : (
        <ProductCardSkeleton page='product' />
      )}
    </div>
  );
};
