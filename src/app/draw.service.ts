import { Injectable } from '@angular/core';
import {Settings} from "./settings";

@Injectable()
export class DrawService {
  canvas = null;
  ctx = null;

  initCanvas(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;

    const dpr = window.devicePixelRatio || 1;
    const bsr = this.ctx.webkitBackingStorePixelRatio || this.ctx.mozBackingStorePixelRatio ||
      this.ctx.msBackingStorePixelRatio || this.ctx.oBackingStorePixelRatio ||
      this.ctx.backingStorePixelRatio || 1;
    const pixelRatio = dpr / bsr;
    this.canvas.nativeElement.width = Settings.CANVAS_WIDTH * pixelRatio;
    this.canvas.nativeElement.height = Settings.CANVAS_HEIGHT * pixelRatio;
    this.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  clearRect(){
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.ctx.restore();
  }

  drawBricks(bricks) {
    bricks.forEach((brick) => {
      if (brick.visible) {
        this.ctx.beginPath();
        this.ctx.rect(brick.x, brick.y, Settings.BRICK_WIDTH, Settings.BRICK_HEIGHT);
        this.ctx.fillStyle = "#2980b9";
        this.ctx.fill();
        this.ctx.strokeStyle = "#CCC";
        this.ctx.stroke();
      }
    });
  }

  drawBall(ball) {
    this.ctx.beginPath();
    this.ctx.arc(ball.x, ball.y, Settings.BALL_RADIUS, 0, 2*Math.PI);
    this.ctx.strokeStyle = "rgb(255, 0, 0)";
    this.ctx.fillStyle = "rgba(255, 255, 0, .5)";
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawBoard(board, radius, fill, stroke) {
    let x = board.x;
    let y = board.y;
    let width = board.boardWidth;
    let height = board.boardHeight;

    if (typeof stroke == 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius.tl, y);
    this.ctx.lineTo(x + width - radius.tr, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    this.ctx.lineTo(x + width, y + height - radius.br);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    this.ctx.lineTo(x + radius.bl, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    this.ctx.lineTo(x, y + radius.tl);
    this.ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    this.ctx.closePath();
    if (fill) {
      this.ctx.fillStyle = "#34495e";
      this.ctx.fill();
    }
    if (stroke) {
      this.ctx.strokeStyle = "#ecf0f1";
      this.ctx.stroke();
    }
  }
}
