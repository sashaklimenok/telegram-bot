import { inject, injectable } from 'inversify';
import { ILogger } from './services';
import { injectKeys } from './types/injectKeys';

@injectable()
export class App {
	constructor(@inject(injectKeys.ILogger) private logger: ILogger) {}

	init(): void {
		this.logger.info('Initialize');
	}
}
