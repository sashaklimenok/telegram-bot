import { PrismaClient } from '@prisma/client';
import { fakeUser } from './mock-data/User.mjs';

const prisma = new PrismaClient();

const seed = async () => {
	await prisma.$connect();
	await prisma.user.createMany({ data: fakeUser });
	await prisma.$disconnect();
};

seed();
