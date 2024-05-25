import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product as ProductType } from '@commercetools/platform-sdk';
import { APIInstance } from '../../api/API'; // Ensure correct import path

export const Product = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await APIInstance.getProductById(id || 'default-product-id');
        if (result) {
          setProduct(result);
          console.log(result);
        } else {
          setErrorMsg('Product not found');
        }
      } catch (error) {
        setErrorMsg(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    fetchProduct();
  }, [id]);

  if (errorMsg) {
    return <p>{errorMsg}</p>;
  }

  return (
    <div>
      <h1>Product</h1>
      {product ? <p>Product</p> : <p>Loading...</p>}
    </div>
  );
};

// import React, { useEffect, useState, useMemo } from 'react';
// import { useFetchProductByIdQuery } from '../../store/slices/productSlice';
// import { useParams } from 'react-router-dom';

// export const Product = (): JSX.Element => {
//   const { id } = useParams();
//   const { data, error, isLoading, isError } = useFetchProductByIdQuery(id || 'c4411b6d-5bcd-491c-9bba-e80ace9c202f');
//   const [errorMsg, setErrorMsg] = useState('');

//   useEffect(() => {
//     if (isError) {
//       const message = (error as { data?: { message?: string } })?.data?.message ?? '';
//       setErrorMsg(message);
//     }
//   }, [isError, error]);

//   useEffect(() => {
//     console.log('ID changed:', id);
//   }, [id]);

//   const memoizedContent = useMemo(() => {
//     if (isLoading) {
//       return <p>Loading...</p>;
//     }
//     if (errorMsg) {
//       return <p>{errorMsg}</p>;
//     }
//     return (
//       <div>
//         <h1>Product</h1>
//         {data ? <p>Product</p> : null}
//       </div>
//     );
//   }, [isLoading, errorMsg, data]);

//   return memoizedContent;
// };

// export default Product;
