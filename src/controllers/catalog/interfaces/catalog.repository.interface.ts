import { Product } from '@prisma/client';

export interface ICatalogRepository {
  getProducts(): Promise<Product[]>;
}
