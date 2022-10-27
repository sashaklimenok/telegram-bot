import { inject, injectable } from 'inversify';
import { injectKeys } from '../../types/global/injectKeys';
import { IConfigService } from '../config';
import express, { Express, json } from 'express';
import { ILoggerService } from '../logger';
import { IChalkService } from '../chalk';
import { IServerService } from './server.interface';
import { routes } from '../../constants';
import { ICatalogController, IShoppingCartController } from '../../modules';
import cors from 'cors';

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
  ) {
    this.server = express();
    this.port = Number(this.config.get('PORT'));
  }

  useMiddleware(): void {
    this.server.use(json());
    this.server.use(cors());
  }

  useRoutes(): void {
    this.server.use(routes.catalog, this.catalog.router);
    this.server.use(routes.shoppingCart, this.shopping.router);
  }

  run(): void {
    this.server.listen(this.port, () => {
      this.logger.info(
        `${this.chalk.highlight('The server has been running on')} http://localhost:${this.port}`,
      );
    });
  }

  start(): void {
    this.useMiddleware();
    this.run();
  }
}
