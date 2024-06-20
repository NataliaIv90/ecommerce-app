import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks';
import { Pagination as MuiPagination } from '@mui/material';
import { setCurrentPage } from '../../../store/slices/productSlice';

export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const total = useAppSelector((state) => state.products.total);
  const page = useAppSelector((state) => state.products.currentPage);
  const limit = useAppSelector((state) => state.products.limit);
  const pageTotal = Math.ceil(total / limit) ? Math.ceil(total / limit) : 1;

  const handleChange = (_: React.ChangeEvent<unknown>, page: number): void => {
    void dispatch(setCurrentPage({ page }));
  };

  return (
    <MuiPagination
      count={pageTotal}
      sx={{ alignSelf: 'center' }}
      onChange={handleChange}
      page={page}
    />
  );
};
