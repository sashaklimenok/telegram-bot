import { Router } from 'express';
import { ExpressHandler } from '../../../types';

export interface ICatalogController {
  router: Router;
  getProducts: ExpressHandler;
}
