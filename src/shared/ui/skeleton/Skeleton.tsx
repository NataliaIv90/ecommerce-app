import './Skeleton.css';

const rightSideItemsClassnames = ['narrow', 'narrow', 'narrow', 'medium'];

interface ISkeletonProps {
  page: 'product';
}

export const ProductCardSkeleton = ({ page }: ISkeletonProps): JSX.Element => {
  let elements: string[];

  switch (page) {
    case 'product':
      elements = rightSideItemsClassnames;
      break;
    default:
      elements = ['product-card-skeleton__section-narrow'];
      break;
  }

  return (
    <div className='product-card-skeleton'>
      <div className='product-card-skeleton-item image'></div>
      <div className='product-card-skeleton__right-section'>
        {elements.map((el, index) => (
          <div
            className={`product-card-skeleton-item ${el}`}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
};
