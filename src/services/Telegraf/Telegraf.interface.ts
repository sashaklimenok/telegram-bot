import { Context } from 'telegraf';

export type callbackType = (ctx: Context) => void;

export interface ITelegrafService {
	onText(callback: callbackType): void;
	command(cmd: string, callback: callbackType): void;
	run(): void;
}
