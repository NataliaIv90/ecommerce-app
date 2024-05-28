import { useState, useEffect } from 'react';
import { Product } from '@commercetools/platform-sdk';
import { APIInstance } from '../api/API'; // Ensure correct import path

type TFetchProductResponce = {
  product: Product | null;
  errorMsg: string;
  isLoading: boolean;
};

export const useFetchProduct = (productId: string): TFetchProductResponce => {
  const [product, setProduct] = useState<Product | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await APIInstance.getProductById(productId);
        if (result) {
          setProduct(result);
        } else {
          setErrorMsg('Product not found');
        }
      } catch (error) {
        setErrorMsg(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, errorMsg, isLoading };
};
