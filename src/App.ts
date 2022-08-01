import { inject, injectable } from 'inversify';
import { ILoggerService } from './services';
import { IConfigService } from './services/Config';
import { injectKeys } from './types/injectKeys';

@injectable()
export class App {
	constructor(
		@inject(injectKeys.ILoggerService) private loggerService: ILoggerService,
		@inject(injectKeys.IConfigService) private configService: IConfigService,
	) {}

	init(): void {
		this.loggerService.info('Initialize', this.configService.get('BOT_TOKEN'));
	}
}
