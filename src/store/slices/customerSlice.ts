import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { API } from '../../api/API';
import { getApiRoot } from '../../api/lib/Client';
import { type Customer } from '@commercetools/platform-sdk';

export interface Credentials {
  email: string;
  password: string;
  // setOpen: (val: boolean) => void;
}

export interface createCustomer extends Credentials {
  id?: string;
}
const initialState = {
  apiInstance: new API(getApiRoot('anonimous')),
  authorized: false,
  email: '',
  password: '',
  id: '',
  customer: {} as Customer,
};
export const createNewCustomer = createAsyncThunk('customer/createNew', async (data: createCustomer, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const response = await state.customers.apiInstance.createCustomer(data);
  return response;
});

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: (state, action: PayloadAction<createCustomer>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    setAuthorization: (state, action: PayloadAction<true | false>) => {
      state.authorized = action.payload;
    },
    setApi: (state, action: PayloadAction<API>) => {
      state.apiInstance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewCustomer.fulfilled, (state, action) => {
      state.customer = action.payload.data?.customer || state.customer;
    });
  },
});

// export const selectCustomer = (state: RootState) => state.customers;
// eslint-disable-next-line
export const { createCustomer } = customerSlice.actions;

export default customerSlice.reducer;
