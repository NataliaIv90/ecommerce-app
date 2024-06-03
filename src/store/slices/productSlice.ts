import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../../store/index';
import { type ProductProjection } from '@commercetools/platform-sdk';

const initialState = {
  products: [] as ProductProjection[],
  isLoading: false,
  snackbarInfo: {
    message: '',
    errorMessage: '',
  },
};

export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true));
  const state: RootState = thunkAPI.getState() as RootState;
  const passClient = state.customers.apiInstance;
  const response = await passClient.getProducts();
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    changeSnackbarInfo: (state, action: PayloadAction<{ name: string; message: string }>) => {
      state.snackbarInfo = {
        message: action.payload.name || '',
        errorMessage: action.payload.message,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = action.payload ? action.payload.results : ([] as ProductProjection[]);
      } else {
        state.snackbarInfo = {
          message: '',
          errorMessage: 'Something went wrong!',
        };
      }
      productSlice.caseReducers.setLoading(state, { payload: false, type: 'products/isLoading' });
    });
  },
});

//eslint-disable-next-line
export const selectProduct = (state: RootState) => state.products;
export const { setLoading, changeSnackbarInfo } = productSlice.actions;

export default productSlice.reducer;
