export class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = 50;
    this.height = 30;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 10;
    this.speed = 5;
    this.dx = 0;
  }

  move() {
    if (this.x + this.dx > 0 && this.x + this.dx + this.width < this.canvas.width) {
      this.x += this.dx;
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  shoot() {
    return new Bullet(this.x + this.width / 2, this.y);
  }
}

export class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 15;
    this.speed = 7;
  }

  move() {
    this.y -= this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
  }
}