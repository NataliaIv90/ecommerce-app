import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  type CartUpdate,
  type Cart,
  type CartAddLineItemAction,
  type CartDraft,
  CartChangeLineItemQuantityAction,
  CartUpdateAction,
} from '@commercetools/platform-sdk';
import { type RootState } from '../index';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  cart: {} as Cart,
  snackbarInfo: {
    message: '',
    errorMessage: '',
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

export const changeProductQuantityInCart = createAsyncThunk(
  'carts/changeProductQuantityInCart',
  async ({ productId, quantity }: { productId: string; quantity: number }, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const { version, id } = state.carts.cart;
    const addItemAction: CartChangeLineItemQuantityAction = {
      action: 'changeLineItemQuantity',
      lineItemId: productId,
      quantity,
    };
    const cartDraft: CartUpdate = { version, actions: [addItemAction] };
    const result = await client.updateCart(id, cartDraft);
    return { result, quantity };
  }
);

export const clearCart = createAsyncThunk('carts/clearCart', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const client = state.customers.apiInstance;
  const { version, id } = state.carts.cart;

  // Create an array of remove actions for each line item
  const actions: CartUpdateAction[] = state.carts.cart.lineItems.map((item) => ({
    action: 'removeLineItem',
    lineItemId: item.id,
  }));

  const cartDraft: CartUpdate = { version, actions };
  const result = await client.updateCart(id, cartDraft);
  return result;
});

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<{ cart: Cart }>) => {
      state.cart = action.payload.cart;
    },
    setLoader: (state) => {
      state.isLoading = true;
    },
    clearSnackbarInfo: (state) => {
      state.snackbarInfo = {
        message: '',
        errorMessage: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActiveCart.fulfilled, (state, action) => {
      if (action.payload) {
        state.cart = action.payload?.data?.body;
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
        state.snackbarInfo = { message: 'Product added to cart', errorMessage: '' };
      } else {
        state.snackbarInfo = {
          message: '',
          errorMessage: 'Unsuccessful attempt to change cart. Try again!',
        };
      }
    });
    builder.addCase(changeProductQuantityInCart.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.result.data) {
        state.cart = action.payload.result.data.body;
        state.snackbarInfo = {
          message:
            action.payload.quantity > 0
              ? 'The number of items in the car has been successfully changed'
              : 'Product removed from cart',
          errorMessage: '',
        };
      } else {
        state.snackbarInfo = {
          message: '',
          errorMessage: 'Unsuccessful attempt to change cart. Try again!',
        };
      }
    });
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.cart = action.payload.data.body;
        state.snackbarInfo = { message: 'All items removed from cart', errorMessage: '' };
      } else {
        state.snackbarInfo = {
          message: '',
          errorMessage: 'Failed to clear cart. Try again!',
        };
      }
    });
    builder.addCase(clearCart.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
//eslint-disable-next-line
export const selectCarts = (state: RootState) => state.carts;

export const { setLoader, clearSnackbarInfo } = cartSlice.actions;

export default cartSlice.reducer;
