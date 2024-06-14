import { FC } from 'react';
import './QuantityController.css';

interface IQuantityControllerProps {
  amount: number;
  setAmount: (amount: number) => void;
}

export const QuantityController: FC<IQuantityControllerProps> = ({ amount, setAmount }) => {
  return (
    <div className='quantity-controller-wrapper'>
      <button
        className='quantity-controller__btn quantity-controller__btn--red'
        onClick={() => {
          if (amount - 1 >= 0) {
            setAmount(amount - 1);
          }
        }}
      >
        -
      </button>
      <div>{amount}</div>
      <button
        className='quantity-controller__btn quantity-controller__btn--green'
        onClick={() => {
          setAmount(amount + 1);
        }}
      >
        +
      </button>
    </div>
  );
};
