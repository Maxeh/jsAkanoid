import {ViewChild, Component, HostListener} from '@angular/core';
import {Ball} from './ball';
import {Board} from './board';
import {DrawService} from "./draw.service";
import {Settings} from "./settings";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DrawService]
})
export class AppComponent {
  context = null;
  debug: boolean = true;
  gameStarted: boolean  = false;
  gameInterval = null;
  ball = null;
  board = null;
  @ViewChild('canvas') canvas;

  constructor(public drawService: DrawService){}

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.drawService.initCanvas(this.canvas, this.context);

    this.ball = new Ball();
    this.board = new Board();
  }

  @HostListener('mousemove', ["$event"]) onMouseMove(event) {
    this.board.x = event.offsetX;
    this.board.y = event.offsetY;
  }

  startGame() {
    this.gameStarted = true;
    this.gameLoop();
  }

  gameLoop(){
    this.gameInterval = setInterval(() => {
      if (this.context !== null) {
        this.drawService.clearRect();
        if (this.debug === true)
          this.drawService.drawDebug(this.board);
        this.drawService.drawBall(this.ball);
        this.drawService.drawBoard(this.board, 3, true, true);

        this.updateBall();
        this.checkBoardHit();
      }
    }, 20);
  }

  updateBall() {
    if (this.ball.xChange === null) {
      this.ball.xChange = 2;
      this.ball.yChange = 1;

      this.ball.xDirection = "left";
      this.ball.yDirection = "up";
    }

    if (this.ball.xDirection === "left") {
      this.ball.x -= this.ball.xChange;
      if (this.ball.x < Ball.RADIUS) {
        this.ball.xDirection ="right"
      }
    }
    else {
      this.ball.x += this.ball.xChange;
      if (this.ball.x > Settings.CANVAS_WIDTH - Ball.RADIUS) {
        this.ball.xDirection ="left"
      }
    }

    if (this.ball.yDirection === "up") {
      this.ball.y -= this.ball.yChange;
      if (this.ball.y < Ball.RADIUS) {
        this.ball.yDirection ="down"
      }
    }
    else {
      this.ball.y += this.ball.yChange;
      if (this.ball.y > 372) {
        //this.ball.yDirection ="up"
      }
    }
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
