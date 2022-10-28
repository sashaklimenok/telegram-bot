import { PrismaClient } from '@prisma/client';
import { products } from './mock-data/products.mjs';

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.$connect();
  await prisma.product.createMany({ data: products });
  await prisma.$disconnect();
};

seed();
