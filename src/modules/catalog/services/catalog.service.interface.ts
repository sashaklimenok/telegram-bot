import { Product } from 'types/products';

export interface ICatalogService {
  getProducts(): Product[];
}
