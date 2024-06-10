import { RootState } from './../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { APIInstance } from './../api/API';
import { setCart, setLoading, setError } from '../store/slices/cartSlice'; // Adjust the path

interface IUseCartResult {
  addProductToCart: (productId: string, variantId: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export async function handleAddProductToCart(productId: string, variantId: number): Promise<void> {
  // Create an anonymous cart
  const cart = await APIInstance.createAnonymousCart();
  if (cart) {
    console.log('Anonymous cart created:', cart);

    // Add a product to the anonymous cart
    const updatedCart = await APIInstance.addProductToAnonymousCart(cart.id, productId, variantId, cart.version);
    if (updatedCart) {
      console.log('Product added to cart:', updatedCart);
    }
  }
}

export async function handleAddProductToUserCart(
  customerId: string,
  productId: string,
  variantId: number
): Promise<void> {
  // Create a user cart
  const cart = await APIInstance.createUserCart(customerId);
  if (cart) {
    console.log('User cart created:', cart);

    // Add a product to the user cart
    const updatedCart = await APIInstance.addProductToUserCart(cart.id, productId, variantId, cart.version);
    if (updatedCart) {
      console.log('Product added to user cart:', updatedCart);
    }
  }
}

const useCart = (): IUseCartResult => {
  const dispatch = useDispatch();
  const customer = useSelector((state: RootState) => state.customers.customer); // Adjust according to your customer slice
  const cart = useSelector((state: RootState) => state.cart.cart);

  const addProductToCart = async (productId: string, variantId: number) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

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
            dispatch(setCart(newCart));
          } else {
            throw new Error('Failed to create a new cart');
          }
        }

        if (cartId && cartVersion !== undefined) {
          const updatedCart = await APIInstance.addProductToUserCart(cartId, productId, variantId, cartVersion);
          if (updatedCart) {
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
            cartId = newCart.id;
            dispatch(setCart(newCart));
          } else {
            throw new Error('Failed to create a new cart');
          }
        }

        if (cartId) {
          const updatedCart = await APIInstance.addProductToAnonymousCart(cartId, productId, variantId, cart.version);
          if (updatedCart) {
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
