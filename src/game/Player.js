export class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = 50;
    this.height = 30;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 10;
    this.speed = 5;
    this.bullets = [];
  }

  move(direction) {
    if (direction === 'left' && this.x > 0) {
      this.x -= this.speed;
    }
    if (direction === 'right' && this.x < this.canvas.width - this.width) {
      this.x += this.speed;
    }
  }

  shoot() {
    this.bullets.push({
      x: this.x + this.width / 2,
      y: this.y,
      width: 3,
      height: 15,
      speed: 7
    });
  }

  update() {
    this.bullets = this.bullets.filter(bullet => bullet.y > 0);
    this.bullets.forEach(bullet => bullet.y -= bullet.speed);
  }

  draw(ctx) {
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    ctx.fillStyle = '#fff';
    this.bullets.forEach(bullet => {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
  }
}