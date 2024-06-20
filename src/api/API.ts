import {
  Project,
  Customer,
  CustomerSignInResult,
  CustomerDraft,
  Product,
  CustomerUpdate,
  CustomerChangePassword,
  CartUpdate,
  CartDraft,
  Cart,
  CartDiscount,
  DiscountCode,
} from '@commercetools/platform-sdk/dist/declarations/src/generated';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { apiRoot } from './lib/Client';

export class API {
  private client: ByProjectKeyRequestBuilder;
  static limit = 100;

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

  async signIn(credentials: {
    email: string;
    password: string;
  }): Promise<{ data: CustomerSignInResult | undefined; error: string }> {
    let errorMsg = '';
    try {
      const { ...data } = { ...credentials };

      const result = await this.client.me().login().post({ body: data }).execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
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

  async signInWithCartMerge(credentials: {
    email: string;
    password: string;
  }): Promise<{ data: CustomerSignInResult | undefined; error: string }> {
    let errorMsg = '';
    try {
      const { ...data } = { ...credentials, activeCartSignInMode: 'MergeWithExistingCustomerCart' };
      const result = await this.client.me().login().post({ body: data }).execute();
      return { data: result.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
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
            limit: API.limit,
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
            limit: API.limit,
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
  async getProductsWithFilter(filter: string[], sort: string, search: string, limit: number, offset: number) {
    let errorMsg = '';
    try {
      const respsone = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'text.en-US': search,
            fuzzy: false,
            sort,
            limit,
            offset,
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
            limit: API.limit,
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
  //eslint-disable-next-line
  async getActiveCart() {
    let errorMsg = '';
    try {
      const response = await this.client.me().activeCart().get().execute();
      const result = response;

      return { data: result, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  //eslint-disable-next-line
  async createCart(cart: CartDraft) {
    let errorMsg = '';
    try {
      const response = await this.client.me().carts().post({ body: cart }).execute();
      const result = response;

      return { data: result, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }
  //eslint-disable-next-line
  async updateCart(ID: string, cartUpdate: CartUpdate) {
    let errorMsg = '';
    try {
      const response = await this.client.carts().withId({ ID }).post({ body: cartUpdate }).execute();
      const result = response;

      return { data: result, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async getCartById(cartId: string): Promise<Cart> {
    const { body } = await this.client.carts().withId({ ID: cartId }).get().execute();
    return body;
  }

  async getCartDiscounts(): Promise<{ data: CartDiscount[] | undefined; error: string }> {
    let errorMsg = '';
    try {
      const response = await this.client.cartDiscounts().get().execute();
      return { data: response.body.results, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) errorMsg = error.message;
      return { data: undefined, error: errorMsg };
    }
  }

  async getDiscountCodeById(discountCodeId: string): Promise<{ data: DiscountCode | undefined; error: string }> {
    let errorMsg = '';
    try {
      const response = await this.client.discountCodes().withId({ ID: discountCodeId }).get().execute();
      return { data: response.body, error: errorMsg };
    } catch (error) {
      if (error instanceof Error) {
        errorMsg = error.message;
      } else {
        errorMsg = 'Unknown error occurred.';
      }
      return { data: undefined, error: errorMsg };
    }
  }
}

// Export the API instance
export const APIInstance = new API(apiRoot);
