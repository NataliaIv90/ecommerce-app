import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { API } from '../../api/API';
import { getApiRoot } from '../../api/lib/Client';
import { type Customer } from '@commercetools/platform-sdk';

export interface Credentials {
  email: string;
  password: string;
  setOpen: (val: boolean) => void;
  setLoading: (val: boolean) => void;
}

export interface createCustomer extends Credentials {
  id?: string;
  setLoading: (val: boolean) => void;
}
interface IinitialState {
  apiInstance: API;
  authorized: boolean;
  email: string;
  password: string;
  id: string;
  customer: Customer | null;
}
const initialState: IinitialState = {
  apiInstance: new API(getApiRoot('anonimous')),
  authorized: false,
  email: '',
  password: '',
  id: '',
  customer: null,
};
export const createNewCustomer = createAsyncThunk('customer/createNew', async (data: createCustomer, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const response = await state.customers.apiInstance.createCustomer(data);
  data.setLoading(false);
  return response;
});

export const SignIn = createAsyncThunk('customers/token', async (credentials: Credentials) => {
  const { email, password } = credentials;
  const passClient = new API(getApiRoot('password', { email, password }));
  const response = await passClient.signIn(credentials);
  if (!response.customer) credentials.setOpen(true);
  credentials.setLoading(false);
  return response;
});

export const SignInByToken = createAsyncThunk('customer/signInByToken', async (token: string) => {
  const tokenAPI = new API(getApiRoot('token', { token }));
  const response = await tokenAPI.signInByToken();
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
    setCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.customer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewCustomer.fulfilled, (state, action) => {
      state.customer = action.payload.data?.customer || state.customer;
    });
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.customer = action.payload.customer;
    });
    builder.addCase(SignInByToken.fulfilled, (state, action) => {
      state.customer = action.payload;
    });
  },
});
// eslint-disable-next-line
export const selectCustomer = (state: RootState) => state.customers;
// eslint-disable-next-line
export const { createCustomer, setAuthorization, setApi, setCustomer } = customerSlice.actions;

export default customerSlice.reducer;
