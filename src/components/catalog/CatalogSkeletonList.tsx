import CatalogSkeleton from './CatalogSkeleton';

const CatalogSkeletonList = (): JSX.Element => {
  return (
    <div className='skeleton-list'>
      {Array.from(new Array(9)).map((_, index) => (
        <CatalogSkeleton key={index} />
      ))}
    </div>
  );
};

export default CatalogSkeletonList;
