import { injectable } from 'inversify';

export class NumberLib extends Number {
  public static roundToHundredths(value: number): number {
    return Math.round(Number(value.toFixed(1)) * 100) / 100;
  }

  public static roundToDecimal(value: number): number {
    return Math.round(Number(value.toFixed(1)) * 100) / 100;
  }

  public static isNegativeNum(value: number): boolean {
    return Math.sign(value) === -1;
  }
}
