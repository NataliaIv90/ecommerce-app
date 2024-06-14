import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';
import { CartList } from './cartList/CartList';
import { CartFooter } from './cartFooter/CartFooter';
import { EmptyCartMessage } from './emptyCartMessage/EmptyCartMessage';
import { CartSkeleton } from './cartSkeleton/CartSceleton';
import { getActiveCart, clearSnackbarInfo } from '../../store/slices/cartSlice';
import { RootState } from '../../store';
import { Alert, Snackbar } from '@mui/material';

export const Cart = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { cart, snackbarInfo } = useSelector((state: RootState) => state.carts);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    dispatch(clearSnackbarInfo());
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      //eslint-disable-next-line
      await dispatch(getActiveCart() as any);
      dispatch(clearSnackbarInfo());
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (Boolean(snackbarInfo.message) || Boolean(snackbarInfo.errorMessage)) {
      setOpen(true);
    }
  }, [snackbarInfo]);

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (snackbarInfo.errorMessage) {
    return <EmptyCartMessage message={snackbarInfo.errorMessage} />;
  }

  if (!cart || !cart.lineItems || cart.lineItems.length === 0) {
    return <EmptyCartMessage message='' />;
  }

  return (
    <div className='cart'>
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
      <CartList lineItems={cart.lineItems} />
      <CartFooter data={cart} />
    </div>
  );
};
