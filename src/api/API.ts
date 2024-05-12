import {
  Project,
  Customer,
  CustomerSignInResult,
  CustomerDraft,
} from '@commercetools/platform-sdk/dist/declarations/src/generated';
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
    } catch (error) {}
    return result;
  }

  async getCustomers(ID: string): Promise<Customer> {
    let result = {} as Customer;
    try {
      const { body } = await this.client.customers().withId({ ID }).get().execute();
      result = body;
    } catch (error) {}
    return result;
  }

  async createCustomer(customer: CustomerDraft): Promise<{ data: CustomerSignInResult | undefined; error: string }> {
    const errorMsg = '';
    try {
      const result = await this.client.customers().post({ body: customer }).execute();
      return { data: result.body, error: 'error' };
    } catch (error) {
      if (error instanceof Error) {
        alert(
          'Oops! We encountered some server-side issues during the registration process. We apologize for the inconvenience. Please try again later. If the problem persists, please contact our support team for assistance. Thank you for your understanding.'
        );
      }
      return { data: undefined, error: errorMsg };
    }
  }
}
