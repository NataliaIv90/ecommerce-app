import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../../store/index';
import { type ProductProjection, type FacetResults, type TermFacetResult } from '@commercetools/platform-sdk';
import { type Category } from '@commercetools/platform-sdk';
import { CategoryInternal, FilterProducts } from '../../types/products';
import { SortOptions } from '../../types/Enums';

const initialState = {
  products: [] as ProductProjection[],
  categories: [] as CategoryInternal[],
  isLoading: false,
  filters: { price: { operand: '=', lower: 0 } } as FilterProducts,
  maxPrice: 100,
  digits: 0,
  colors: [] as string[],
  size: [] as string[],
  nameState: [] as string[],
  snackbarInfo: {
    message: '',
    errorMessage: '',
  },
  sort: {
    direction: 'asc',
    prop: SortOptions.price,
  },
  search: '',
  categoriesNotTransfromed: [] as CategoryInternal[],
};

export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true));
  const state: RootState = thunkAPI.getState() as RootState;
  const passClient = state.customers.apiInstance;
  const response = await passClient.getProducts();
  // await passClient.getProductsByCat();
  return response.data;
});

export const getProductsByCat = createAsyncThunk('products/getProductsByCat', async (catId: string, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const passClient = state.customers.apiInstance;
  const response = await passClient.getProductsByCat(catId);
  console.log(buildQueryFilter(state.products.filters));
  // console.log(response);

  return response?.data;
});

export const getCategories = createAsyncThunk('products/getCategories', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const passClient = state.customers.apiInstance;
  const response = await passClient.getCategories();
  return response.data;
});

export const getProductsWithFilter = createAsyncThunk('products/getProductsWithFilter', async (_, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true));
  const state: RootState = thunkAPI.getState() as RootState;
  const passClient = state.customers.apiInstance;
  const filter = buildQueryFilter(state.products.filters);
  const sort = `${state.products.sort.prop} ${state.products.sort.direction}`;
  const search = state.products.search;

  const response = await passClient.getProductsWithFilter(filter, sort, search);
  return response;
});

export const buildTree = (data: Category[]): CategoryInternal[] => {
  console.log(data);
  const newData: CategoryInternal[] = data.map((node) => {
    (node as CategoryInternal).children = [] as CategoryInternal[];
    return node;
  });
  const rootNodes: CategoryInternal[] = newData.filter((node) => !node.ancestors.length);

  newData.forEach((node) => {
    if (!rootNodes.includes(node)) {
      node.ancestors.forEach(({ id }) => {
        const closestParentId = id;
        const parent = rootNodes.find((root) => root.id === closestParentId);
        console.log(node);
        if (parent && parent.children) {
          parent.children.push(node);
        }
      });
    }
  });
  return rootNodes;
};
export const buildQueryFilter = (filter: FilterProducts): string[] => {
  const keys = Object.keys(filter);
  const queryFilter = keys.reduce((query, key) => {
    let option = '';
    switch (key) {
      case 'price':
        if (filter[key].upper && filter[key].upper) {
          option = `variants.price.centAmount:range ("${filter[key].lower}" to "${filter[key].upper}")`;
        }
        break;
      case 'colors': {
        if (filter[key]?.length) option = `variants.attributes.color.en:"${filter[key]?.join('","')}"`;
        break;
      }
      case 'size': {
        if (filter[key]?.length) option = `variants.attributes.size.en:"${filter[key]?.join('","')}"`;
        break;
      }
      case 'catId': {
        option = `categories.id:subtree("${filter[key]}")`;
        break;
      }
    }
    query.push(option);
    return query;
  }, [] as string[]);
  return queryFilter;
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    deriveAttributes: (state, action: PayloadAction<{ facets: FacetResults }>) => {
      const colors: string[] = [];
      const size: string[] = [];
      const nameState: string[] = [];
      const prices: number[] = [];
      Object.keys(action.payload.facets).forEach((facet: string): void => {
        const facetData = action.payload.facets[facet] as TermFacetResult;
        if (facetData.terms.length) {
          facetData.terms.forEach(({ term }: { term: string; count: number }) => {
            switch (facet) {
              case 'variants.attributes.color.en':
                //eslint-disable-next-line
                !!term && colors.push(term);
                break;
              case 'variants.attributes.size.en':
                //eslint-disable-next-line
                !!term && size.push(term);
                break;
              case 'variants.price.centAmount':
                {
                  //eslint-disable-next-line
                  !!term && prices.push(Number(term));
                }
                break;
            }
          });
        }
      });

      state.colors = colors;
      state.size = size;
      state.nameState = nameState;
      const maxPrice = Math.max(...prices);
      state.maxPrice = maxPrice;
      state.filters.price.upper = maxPrice;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    changeSnackbarInfo: (state, action: PayloadAction<{ name: string; message: string }>) => {
      state.snackbarInfo = {
        message: action.payload.name || '',
        errorMessage: action.payload.message,
      };
    },
    setPrice: (state, action: PayloadAction<{ range: number[]; operand: string }>) => {
      const [lower, upper] = action.payload.range;
      const { operand } = action.payload;
      state.filters.price = { lower, upper, operand };
    },
    setSortingOptions: (state, action: PayloadAction<typeof state.sort>) => {
      state.sort = action.payload;
    },
    setCategory: (state, action: PayloadAction<{ categoryId: string }>) => {
      state.filters.catId = action.payload.categoryId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = action.payload ? action.payload.results : ([] as ProductProjection[]);
      } else {
        state.snackbarInfo = {
          message: '',
          errorMessage: 'Something went wrong!',
        };
      }
      productSlice.caseReducers.setLoading(state, { payload: false, type: 'products/isLoading' });
    });
    builder.addCase(getProductsByCat.fulfilled, (state, action) => {
      state.products = action.payload ? action.payload : ([] as ProductProjection[]);
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      let categories = [] as CategoryInternal[];
      if (action.payload) categories = buildTree(action.payload);
      state.categories = categories;
      state.categoriesNotTransfromed = action.payload as Category[];
    });

    builder.addCase(getProductsWithFilter.fulfilled, (state, action) => {
      state.products = action.payload.data?.body.results
        ? action.payload.data?.body.results
        : ([] as ProductProjection[]);

      // productSlice.caseReducers.setTotal(state, {
      //   payload: { total: action.payload.data?.body.total as number },
      //   type: 'products/total',
      // });
      productSlice.caseReducers.setLoading(state, { payload: false, type: 'products/isLoading' });
    });
  },
});

//eslint-disable-next-line
export const selectProduct = (state: RootState) => state.products;
export const { setLoading, changeSnackbarInfo, setPrice, setSortingOptions, setCategory } = productSlice.actions;

export default productSlice.reducer;
