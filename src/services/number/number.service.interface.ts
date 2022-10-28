export interface INumberService {
  roundToHundredths(value: number): number;
  roundToDecimal(value: number): number;
  isNegativeNum(value: number): boolean;
}
