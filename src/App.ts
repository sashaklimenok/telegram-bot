import { inject, injectable } from 'inversify';
import { IPrismaService } from './services/prisma';
import { IServerService } from './services/server';
import { injectKeys } from 'types/injectKeys';
import { ITGBotController } from 'controllers/tg-bot';

@injectable()
export class App {
  constructor(
    @inject(injectKeys.IPrismaService) private prisma: IPrismaService,
    @inject(injectKeys.ITGBOTService) private tgBot: ITGBotController,
    @inject(injectKeys.IServerService) private server: IServerService,
  ) {}

  async init(): Promise<void> {
    await this.prisma.connect();
    this.server.start();
    await this.tgBot.launch();
  }
}
