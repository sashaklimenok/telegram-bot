import { Context, Scenes, Telegraf } from 'telegraf';

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

export interface ITelegrafService {
  launch(): Promise<void>;
  bot: Telegraf<MyContext>;
}
