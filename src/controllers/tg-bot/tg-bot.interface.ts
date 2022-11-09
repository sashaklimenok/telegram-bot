import { Context, Scenes, Telegraf } from 'telegraf';
import { InlineQueryResult } from 'telegraf/typings/core/types/typegram';

export interface MySessionScene extends Scenes.SceneSessionData {
  sessionSceneProps: string;
}

export interface MySession extends Scenes.SceneSession<MySessionScene> {
  sessionProps: string;
}

export interface MyContext extends Context {
  contextProps: string;
  session: MySession;
  scene: Scenes.SceneContextScene<MyContext, MySessionScene>;
}

export interface ITGBotController {
  bot: Telegraf<MyContext>;
  launch(): Promise<void>;
  answerWebQuery(webAppQueryId: string, result: InlineQueryResult): Promise<void>;
}
