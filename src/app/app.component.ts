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
  level = 1;
  context = null;
  gameStarted: boolean  = false;
  trackMouse: boolean  = false;
  initialClick: boolean = false;
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

  @HostListener('document:mousemove', ["$event"]) onMouseMove(event) {
    if (this.trackMouse === true) {
      let w;
      if (window.innerWidth > Settings.CANVAS_WIDTH)
        w = window.innerWidth;
      else w = Settings.CANVAS_WIDTH;

      this.board.x = event.clientX - ((w - Settings.CANVAS_WIDTH) / 2);
      if (this.board.x < this.board.boardWidth / 2) {
        this.board.x = this.board.boardWidth / 2
      }
      if (this.board.x > Settings.CANVAS_WIDTH - this.board.boardWidth / 2) {
        this.board.x = Settings.CANVAS_WIDTH - this.board.boardWidth / 2;
      }
      this.board.x -= this.board.boardWidth / 2;
    }
  }

  @HostListener('document:mousedown') onMouseDown() {
    if (this.gameStarted) {
      this.initialClick = true;
    }
  }

  startGame() {
    this.gameStarted = true;
    document.body.style.cursor = "none";

    this.board = new Board();
    this.ball = new Ball(this.board);
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

    this.gameLoop();
    setTimeout(() => {
      this.trackMouse = true;
    }, 50)
  }

  gameLoop(){
    this.gameInterval = setInterval(() => {
      if (this.context !== null) {
        this.drawService.clearRect();
        this.drawService.drawBall(this.ball);
        this.drawService.drawBoard(this.board, 3, true, true);
        this.drawService.drawBricks(this.bricks);

        this.ball.updateBall(this.initialClick, this.board);
        this.ball.checkBoardHit(this.board);
        this.ball.checkBrickHit(this.bricks);
      }
    }, 10);
  }
}
