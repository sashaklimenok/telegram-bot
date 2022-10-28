import { INumberService, NumberService } from 'services/number';
import { Product } from 'types/products';

export class CatalogEntity {
  numberService: INumberService;
  constructor(private _products: Product[]) {
    this.numberService = new NumberService();
  }

  mapProducts(): Product[] {
    return this._products.map((item) => ({
      ...item,
      price: this.numberService.roundToHundredths(item.price),
    }));
  }

  get products(): Product[] {
    return this.mapProducts();
  }
}
