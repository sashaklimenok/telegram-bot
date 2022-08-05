import { inject, injectable } from 'inversify';
import { IChalkService } from './services/Chalk';
import { IConfigService } from './services/Config';
import { ILoggerService } from './services/Logger';
import { IPrismaService } from './services/Prisma';
import { ITelegrafService } from './services/Telegraf/Telegraf.interface';
import { injectKeys } from './types/injectKeys';

@injectable()
export class App {
	constructor(
		@inject(injectKeys.ILoggerService) private logger: ILoggerService,
		@inject(injectKeys.IPrismaService) private prisma: IPrismaService,
		@inject(injectKeys.IChalkService) private chalk: IChalkService,
		@inject(injectKeys.ITelegrafService) private bot: ITelegrafService,
	) {}

	async init(): Promise<void> {
		await this.prisma.connect();
		this.bot.run();
		const user = await this.prisma.client.user.findFirst({ where: { id: 1 } });
		this.logger.info(`Hello Dear ${this.chalk.highlight(user?.name ?? '')}`);
	}
}
