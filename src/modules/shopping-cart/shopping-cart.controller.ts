import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../base';
import { routes } from '../../constants';
import { IChalkService } from '../../services/chalk';
import { ILoggerService } from '../../services/logger';
import { ITelegrafService } from '../../services/telegraf';
import { injectKeys } from '../../types';
import { IShoppingCartController } from './shopping-cart.interface';

@injectable()
export class ShoppingCartController extends Controller implements IShoppingCartController {
  constructor(
    @inject(injectKeys.ILoggerService) logger: ILoggerService,
    @inject(injectKeys.IChalkService) chalk: IChalkService,
    @inject(injectKeys.ILoggerService) private loggerService: ILoggerService,
    @inject(injectKeys.ITelegrafService) private telegraf: ITelegrafService,
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
      this.loggerService.info(request.body);
      await (this.telegraf.bot as any).answerWebAppQuery(queryId, {
        type: 'article',
        id: queryId,
        title: 'SUCCESS',
        input_message_content: { message_text: 'WoooooooW' },
      });
      this.ok(response, 'success');
    } catch (error) {
      this.loggerService.error(error);
      await (this.telegraf.bot as any).answerWebAppQuery(queryId, {
        type: 'article',
        id: queryId,
        title: 'FAILED',
        input_message_content: { message_text: 'Baaaaddd' },
      });

      response.status(500).json();
    }
  }
}
