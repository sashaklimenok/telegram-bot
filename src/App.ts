import { inject, injectable } from 'inversify';
import { IPrismaService } from './services/prisma';
import { injectKeys } from './types/injectKeys';

@injectable()
export class App {
	constructor(@inject(injectKeys.IPrismaService) private prisma: IPrismaService) {}

	async init(): Promise<void> {
		await this.prisma.connect();
	}
}
