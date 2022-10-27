import { inject, injectable } from 'inversify';
import { Markup, Telegraf } from 'telegraf';
import { injectKeys } from '../../types/global/injectKeys';
import { IConfigService } from '../config';
import { ITelegrafService, MyContext } from './telegraf.interface';

@injectable()
export class TelegrafService implements ITelegrafService {
  bot: Telegraf<MyContext>;
  constructor(@inject(injectKeys.IConfigService) private config: IConfigService) {
    this.bot = new Telegraf<MyContext>(this.config.get('BOT_TOKEN'));
    this.start = this.start.bind(this);
    this.listenEvent = this.listenEvent.bind(this);
  }

  async start(ctx: MyContext): Promise<void> {
    await ctx.reply(
      'Необходимо заполнить форму',
      Markup.keyboard([
        [
          {
            text: 'Заполнить форму доставки',
            web_app: { url: this.config.get('CLIENT_APP_FORM_URL') },
          },
        ],
      ])
        .oneTime()
        .resize(),
    );
  }

  async listenEvent(ctx: MyContext): Promise<void> {
    const data = (await ctx.webAppData?.data.json()) as Record<string, string>;
    await ctx.reply('Спасибо за обратную связь');
    await ctx.reply(`Ваше имя ${data?.name}`);
    await ctx.reply(`Ваш email ${data?.email}`);
    await ctx.reply(`Ваш город ${data?.city}`);
    await ctx.reply(`Ваша улица ${data?.street}`);

    await ctx.reply(
      'Теперь можете совержать покупки',
      Markup.inlineKeyboard([
        [
          {
            text: 'Каталог',
            web_app: { url: this.config.get('CLIENT_APP_CATALOG_URL') },
          },
        ],
      ]),
    );
  }

  async launch(): Promise<void> {
    this.bot.launch();
    this.bot.command('start', this.start);
    this.bot.on('message', this.listenEvent);
  }
}
