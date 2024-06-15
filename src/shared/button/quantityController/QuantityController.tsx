import { FC } from 'react';
import './QuantityController.css';

interface IQuantityControllerProps {
  amount: number;
  setAmount: (amount: number) => void;
  disabled?: boolean;
}

export const QuantityController: FC<IQuantityControllerProps> = ({ amount, setAmount, disabled }) => {
  return (
    <div className='quantity-controller-wrapper'>
      <button
        disabled={disabled ? true : false}
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
        disabled={disabled ? true : false}
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
