import {Settings} from "./settings";

export class Board {
  x = null;
  y = null;

  boardX = Settings.CANVAS_WIDTH / 2;
  boardY = Settings.CANVAS_HEIGHT - 20;
  boardWidth = 100;
  boardHeight = 10;
}
