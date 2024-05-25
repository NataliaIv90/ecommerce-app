import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type RootState } from '../../store/index';
import { type ProductProjection } from '@commercetools/platform-sdk';

const initialState = {
  products: [] as ProductProjection[],
};

export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const passClient = state.customers.apiInstance;
  const response = await passClient.getProducts();
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = action.payload ? action.payload.results : ([] as ProductProjection[]);
      }
    });
  },
});

//eslint-disable-next-line
export const selectProduct = (state: RootState) => state.products;

// export const { createCustomer, setAuthorization, setApi, signOut } = productSlice.actions;

export default productSlice.reducer;
