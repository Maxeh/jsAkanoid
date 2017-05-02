export class Brick {
  x: number;
  y: number;
  visible: boolean = true;
  type = null;
  hits = 1;

  constructor(x, y, type){
    this.x = x;
    this.y = y;

    switch(type) {
      case 2: this.type = "changeDirection"; break;
      case 3: this.type = "extraBall"; break;
      case 4: this.type = "longBoard"; break;
      case 5: this.type = "strongBrick"; this.hits = 4; break;
    }
  }
}
