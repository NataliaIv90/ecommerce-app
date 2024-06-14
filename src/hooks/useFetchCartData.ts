import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust the path as needed
import { APIInstance } from '../api/API';
import { Cart } from '@commercetools/platform-sdk/dist/declarations/src/generated';

interface FetchCartDataResult {
  isLoading: boolean;
  cartData: Cart | null;
  error: string;
}

export const useFetchCartData = (): FetchCartDataResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState<Cart | null>(null);
  const [error, setError] = useState('');

  const cartId = useSelector((state: RootState) => state.carts.cart.id);
  const totalPrice = useSelector((state: RootState) => state.carts.cart.totalPrice);

  useEffect(() => {
    const fetchCartData = async () => {
      setIsLoading(true);
      setError('');

      try {
        if (!cartId) {
          setIsLoading(false);
          return;
        }

        const cart = await APIInstance.getCartById(cartId);
        setCartData(cart);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching cart data');
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, [cartId, totalPrice]);

  return { isLoading, cartData, error };
};
