import {Settings} from "./settings";

export class Ball {
  public static readonly RADIUS = 8;

  x = Settings.CANVAS_WIDTH / 2;
  y = Settings.CANVAS_HEIGHT - 30;

  xChange = null;
  yChange = null;

  xDirection = "";
  yDirection = "";

  updateBall() {
    if (this.xChange === null) {
      this.xChange = 2;
      this.yChange = 1;

      this.xDirection = "left";
      this.yDirection = "up";
    }

    if (this.xDirection === "left") {
      this.x -= this.xChange;
      if (this.x < Ball.RADIUS) {
        this.xDirection ="right"
      }
    }
    else {
      this.x += this.xChange;
      if (this.x > Settings.CANVAS_WIDTH - Ball.RADIUS) {
        this.xDirection ="left"
      }
    }

    if (this.yDirection === "up") {
      this.y -= this.yChange;
      if (this.y < Ball.RADIUS) {
        this.yDirection ="down"
      }
    }
    else {
      this.y += this.yChange;
      if (this.y > 372) {
        //this.yDirection ="up"
      }
    }
  }
}
