import { inject, injectable } from 'inversify';
import { injectKeys } from 'types/injectKeys';
import { IConfigService } from '../config';
import express, { Express, json } from 'express';
import { ILoggerService } from '../logger';
import { IChalkService } from '../chalk';
import { IServerService } from './server.interface';
import cors from 'cors';
import { IExceptionFilter } from '../../errors';
import { ICatalogController } from 'controllers/catalog';
import { IShoppingCartController } from 'controllers/shopping-cart';

@injectable()
export class ServerService implements IServerService {
  private server: Express;
  private port: number;
  constructor(
    @inject(injectKeys.IConfigService) private config: IConfigService,
    @inject(injectKeys.ILoggerService) private logger: ILoggerService,
    @inject(injectKeys.IChalkService) private chalk: IChalkService,
    @inject(injectKeys.ICatalogController) private catalog: ICatalogController,
    @inject(injectKeys.IShoppingCartController) private shopping: IShoppingCartController,
    @inject(injectKeys.IExceptionFilter) private exceptionFilter: IExceptionFilter,
  ) {
    this.server = express();
    this.port = Number(this.config.get('PORT'));
  }

  useMiddleware(): void {
    this.server.use(json());
    this.server.use(cors());
  }

  useRoutes(): void {
    this.server.use(this.catalog.router);
    this.server.use(this.shopping.router);
  }

  useExceptionFilters(): void {
    this.server.use(this.exceptionFilter.catch);
  }

  run(): void {
    this.server.listen(this.port, () => {
      this.logger.info(
        `${this.chalk.highlight('The server has been running on')} http://localhost:${this.port}`,
      );
    });
  }

  start(): void {
    this.run();
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
  }
}
