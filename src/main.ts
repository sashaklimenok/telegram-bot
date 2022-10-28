import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { injectKeys } from './types/global/injectKeys';
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

//Composition root
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(injectKeys.Application).to(App);
  bind<ILoggerService>(injectKeys.ILoggerService).to(LoggerService);
  bind<IConfigService>(injectKeys.IConfigService).to(ConfigService);
  bind<IChalkService>(injectKeys.IChalkService).to(ChalkService);
  bind<IPrismaService>(injectKeys.IPrismaService).to(PrismaService);
  bind<ITelegrafService>(injectKeys.ITelegrafService).to(TelegrafService);
  bind<IServerService>(injectKeys.IServerService).to(ServerService);
  bind<ICatalogController>(injectKeys.ICatalogController).to(CatalogController);
  bind<IShoppingCartController>(injectKeys.IShoppingCartController).to(ShoppingCartController);
  bind<IShoppingCartService>(injectKeys.IShoppingCartService).to(ShoppingCartService);
  bind<IExceptionFilter>(injectKeys.IExceptionFilter).to(ExceptionFilter);
  bind<INumberService>(injectKeys.INumberService).to(NumberService);
  bind<ICatalogService>(injectKeys.ICatalogService).to(CatalogService);
  bind<IValidatorMiddleware>(injectKeys.IValidatorMiddleware).to(ValidatorMiddleware);
});

const bootstrap = (): Record<string, unknown> => {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(injectKeys.Application);
  app.init();
  return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
