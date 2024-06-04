import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setSortingOptions } from '../../../store/slices/productSlice';
import { SortOptions } from '../../../types/Enums';
import FilterListIcon from '@mui/icons-material/FilterList';

const options = Object.keys(SortOptions) as Array<keyof typeof SortOptions>;

export const SortBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const [sort, setSort] = useState(SortOptions.price);

  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as SortOptions);
  };

  useEffect(() => {
    void dispatch(setSortingOptions({ direction: sortDirection, prop: sort }));
    //eslint-disable-next-line
  }, [sort, sortDirection]);
  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl
        variant='standard'
        sx={{ m: 1, ml: 3 }}
      >
        <InputLabel id='sort-label-label'>Sort</InputLabel>
        <Select
          labelId='sort-label-label'
          id='sort-label'
          label='Sort'
          onChange={handleChange}
          value={sort}
          sx={{ width: 200, height: 30 }}
        >
          {options.map((name) => {
            return (
              <MenuItem
                key={name}
                value={SortOptions[name]}
              >
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <IconButton
        aria-label='sort'
        color='primary'
        sx={{ alignSelf: 'flex-end', '&:focus': { outline: 'none' } }}
        onClick={() => (sortDirection === 'asc' ? setSortDirection('desc') : setSortDirection('asc'))}
      >
        <FilterListIcon
          fontSize='medium'
          sx={{
            transform: sortDirection === 'asc' ? 'rotate(-180deg)' : 'rotate(0deg)',
            transition: 'transform 1s ease',
          }}
        />
      </IconButton>
    </Box>
  );
};
