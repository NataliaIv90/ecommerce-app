import {
  Project,
  Customer,
  CustomerSignInResult,
  CustomerDraft,
  Product,
  CustomerUpdate,
} from '@commercetools/platform-sdk/dist/declarations/src/generated';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
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
  //eslint-disable-next-line
  async getProducts() {
    // : Promise<{ data: ProductProjectionPagedQueryResponse | undefined; error: string }>
    let errorMsg = '';
    try {
      const { body } = await this.client
        .productProjections()
        .get({
          queryArgs: {
            limit: 10,
            facet: ['variants.attributes.color.en', 'variants.price.centAmount'],
          },
        })
        .execute();

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
    console.log('catID', catId);
    const errorMsg = '';
    try {
      const response = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
            facet: ['variants.attributes.color.en', 'variants.price.centAmount'],
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
      console.log('success', response);
    } catch (error) {
      console.log('error', error);
    }
  }
  //eslint-disable-next-line
  async getProductsWithFilter(filter: string[]) {
    let errorMsg = '';
    try {
      const respsone = await this.client
        .productProjections()
        .search()
        .get({
          queryArgs: {
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

  // async getCategories(catId: string): Promise<Category | undefined> {
  //   // let errorMsg = '';
  //   try {
  //     const { body } = await this.client.categories().withId({ ID: catId }).get().execute();
  //     return body;
  //     // const result = body.results;
  //     // return { data: result, error: errorMsg };
  //   } catch (error) {
  //     console.log(error);
  //     //   if (error instanceof Error) errorMsg = error.message;
  //     //   return { data: undefined, error: errorMsg };
  //     // }
  //   }
  // }

  // async getProductsByCat(catId: string): Promise<
  //   | {
  //       data: ProductProjection[];
  //       error: string;
  //     }
  //   | {
  //       data: undefined;
  //       error: string;
  //     }
  // > {
  //   let errorMsg = '';
  //   try {
  //     const respsone = await this.client
  //       .productProjections()
  //       .search()
  //       .get({
  //         queryArgs: {
  //           limit: 10,
  //           facets: ['variants.attributes.color.en'],
  //           filter: [`categories.id:subtree("${catId}")`],
  //         },
  //       })
  //       .execute();
  //     const result = respsone;
  //     return { data: result.body.results, error: errorMsg };
  //   } catch (error) {
  //     if (error instanceof Error) errorMsg = error.message;
  //     return { data: undefined, error: errorMsg };
  //   }
  // }
}

// Export the API instance
export const APIInstance = new API(apiRoot);
