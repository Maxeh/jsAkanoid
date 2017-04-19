import {Settings} from "./settings";

export class Ball {
  public static readonly RADIUS = 8;

  x = Settings.CANVAS_WIDTH / 2;
  y = Settings.CANVAS_HEIGHT - 30;

  xChange = null;
  yChange = null;

  xDirection = "";
  yDirection = "";
}
