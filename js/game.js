// CORE FRONTIER — Stage 02
// Карта, камера, сетка, строительство по клеткам, путь врагов

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ---------- НАСТРОЙКИ ----------

const TILE_SIZE = 64;

const map = {
  cols: 30,
  rows: 22,
  width: 30 * TILE_SIZE,
  height: 22 * TILE_SIZE
};

const camera = {
  x: 0,
  y: 0,
  dragging: false,
  lastX: 0,
  lastY: 0
};

let selectedMode = null;
let waveActive = false;
let waveNumber = 0;

let resources = {
  wood: 50,
  stone: 20,
  food: 10
};

let base = {
  hp: 100,
  tileX: 26,
  tileY: 10
};

const towers = [];
const enemies = [];

// ---------- ПУТЬ ВРАГОВ ----------

const enemyPath = [
  { x: 0, y: 10 },
  { x: 4, y: 10 },
  { x: 4, y: 6 },
  { x: 10, y: 6 },
  { x: 10, y: 14 },
  { x: 17, y: 14 },
  { x: 17, y: 10 },
  { x: 26, y: 10 }
];

// ---------- ИНИЦИАЛИЗАЦИЯ ----------

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function updateUI() {
  document.getElementById("wood").innerText = resources.wood;
  document.getElementById("stone").innerText = resources.stone;
  document.getElementById("food").innerText = resources.food;
  document.getElementById("hp").innerText = base.hp;
}

updateUI();

// ---------- УПРАВЛЕНИЕ ----------

function buildTower() {
  selectedMode = "tower";
}

function startWave() {
  if (waveActive) return;

  waveActive = true;
  waveNumber++;

  const enemyCount = 5 + waveNumber * 2;

  for (let i = 0; i < enemyCount; i++) {
    enemies.push({
      pathIndex: 0,
      x: enemyPath[0].x * TILE_SIZE + TILE_SIZE / 2 - i * 80,
      y: enemyPath[0].y * TILE_SIZE + TILE_SIZE / 2,
      hp: 30 + waveNumber * 5,
      maxHp: 30 + waveNumber * 5,
      speed: 1.4 + waveNumber * 0.08,
      rewardWood: 5
    });
  }
}

canvas.addEventListener("mousedown", startDrag);
canvas.addEventListener("mousemove", dragCamera);
canvas.addEventListener("mouseup", endDrag);
canvas.addEventListener("mouseleave", endDrag);

canvas.addEventListener("touchstart", startDrag, { passive: false });
canvas.addEventListener("touchmove", dragCamera, { passive: false });
canvas.addEventListener("touchend", endDrag);

canvas.addEventListener("click", handleCanvasClick);

function getPointerPosition(event) {
  if (event.touches && event.touches.length > 0) {
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    };
  }

  return {
    x: event.clientX,
    y: event.clientY
  };
}

function startDrag(event) {
  event.preventDefault();

  const pos = getPointerPosition(event);

  camera.dragging = true;
  camera.lastX = pos.x;
  camera.lastY = pos.y;
}

function dragCamera(event) {
  if (!camera.dragging) return;

  event.preventDefault();

  const pos = getPointerPosition(event);

  const dx = pos.x - camera.lastX;
  const dy = pos.y - camera.lastY;

  camera.x -= dx;
  camera.y -= dy;

  camera.lastX = pos.x;
  camera.lastY = pos.y;

  clampCamera();
}

function endDrag() {
  camera.dragging = false;
}

function clampCamera() {
  camera.x = Math.max(0, Math.min(camera.x, map.width - canvas.width));
  camera.y = Math.max(0, Math.min(camera.y, map.height - canvas.height));
}

function handleCanvasClick(event) {
  if (camera.dragging) return;

  const rect = canvas.getBoundingClientRect();

  const screenX = event.clientX - rect.left;
  const screenY = event.clientY - rect.top;

  const worldX = screenX + camera.x;
  const worldY = screenY + camera.y;

  const tileX = Math.floor(worldX / TILE_SIZE);
  const tileY = Math.floor(worldY / TILE_SIZE);

  if (selectedMode === "tower") {
    placeTower(tileX, tileY);
  }
}

function placeTower(tileX, tileY) {
  if (resources.wood < 10) return;
  if (isPathTile(tileX, tileY)) return;
  if (isBaseTile(tileX, tileY)) return;
  if (isTowerTile(tileX, tileY)) return;

  resources.wood -= 10;

  towers.push({
    tileX,
    tileY,
    x: tileX * TILE_SIZE + TILE_SIZE / 2,
    y: tileY * TILE_SIZE + TILE_SIZE / 2,
    range: 160,
    damage: 0.45
  });

  updateUI();
}

// ---------- ПРОВЕРКИ ----------

function isPathTile(tileX, tileY) {
  return enemyPath.some(point => point.x === tileX && point.y === tileY);
}

function isBaseTile(tileX, tileY) {
  return tileX === base.tileX && tileY === base.tileY;
}

function isTowerTile(tileX, tileY) {
  return towers.some(tower => tower.tileX === tileX && tower.tileY === tileY);
}

// ---------- ОБНОВЛЕНИЕ ИГРЫ ----------

function updateEnemies() {
  enemies.forEach(enemy => {
    const target = enemyPath[enemy.pathIndex + 1];

    if (!target) {
      enemy.reachedBase = true;
      base.hp -= 5;
      updateUI();
      return;
    }

    const targetX = target.x * TILE_SIZE + TILE_SIZE / 2;
    const targetY = target.y * TILE_SIZE + TILE_SIZE / 2;

    const dx = targetX - enemy.x;
    const dy = targetY - enemy.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < enemy.speed) {
      enemy.x = targetX;
      enemy.y = targetY;
      enemy.pathIndex++;
    } else {
      enemy.x += (dx / distance) * enemy.speed;
      enemy.y += (dy / distance) * enemy.speed;
    }
  });

  for (let i = enemies.length - 1; i >= 0; i--) {
    if (enemies[i].hp <= 0) {
      resources.wood += enemies[i].rewardWood;
      enemies.splice(i, 1);
      updateUI();
    } else if (enemies[i].reachedBase) {
      enemies.splice(i, 1);
    }
  }

  if (waveActive && enemies.length === 0) {
    waveActive = false;
  }
}

function updateTowers() {
  towers.forEach(tower => {
    const target = enemies.find(enemy => {
      const dx = enemy.x - tower.x;
      const dy = enemy.y - tower.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= tower.range;
    });

    if (target) {
      target.hp -= tower.damage;
      tower.target = target;
    } else {
      tower.target = null;
    }
  });
}

// ---------- РЕНДЕР ----------

function drawMap() {
  ctx.fillStyle = "#16371f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const startCol = Math.floor(camera.x / TILE_SIZE);
  const endCol = Math.ceil((camera.x + canvas.width) / TILE_SIZE);

  const startRow = Math.floor(camera.y / TILE_SIZE);
  const endRow = Math.ceil((camera.y + canvas.height) / TILE_SIZE);

  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      if (col < 0 || row < 0 || col >= map.cols || row >= map.rows) continue;

      const screenX = col * TILE_SIZE - camera.x;
      const screenY = row * TILE_SIZE - camera.y;

      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.strokeRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
    }
  }
}

function drawPath() {
  ctx.strokeStyle = "#7b5a35";
  ctx.lineWidth = 28;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();

  enemyPath.forEach((point, index) => {
    const x = point.x * TILE_SIZE + TILE_SIZE / 2 - camera.x;
    const y = point.y * TILE_SIZE + TILE_SIZE / 2 - camera.y;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}

function drawBase() {
  const x = base.tileX * TILE_SIZE - camera.x;
  const y = base.tileY * TILE_SIZE - camera.y;

  ctx.fillStyle = "#8a5a2b";
  ctx.fillRect(x + 8, y + 8, TILE_SIZE - 16, TILE_SIZE - 16);

  ctx.font = "28px Arial";
  ctx.fillText("🏠", x + 16, y + 42);
}

function drawTowers() {
  towers.forEach(tower => {
    const x = tower.tileX * TILE_SIZE - camera.x;
    const y = tower.tileY * TILE_SIZE - camera.y;

    ctx.fillStyle = "#55e0e0";
    ctx.fillRect(x + 10, y + 10, TILE_SIZE - 20, TILE_SIZE - 20);

    ctx.font = "24px Arial";
    ctx.fillText("🏹", x + 18, y + 40);

    if (tower.target) {
      ctx.beginPath();
      ctx.moveTo(tower.x - camera.x, tower.y - camera.y);
      ctx.lineTo(tower.target.x - camera.x, tower.target.y - camera.y);
      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });
}

function drawEnemies() {
  enemies.forEach(enemy => {
    const x = enemy.x - camera.x;
    const y = enemy.y - camera.y;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.fillRect(x - 18, y - 25, 36, 5);

    ctx.fillStyle = "lime";
    ctx.fillRect(x - 18, y - 25, 36 * (enemy.hp / enemy.maxHp), 5);
  });
}

function drawBuildPreview() {
  if (selectedMode !== "tower") return;

  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "16px Arial";
  ctx.fillText("Режим строительства: нажми на свободную клетку", 20, 100);
}

// ---------- ГЛАВНЫЙ ЦИКЛ ----------

function gameLoop() {
  updateEnemies();
  updateTowers();

  drawMap();
  drawPath();
  drawBase();
  drawTowers();
  drawEnemies();
  drawBuildPreview();

  requestAnimationFrame(gameLoop);
}

gameLoop();