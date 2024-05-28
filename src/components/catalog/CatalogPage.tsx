import ProductList from './products/ProductList';
import { useAppSelector } from '../../hooks/reduxHooks';
import './products/Product.css';
import Message from '../../shared/ui/Message/Message';
import CatalogSkeleton from './CatalogSkeleton';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { getProducts } from '../../store/slices/productSlice';
import { useEffect } from 'react';

const CatalogPage = (): JSX.Element => {
  const isLoading = useAppSelector((state) => state.products.isLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getProducts());
    //eslint-disable-next-line
  }, []);
  return (
    <section className='catalog'>
      <div className='container'>
        <h1 className='catalog__title'>{!isLoading ? 'Choose the bouquet of your dreams!' : ''}</h1>
        <div className='catalog-list'>
          {isLoading ? Array.from(new Array(9)).map((_, index) => <CatalogSkeleton key={index} />) : <ProductList />}
        </div>
      </div>
      <Message />
    </section>
  );
};

export default CatalogPage;
