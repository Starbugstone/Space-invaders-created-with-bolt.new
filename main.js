import './style.css';
import { Game } from './src/game/Game';

const canvas = document.getElementById('gameCanvas');
canvas.width = 800;
canvas.height = 600;

const game = new Game(canvas);

function gameLoop() {
  game.update();
  game.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();