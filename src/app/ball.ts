import {Settings} from "./settings";

export class Ball {
  x = 0;
  y = 0;
  xChange = null;
  yChange = null;
  xDirection = "";
  yDirection = "";
  gameOver = false;
  changeDirectionInterval = null;
  changeDirectionTimeout = null;
  changeBoardTimeout = null;
  updateBallCounter = 0;
  mainClass = null;

  constructor(x, y, mainClass) {
    this.x = x;
    this.y = y;
    this.mainClass = mainClass;
  }

  updateBall(initialClick, board) {
    if (initialClick) {
      if (this.xChange === null) {
        this.xChange = 1;
        this.yChange = 1;

        if (Math.random() < 0.5)
          this.xDirection = "left";
        else this.xDirection = "left";
        this.yDirection = "up";
      }

      let xChange = this.xChange;
      if (this.xChange % 1 !== 0) {
        if (this.updateBallCounter % 2 === 0) {
          xChange -= 0.5;
        }
        else {
          xChange += 0.5;
        }
        this.updateBallCounter++;
      }

      if (this.xDirection === "left") {
        this.x -= xChange;
        if (this.x < Settings.BALL_RADIUS) {
          this.xDirection = "right"
        }
      }
      else {
        this.x += xChange;
        if (this.x > Settings.CANVAS_WIDTH - Settings.BALL_RADIUS) {
          this.xDirection = "left"
        }
      }

      if (this.yDirection === "up") {
        this.y -= this.yChange;
        if (this.y < Settings.BALL_RADIUS) {
          this.yDirection = "down"
        }
      }
      else {
        this.y += this.yChange;
        if (this.y > Settings.CANVAS_HEIGHT - Settings.BALL_RADIUS) {
          this.gameOver = true;
        }
      }
    }
    else {
      this.x = board.x + board.boardWidth / 2;
      this.y = board.y - board.boardHeight + 2;
    }
  }

  checkBoardHit(board){
    const z = Settings.BALL_RADIUS / 2;

    if ( // hit top of board
      this.yDirection === "down" &&
      this.y + Settings.BALL_RADIUS === board.y &&
      this.x+z - Settings.BALL_RADIUS > board.x &&
      this.x-z - Settings.BALL_RADIUS < board.x + board.boardWidth
    ) {
      this.yDirection = "up";
      this.adjustXChange();
    }
    else if ( // hit left side of board
      this.yDirection === "down" &&
      this.xDirection === "right" &&
      this.y+z > board.y &&
      this.y-z < board.y + board.boardHeight &&
      (this.x + Settings.BALL_RADIUS === board.x ||
       this.x + Settings.BALL_RADIUS - 1 === board.x)
    ) {
      // this will lead to game over
      this.xDirection = "left";
    }
    else if ( // hit right side of board
      this.yDirection === "down" &&
      this.xDirection === "left" &&
      this.y+z > board.y &&
      this.y-z < board.y + board.boardHeight &&
      (this.x - Settings.BALL_RADIUS === board.x ||
      this.x - Settings.BALL_RADIUS - 1 === board.x)
    ) {
      // this will lead to game over
      this.xDirection = "right";
    }
    else if ( // hit left corner of board
      this.yDirection === "down" &&
      this.xDirection === "right" &&
      this.y + Settings.BALL_RADIUS > board.y &&
      this.y + Settings.BALL_RADIUS < board.y + board.boardHeight &&
      this.x + Settings.BALL_RADIUS > board.x &&
      this.x + Settings.BALL_RADIUS < board.x + board.boardWidth
    ) {
      this.yDirection = "up";
      this.xDirection = "left";
      this.adjustXChange();
    }
    else if ( // hit right corner of board
      this.yDirection === "down" &&
      this.xDirection === "left" &&
      this.y + Settings.BALL_RADIUS > board.y &&
      this.y + Settings.BALL_RADIUS < board.y + board.boardHeight &&
      this.x - Settings.BALL_RADIUS > board.x &&
      this.x - Settings.BALL_RADIUS < board.x + board.boardWidth
    ) {
      this.yDirection = "up";
      this.xDirection = "right";
      this.adjustXChange();
    }
  }

  adjustXChange() {
    if (this.xChange === 0.5)
      this.xChange = 1;
    else if (this.xChange === 2)
      this.xChange = 1.5;
    else {
      if (Math.random() < 0.5)
        this.xChange += 0.5;
      else this.xChange -= 0.5;
    }
    console.log(this.xChange);
  }

  checkBrickHit(bricks){
    const z = Settings.BALL_RADIUS / 2;

    bricks.forEach((brick) => {
      if ( // hit bottom of brick
        brick.visible === true && this.yDirection === "up" &&
        this.y - Settings.BALL_RADIUS === brick.y + Settings.BRICK_HEIGHT &&
        this.x+z - Settings.BALL_RADIUS > brick.x &&
        this.x-z - Settings.BALL_RADIUS < brick.x + Settings.BRICK_WIDTH
      ){
        this.yDirection = "down";
        brick.visible = false;
        this.checkForEvent(brick);
      }
      else if ( // hit top of brick
        brick.visible === true && this.yDirection === "down" &&
        this.y + Settings.BALL_RADIUS === brick.y &&
        this.x+z - Settings.BALL_RADIUS > brick.x &&
        this.x-z - Settings.BALL_RADIUS < brick.x + Settings.BRICK_WIDTH
      ){
        this.yDirection = "up";
        brick.visible = false;
        this.checkForEvent(brick);
      }
      else if ( // hit right side of brick
        brick.visible === true && this.xDirection === "left" &&
        this.y+z > brick.y &&
        this.y-z < brick.y + Settings.BRICK_HEIGHT &&
        (this.x - Settings.BALL_RADIUS === brick.x + Settings.BRICK_WIDTH ||
        this.x - Settings.BALL_RADIUS + 1 === brick.x + Settings.BRICK_WIDTH)
      ){
        this.xDirection = "right";
        brick.visible = false;
        this.checkForEvent(brick);
      }
      else if ( // hit left side of brick
        brick.visible === true && this.xDirection === "right" &&
        this.y+z > brick.y &&
        this.y-z < brick.y + Settings.BRICK_HEIGHT &&
        (this.x + Settings.BALL_RADIUS === brick.x ||
        this.x + Settings.BALL_RADIUS - 1 === brick.x)
      ){
        this.xDirection = "left";
        brick.visible = false;
        this.checkForEvent(brick);
      }
      else if ( // hit lower right corner of brick
        brick.visible === true && this.yDirection === "up" && this.xDirection === "left" &&
        this.y - Settings.BALL_RADIUS > brick.y &&
        this.y - Settings.BALL_RADIUS < brick.y + Settings.BRICK_HEIGHT &&
        this.x - Settings.BALL_RADIUS < brick.x + Settings.BRICK_WIDTH &&
        this.x - Settings.BALL_RADIUS > brick.x
      ){
        this.xDirection = "right";
        this.yDirection = "down";
        brick.visible = false;
        this.checkForEvent(brick);
      }
      else if ( // hit lower left corner of brick
        brick.visible === true && this.yDirection === "up" && this.xDirection === "right" &&
        this.y - Settings.BALL_RADIUS > brick.y &&
        this.y - Settings.BALL_RADIUS < brick.y + Settings.BRICK_HEIGHT &&
        this.x + Settings.BALL_RADIUS < brick.x + Settings.BRICK_WIDTH &&
        this.x + Settings.BALL_RADIUS > brick.x
      ){
        this.xDirection = "left";
        this.yDirection = "down";
        brick.visible = false;
        this.checkForEvent(brick);
      }
      else if ( // hit upper right corner of brick
        brick.visible === true && this.yDirection === "down" && this.xDirection === "left" &&
        this.y + Settings.BALL_RADIUS > brick.y &&
        this.y + Settings.BALL_RADIUS < brick.y + Settings.BRICK_HEIGHT &&
        this.x - Settings.BALL_RADIUS < brick.x + Settings.BRICK_WIDTH &&
        this.x - Settings.BALL_RADIUS > brick.x
      ){
        this.xDirection = "right";
        this.yDirection = "up";
        brick.visible = false;
        this.checkForEvent(brick);
      }
      else if ( // hit upper left corner of brick
        brick.visible === true && this.yDirection === "down" && this.xDirection === "right" &&
        this.y + Settings.BALL_RADIUS > brick.y &&
        this.y + Settings.BALL_RADIUS < brick.y + Settings.BRICK_HEIGHT &&
        this.x + Settings.BALL_RADIUS < brick.x + Settings.BRICK_WIDTH &&
        this.x + Settings.BALL_RADIUS > brick.x
      ){
        this.xDirection = "left";
        this.yDirection = "up";
        brick.visible = false;
        this.checkForEvent(brick);
      }
    })
  }

  checkForEvent(brick) {
    switch(brick.type) {
      case "extraBall":
        this.extraBallEvent(brick);
        break;
      case "changeDirection":
        this.changeDirectionEvent();
        break;
      case "longBoard":
        this.changeBoardWidthEvent();
        break;
    }
  }

  changeBoardWidthEvent() {
    this.mainClass.board.boardWidth += 50;
    if (this.mainClass.board.x > 25)
      this.mainClass.board.x -= 25;

    this.changeBoardTimeout = setTimeout(() => {
      this.mainClass.board.boardWidth -= 50;
      if (this.mainClass.board.x < (Settings.CANVAS_WIDTH-25))
        this.mainClass.board.x += 25;
    }, 15000)
  }

  extraBallEvent(brick) {
    this.mainClass.extraBalls.push(
      new Ball(
        brick.x + Settings.BRICK_WIDTH / 2,
        brick.y + Settings.BRICK_HEIGHT,
        this.mainClass
      )
    );
  }

  changeDirectionEvent() {
    if (this.changeDirectionInterval === null){
      this.changeDirectionInterval = setInterval(() => {
        if (Math.random() < 0.5) {
          this.xDirection = "left";
        }
        else this.xDirection = "right";

        if (Math.random() < 0.5) {
          this.xChange = 1;
        }
        else this.xChange = 2;
      }, 80);

      this.changeDirectionTimeout = setTimeout(() => {
        clearInterval(this.changeDirectionInterval);
        this.changeDirectionInterval = null;
      }, 10000);
    }
  }
}
