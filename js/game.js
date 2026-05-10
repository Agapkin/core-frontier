// CORE FRONTIER — Stage 02.2
// Stabilization: дорога, типы башен, типы врагов, wave manager, build validation

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ---------- CONFIG ----------

const TILE_SIZE = 64;

const map = {
  cols: 30,
  rows: 22,
  width: 30 * TILE_SIZE,
  height: 22 * TILE_SIZE
};

const towerTypes = {
  basic: {
    id: "basic",
    name: "Базовая башня",
    icon: "🏹",
    cost: { wood: 10 },
    range: 160,
    damage: 0.45,
    color: "#55e0e0"
  }
};

const enemyTypes = {
  runner: {
    id: "runner",
    name: "Быстрый враг",
    shape: "circle",
    color: "red",
    hp: 30,
    speed: 1.45,
    reward: { wood: 5 }
  },
  tank: {
    id: "tank",
    name: "Крепкий враг",
    shape: "square",
    color: "orange",
    hp: 65,
    speed: 0.9,
    reward: { wood: 10 }
  },
  scout: {
    id: "scout",
    name: "Лёгкий враг",
    shape: "triangle",
    color: "#ff4fd8",
    hp: 20,
    speed: 1.9,
    reward: { wood: 4 }
  }
};

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

const roadTiles = buildRoadTiles(enemyPath);

// ---------- STATE ----------

const camera = {
  x: 0,
  y: 0,
  dragging: false,
  moved: false,
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0
};

const uiState = {
  selectedMode: null,
  selectedTowerType: "basic",
  hoveredTile: null,
  message: ""
};

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

let waveState = {
  active: false,
  number: 0
};

const towers = [];
const enemies = [];

// ---------- INIT ----------

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  clampCamera();
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

updateUI();

// ---------- UI ----------

function updateUI() {
  setText("wood", resources.wood);
  setText("stone", resources.stone);
  setText("food", resources.food);
  setText("hp", base.hp);
  setText("wave", waveState.number);
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.innerText = value;
  }
}

function showMessage(text) {
  uiState.message = text;

  setTimeout(() => {
    if (uiState.message === text) {
      uiState.message = "";
    }
  }, 2000);
}

// ---------- BUTTON ACTIONS ----------

function buildTower() {
  if (uiState.selectedMode === "tower") {
    uiState.selectedMode = null;
    showMessage("Режим строительства выключен");
    return;
  }

  uiState.selectedMode = "tower";
  uiState.selectedTowerType = "basic";
  showMessage("Выбран режим строительства башни");
}

function startWave() {
  if (waveState.active) {
    showMessage("Текущая волна еще не завершена");
    return;
  }

  waveState.active = true;
  waveState.number += 1;

  const wave = createWave(waveState.number);

  wave.forEach((enemyConfig, index) => {
    spawnEnemy(enemyConfig.type, index);
  });

  updateUI();
  showMessage("Волна #" + waveState.number + " запущена");
}

// ---------- WAVE MANAGER ----------

function createWave(number) {
  const wave = [];

  const runnerCount = 4 + number * 2;
  const scoutCount = number >= 3 ? Math.floor(number / 2) : 0;
  const tankCount = number >= 5 ? Math.floor(number / 3) : 0;

  for (let i = 0; i < runnerCount; i++) {
    wave.push({ type: "runner" });
  }

  for (let i = 0; i < scoutCount; i++) {
    wave.push({ type: "scout" });
  }

  for (let i = 0; i < tankCount; i++) {
    wave.push({ type: "tank" });
  }

  return wave;
}

function spawnEnemy(typeId, index) {
  const type = enemyTypes[typeId];

  enemies.push({
    typeId,
    pathIndex: 0,
    x: enemyPath[0].x * TILE_SIZE + TILE_SIZE / 2 - index * 80,
    y: enemyPath[0].y * TILE_SIZE + TILE_SIZE / 2,
    hp: type.hp + waveState.number * 4,
    maxHp: type.hp + waveState.number * 4,
    speed: type.speed + waveState.number * 0.03,
    reachedBase: false
  });
}

// ---------- INPUT ----------

canvas.addEventListener("pointerdown", pointerStart);
canvas.addEventListener("pointermove", pointerMove);
canvas.addEventListener("pointerup", pointerEnd);
canvas.addEventListener("pointercancel", pointerEnd);

function getPointer(event) {
  return {
    x: event.clientX,
    y: event.clientY
  };
}

function pointerStart(event) {
  event.preventDefault();

  const pos = getPointer(event);

  camera.dragging = true;
  camera.moved = false;

  camera.startX = pos.x;
  camera.startY = pos.y;

  camera.lastX = pos.x;
  camera.lastY = pos.y;

  updateHoveredTile(pos.x, pos.y);
}

function pointerMove(event) {
  event.preventDefault();

  const pos = getPointer(event);

  updateHoveredTile(pos.x, pos.y);

  if (!camera.dragging) return;

  const totalDx = pos.x - camera.startX;
  const totalDy = pos.y - camera.startY;

  if (Math.abs(totalDx) > 7 || Math.abs(totalDy) > 7) {
    camera.moved = true;
  }

  if (camera.moved) {
    const dx = pos.x - camera.lastX;
    const dy = pos.y - camera.lastY;

    camera.x -= dx;
    camera.y -= dy;

    clampCamera();
  }

  camera.lastX = pos.x;
  camera.lastY = pos.y;
}

function pointerEnd(event) {
  event.preventDefault();

  const pos = getPointer(event);

  if (!camera.moved) {
    handleTap(pos.x, pos.y);
  }

  camera.dragging = false;
}

function clampCamera() {
  camera.x = Math.max(0, Math.min(camera.x, map.width - canvas.width));
  camera.y = Math.max(0, Math.min(camera.y, map.height - canvas.height));
}

// ---------- TILE HELPERS ----------

function updateHoveredTile(screenX, screenY) {
  const tile = screenToTile(screenX, screenY);
  uiState.hoveredTile = tile;
}

function screenToTile(screenX, screenY) {
  const worldX = screenX + camera.x;
  const worldY = screenY + camera.y;

  return {
    tileX: Math.floor(worldX / TILE_SIZE),
    tileY: Math.floor(worldY / TILE_SIZE)
  };
}

function handleTap(screenX, screenY) {
  const tile = screenToTile(screenX, screenY);

  if (uiState.selectedMode === "tower") {
    placeTower(tile.tileX, tile.tileY);
  }
}

function tileKey(tileX, tileY) {
  return tileX + "," + tileY;
}

function buildRoadTiles(path) {
  const result = new Set();

  for (let i = 0; i < path.length - 1; i++) {
    const current = path[i];
    const next = path[i + 1];

    const dx = Math.sign(next.x - current.x);
    const dy = Math.sign(next.y - current.y);

    let x = current.x;
    let y = current.y;

    result.add(tileKey(x, y));

    while (x !== next.x || y !== next.y) {
      if (x !== next.x) x += dx;
      if (y !== next.y) y += dy;

      result.add(tileKey(x, y));
    }
  }

  return result;
}

// ---------- BUILDING ----------

function placeTower(tileX, tileY) {
  const towerType = towerTypes[uiState.selectedTowerType];
  const validation = validateBuildTile(tileX, tileY, towerType);

  if (!validation.ok) {
    showMessage(validation.reason);
    return;
  }

  payCost(towerType.cost);

  towers.push({
    typeId: towerType.id,
    tileX,
    tileY,
    x: tileX * TILE_SIZE + TILE_SIZE / 2,
    y: tileY * TILE_SIZE + TILE_SIZE / 2,
    range: towerType.range,
    damage: towerType.damage,
    target: null
  });

  updateUI();
  showMessage("Башня построена");
}

function validateBuildTile(tileX, tileY, towerType) {
  if (tileX < 0 || tileY < 0 || tileX >= map.cols || tileY >= map.rows) {
    return { ok: false, reason: "Нельзя строить за пределами карты" };
  }

  if (isRoadTile(tileX, tileY)) {
    return { ok: false, reason: "Нельзя строить на дороге" };
  }

  if (isBaseTile(tileX, tileY)) {
    return { ok: false, reason: "Нельзя строить на базе" };
  }

  if (isTowerTile(tileX, tileY)) {
    return { ok: false, reason: "Клетка уже занята" };
  }

  if (!hasCost(towerType.cost)) {
    return { ok: false, reason: "Недостаточно ресурсов" };
  }

  return { ok: true, reason: "" };
}

function isRoadTile(tileX, tileY) {
  return roadTiles.has(tileKey(tileX, tileY));
}

function isBaseTile(tileX, tileY) {
  return tileX === base.tileX && tileY === base.tileY;
}

function isTowerTile(tileX, tileY) {
  return towers.some(tower => tower.tileX === tileX && tower.tileY === tileY);
}

function hasCost(cost) {
  return Object.entries(cost).every(([resource, amount]) => {
    return (resources[resource] || 0) >= amount;
  });
}

function payCost(cost) {
  Object.entries(cost).forEach(([resource, amount]) => {
    resources[resource] -= amount;
  });
}

// ---------- UPDATE ----------

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
    const enemy = enemies[i];
    const enemyType = enemyTypes[enemy.typeId];

    if (enemy.hp <= 0) {
      applyReward(enemyType.reward);
      enemies.splice(i, 1);
      updateUI();
    } else if (enemy.reachedBase) {
      enemies.splice(i, 1);
    }
  }

  if (waveState.active && enemies.length === 0) {
    waveState.active = false;
    showMessage("Волна завершена");
  }
}

function applyReward(reward) {
  Object.entries(reward).forEach(([resource, amount]) => {
    resources[resource] = (resources[resource] || 0) + amount;
  });
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

// ---------- DRAW ----------

function drawMap() {
  ctx.fillStyle = "#183b22";
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

function drawRoadTiles() {
  roadTiles.forEach(key => {
    const [tileX, tileY] = key.split(",").map(Number);

    const x = tileX * TILE_SIZE - camera.x;
    const y = tileY * TILE_SIZE - camera.y;

    ctx.fillStyle = "#6f5231";
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  });
}

function drawPathLine() {
  ctx.strokeStyle = "#8a673d";
  ctx.lineWidth = 18;
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

function drawHoveredTile() {
  if (!uiState.hoveredTile) return;
  if (uiState.selectedMode !== "tower") return;

  const tileX = uiState.hoveredTile.tileX;
  const tileY = uiState.hoveredTile.tileY;

  if (tileX < 0 || tileY < 0 || tileX >= map.cols || tileY >= map.rows) return;

  const towerType = towerTypes[uiState.selectedTowerType];

  const screenX = tileX * TILE_SIZE - camera.x;
  const screenY = tileY * TILE_SIZE - camera.y;

  const validation = validateBuildTile(tileX, tileY, towerType);
  const valid = validation.ok;

  ctx.fillStyle = valid
    ? "rgba(0,255,0,0.25)"
    : "rgba(255,0,0,0.25)";

  ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);

  ctx.strokeStyle = valid ? "lime" : "red";
  ctx.lineWidth = 2;
  ctx.strokeRect(screenX, screenY, TILE_SIZE, TILE_SIZE);

  ctx.globalAlpha = 0.6;

  ctx.fillStyle = towerType.color;
  ctx.fillRect(screenX + 10, screenY + 10, TILE_SIZE - 20, TILE_SIZE - 20);

  ctx.font = "24px Arial";
  ctx.fillText(towerType.icon, screenX + 18, screenY + 40);

  ctx.globalAlpha = 1;
}

function drawTowers() {
  towers.forEach(tower => {
    const towerType = towerTypes[tower.typeId];

    const x = tower.tileX * TILE_SIZE - camera.x;
    const y = tower.tileY * TILE_SIZE - camera.y;

    ctx.fillStyle = towerType.color;
    ctx.fillRect(x + 10, y + 10, TILE_SIZE - 20, TILE_SIZE - 20);

    ctx.font = "24px Arial";
    ctx.fillText(towerType.icon, x + 18, y + 40);

    if (tower.target) {
      ctx.beginPath();

      ctx.moveTo(tower.x - camera.x, tower.y - camera.y);

      ctx.lineTo(
        tower.target.x - camera.x,
        tower.target.y - camera.y
      );

      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });
}

function drawEnemies() {
  enemies.forEach(enemy => {
    const enemyType = enemyTypes[enemy.typeId];

    const x = enemy.x - camera.x;
    const y = enemy.y - camera.y;

    ctx.fillStyle = enemyType.color;

    if (enemyType.shape === "circle") {
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();
    }

    if (enemyType.shape === "square") {
      ctx.fillRect(x - 15, y - 15, 30, 30);
    }

    if (enemyType.shape === "triangle") {
      ctx.beginPath();
      ctx.moveTo(x, y - 18);
      ctx.lineTo(x - 16, y + 14);
      ctx.lineTo(x + 16, y + 14);
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = "black";
    ctx.fillRect(x - 18, y - 25, 36, 5);

    ctx.fillStyle = "lime";
    ctx.fillRect(
      x - 18,
      y - 25,
      36 * (enemy.hp / enemy.maxHp),
      5
    );
  });
}

function drawMessage() {
  if (!uiState.message) return;

  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(20, canvas.height - 70, 460, 40);

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(uiState.message, 35, canvas.height - 43);
}

// ---------- LOOP ----------

function gameLoop() {
  updateEnemies();
  updateTowers();

  drawMap();
  drawRoadTiles();
  drawPathLine();
  drawBase();

  drawHoveredTile();

  drawTowers();
  drawEnemies();

  drawMessage();

  requestAnimationFrame(gameLoop);
}

gameLoop();