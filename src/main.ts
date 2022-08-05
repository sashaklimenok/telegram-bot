import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './App';
import { injectKeys } from './types/injectKeys';
import { ConfigService, IConfigService } from './services/Config';
import { ChalkService, IChalkService } from './services/Chalk';
import { IPrismaService, PrismaService } from './services/Prisma';
import { ITelegrafService } from './services/Telegraf/Telegraf.interface';
import { TelegrafService } from './services/Telegraf/Telegraf.service';
import { ILoggerService, LoggerService } from './services/Logger';

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
