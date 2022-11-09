import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from 'infostructure/base-classes';
import { routes } from '../../infostructure/constants';
import { IChalkService } from 'services/chalk';
import { ILoggerService } from 'services/logger';
import { injectKeys } from 'types';
import { ICatalogController } from './interfaces/catalog.interface';
import { ICatalogService } from './interfaces';

@injectable()
export class CatalogController extends Controller implements ICatalogController {
  constructor(
    @inject(injectKeys.ILoggerService) logger: ILoggerService,
    @inject(injectKeys.IChalkService) chalk: IChalkService,
    @inject(injectKeys.ICatalogService) private catalog: ICatalogService,
  ) {
    super(logger, chalk);
    this.bindRoutes([
      {
        path: routes.catalog,
        method: 'get',
        callback: this.getProducts,
      },
    ]);
  }

  async getProducts(request: Request, response: Response, next: NextFunction): Promise<void> {
    const data = await this.catalog.getProducts();
    this.ok(response, data);
  }
}
