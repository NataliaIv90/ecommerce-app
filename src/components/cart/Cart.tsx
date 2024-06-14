import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';
import { CartList } from './cartList/CartList';
import { CartFooter } from './cartFooter/CartFooter';
import { EmptyCartMessage } from './emptyCartMessage/EmptyCartMessage';
import { CartSkeleton } from './cartSkeleton/CartSceleton';
import { getActiveCart, clearSnackbarInfo, clearCart as clearCartAction } from '../../store/slices/cartSlice';
import { RootState } from '../../store';
import { Alert, Snackbar } from '@mui/material';
import { Loader } from '../../shared/ui/Loader/Loader';
import { CartDialogModal } from './cartDialogModal/CartDialogModal';

export const Cart = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { cart, snackbarInfo } = useSelector((state: RootState) => state.carts);
  const [open, setOpen] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [dialogModalIsVisible, setDialogModalIsVisible] = useState(false);

  const handleClose = () => {
    setOpen(false);
    dispatch(clearSnackbarInfo());
  };

  const handleClearCart = async (): Promise<void> => {
    setDialogModalIsVisible(false);
    setLoaderVisible(true);
    //eslint-disable-next-line
    await dispatch(clearCartAction() as any);
    setLoaderVisible(false);
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
    if (snackbarInfo.message || snackbarInfo.errorMessage) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
        dispatch(clearSnackbarInfo());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [snackbarInfo, dispatch]);

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
      <CartDialogModal
        handleApproveAction={handleClearCart}
        open={dialogModalIsVisible}
        setOpen={setDialogModalIsVisible}
      />
      <Loader isLoading={loaderVisible} />
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
      <CartFooter
        data={cart}
        clearCart={() => setDialogModalIsVisible(true)}
      />
    </div>
  );
};
