import {ViewChild, Component, HostListener} from '@angular/core';
import {Ball} from './ball';
import {Board} from './board';
import {DrawService} from "./draw.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DrawService]
})
export class AppComponent {
  context = null;
  canvasWidth: number = 720;
  canvasHeight: number = 380;
  debug: boolean = true;
  gameStarted: boolean  = false;
  gameInterval = null;
  ball = null;
  board = null;
  @ViewChild('canvas') canvas;

  constructor(public drawService: DrawService){}

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext("2d");

    const dpr = window.devicePixelRatio || 1;
    const bsr = this.context.webkitBackingStorePixelRatio || this.context.mozBackingStorePixelRatio ||
      this.context.msBackingStorePixelRatio || this.context.oBackingStorePixelRatio ||
      this.context.backingStorePixelRatio || 1;
    const pixelRatio = dpr / bsr;

    this.canvas.nativeElement.width = this.canvasWidth * pixelRatio;
    this.canvas.nativeElement.height = this.canvasHeight * pixelRatio;

    this.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    this.ball = new Ball();
    this.board = new Board();
  }

  gameLoop(){
    this.gameInterval = setInterval(() => {
      if (this.context !== null) {
        this.redraw();
        this.updateBall();
        this.checkBoardHit();
      }
    }, 20);
  }

  @HostListener('mousemove', ["$event"]) onMouseMove(event) {
    this.board.x = event.offsetX;
    this.board.y = event.offsetY;
  }

  startGame() {
    this.gameStarted = true;
    this.gameLoop();
  }

  redraw() {
    this.context.save();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.context.restore();
    this.context.font = "12px Arial";

    if (this.debug === true) {
      this.context.fillText("MouseX: " + (this.board.x ? this.board.x : 0), 5, 15);
      this.context.fillText("MouseY: " + (this.board.y ? this.board.y : 0), 5, 30);
    }

    let xpos = this.board.x;
    if (xpos === null) {
      xpos = 360;
    }
    if (xpos < 50) {
      xpos = 50
    }
    if (xpos > 670) {
      xpos = 670;
    }

    this.context.beginPath();
    this.context.arc(this.ball.x,this.ball.y,8,0,2*Math.PI);
    this.context.fill();
    this.context.stroke();



    this.context.strokeStyle = "rgb(255, 0, 0)";
    this.context.fillStyle = "rgba(255, 255, 0, .5)";
    this.drawService.roundRect(this.context, xpos - 50, 360, 100, 10, 3, true, true);
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
      if (this.ball.x < 8) {
        this.ball.xDirection ="right"
      }
    }
    else {
      this.ball.x += this.ball.xChange;
      if (this.ball.x > 712) {
        this.ball.xDirection ="left"
      }
    }

    if (this.ball.yDirection === "up") {
      this.ball.y -= this.ball.yChange;
      if (this.ball.y < 8) {
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
    if (this.ball.y === 360) {
      if (this.board.x-50 < this.ball.x && this.board.x+50 > this.ball.x)
        this.ball.yDirection = "up";
    }
  }
}
