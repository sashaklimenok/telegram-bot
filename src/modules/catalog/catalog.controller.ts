import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from 'base';
import { routes } from '../../constants';
import { IChalkService } from 'services/chalk';
import { ILoggerService } from 'services/logger';
import { injectKeys } from 'types';
import { ICatalogController } from './catalog.interface';
import { ICatalogService } from './services';

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

  getProducts(request: Request, response: Response, next: NextFunction): void {
    this.ok(response, this.catalog.getProducts());
  }
}
