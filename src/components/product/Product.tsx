import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchProduct } from '../../hooks/useFetchProduct';
import { ProductCard } from './productCard/ProductCard';
import { ProductCardSkeleton } from '../../shared/ui/skeleton/Skeleton';
// 56dc7aaf-5908-4c0a-8582-a79f2cc94985

export const ProductCoponent = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { product, errorMsg } = useFetchProduct(id || 'default-product-id');

  if (errorMsg) {
    return <p>{errorMsg}</p>;
  }

  return (
    <div>
      {product ? (
        <ProductCard
          name={product.masterData.current.name['en-US'] || ''}
          description={product.masterData.current.description ? product.masterData.current.description['en-US'] : ''}
          images={product.masterData.current.masterVariant.images || []}
          prices={product.masterData.current.masterVariant.price}
          id={product.id}
        />
      ) : (
        <ProductCardSkeleton page='product' />
      )}
    </div>
  );
};
