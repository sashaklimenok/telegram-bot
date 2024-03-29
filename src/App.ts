import { inject, injectable } from 'inversify';
import { IConfigService } from './services/config';
import { IPrismaService } from './services/prisma';
import { injectKeys } from './types/injectKeys';
import { Context, Scenes, Telegraf } from 'telegraf';

export interface MySessionScene extends Scenes.SceneSessionData {
  sessionSceneProps: string;
}

export interface MySession extends Scenes.SceneSession<MySessionScene> {
  sessionProps: string;
}

export interface MyContext extends Context {
  contextProps: string;
  session: MySession;
  scene: Scenes.SceneContextScene<MyContext, MySessionScene>;
}

@injectable()
export class App {
  bot: Telegraf<MyContext>;

  constructor(
    @inject(injectKeys.IPrismaService) private prisma: IPrismaService,
    @inject(injectKeys.IConfigService) private config: IConfigService,
  ) {
    this.bot = new Telegraf<MyContext>(this.config.get('BOT_TOKEN'));
    this.start = this.start.bind(this);
  }

  async start(ctx: MyContext): Promise<void> {
    await ctx.replyWithMarkdown('Form', {
      reply_markup: {
        keyboard: [
          [
            {
              text: 'Заполнить форму доставки',
              web_app: { url: this.config.get('CLIENT_APP_URL') },
            },
          ],
        ],
      },
    });
  }

  async init(): Promise<void> {
    await this.prisma.connect();
    this.bot.launch();
    this.bot.command('start', this.start);
  }
}
