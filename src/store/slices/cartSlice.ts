import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type Cart } from '@commercetools/platform-sdk/dist/declarations/src/generated';

const initialStateCart: Cart = {
  id: '',
  version: 1,
  createdAt: '',
  lastModifiedAt: '',
  lineItems: [],
  cartState: 'Active',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'USD',
    centAmount: 0,
    fractionDigits: 2,
  },
  shippingMode: 'Single',
  shipping: [],
  customLineItems: [],
  discountCodes: [],
  directDiscounts: [],
  inventoryMode: 'None',
  taxMode: 'Platform',
  taxRoundingMode: 'HalfEven',
  taxCalculationMode: 'LineItemLevel',
  refusedGifts: [],
  origin: 'Customer',
  itemShippingAddresses: [],
};

interface IInitialState {
  cart: Cart;
  cartItemsId: string[] | null;
  loading: boolean;
  error: null | string;
}

const initialState: IInitialState = {
  cart: initialStateCart,
  loading: false,
  error: null,
  cartItemsId: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<Cart>) {
      state.cart = action.payload;
    },
    setCartIds(state, action: PayloadAction<string[]>) {
      state.cartItemsId = action.payload;
    },
    clearCart(state) {
      state.cart = initialStateCart;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setCart, clearCart, setLoading, setError, setCartIds } = cartSlice.actions;
export default cartSlice.reducer;
