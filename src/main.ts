import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { injectKeys } from './types/injectKeys';
import { ConfigService, IConfigService } from './services/config';
import { ChalkService, IChalkService } from './services/chalk';
import { IPrismaService, PrismaService } from './services/prisma';
import { ILoggerService, LoggerService } from './services/logger';
import { IServerService, ServerService } from './services/server';
import {
  CatalogController,
  CatalogRepository,
  CatalogService,
  ICatalogController,
  ICatalogRepository,
  ICatalogService,
} from './controllers/catalog';
import { App } from './App';
import { ExceptionFilter, IExceptionFilter } from './errors';
import { INumberService, NumberService } from 'services/number';
import { IValidatorMiddleware, ValidatorMiddleware } from 'middlewares';
import { IShoppingCartService } from 'controllers/shopping-cart/interfaces/shopping-cart.service.interface';
import { ShoppingCartService } from 'controllers/shopping-cart/shopping-cart.service';
import { IShoppingCartController, ShoppingCartController } from 'controllers/shopping-cart';
import { TGBotController } from 'controllers/tg-bot';

//Composition root
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(injectKeys.Application).to(App);
  bind<ILoggerService>(injectKeys.ILoggerService).to(LoggerService).inSingletonScope();
  bind<IConfigService>(injectKeys.IConfigService).to(ConfigService).inSingletonScope();
  bind<IChalkService>(injectKeys.IChalkService).to(ChalkService).inSingletonScope();
  bind<IPrismaService>(injectKeys.IPrismaService).to(PrismaService).inSingletonScope();
  bind<IServerService>(injectKeys.IServerService).to(ServerService).inSingletonScope();
  bind<TGBotController>(injectKeys.ITGBOTService).to(TGBotController);
  bind<ICatalogController>(injectKeys.ICatalogController).to(CatalogController);
  bind<ICatalogService>(injectKeys.ICatalogService).to(CatalogService);
  bind<ICatalogRepository>(injectKeys.ICatalogRepository).to(CatalogRepository);
  bind<IShoppingCartController>(injectKeys.IShoppingCartController).to(ShoppingCartController);
  bind<IShoppingCartService>(injectKeys.IShoppingCartService).to(ShoppingCartService);
  bind<IExceptionFilter>(injectKeys.IExceptionFilter).to(ExceptionFilter);
  bind<INumberService>(injectKeys.INumberService).to(NumberService);
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
