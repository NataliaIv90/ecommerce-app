import { Slider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setPrice } from '../../store/slices/productSlice';
import { SyntheticEvent, useEffect, useState } from 'react';

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

export const RangeSlider: React.FC = () => {
  const price = useAppSelector((state) => state.products.filters.price);
  const [currPrice, setCurrPrice] = useState([price.lower, price.upper]);
  const maxPrice = useAppSelector((state) => state.products.maxPrice);
  const digits = useAppSelector((state) => state.products.digits);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrPrice([price.lower, price.upper]);
    //eslint-disable-next-line
  }, [JSON.stringify(price)]);

  const handleChangeFinish = () => {
    void dispatch(setPrice({ range: currPrice, operand: '=' }));
  };

  const handleChange = (_: Event | SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    setCurrPrice(newValue as number[]);
  };

  return (
    <Slider
      sx={sliderSX}
      value={currPrice}
      onChange={handleChange}
      onChangeCommitted={handleChangeFinish}
      valueLabelDisplay='on'
      size='small'
      marks
      track='inverted'
      max={Number(maxPrice)}
      scale={(value) => value / 10 ** digits}
      step={10 ** digits}
    />
  );
};
