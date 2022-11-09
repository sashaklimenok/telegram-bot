import { injectable } from 'inversify';
import { IMessageError, IValidatorMiddleware } from './validator.interface';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';

@injectable()
export class ValidatorMiddleware implements IValidatorMiddleware {
  mapErrors(errors: ValidationError[]): IMessageError[] {
    return errors.map((error) => ({
      errors: Object.values(error.constraints ?? {}),
    }));
  }

  validate(classToValidate: ClassConstructor<object>) {
    return ({ body }: Request, response: Response, next: NextFunction): void => {
      const instance = plainToInstance(classToValidate, body);
      validate(instance).then((errors) => {
        if (errors.length) {
          response.status(422).send(this.mapErrors(errors));
        } else {
          next();
        }
      });
    };
  }
}
