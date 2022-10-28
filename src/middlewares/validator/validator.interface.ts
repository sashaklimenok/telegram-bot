import { ExpressHandler } from '../../types';
import { ClassConstructor } from 'class-transformer';

export interface IValidatorMiddleware {
  validate: (classToValidate: ClassConstructor<object>) => ExpressHandler;
}

export interface IMessageError {
  errors: string | string[];
}
