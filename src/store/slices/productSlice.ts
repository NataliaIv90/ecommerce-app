import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../../store/index';
import { type ProductProjection } from '@commercetools/platform-sdk';
import { type Category } from '@commercetools/platform-sdk';
import { CategoryInternal, FilterProducts } from '../../types/products';

const initialState = {
  products: [] as ProductProjection[],
  categories: [] as CategoryInternal[],
  isLoading: false,
  filters: { price: { operand: '=', lower: 0 } } as FilterProducts,
  maxPrice: 100,
  digits: 0,
  snackbarInfo: {
    message: '',
    errorMessage: '',
  },
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
  console.log(state.products.filters);
  const filter = buildQueryFilter(state.products.filters);

  const response = await passClient.getProductsWithFilter(filter);
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
    });

    builder.addCase(getProductsWithFilter.fulfilled, (state, action) => {
      state.products = action.payload.data?.body.results
        ? action.payload.data?.body.results
        : ([] as ProductProjection[]);
      productSlice.caseReducers.setLoading(state, { payload: false, type: 'products/isLoading' });
    });
  },
});

//eslint-disable-next-line
export const selectProduct = (state: RootState) => state.products;
export const { setLoading, changeSnackbarInfo, setPrice } = productSlice.actions;

export default productSlice.reducer;
