import ProductItem from './ProductItem';
import { useAppSelector } from '../../../hooks/reduxHooks';
import './Product.css';

const ProductList = (): JSX.Element => {
  const products = useAppSelector((state) => state.products.products);

  return (
    <>
      {products.map((product) => (
        <ProductItem
          key={product.key}
          product={product}
        />
      ))}
    </>
  );
};

export default ProductList;
