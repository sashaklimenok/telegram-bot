import { Telegraf } from 'telegraf';
import { inject, injectable } from 'inversify';
import { injectKeys } from '../../types/injectKeys';
import { IConfigService } from '../config';
import { callbackType, ITelegrafService } from './telegraf.interface';

@injectable()
export class TelegrafService implements ITelegrafService {
	bot: Telegraf;
	constructor(@inject(injectKeys.IConfigService) private config: IConfigService) {
		this.bot = new Telegraf(this.config.get('BOT_TOKEN'));
	}

	onText(callback: callbackType): void {
		this.bot.on('text', (ctx) => {
			callback(ctx);
		});
	}

	command(cmd: string, callback: callbackType): void {
		this.bot.command(cmd, callback);
	}

	async run(): Promise<void> {
		await this.bot.launch();
	}
}
