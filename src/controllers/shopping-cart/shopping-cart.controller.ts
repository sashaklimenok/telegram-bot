import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from 'base';
import { IChalkService } from 'services/chalk';
import { ILoggerService } from 'services/logger';
import { ITelegrafService } from 'services/telegraf';
import { injectKeys } from 'types';
import { ShoppingCartDto } from './dto';
import { IShoppingCartService } from './service';
import { IShoppingCartController } from './shopping-cart.interface';
import { routes } from '../../constants';
import { IValidatorMiddleware } from 'middlewares';

@injectable()
export class ShoppingCartController extends Controller implements IShoppingCartController {
  constructor(
    @inject(injectKeys.ILoggerService) logger: ILoggerService,
    @inject(injectKeys.IChalkService) chalk: IChalkService,
    @inject(injectKeys.ITelegrafService) private telegraf: ITelegrafService,
    @inject(injectKeys.IShoppingCartService) private shoppingCartService: IShoppingCartService,
    @inject(injectKeys.IValidatorMiddleware) private validator: IValidatorMiddleware,
  ) {
    super(logger, chalk);
    this.bindRoutes([
      {
        path: routes.shoppingCart,
        method: 'post',
        callback: this.saveProducts,
        middleware: [this.validator.validate(ShoppingCartDto)],
      },
    ]);
  }

  async saveProducts(
    request: Request<{}, {}, ShoppingCartDto>,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
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
      if (error instanceof Error) {
        next(new Error(error.message as string));
      }
      next(new Error('Error!'));
    }
  }
}