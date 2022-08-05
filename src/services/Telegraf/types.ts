export type BotEventType = 'text' | 'message';

export interface BotEvent {
	type: BotEventType;
	callback: <T>(ctx: T) => void;
}
