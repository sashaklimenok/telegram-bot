import { BotEvent } from './types';

export interface ITelegrafService {
	registerEvents(listeners: BotEvent[]): void;
	run(): void;
}
