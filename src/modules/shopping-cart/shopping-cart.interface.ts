import { Router } from 'express';
import { ExpressHandler } from '../../types';

export interface IShoppingCartController {
  router: Router;
  saveProducts: ExpressHandler;
}
