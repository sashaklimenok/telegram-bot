import { Product } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IPrismaService } from 'services/prisma';
import { injectKeys } from 'types';
import { ICatalogRepository } from './catalog.repository.interface';

@injectable()
export class CatalogRepository implements ICatalogRepository {
  constructor(@inject(injectKeys.IPrismaService) private prisma: IPrismaService) {}
  async getProducts(): Promise<Product[]> {
    return await this.prisma.client.product.findMany();
  }
}
