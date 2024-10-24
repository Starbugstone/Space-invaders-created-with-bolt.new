export class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 30;
    this.speed = 1;
    this.direction = 1;
  }

  update(canvas) {
    this.x += this.speed * this.direction;
    
    if (this.x <= 0 || this.x + this.width >= canvas.width) {
      return true;
    }
    return false;
  }

  moveDown() {
    this.y += 30;
    this.direction *= -1;
  }

  draw(ctx) {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}