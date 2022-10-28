import { injectable } from 'inversify';
import { INumberService } from './number.service.interface';

@injectable()
export class NumberService implements INumberService {
  roundToHundredths(value: number): number {
    return Math.round(Number(value.toFixed(1)) * 100) / 100;
  }

  roundToDecimal(value: number): number {
    return Math.round(Number(value.toFixed(1)) * 100) / 100;
  }

  isNegativeNum(value: number): boolean {
    return Math.sign(value) === -1;
  }
}
