import { Context, Scenes } from 'telegraf';

export interface IBot {
  launch(): void;
}

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
