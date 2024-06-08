import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type CartUpdate, type Cart, type CartAddLineItemAction, type CartDraft } from '@commercetools/platform-sdk';
import { type RootState } from '../index';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  cart: {} as Cart,
  snackbarInfo: {
    massage: '',
    errorMassage: '',
  },
  isLoading: false,
};

export const getActiveCart = createAsyncThunk('carts/getActiveCart', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const client = state.customers.apiInstance;
  const result = await client.getActiveCart();
  if (!result.data) {
    thunkAPI.rejectWithValue('no cart');
  } else {
    return result;
  }
});

export const createCart = createAsyncThunk('carts/createCart', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const client = state.customers.apiInstance;
  const cartDraft: CartDraft = { currency: 'USD' };
  const result = await client.createCart(cartDraft);
  return result;
});

export const addProductToCart = createAsyncThunk('carts/addProductToCart', async (productId: string, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const client = state.customers.apiInstance;
  const { version, id } = state.carts?.cart;
  const addItemAction: CartAddLineItemAction = {
    action: 'addLineItem',
    productId,
    quantity: 1,
  };
  const cartDraft: CartUpdate = { version, actions: [addItemAction] };
  const result = await client.updateCart(id, cartDraft);
  return result;
});

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<{ cart: Cart }>) => {
      state.cart = action.payload.cart;
      console.log(state.cart);
    },
    setLoader: (state) => {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActiveCart.fulfilled, (state, action) => {
      if (action.payload) {
        state.cart = action.payload.data.body;
      }
    });
    builder.addCase(createCart.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.cart = action.payload.data.body;
      }
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.cart = action.payload.data.body;
        state.snackbarInfo = { massage: 'Product added to cart', errorMassage: '' };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: 'Unsuccessful attempt to change cart. Try again!',
        };
      }
    });
  },
});
//eslint-disable-next-line
export const selectCarts = (state: RootState) => state.carts;

export const { setLoader } = cartSlice.actions;

export default cartSlice.reducer;
