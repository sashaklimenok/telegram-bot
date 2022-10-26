import { inject, injectable } from 'inversify';
import { IBot } from './modules/bot/bot.interface';
import { IPrismaService } from './services/prisma';
import { injectKeys } from './types/injectKeys';

@injectable()
export class App {
  constructor(
    @inject(injectKeys.IPrismaService) private prisma: IPrismaService,
    @inject(injectKeys.IBot) private bot: IBot,
  ) {}

  async init(): Promise<void> {
    await this.prisma.connect();
    this.bot.launch();
  }
}
