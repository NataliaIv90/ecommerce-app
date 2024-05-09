import {
  Project,
  Customer,
  CustomerSignInResult,
  CustomerDraft,
} from '@commercetools/platform-sdk/dist/declarations/src/generated';
import { Credentials } from '../store/slices/customerSlice';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

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
      console.log(error);
    }
    return result;
  }

  async getCustomers(ID: string): Promise<Customer> {
    let result = {} as Customer;
    try {
      const { body } = await this.client.customers().withId({ ID }).get().execute();
      result = body;
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async createCustomer(customer: CustomerDraft): Promise<CustomerSignInResult> {
    let result: CustomerSignInResult = {} as CustomerSignInResult;
    try {
      const { body } = await this.client.customers().post({ body: customer }).execute();
      result = body;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    return result;
  }
}
