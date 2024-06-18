import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { RootState } from '../../../store';
import { getPromotions } from '../../../store/slices/cartSlice';

export const PromoData = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { cartDiscounts, snackbarInfo } = useAppSelector((state: RootState) => state.carts);

  useEffect(() => {
    //eslint-disable-next-line
    dispatch(getPromotions() as any);
  }, [dispatch]);

  useEffect(() => {
    if (snackbarInfo.message || snackbarInfo.errorMessage) {
      //eslint-disable-next-line
      console.log(snackbarInfo);
    }
    //eslint-disable-next-line
  }, [snackbarInfo.errorMessage, snackbarInfo.message]);

  return (
    <section className='main__promo-data'>
      <ul>
        {cartDiscounts.length ? (
          cartDiscounts.map((el) => (
            <li
              className='promo-item'
              key={el.id}
            >
              <p className='main__promo-data__item'>
                <span className='bold-text'>{el.name['en-US']}: </span>
                {el && el.description ? el.description['en-US'] : ''}
              </p>
            </li>
          ))
        ) : (
          <p>Currently, we don't have any active promo codes. Come back later to check the updates.</p>
        )}
      </ul>
    </section>
  );
};
