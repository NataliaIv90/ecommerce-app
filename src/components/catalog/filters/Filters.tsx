import { CatalogTree } from '../../../shared/ui/catalogTree/CatalogTree';
import { RangeSlider } from '../../../shared/ui/Slider';
import { Recycling as RecyclingIcon, PriceChange as PriceChangeIcon } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  getCategories,
  getProducts,
  getProductsWithFilter,
  resetFilter,
  setCurrentPage,
} from '../../../store/slices/productSlice';
import { useEffect, useState } from 'react';

export const Filters = (): JSX.Element => {
  const categories = useAppSelector((state) => state.products.categories);
  const activeCat = useAppSelector((state) => state.products.filters.catId);
  const filters = useAppSelector((state) => state.products.filters);
  const sort = useAppSelector((state) => state.products.sort);
  const search = useAppSelector((state) => state.products.search);
  const page = useAppSelector((state) => state.products.currentPage);

  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState(activeCat ? activeCat : '');

  const handleAllCategories = () => {
    dispatch(resetFilter());
    setSelected('');
  };

  const handleCatClick = (catId: string) => {
    // dispatch(getProductsByCat(catId));
    dispatch(getProductsWithFilter());
  };

  const loadData = (): void => {
    void dispatch(getCategories());
    void dispatch(getProducts());
  };

  useEffect(() => {
    if (!categories.length) void loadData();
    else void dispatch(getProductsWithFilter());

    //eslint-disable-next-line
  }, [JSON.stringify(filters), JSON.stringify(sort), search, page]);

  useEffect(() => {
    void dispatch(setCurrentPage({ page: 1 }));
    //eslint-disable-next-line
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    activeCat ? setSelected(activeCat) : setSelected('');
  }, [activeCat]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#f6f3f7',
          width: '200px',
          borderRadius: 5,
          pt: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant='h6'
          color='#87a2ab'
          padding='15px'
        >
          Filters
        </Typography>
        <Divider sx={{ mb: 2, mt: 2 }} />

        <Button
          variant='outlined'
          size='small'
          startIcon={<RecyclingIcon />}
          sx={{ '&:focus': { outline: 'none' }, marginLeft: 'auto', marginRight: '20px' }}
          onClick={() => handleAllCategories()}
        >
          Reset
        </Button>
        {categories.length !== 0 && (
          <CatalogTree
            categories={categories}
            handleClick={handleCatClick}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        <Divider
          component='li'
          sx={{ mb: 2, mt: 2 }}
          textAlign='left'
        >
          <Typography
            variant='h6'
            color='#60677b'
          >
            Filter options
          </Typography>
        </Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '50px' }}>
          <PriceChangeIcon sx={{ display: 'block', color: '#87a2ab' }} />
          <RangeSlider />
        </Box>
      </Box>
    </>
  );
};
