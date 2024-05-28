import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

export const CatalogSkeleton = (): JSX.Element => {
  return (
    <>
      <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
        <Skeleton
          variant='rectangular'
          width='100%'
          height={432}
        />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width='60%' />
        </Box>
      </Box>
    </>
  );
};

export default CatalogSkeleton;
