import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../base';
import { routes } from '../../constants';
import { IChalkService } from '../../services/chalk';
import { ILoggerService } from '../../services/logger';
import { ITelegrafService } from '../../services/telegraf';
import { injectKeys } from '../../types';
import { IShoppingCartService } from './service';
import { IShoppingCartController } from './shopping-cart.interface';

@injectable()
export class ShoppingCartController extends Controller implements IShoppingCartController {
  constructor(
    @inject(injectKeys.ILoggerService) logger: ILoggerService,
    @inject(injectKeys.IChalkService) chalk: IChalkService,
    @inject(injectKeys.ILoggerService) private loggerService: ILoggerService,
    @inject(injectKeys.ITelegrafService) private telegraf: ITelegrafService,
    @inject(injectKeys.IShoppingCartService) private shoppingCartService: IShoppingCartService,
  ) {
    super(logger, chalk);
    this.bindRoutes([
      {
        path: routes.shoppingCart,
        method: 'post',
        callback: this.saveProducts,
      },
    ]);
  }

  async saveProducts(request: Request, response: Response): Promise<void> {
    const { queryId, products } = request.body;
    try {
      await this.telegraf.answerWebQuery(queryId, {
        type: 'article',
        id: queryId,
        title: 'SUCCESS',
        input_message_content: {
          message_text: `Сумма Вашего заказа состовляет ${this.shoppingCartService.getTotalAmount(
            products,
          )}$ \n В ближашее время нам енеджер свяжется с Вами`,
        },
      });
      this.ok(response, 'success');
    } catch (error) {
      this.loggerService.error(error);
      response.status(500).json();
    }
  }
}
