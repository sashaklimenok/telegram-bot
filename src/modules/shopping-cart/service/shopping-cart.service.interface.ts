import { Product } from 'types/products';

export interface IShoppingCartService {
  getTotalAmount(products: Product[]): void;
  saveProducts(products: Product[]): void;
}
