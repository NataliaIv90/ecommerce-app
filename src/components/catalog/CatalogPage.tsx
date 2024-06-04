import ProductList from './products/ProductList';
import { useAppSelector } from '../../hooks/reduxHooks';
import './products/Product.css';
import Message from '../../shared/ui/Message/Message';
import CatalogSkeleton from './CatalogSkeleton';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { getProducts, getCategories } from '../../store/slices/productSlice';
import { useEffect } from 'react';
import { MainWrapper } from '../mainWrapper/MainWrapper';
import { useState } from 'react';
// import { CatalogTree } from '../../shared/ui/catalogTree/CatalogTree';
import { Box } from '@mui/material';
// import RangeSlider from '../../shared/ui/Slider';
// import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { Filters } from './filters/Filters';

const CatalogPage = (): JSX.Element => {
  const isLoading = useAppSelector((state) => state.products.isLoading);
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.products.categories);
  // eslint-disable-next-line
  const [selected, setSelected] = useState('');

  const loadData = (): void => {
    void dispatch(getCategories());
    void dispatch(getProducts());
  };

  const getCategoryList = (): void => {
    void loadData();
  };

  useEffect(() => {
    void loadData();
    // eslint-disable-next-line
  }, []);

  const handleAllCategories = () => {
    loadData();
    setSelected('');
  };

  // const handleCatClick = (catId: string) => dispatch(getProductsByCat('36da2b34-eccd-4a91-af76-c9c0b49fa007'));
  // const handleCatClick = (catId: string) => dispatch(getProductsByCat(catId));

  return (
    <MainWrapper>
      <section className='catalog'>
        <div className='container'>
          <h1 className='catalog__title'>{!isLoading ? 'Choose the bouquet of your dreams!' : ''}</h1>
          <button onClick={getCategoryList}>Load Categories list</button>
          {categories.length !== 0 && (
            <div>
              <button onClick={() => handleAllCategories()}>All</button>
              <Box
                sx={{
                  backgroundColor: '#f6f3f7',
                  flexBasis: '25%',
                  maxWidth: '300px',
                  borderRadius: '1%',
                  pt: 1,
                }}
              >
                {/* {categories.length !== 0 && (
                  <CatalogTree
                    categories={categories}
                    handleClick={handleCatClick}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )} */}
                <Filters />
              </Box>
            </div>
          )}
          {/* <br />
          <div>
            <Box>
              <PriceChangeIcon sx={{ display: 'block', marginInline: 'auto', color: '#87a2ab' }} />
              <RangeSlider />
            </Box>
          </div> */}
          <div className='catalog-list'>
            {isLoading ? Array.from(new Array(9)).map((_, index) => <CatalogSkeleton key={index} />) : <ProductList />}
          </div>
        </div>
        <Message />
      </section>
    </MainWrapper>
  );
};

export default CatalogPage;
