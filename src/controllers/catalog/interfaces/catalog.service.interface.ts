import { Product } from '@prisma/client';

export interface ICatalogService {
  getProducts(): Promise<Product[]>;
}
