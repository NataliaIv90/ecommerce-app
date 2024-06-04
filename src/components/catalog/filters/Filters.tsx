import { CatalogTree } from '../../../shared/ui/catalogTree/CatalogTree';

import { Recycling as RecyclingIcon } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  getCategories,
  getProducts,
  getProductsWithFilter,
  getProductsByCat,
} from '../../../store/slices/productSlice';
import { useEffect, useState } from 'react';

export const Filters = (): JSX.Element => {
  const categories = useAppSelector((state) => state.products.categories);
  const activeCat = useAppSelector((state) => state.products.filters.catId);
  const filters = useAppSelector((state) => state.products.filters);

  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState(activeCat ? activeCat : '');

  const handleAllCategories = () => {
    setSelected('');
    void dispatch(getProducts());
  };

  const handleCatClick = (catId: string) => {
    dispatch(getProductsByCat(catId));
    // dispatch(getProductsWithFilter());
  };

  const loadData = (): void => {
    void dispatch(getCategories());
    void dispatch(getProducts());
  };

  useEffect(() => {
    if (!categories.length) void loadData();
    else void dispatch(getProductsWithFilter());
    //eslint-disable-next-line
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    activeCat ? setSelected(activeCat) : setSelected('');
  }, [activeCat]);

  return (
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
        variant='h5'
        color='#87a2ab'
      >
        Filters
      </Typography>
      <Divider sx={{ mb: 2, mt: 2 }} />

      <Button
        variant='outlined'
        size='small'
        startIcon={<RecyclingIcon />}
        sx={{ '&:focus': { outline: 'none' }, margin: 'auto' }}
        onClick={() => handleAllCategories()}
      >
        Reset
      </Button>
      {categories.length && (
        <CatalogTree
          categories={categories}
          handleClick={handleCatClick}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PriceChangeIcon sx={{ display: 'block', marginInline: 'auto', color: '#87a2ab' }} />
        <RangeSlider />
      </Box> */}
    </Box>
  );
};
