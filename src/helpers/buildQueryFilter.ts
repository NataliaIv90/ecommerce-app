import { FilterProducts } from '../types/products';

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
