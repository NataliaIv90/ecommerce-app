import Slider from '@mui/material/Slider';
import { Box } from '@mui/material';
import { setPrice } from '../../store/slices/productSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { SyntheticEvent, useEffect, useState } from 'react';
import { getProductsWithFilter } from '../../store/slices/productSlice';

const sliderSX = {
  maxWidth: '150px',
  pb: 0.5,
  '& .MuiSlider-valueLabel': {
    fontSize: 9,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'rgba(135, 162, 171, 0.7)',
    color: 'white',
    '&:before': {
      display: 'none',
    },
  },
};

export default function RangeSlider(): JSX.Element {
  const price = useAppSelector((state) => state.products.filters.price);
  const [currPrice, setCurrPrice] = useState([price.lower, price.upper]);
  const maxPrice = useAppSelector((state) => state.products.maxPrice);
  const digits = useAppSelector((state) => state.products.digits);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrPrice([price.lower, price.upper]);
  }, [JSON.stringify(price)]);

  const handleChange = (_: Event | SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    dispatch(setPrice({ range: newValue as number[], operand: '=' }));
  };
  return (
    <>
      <Box sx={{ maxWidth: '150px' }}>
        <Slider
          sx={sliderSX}
          value={currPrice}
          onChange={handleChange}
          onChangeCommitted={() => dispatch(getProductsWithFilter())}
          valueLabelDisplay='on'
          size='small'
          marks
          track='inverted'
          max={Number(maxPrice)}
          scale={(value) => value / 10 ** digits}
          step={10 ** digits}
        />
      </Box>
    </>
  );
}
