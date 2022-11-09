import { Product } from '@prisma/client';
import { NumberLib } from 'infrastructure/libs/number';

export class CatalogEntity {
  constructor(private _products: Product[]) {}

  mapProducts(): Product[] {
    return this._products.map((item) => ({
      ...item,
      price: NumberLib.roundToHundredths(item.price),
    }));
  }

  get products(): Product[] {
    return this.mapProducts();
  }
}
