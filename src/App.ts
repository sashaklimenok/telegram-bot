import { inject, injectable } from 'inversify';
import { ILogger } from './services';
import { IConfigService } from './services/Config';
import { injectKeys } from './types/injectKeys';

@injectable()
export class App {
	constructor(
		@inject(injectKeys.ILogger) private logger: ILogger,
		@inject(injectKeys.IConfigService) private configService: IConfigService,
	) {}

	init(): void {
		this.logger.info('Initialize', this.configService.get('BOT_TOKEN'));
	}
}
