import { Product } from '@prisma/client';

export interface IShoppingCartService {
  getTotalAmount(products: Product[]): void;
  saveProducts(products: Product[]): void;
}
