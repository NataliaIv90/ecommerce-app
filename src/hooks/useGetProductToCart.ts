import { RootState } from './../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { APIInstance } from './../api/API';
import { setCart, setLoading, setError, setCartIds } from '../store/slices/cartSlice'; // Adjust the path
import { Customer } from '@commercetools/platform-sdk';

interface IUseCartResult {
  addProductToCart: (productId: string, variantId: number, customer: Customer | null) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useCart = (): IUseCartResult => {
  const dispatch = useDispatch();
  // const customer = useSelector((state: RootState) => state.customers.customer); // Adjust according to your customer slice
  const cart = useSelector((state: RootState) => state.cart.cart);

  const addProductToCart = async (productId: string, variantId: number, customer: Customer | null) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    let cartIdsArr: string[] = [];

    try {
      if (customer && customer.id) {
        // Handle customer cart
        let cartId = cart?.id;
        let cartVersion = cart?.version;

        if (!cartId) {
          const newCart = await APIInstance.createUserCart(customer.id);
          if (newCart) {
            cartId = newCart.id;
            cartVersion = newCart.version;
            cartIdsArr = newCart.lineItems.map((el) => el.productId);
            dispatch(setCartIds(cartIdsArr));
            dispatch(setCart(newCart));
          } else {
            throw new Error('Failed to create a new cart');
          }
        }

        if (cartId && cartVersion !== undefined) {
          const updatedCart = await APIInstance.addProductToUserCart(cartId, productId, variantId, cartVersion);
          if (updatedCart) {
            cartIdsArr = updatedCart.lineItems.map((el) => el.productId);
            dispatch(setCartIds(cartIdsArr));
            dispatch(setCart(updatedCart));
          } else {
            throw new Error('Failed to add product to the cart');
          }
        }
      } else {
        // Handle anonymous cart
        let cartId = cart?.id;

        if (!cartId) {
          const newCart = await APIInstance.createAnonymousCart();
          if (newCart) {
            cartIdsArr = newCart.lineItems.map((el) => el.productId);
            dispatch(setCartIds(cartIdsArr));
            cartId = newCart.id;
            dispatch(setCart(newCart));
          } else {
            throw new Error('Failed to create a new cart');
          }
        }

        if (cartId) {
          const updatedCart = await APIInstance.addProductToAnonymousCart(cartId, productId, variantId, cart.version);
          if (updatedCart) {
            cartIdsArr = updatedCart.lineItems.map((el) => el.productId);
            dispatch(setCartIds(cartIdsArr));
            dispatch(setCart(updatedCart));
          } else {
            throw new Error('Failed to add product to the cart');
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError('An unknown error occurred'));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    addProductToCart,
    loading: useSelector((state: RootState) => state.cart.loading),
    error: useSelector((state: RootState) => state.cart.error),
  };
};

export default useCart;
