import { inject, injectable } from 'inversify';
import { ILoggerService } from './services';
import { IConfigService } from './services/Config';
import { IPrismaService } from './services/Prisma';
import { injectKeys } from './types/injectKeys';

@injectable()
export class App {
	constructor(
		@inject(injectKeys.ILoggerService) private loggerService: ILoggerService,
		@inject(injectKeys.IConfigService) private configService: IConfigService,
		@inject(injectKeys.IPrismaService) private prismaService: IPrismaService,
	) {}

	async init(): Promise<void> {
		await this.prismaService.connect();
		const user = await this.prismaService.client.user.findFirst({ where: { id: '1' } });
		this.loggerService.info(user);
	}
}
