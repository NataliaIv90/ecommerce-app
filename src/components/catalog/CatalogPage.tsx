import ProductList from './products/ProductList';
import { useAppSelector } from '../../hooks/reduxHooks';
import './products/Product.css';
import Message from '../../shared/ui/Message/Message';
import { MainWrapper } from '../mainWrapper/MainWrapper';
import { useState } from 'react';
import { Filters } from './filters/Filters';
import { Toolbar } from './filters/Toolbar';
import { BreadCrumbs } from './filters/BreadCrumb';
import CatalogSkeletonList from './CatalogSkeletonList';
import { FilterModalWindow } from './filters/FilterModalWindow';
import { Box, Button } from '@mui/material';

const CatalogPage = (): JSX.Element => {
  const isLoading = useAppSelector((state) => state.products.isLoading);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <MainWrapper>
      <section className='catalog'>
        <div className='container'>
          <Button
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={handleOpen}
            variant='contained'
          >
            Filters
          </Button>
          <FilterModalWindow
            open={open}
            setOpen={setOpen}
          />
          <BreadCrumbs />
          <h1 className='catalog__title'>{!isLoading ? 'Choose the bouquet of your dreams!' : ''}</h1>
          <div className='catalog-toolbar'>
            <Toolbar />
          </div>
          <div className='catalog__inner'>
            <div className='catalog-category'>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Filters />
              </Box>
            </div>
            {isLoading ? <CatalogSkeletonList /> : <ProductList />}
          </div>
        </div>
        <Message />
      </section>
    </MainWrapper>
  );
};

export default CatalogPage;
