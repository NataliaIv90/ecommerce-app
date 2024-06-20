import Skeleton from '@mui/material/Skeleton';

export const CartSkeleton = (): JSX.Element => {
  return (
    <div className='cart__skeleton'>
      <Skeleton
        height={40}
        width='60%'
      />
      <div className='cart__skeleton-grid'>
        <div className='cart__skeleton-image'>
          <Skeleton
            variant='rectangular'
            width='100%'
            height={250}
          />
        </div>
        <div className='cart__skeleton-description cart__skeleton-wide-screen'>
          <Skeleton
            height={50}
            width='90%'
          />
          <Skeleton
            height={20}
            width='90%'
          />
          <Skeleton
            height={40}
            width='60%'
          />
        </div>
        <div className='cart__skeleton-total'>
          <Skeleton
            height={20}
            width='90%'
          />
          <Skeleton
            height={40}
            width='100%'
          />
          <Skeleton
            height={40}
            width='100%'
          />
          <Skeleton
            height={40}
            width='100%'
          />
          <Skeleton
            height={40}
            width='100%'
          />
          <Skeleton
            height={40}
            width='100%'
          />
        </div>
      </div>
    </div>
  );
};
