export class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 30;
    this.speed = 1;
    this.dx = this.speed;
  }

  move() {
    this.x += this.dx;
  }

  draw(ctx) {
    ctx.fillStyle = '#f00';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveDown() {
    this.y += 30;
    this.dx = -this.dx;
  }
}

export class EnemyGrid {
  constructor(canvas) {
    this.canvas = canvas;
    this.enemies = [];
    this.init();
  }

  init() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 8; j++) {
        this.enemies.push(new Enemy(80 * j + 50, 50 * i + 50));
      }
    }
  }

  update() {
    let moveDown = false;
    this.enemies.forEach(enemy => {
      enemy.move();
      if (enemy.x <= 0 || enemy.x + enemy.width >= this.canvas.width) {
        moveDown = true;
      }
    });

    if (moveDown) {
      this.enemies.forEach(enemy => enemy.moveDown());
    }
  }

  draw(ctx) {
    this.enemies.forEach(enemy => enemy.draw(ctx));
  }
}