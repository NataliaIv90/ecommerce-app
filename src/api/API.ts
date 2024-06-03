import {
  Project,
  Customer,
  CustomerSignInResult,
  CustomerDraft,
  Product,
  CustomerUpdate,
} from '@commercetools/platform-sdk/dist/declarations/src/generated';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { type ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { Credentials } from '../store/slices/customerSlice';
import { apiRoot } from './lib/Client';

export class API {
  private client: ByProjectKeyRequestBuilder;

  constructor(client: ByProjectKeyRequestBuilder) {
    this.client = client;
  }
  async getProject(): Promise<Project> {
    let result = {} as Project;
    try {
      const { body } = await this.client.get().execute();
      result = body;
    } catch (error) {
      alert(error);
    }
    return result;
  }

  async getCustomers(ID: string): Promise<Customer> {
    let result = {} as Customer;
    try {
      const { body } = await this.client.customers().withId({ ID }).get().execute();
      result = body;
    } catch (error) {
      alert(error);
    }
    return result;
  }

  async createCustomer(customer: CustomerDraft): Promise<{ data: CustomerSignInResult | undefined; error: string }> {
    let errorMsg = '';
    try {
      const result = await this.client.customers().post({ body: customer }).execute();
      return { data: result.body, error: 'error' };
    } catch (error) {
      if (error instanceof Error) {
        errorMsg = error.message;
        alert(errorMsg);
      }
      return { data: undefined, error: errorMsg };
    }
  }

  async signIn(credentials: Credentials): Promise<CustomerSignInResult> {
    let errorMsg = '';
    const result: CustomerSignInResult = {} as CustomerSignInResult;
    try {
      const result = await this.client.me().login().post({ body: credentials }).execute();
      return result.body;
    } catch (error) {
      if (error instanceof Error) {
        errorMsg = error.message;
        alert(errorMsg);
      }
    }
    return result;
  }

  async signInByToken(): Promise<Customer> {
    let errorMsg = '';
    const result: Customer = {} as Customer;
    try {
      const result = await this.client.me().get().execute();
      return result.body;
    } catch (error) {
      if (error instanceof Error) {
        errorMsg = error.message;
        alert(errorMsg);
      }
    }
    return result;
  }

  async getProducts(): Promise<{ data: ProductProjectionPagedQueryResponse | undefined; error: string }> {
    let errorMsg = '';
    try {
      const { body } = await this.client.productProjections().get().execute();

      return { data: body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      alert(errorMsg);
      return { data: undefined, error: errorMsg };
    }
  }

  async getProductById(productId: string): Promise<Product | undefined> {
    try {
      const { body } = await this.client.products().withId({ ID: productId }).get().execute();
      return body;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      alert(errorMsg);
      return undefined;
    }
  }

  // ADD
  async updateCustomer(customerId: string, updatedCustomerData: CustomerUpdate): Promise<Customer> {
    let errorMsg = '';
    const result: Customer = {} as Customer;
    try {
      const { body } = await this.client
        .customers()
        .withId({ ID: customerId })
        .post({
          body: {
            version: updatedCustomerData.version,
            actions: updatedCustomerData.actions,
          },
        })
        .execute();
      return body;
    } catch (error) {
      if (error instanceof Error) {
        errorMsg = error.message;
        alert(errorMsg);
      }
    }
    return result;
  }
}

// Export the API instance
export const APIInstance = new API(apiRoot);
