const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let wood = 50;
let stone = 20;
let food = 10;
let hp = 100;

const towers = [];
const enemies = [];

function updateUI() {
  document.getElementById("wood").innerText = wood;
  document.getElementById("stone").innerText = stone;
  document.getElementById("food").innerText = food;
  document.getElementById("hp").innerText = hp;
}

updateUI();

function buildTower() {
  if (wood >= 10) {
    wood -= 10;

    towers.push({
      x: Math.random() * canvas.width,
      y: canvas.height - 150
    });

    updateUI();
  }
}

function startWave() {
  for (let i = 0; i < 5; i++) {
    enemies.push({
      x: Math.random() * canvas.width,
      y: -Math.random() * 500,
      hp: 30
    });
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#18361f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  towers.forEach(tower => {
    ctx.fillStyle = "cyan";
    ctx.fillRect(tower.x, tower.y, 30, 30);

    enemies.forEach(enemy => {
      const dx = enemy.x - tower.x;
      const dy = enemy.y - tower.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        enemy.hp -= 0.2;

        ctx.beginPath();
        ctx.moveTo(tower.x + 15, tower.y + 15);
        ctx.lineTo(enemy.x, enemy.y);
        ctx.strokeStyle = "cyan";
        ctx.stroke();
      }
    });
  });

  enemies.forEach((enemy, index) => {
    enemy.y += 0.5;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, 12, 0, Math.PI * 2);
    ctx.fill();

    if (enemy.hp <= 0) {
      enemies.splice(index, 1);
      wood += 5;
      updateUI();
    }

    if (enemy.y > canvas.height) {
      enemies.splice(index, 1);
      hp -= 10;
      updateUI();
    }
  });

  requestAnimationFrame(gameLoop);
}

gameLoop();