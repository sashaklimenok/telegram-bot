import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { injectKeys } from './types/injectKeys';
import { ConfigService, IConfigService } from './services/config';
import { ChalkService, IChalkService } from './services/chalk';
import { IPrismaService, PrismaService } from './services/prisma';
import { ILoggerService, LoggerService } from './services/logger';
import { App } from './App';
import { IBot } from './modules/bot/bot.interface';
import { Bot } from './modules';

//Composition root
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(injectKeys.Application).to(App);
  bind<ILoggerService>(injectKeys.ILoggerService).to(LoggerService);
  bind<IConfigService>(injectKeys.IConfigService).to(ConfigService);
  bind<IChalkService>(injectKeys.IChalkService).to(ChalkService);
  bind<IPrismaService>(injectKeys.IPrismaService).to(PrismaService);
  bind<IBot>(injectKeys.IBot).to(Bot);
});

const bootstrap = (): Record<string, unknown> => {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(injectKeys.Application);
  app.init();
  return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
