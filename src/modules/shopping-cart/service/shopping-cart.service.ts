import { injectable } from 'inversify';
import { Product, IShoppingCartService } from './shopping-cart.service.interface';

@injectable()
export class ShoppingCartService implements IShoppingCartService {
  getTotalAmount(products: Product[]): number {
    return products.reduce((acc, curr) => curr.price + acc, 0);
  }
}
