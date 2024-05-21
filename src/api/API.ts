import {
  Project,
  Customer,
  CustomerSignInResult,
  CustomerDraft,
} from '@commercetools/platform-sdk/dist/declarations/src/generated';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { Credentials } from '../store/slices/customerSlice';

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
    const result: CustomerSignInResult = {} as CustomerSignInResult;
    // eslint-disable-next-line no-console
    console.log('signin cred', credentials);
    try {
      const result = await this.client.me().login().post({ body: credentials }).execute();
      return result.body;
      // eslint-disable-next-line
    } catch (error) {}
    return result;
  }

  async signInByToken(): Promise<Customer> {
    const result: Customer = {} as Customer;
    try {
      const result = await this.client.me().get().execute();
    try {
      const result = await this.client.me().get().execute()
      return result.body;
      // eslint-disable-next-line
    } catch (error) {}
    return result;
  }
}
