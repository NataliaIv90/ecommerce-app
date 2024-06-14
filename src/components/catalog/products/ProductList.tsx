import ProductItem from './ProductItem';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { Grid } from '@mui/material';
import './Product.css';
import { ProductProjection } from '@commercetools/platform-sdk';
import noProducts from '../../../assets/png/no-product-found.png';
import { Pagination } from '../filters/Pagination';

const ProductList = (): JSX.Element => {
  const products = useAppSelector((state) => state.products.products);
  const isLoading = useAppSelector((state) => state.products.isLoading);

  return (
    <>
      <div>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          padding={{ xs: 0, sm: 2 }}
        >
          {products.length
            ? products.map((product: ProductProjection) => (
                <ProductItem
                  key={product.key}
                  product={product}
                />
              ))
            : !isLoading && (
                <Grid item>
                  <img
                    src={noProducts}
                    alt='No products'
                    loading='lazy'
                    width='100%'
                  />
                </Grid>
              )}
        </Grid>
        <div className='pagination-wrapper'>
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default ProductList;
