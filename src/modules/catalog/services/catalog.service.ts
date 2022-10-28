import { Product } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { injectKeys } from 'types';
import { CatalogEntity } from '../catalog.entity';
import { ICatalogRepository } from '../repository';
import { ICatalogService } from './catalog.service.interface';

@injectable()
export class CatalogService implements ICatalogService {
  constructor(@inject(injectKeys.ICatalogRepository) private repository: ICatalogRepository) {}
  async getProducts(): Promise<Product[]> {
    const data = await this.repository.getProducts();
    const { products } = new CatalogEntity(data);
    return products;
  }
}
