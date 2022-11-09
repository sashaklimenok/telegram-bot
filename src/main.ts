import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { injectKeys } from './types/injectKeys';
import { ConfigService, IConfigService } from './services/config';
import { ChalkService, IChalkService } from './services/chalk';
import { IPrismaService, PrismaService } from './services/prisma';
import { ILoggerService, LoggerService } from './services/logger';
import { ITelegrafService, TelegrafService } from './services/telegraf';
import { IServerService, ServerService } from './services/server';
import {
  CatalogController,
  ICatalogController,
  IShoppingCartController,
  ShoppingCartController,
} from './modules';
import { App } from './App';
import { IShoppingCartService, ShoppingCartService } from './modules/shopping-cart/service';
import { ExceptionFilter, IExceptionFilter } from './errors';
import { INumberService, NumberService } from 'services/number';
import { CatalogService, ICatalogService } from 'modules/catalog/services';
import { IValidatorMiddleware, ValidatorMiddleware } from 'middlewares';
import { CatalogRepository, ICatalogRepository } from 'modules/catalog/repository';

//Composition root
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(injectKeys.Application).to(App);
  bind<ILoggerService>(injectKeys.ILoggerService).to(LoggerService).inSingletonScope();
  bind<IConfigService>(injectKeys.IConfigService).to(ConfigService).inSingletonScope();
  bind<IChalkService>(injectKeys.IChalkService).to(ChalkService).inSingletonScope();
  bind<IPrismaService>(injectKeys.IPrismaService).to(PrismaService).inSingletonScope();
  bind<IServerService>(injectKeys.IServerService).to(ServerService).inSingletonScope();
  bind<ITelegrafService>(injectKeys.ITelegrafService).to(TelegrafService);
  bind<ICatalogController>(injectKeys.ICatalogController).to(CatalogController);
  bind<IShoppingCartController>(injectKeys.IShoppingCartController).to(ShoppingCartController);
  bind<IShoppingCartService>(injectKeys.IShoppingCartService).to(ShoppingCartService);
  bind<IExceptionFilter>(injectKeys.IExceptionFilter).to(ExceptionFilter);
  bind<INumberService>(injectKeys.INumberService).to(NumberService);
  bind<ICatalogService>(injectKeys.ICatalogService).to(CatalogService);
  bind<IValidatorMiddleware>(injectKeys.IValidatorMiddleware).to(ValidatorMiddleware);
  bind<ICatalogRepository>(injectKeys.ICatalogRepository).to(CatalogRepository);
});

const bootstrap = (): Record<string, unknown> => {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(injectKeys.Application);
  app.init();
  return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
