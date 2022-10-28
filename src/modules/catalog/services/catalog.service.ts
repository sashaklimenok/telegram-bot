import { injectable } from 'inversify';
import { Product } from 'types/products';
import { CatalogEntity } from '../catalog.entity';
import { ICatalogService } from './catalog.service.interface';
import { data } from './MOCK_DATA';

@injectable()
export class CatalogService implements ICatalogService {
  getProducts(): Product[] {
    const { products } = new CatalogEntity(data);
    return products;
  }
}
