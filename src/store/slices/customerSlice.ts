import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { API } from '../../api/API';
import { getApiRoot } from '../../api/lib/Client';
import {
  type Customer,
  type CustomerDraft,
  type CustomerUpdate,
  CustomerChangeEmailAction,
  CustomerSetFirstNameAction,
  CustomerSetLastNameAction,
  CustomerSetDateOfBirthAction,
  Address,
  CustomerChangeAddressAction,
  CustomerAddAddressAction,
  CustomerAddBillingAddressIdAction,
  CustomerAddShippingAddressIdAction,
  CustomerRemoveAddressAction,
  CustomerSetDefaultShippingAddressAction,
  CustomerSetDefaultBillingAddressAction,
  CustomerChangePassword,
} from '@commercetools/platform-sdk';
import { ClientType } from '../../types/Enums';

// Define a type for the possible customer update actions
type CustomerUpdateFields = {
  setFirstName?: { firstName: string };
  setLastName?: { lastName: string };
  setEmail?: { email: string };
  setDateOfBirth?: { dateOfBirth: string };
  changeShippingAddress?: { addressId?: string; address: Address };
  changeBillingAddress?: { addressId?: string; address: Address };
  addBillingAddress?: { address: Address };
  addShippingAddress?: { address: Address };
  addBillingAddressId?: { addressId?: string };
  addShippingAddressId?: { addressId?: string };
  removeAddress?: { addressId?: string };
  setDefaultShippingAddress?: { addressId?: string };
  setDefaultBillingAddress?: { addressId?: string };
};

interface UpdateCustomerData {
  customerId: string;
  updatedFields: Partial<CustomerUpdateFields>;
}
export interface Credentials {
  email: string;
  password: string;
  setLoading: (val: boolean) => void;
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
  snackbarInfo: {
    massage: string;
    errorMassage: string;
  };
}

const initialState: IinitialState = {
  apiInstance: new API(getApiRoot('anonymous')),
  authorized: false,
  email: '',
  password: '',
  id: '',
  customer: null,
  isLoading: true,
  snackbarInfo: {
    massage: '',
    errorMassage: '',
  },
};

export const createNewCustomer = createAsyncThunk('customer/createNew', async (data: signUp, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const anonymousId = state.carts.cart.anonymousId;
  const { ...draft } = { ...data.requestData, anonymousId };
  const response = await state.customers.apiInstance.createCustomer(draft);
  if (response.data) {
    const passClient = new API(
      getApiRoot(ClientType.password, {
        email: data.requestData.email,
        password: data.requestData.password as string,
      })
    );
    await passClient.signIn({ email: data.requestData.email, password: data.requestData.password as string });
  }

  data.setLoading(false);
  return { customer: response.data?.customer, errorMassage: response.error || '' };
});

// export const SignIn = createAsyncThunk('customers/token', async (credentials: Credentials) => {
//   const { email, password } = credentials;
//   const passClient = new API(getApiRoot('password', { email, password }));
//   const response = await passClient.signIn(credentials);
//   return response;
// });

export const SignIn = createAsyncThunk('customer/signIn', async (credentials: Credentials, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const { email, password } = credentials;
  await state.customers.apiInstance.signInWithCartMerge(credentials);
  const passClient = new API(getApiRoot(ClientType.password, { email, password }));
  const response = await passClient.signIn(credentials);
  credentials.setLoading(false);
  return { customer: response.data?.customer, errorMassage: response.error || '' };
});

export const SignInByToken = createAsyncThunk('customer/signInByToken', async (token: string) => {
  const tokenAPI = new API(getApiRoot('token', { token }));
  const response = await tokenAPI.signInByToken();
  return response;
});

export const UpdateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async (data: UpdateCustomerData, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const { customerId, updatedFields } = data;
    const apiInstance = state.customers.apiInstance;
    const existingCustomer = state.customers.customer;

    if (!existingCustomer) {
      return thunkAPI.rejectWithValue('Existing customer not found');
    }

    const updatedCustomerData: CustomerUpdate = {
      version: existingCustomer.version,
      actions: Object.entries(updatedFields).reduce<CustomerUpdate['actions']>((acc, [action, value]) => {
        switch (action) {
          case 'setEmail':
            return [
              ...acc,
              {
                action: 'changeEmail',
                email: (value as { email: string }).email,
              } as CustomerChangeEmailAction,
            ];
          case 'setFirstName':
            return [
              ...acc,
              {
                action: 'setFirstName',
                firstName: (value as { firstName: string }).firstName,
              } as CustomerSetFirstNameAction,
            ];
          case 'setLastName':
            return [
              ...acc,
              {
                action: 'setLastName',
                lastName: (value as { lastName: string }).lastName,
              } as CustomerSetLastNameAction,
            ];
          case 'setDateOfBirth':
            return [
              ...acc,
              {
                action: 'setDateOfBirth',
                dateOfBirth: (value as { dateOfBirth: string }).dateOfBirth,
              } as CustomerSetDateOfBirthAction,
            ];
          case 'changeShippingAddress':
            return [
              ...acc,
              {
                action: 'changeAddress',
                addressId: (value as { addressId: string; address: Address }).addressId,
                address: (value as { addressId: string; address: Address }).address,
              } as CustomerChangeAddressAction,
            ];
          case 'changeBillingAddress':
            return [
              ...acc,
              {
                action: 'changeAddress',
                addressId: (value as { addressId: string; address: Address }).addressId,
                address: (value as { addressId: string; address: Address }).address,
              } as CustomerChangeAddressAction,
            ];
          case 'addBillingAddress':
            return [
              ...acc,
              {
                action: 'addAddress',
                address: (value as { address: Address }).address,
              } as CustomerAddAddressAction,
            ];
          case 'addBillingAddressId':
            return [
              ...acc,
              {
                action: 'addBillingAddressId',
                addressId: (value as { addressId: string }).addressId,
              } as CustomerAddBillingAddressIdAction,
            ];
          case 'addShippingAddress':
            return [
              ...acc,
              {
                action: 'addAddress',
                address: (value as { address: Address }).address,
              } as CustomerAddAddressAction,
            ];
          case 'addShippingAddressId':
            return [
              ...acc,
              {
                action: 'addShippingAddressId',
                addressId: (value as { addressId: string }).addressId,
              } as CustomerAddShippingAddressIdAction,
            ];
          case 'removeAddress':
            return [
              ...acc,
              {
                action: 'removeAddress',
                addressId: (value as { addressId: string }).addressId,
              } as CustomerRemoveAddressAction,
            ];
          case 'setDefaultShippingAddress':
            return [
              ...acc,
              {
                action: 'setDefaultShippingAddress',
                addressId: (value as { addressId: string }).addressId,
              } as CustomerSetDefaultShippingAddressAction,
            ];
          case 'setDefaultBillingAddress':
            return [
              ...acc,
              {
                action: 'setDefaultBillingAddress',
                addressId: (value as { addressId: string }).addressId,
              } as CustomerSetDefaultBillingAddressAction,
            ];
          default:
            return acc;
        }
      }, []),
    };

    try {
      const updatedCustomer = await apiInstance.updateCustomer(customerId, updatedCustomerData);

      return Object.keys(updatedCustomer).length ? updatedCustomer : null;
    } catch (error) {
      throw new Error('Error while updating customer');
    }
  }
);

interface ChnagePasswordFields {
  currentPassword: string;
  newPassword: string;
}

export const ChangePassword = createAsyncThunk(
  'customer/changePassword',
  async (data: ChnagePasswordFields, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const apiInstance = state.customers.apiInstance;

    const existingCustomer = state.customers.customer;

    if (!existingCustomer) {
      return thunkAPI.rejectWithValue('Existing customer not found');
    }

    const chnageCustomerPassword: CustomerChangePassword = {
      id: existingCustomer.id,
      version: existingCustomer.version,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    try {
      const updatedCustomer: Customer | null = await apiInstance.changePassword(chnageCustomerPassword);
      return updatedCustomer;
    } catch (error) {
      throw new Error('Error while changing password!');
    }
  }
);

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
    isLoading: (state, action: PayloadAction<true | false>) => {
      state.isLoading = action.payload;
    },
    signExit: (state) => {
      const anonClient = new API(getApiRoot('anonymous'));
      state.apiInstance = anonClient;
      state.authorized = false;
      state.customer = {} as Customer;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewCustomer.fulfilled, (state, action) => {
      if (action.payload.customer) {
        state.customer = action.payload.customer || state.customer;
      }
    });
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.customer = action.payload.customer as Customer;
      state.snackbarInfo = {
        massage: `Successful authorization. Hello ${action.payload.customer?.firstName || ''}`,
        errorMassage: action.payload.errorMassage,
      };
    });
    builder.addCase(SignInByToken.fulfilled, (state, action) => {
      state.customer = action.payload;
    });
    builder.addCase(UpdateCustomer.fulfilled, (state, action) => {
      if (action.payload) {
        state.customer = action.payload || state.customer;
      }
    });
    builder.addCase(ChangePassword.fulfilled, (state, action) => {
      if (action.payload) {
        state.customer = action.payload || state.customer;
      }
    });
  },
});
// eslint-disable-next-line
export const selectCustomer = (state: RootState) => state.customers;
// eslint-disable-next-line
export const { createCustomer, setAuthorization, setApi, setCustomer, isLoading, signExit } = customerSlice.actions;

export default customerSlice.reducer;
