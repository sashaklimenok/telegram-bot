import { inject, injectable } from 'inversify';
import { IPrismaService } from './services/prisma';
import { IServerService } from './services/server';
import { ITelegrafService } from './services/telegraf';
import { injectKeys } from 'types/injectKeys';

@injectable()
export class App {
  constructor(
    @inject(injectKeys.IPrismaService) private prisma: IPrismaService,
    @inject(injectKeys.ITelegrafService) private telegraf: ITelegrafService,
    @inject(injectKeys.IServerService) private server: IServerService,
  ) {}

  async init(): Promise<void> {
    await this.prisma.connect();
    this.server.start();
    await this.telegraf.launch();
  }
}
