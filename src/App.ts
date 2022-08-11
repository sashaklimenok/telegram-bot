import { inject, injectable } from 'inversify';
import { IPrismaService } from './services/prisma';
import { ITelegrafService } from './services/telegraf/telegraf.interface';
import { injectKeys } from './types/injectKeys';

@injectable()
export class App {
	constructor(
		@inject(injectKeys.IPrismaService) private prisma: IPrismaService,
		@inject(injectKeys.ITelegrafService) private bot: ITelegrafService,
	) {}

	greetingUser(): void {
		this.bot.command('start', (ctx) => {
			ctx.reply(`Hello ${ctx.from?.first_name} ${ctx.from?.last_name}`);
		});
	}

	async init(): Promise<void> {
		await this.prisma.connect();
		this.bot.run();
		this.greetingUser();
	}
}
