import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { injectKeys } from 'types/global/injectKeys';
import { ILoggerService } from '../logger';
import { IConfigService } from './config.service.interface';
import { IChalkService } from '../chalk';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;
  constructor(
    @inject(injectKeys.ILoggerService) private loggerService: ILoggerService,
    @inject(injectKeys.IChalkService) private chalkService: IChalkService,
  ) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.loggerService.error(
        `${this.chalkService.highlight('[ConfigService]')} Can not read .env`,
      );
    } else {
      this.loggerService.info(
        `${this.chalkService.highlight(
          '[ConfigService]',
        )} The configuration of .env has been loaded`,
      );
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
