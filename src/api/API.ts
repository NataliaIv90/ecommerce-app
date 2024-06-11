import {
  Project,
  Customer,
  CustomerSignInResult,
  CustomerDraft,
  Product,
  CustomerUpdate,
  CustomerChangePassword,
  Cart,
  LineItemDraft,
  CartDraft,
} from '@commercetools/platform-sdk/dist/declarations/src/generated';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { Credentials } from '../store/slices/customerSlice';
import { apiRoot } from './lib/Client';

export class API {
  private client: ByProjectKeyRequestBuilder;
  static limit: number | undefined;

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
        //eslint-disable-next-line
        console.error(errorMsg);
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
        //eslint-disable-next-line
        console.error(errorMsg);
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
        //eslint-disable-next-line
        console.error(errorMsg);
      }
    }
    return result;
  }
  //eslint-disable-next-line
  async getProducts() {
    // : Promise<{ data: ProductProjectionPagedQueryResponse | undefined; error: string }>
    let errorMsg = '';
    try {
      const { body } = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: 10,
            facet: ['variants.attributes.color.en-US', 'variants.attributes.size.en-US', 'variants.price.centAmount'],
          },
        })
        .execute();

      return { data: body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      //eslint-disable-next-line
      console.error(errorMsg);
      return { data: undefined, error: errorMsg };
    }
  }

  async getProductById(productId: string): Promise<Product | undefined> {
    try {
      const { body } = await this.client.products().withId({ ID: productId }).get().execute();
      return body;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      //eslint-disable-next-line
      console.error(errorMsg);
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
        //eslint-disable-next-line
        console.error(errorMsg);
      }
    }
    return result;
  }

  // eslint-disable-next-line
  async getCategories() {
    let errorMsg = '';
    try {
      const { body } = await this.client
        .categories()
        .get({
          queryArgs: {
            sort: 'orderHint asc',
          },
        })
        .execute();
      const result = body.results;
      return { data: result, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
  //eslint-disable-next-line
  async getProductsByCat(catId: string) {
    const errorMsg = '';
    try {
      const response = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            facet: [`variants.attributes.color.en`, 'variants.price.centAmount'],
            filter: [`categories.id:subtree("${catId}")`],
          },
        })
        .execute();
      // const response = await this.client
      //   .productProjections()
      //   .search()
      //   .get({
      //     queryArgs: {
      //       'filter.query': 'categories.id:subtree("ffb8e5bc-dbad-4ae9-b530-e569f3022ac1")',
      //     },
      //   })
      //   .execute();
      const result = response;
      return { data: result.body.results, error: errorMsg };
    } catch (error) {
      //eslint-disable-next-line
      console.log('error', error);
    }
  }
  //eslint-disable-next-line
  async getProductsWithFilter(filter: string[], sort: string, search: string = '') {
    let errorMsg = '';
    try {
      const respsone = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'text.en-US': search,
            fuzzy: true,
            sort,
            'filter.query': filter,
          },
        })
        .execute();
      const result = respsone;

      return { data: result, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  //eslint-disable-next-line
  async getProductsBySearch(search: string) {
    let errorMsg = '';
    try {
      const respsone = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'text.en-US': search,
          },
        })
        .execute();
      const result = respsone;
      return { data: result.body.results, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
  //eslint-disable-next-line
  async changePassword(changePassword: CustomerChangePassword): Promise<Customer | null> {
    let errorMsg = '';
    try {
      const { body } = await this.client.customers().password().post({ body: changePassword }).execute();
      return body;
    } catch (error) {
      if (error instanceof Error) {
        errorMsg = error.message;
        alert(errorMsg);
      }
    }
    return null;
  }

  async createAnonymousCart(): Promise<Cart | null> {
    let errorMsg = '';
    try {
      const cartDraft: CartDraft = {
        currency: 'USD',
        // anonymousId: 'some-unique-anonymous-id', // Optionally set your anonymous ID here
      };

      const { body } = await this.client.carts().post({ body: cartDraft }).execute();
      return body;
    } catch (error) {
      if (error instanceof Error) {
        errorMsg = error.message;
        //eslint-disable-next-line
        console.error(errorMsg);
      }
      return null;
    }
  }

  async addProductToAnonymousCart(
    cartId: string,
    productId: string,
    variantId: number,
    version: number
  ): Promise<Cart | null> {
    let errorMsg = '';
    try {
      const lineItemDraft: LineItemDraft = {
        productId,
        variantId,
        quantity: 1,
      };

      const { body } = await this.client
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version: version, // Ensure you use the correct version
            actions: [
              {
                action: 'addLineItem',
                ...lineItemDraft,
              },
            ],
          },
        })
        .execute();

      return body;
    } catch (error) {
      if (error instanceof Error) {
        errorMsg = error.message;
        //eslint-disable-next-line
        console.error(errorMsg);
      }
      return null;
    }
  }

  async createUserCart(customerId: string): Promise<Cart | null> {
    let errorMsg = '';
    try {
      const cartDraft: CartDraft = {
        currency: 'USD',
        customerId: customerId,
      };

      const { body } = await this.client.carts().post({ body: cartDraft }).execute();
      return body;
    } catch (error) {
      if (error instanceof Error) {
        errorMsg = error.message;
        //eslint-disable-next-line
        console.error(errorMsg);
      }
      return null;
    }
  }

  async addProductToUserCart(
    cartId: string,
    productId: string,
    variantId: number,
    version: number
  ): Promise<Cart | null> {
    let errorMsg = '';
    try {
      const lineItemDraft: LineItemDraft = {
        productId,
        variantId,
        quantity: 1,
      };

      const { body } = await this.client
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version: version, // Ensure you use the correct version
            actions: [
              {
                action: 'addLineItem',
                ...lineItemDraft,
              },
            ],
          },
        })
        .execute();

      return body;
    } catch (error) {
      if (error instanceof Error) {
        errorMsg = error.message;
        //eslint-disable-next-line
        console.error(errorMsg);
      }
      return null;
    }
  }
}

// Export the API instance
export const APIInstance = new API(apiRoot);
