import { IsArray, IsEmpty, IsString } from 'class-validator';
import { Product } from 'types/products';

export class ShoppingCartDto {
  @IsString({ message: 'queryId can not be empty' })
  queryId: string;

  @IsArray({ message: 'products can not be empty' })
  products: Product[];
}
