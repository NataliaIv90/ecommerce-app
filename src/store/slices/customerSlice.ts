import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { API } from '../../api/API';
import { getApiRoot } from '../../api/lib/Client';
import { type Customer, type CustomerDraft } from '@commercetools/platform-sdk';
import { ClientType } from '../../types/Enums';

export interface Credentials {
  email: string;
  password: string;
  setLoading: (val: boolean) => void;
  // setOpen: (val: boolean) => void;
}

interface signUp {
  requestData: CustomerDraft;
  setLoading: (val: boolean) => void;
}

export interface createCustomer extends Credentials {
  id?: string;
}
interface IinitialState {
  apiInstance: API;
  authorized: boolean;
  email: string;
  password: string;
  id: string;
  customer: Customer | null;
  isLoading: boolean;
}

const initialState: IinitialState = {
  apiInstance: new API(getApiRoot('anonimous')),
  authorized: false,
  email: '',
  password: '',
  id: '',
  customer: null,
  isLoading: true,
};

export const createNewCustomer = createAsyncThunk('customer/createNew', async (data: signUp, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const { ...draft } = { ...data.requestData };
  const response = await state.customers.apiInstance.createCustomer(draft);
  if (response.data) {
    const passClient = new API(
      getApiRoot(ClientType.password, {
        email: data.requestData.email,
        password: data.requestData.password as string,
      })
    );
    await passClient.signIn({
      email: data.requestData.email,
      password: data.requestData.password as string,
      setLoading: function (val: boolean): void {
        throw new Error('Function not implemented.');
      },
    });
  }
  data.setLoading(false);
  return { customer: response.data?.customer, errorMassage: response.error || '' };
});

export const SignIn = createAsyncThunk('customers/token', async (credentials: Credentials) => {
  const { email, password } = credentials;
  const passClient = new API(getApiRoot('password', { email, password }));
  const response = await passClient.signIn(credentials);
  // if (!response.customer) credentials.setOpen(true);
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
      if (action.payload.customer) {
        state.customer = action.payload.customer || state.customer;
      }
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
