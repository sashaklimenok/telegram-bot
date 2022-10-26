import { inject, injectable } from 'inversify';
import { Telegraf } from 'telegraf';
import { IConfigService } from '../../services/config';
import { injectKeys } from '../../types/injectKeys';
import { MyContext } from './bot.interface';

@injectable()
export class Bot {
  bot: Telegraf<MyContext>;

  constructor(@inject(injectKeys.IConfigService) private config: IConfigService) {
    this.bot = new Telegraf<MyContext>(this.config.get('BOT_TOKEN'));
  }

  launch(): void {
    this.bot.launch();
    this.bot.command('start', (ctx) => ctx.reply('Hello'));
  }
}
