import { Telegraf } from 'telegraf';
import { inject, injectable } from 'inversify';
import { injectKeys } from '../../types/injectKeys';
import { IConfigService } from '../Config';
import { ITelegrafService } from './Telegraf.interface';
import { BotEvent } from './types';

@injectable()
export class TelegrafService implements ITelegrafService {
	bot: Telegraf;
	constructor(@inject(injectKeys.IConfigService) private config: IConfigService) {
		this.bot = new Telegraf(this.config.get('BOT_TOKEN'));
	}

	registerEvents(listeners: BotEvent[]): void {
		listeners.map(({ type, callback }) => {
			this.bot.on(type, callback);
		});
	}

	run(): void {
		this.bot.launch();
	}
}
