import { injectable } from 'inversify';
import { Product } from 'types/products';
import { IShoppingCartService } from './shopping-cart.service.interface';

@injectable()
export class ShoppingCartService implements IShoppingCartService {
  getTotalAmount(products: Product[]): number {
    return products.reduce((acc, curr) => curr.price + acc, 0);
  }

  saveProducts(products: Product[]): void {
    console.log(products);
  }
}
