export const formatPrice = (value: number): string => {
  return `${Math.floor(value / 100)}.${(value % 100).toString().padStart(2, '0')}`;
};

export const setRightPrice = (value: number, discountedValue?: number): JSX.Element => {
  return discountedValue ? (
    <div className='product-price__discount-mode'>
      <div className='old-price'>${formatPrice(value)}</div>
      <div className='new-price'>${formatPrice(discountedValue)}</div>
    </div>
  ) : (
    <>${formatPrice(value)}</>
  );
};
