import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { injectKeys } from './types/injectKeys';
import { ConfigService, IConfigService } from './services/config';
import { ChalkService, IChalkService } from './services/chalk';
import { IPrismaService, PrismaService } from './services/prisma';
import { ITelegrafService } from './services/telegraf/telegraf.interface';
import { TelegrafService } from './services/telegraf/telegraf.service';
import { ILoggerService, LoggerService } from './services/logger';

//Composition root
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(injectKeys.Application).to(App);
	bind<ILoggerService>(injectKeys.ILoggerService).to(LoggerService);
	bind<IConfigService>(injectKeys.IConfigService).to(ConfigService);
	bind<IChalkService>(injectKeys.IChalkService).to(ChalkService);
	bind<IPrismaService>(injectKeys.IPrismaService).to(PrismaService);
	bind<ITelegrafService>(injectKeys.ITelegrafService).to(TelegrafService);
});

const bootstrap = (): Record<string, unknown> => {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(injectKeys.Application);
	app.init();
	return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
