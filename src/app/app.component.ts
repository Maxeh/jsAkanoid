import {ViewChild, Component, HostListener} from '@angular/core';
import {Ball} from './ball';
import {Board} from './board';
import {DrawService} from "./draw.service";
import {Settings} from "./settings";
import {Brick} from "./brick";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DrawService]
})
export class AppComponent {
  level = 2;
  context = null;
  debug: boolean = true;
  gameStarted: boolean  = false;
  trackMouse: boolean  = false;
  gameInterval = null;
  ball = null;
  board = null;
  bricks = [];
  @ViewChild('canvas') canvas;

  constructor(public drawService: DrawService){}

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.drawService.initCanvas(this.canvas, this.context);
  }

  @HostListener('mousemove', ["$event"]) onMouseMove(event) {
    if (this.trackMouse === true) {
      this.board.x = event.offsetX;
      this.board.y = event.offsetY;
    }
  }

  startGame() {
    this.ball = new Ball();
    this.board = new Board();
    Settings.getGameField(this.level).forEach((row, index1) => {
      row.forEach((cell, index2) => {
        if (cell === 1){
          this.bricks.push(
            new Brick(
              Settings.BRICK_WIDTH * index2,
              Settings.BRICK_HEIGHT * index1
            )
          );
        }
      })
    });

    this.gameStarted = true;
    this.gameLoop();
    setTimeout(() => {
      this.trackMouse = true;
    }, 50)
  }

  gameLoop(){
    this.gameInterval = setInterval(() => {
      if (this.context !== null) {
        this.drawService.clearRect();
        if (this.debug === true)
          this.drawService.drawDebug(this.board);
        this.drawService.drawBall(this.ball);
        this.drawService.drawBoard(this.board, 3, true, true);
        this.drawService.drawBricks(this.bricks);

        this.ball.updateBall();
        this.checkBoardHit();
      }
    }, 20);
  }

  checkBoardHit(){
    if (this.ball.y === Settings.CANVAS_HEIGHT - 30) {
      if (
        this.board.x - this.board.boardWidth / 2 < this.ball.x &&
        this.board.x + this.board.boardWidth / 2 > this.ball.x
      ) {
        this.ball.yDirection = "up";
      }
    }
  }
}
