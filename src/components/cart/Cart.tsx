import React, { useEffect, useState } from 'react';
import './Cart.css';
import { CartList } from './cartList/CartList';
import { CartFooter } from './cartFooter/CartFooter';
import { EmptyCartMessage } from './emptyCartMessage/EmptyCartMessage';
import { CartSkeleton } from './cartSkeleton/CartSceleton';
import {
  getActiveCart,
  clearSnackbarInfo,
  clearCart as clearCartAction,
  applyPromoCode,
} from '../../store/slices/cartSlice';
import { RootState } from '../../store';
import { Alert, Snackbar } from '@mui/material';
import { Loader } from '../../shared/ui/Loader/Loader';
import { CartDialogModal } from './cartDialogModal/CartDialogModal';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

export const Cart = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const cart = useAppSelector((state: RootState) => state.carts.cart);
  const [open, setOpen] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [dialogModalIsVisible, setDialogModalIsVisible] = useState(false);
  const [promocode, setPromocode] = useState<string>('');
  const snackbarInfo = useAppSelector((state) => state.carts.snackbarInfo);

  const handleClose = () => {
    setOpen(false);
  };

  const handleApplyPromoCode = () => {
    setIsLoading(true);
    if (promocode.trim() !== '') {
      //eslint-disable-next-line
      dispatch(applyPromoCode(promocode.toLowerCase().trim()) as any);
    } else {
      setPromocode('');
    }
    setIsLoading(false);
  };

  const handleClearCart = async (): Promise<void> => {
    setIsLoading(true);
    setDialogModalIsVisible(false);
    setLoaderVisible(true);
    //eslint-disable-next-line
    await dispatch(clearCartAction() as any);
    setLoaderVisible(false);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      //eslint-disable-next-line
      await dispatch(getActiveCart() as any);
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (snackbarInfo.message || snackbarInfo.errorMessage) {
      setOpen(true);
    }
  }, [snackbarInfo.errorMessage, snackbarInfo.message]);

  useEffect(() => {
    let clearSnackbarTimeout: NodeJS.Timeout;
    if (open) {
      clearSnackbarTimeout = setTimeout(() => {
        setOpen(false);
      }, 2000);
    } else {
      dispatch(clearSnackbarInfo());
    }
    return () => clearTimeout(clearSnackbarTimeout);
  }, [open, dispatch]);

  if (isLoading) {
    return <CartSkeleton />;
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
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarInfo.errorMessage ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbarInfo.errorMessage ? snackbarInfo.errorMessage : snackbarInfo.message}
        </Alert>
      </Snackbar>
      <CartList lineItems={cart.lineItems} />
      <CartFooter
        promocode={promocode}
        setPromocode={setPromocode}
        handlePromoCode={handleApplyPromoCode}
        data={cart}
        clearCart={() => setDialogModalIsVisible(true)}
      />
    </div>
  );
};
