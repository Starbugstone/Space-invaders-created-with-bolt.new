import { Player } from './player.js';
import { EnemyGrid } from './enemy.js';

export class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 600;
    
    this.player = new Player(this.canvas);
    this.bullets = [];
    this.enemyGrid = new EnemyGrid(this.canvas);
    this.score = 0;
    this.gameOver = false;
    
    this.setupControls();
  }

  setupControls() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.player.dx = -this.player.speed;
      if (e.key === 'ArrowRight') this.player.dx = this.player.speed;
      if (e.key === ' ') this.bullets.push(this.player.shoot());
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft' && this.player.dx < 0) this.player.dx = 0;
      if (e.key === 'ArrowRight' && this.player.dx > 0) this.player.dx = 0;
    });
  }

  checkCollisions() {
    this.bullets.forEach((bullet, bulletIndex) => {
      this.enemyGrid.enemies.forEach((enemy, enemyIndex) => {
        if (this.detectCollision(bullet, enemy)) {
          this.bullets.splice(bulletIndex, 1);
          this.enemyGrid.enemies.splice(enemyIndex, 1);
          this.score += 100;
          document.getElementById('score').textContent = `Score: ${this.score}`;
        }
      });
    });

    // Check if enemies reached the player
    this.enemyGrid.enemies.forEach(enemy => {
      if (enemy.y + enemy.height >= this.player.y) {
        this.gameOver = true;
      }
    });
  }

  detectCollision(bullet, enemy) {
    return bullet.x >= enemy.x &&
           bullet.x <= enemy.x + enemy.width &&
           bullet.y <= enemy.y + enemy.height &&
           bullet.y + bullet.height >= enemy.y;
  }

  update() {
    if (this.gameOver) {
      document.querySelector('.game-over').style.display = 'block';
      return;
    }

    this.player.move();
    this.bullets = this.bullets.filter(bullet => bullet.y > 0);
    this.bullets.forEach(bullet => bullet.move());
    this.enemyGrid.update();
    this.checkCollisions();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    this.bullets.forEach(bullet => bullet.draw(this.ctx));
    this.enemyGrid.draw(this.ctx);
  }

  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }

  start() {
    this.gameLoop();
  }
}