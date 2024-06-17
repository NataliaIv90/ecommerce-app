import { Cart } from '@commercetools/platform-sdk';
import { formatPrice } from './price-formatting-functions';

export const addToCart = (id: string, name: string, amount: number): void => {
  alert(
    `You want to add to cart:\n id - ${id}, \nname - ${name} \namount - ${amount}. \nThis functionality is on the way`
  );
};

export const calculateTotalPriceBeforeDiscounts = (cart: Cart): number => {
  const totalValue = cart.lineItems.reduce((total, lineItem) => {
    return total + lineItem.price.value.centAmount * lineItem.quantity;
  }, 0);
  return totalValue || 0;
};

export const preparePriceDataForCartFooter = (priceWithDiscount: number, priceWithoutDiscount: number): JSX.Element => {
  const valuesAreEqual = priceWithDiscount === priceWithoutDiscount;
  return (
    <div>
      {!valuesAreEqual ? <p className='price-line-through'> ${formatPrice(priceWithoutDiscount)} </p> : null}
      <p className={!valuesAreEqual ? 'red-text' : ''}> ${formatPrice(priceWithDiscount)} </p>
    </div>
  );
};
