import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

export const CatalogSkeleton = (): JSX.Element => {
  return (
    <>
      <div className='skeleton-card'>
        <Skeleton
          variant='rectangular'
          width='100%'
          height={360}
        />
        <Skeleton
          height={50}
          width='90%'
        />
        <Skeleton
          height={40}
          width='60%'
        />
      </div>
    </>
  );
};

export default CatalogSkeleton;
