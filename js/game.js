// CORE FRONTIER — Stage 02.4
// Core Gameplay Stabilization: Game Over, Restart, balance, tower selection, range, selling, cleaner UI

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

const gameBalance = {
  startWood: 72,
  startStone: 20,
  startFood: 10,

  baseHp: 100,
  baseDamagePerEnemy: 8,

  towerCostWood: 14,
  towerSellReturnRate: 0.55,

  firstWaveEnemyCount: 5,
  waveGrowth: 2
};

const towerTypes = {
  basic: {
    id: "basic",
    name: "Базовая башня",
    icon: "🏹",
    cost: { wood: gameBalance.towerCostWood },
    sellReturnRate: gameBalance.towerSellReturnRate,
    range: 155,
    damage: 0.36,
    color: "#55e0e0",
    description: "Универсальная башня для первых волн."
  }
};

const enemyTypes = {
  runner: {
    id: "runner",
    name: "Бегун",
    shape: "circle",
    color: "#ff3d3d",
    hp: 34,
    speed: 1.55,
    reward: { wood: 5 }
  },
  scout: {
    id: "scout",
    name: "Разведчик",
    shape: "triangle",
    color: "#ff4fd8",
    hp: 25,
    speed: 2.05,
    reward: { wood: 4 }
  },
  tank: {
    id: "tank",
    name: "Тяжёлый",
    shape: "square",
    color: "#ff9f1c",
    hp: 82,
    speed: 1.0,
    reward: { wood: 8 }
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
  selectedTower: null,
  message: "",
  infoPanelOpen: false
};

let resources = {
  wood: gameBalance.startWood,
  stone: gameBalance.startStone,
  food: gameBalance.startFood
};

let base = {
  hp: gameBalance.baseHp,
  tileX: 26,
  tileY: 10
};

let waveState = {
  active: false,
  number: 0,
  totalEnemies: 0,
  spawnedEnemies: 0,
  killedEnemies: 0,
  reachedBase: 0
};

let gameState = {
  gameOver: false
};

let gameSpeed = 1;

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

createSpeedControls();
createRestartButton();
createSellButton();
createInfoButton();
updateUI();

// ---------- UI ----------

function updateUI() {
  setText("wood", Math.floor(resources.wood));
  setText("stone", Math.floor(resources.stone));
  setText("food", Math.floor(resources.food));
  setText("hp", Math.floor(base.hp));
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
  }, 2200);
}

function createSpeedControls() {
  const oldPanel = document.getElementById("speed-panel");
  if (oldPanel) oldPanel.remove();

  const panel = document.createElement("div");
  panel.id = "speed-panel";
  panel.style.position = "fixed";
  panel.style.right = "10px";
  panel.style.bottom = "90px";
  panel.style.zIndex = "20";
  panel.style.display = "flex";
  panel.style.gap = "6px";

  [1, 2, 3].forEach(speed => {
    const button = document.createElement("button");
    button.innerText = "x" + speed;
    button.style.padding = "8px 10px";
    button.style.borderRadius = "8px";
    button.style.border = "none";
    button.style.background = speed === 1 ? "#d9a441" : "#2f6b3c";
    button.style.color = "white";
    button.style.fontWeight = "bold";

    button.onclick = () => {
      if (gameState.gameOver) return;

      gameSpeed = speed;

      Array.from(panel.children).forEach(child => {
        child.style.background = "#2f6b3c";
      });

      button.style.background = "#d9a441";
      showMessage("Скорость игры: x" + speed);
    };

    panel.appendChild(button);
  });

  document.body.appendChild(panel);
}

function createRestartButton() {
  const oldButton = document.getElementById("restart-button");
  if (oldButton) oldButton.remove();

  const button = document.createElement("button");
  button.id = "restart-button";
  button.innerText = "↻ Restart";
  button.style.position = "fixed";
  button.style.left = "10px";
  button.style.bottom = "90px";
  button.style.zIndex = "20";
  button.style.padding = "8px 12px";
  button.style.borderRadius = "8px";
  button.style.border = "none";
  button.style.background = "#8a2d2d";
  button.style.color = "white";
  button.style.fontWeight = "bold";

  button.onclick = () => {
    restartGame();
  };

  document.body.appendChild(button);
}

function createSellButton() {
  const oldButton = document.getElementById("sell-button");
  if (oldButton) oldButton.remove();

  const button = document.createElement("button");
  button.id = "sell-button";
  button.innerText = "Продать башню";
  button.style.position = "fixed";
  button.style.left = "115px";
  button.style.bottom = "90px";
  button.style.zIndex = "20";
  button.style.padding = "8px 12px";
  button.style.borderRadius = "8px";
  button.style.border = "none";
  button.style.background = "#2f6b3c";
  button.style.color = "white";
  button.style.fontWeight = "bold";

  button.onclick = () => {
    sellSelectedTower();
  };

  document.body.appendChild(button);
}

function createInfoButton() {
  const oldButton = document.getElementById("info-button");
  if (oldButton) oldButton.remove();

  const button = document.createElement("button");
  button.id = "info-button";
  button.innerText = "ℹ Info";
  button.style.position = "fixed";
  button.style.right = "10px";
  button.style.bottom = "132px";
  button.style.zIndex = "20";
  button.style.padding = "8px 12px";
  button.style.borderRadius = "8px";
  button.style.border = "none";
  button.style.background = "#33445f";
  button.style.color = "white";
  button.style.fontWeight = "bold";

  button.onclick = () => {
    uiState.infoPanelOpen = !uiState.infoPanelOpen;
  };

  document.body.appendChild(button);
}

// ---------- BUTTON ACTIONS ----------

function buildTower() {
  if (gameState.gameOver) {
    showMessage("Игра окончена. Нажми Restart");
    return;
  }

  uiState.selectedTower = null;

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
  if (gameState.gameOver) {
    showMessage("Игра окончена. Нажми Restart");
    return;
  }

  if (waveState.active) {
    showMessage("Текущая волна еще не завершена");
    return;
  }

  uiState.selectedMode = null;
  uiState.selectedTower = null;

  waveState.active = true;
  waveState.number += 1;
  waveState.spawnedEnemies = 0;
  waveState.killedEnemies = 0;
  waveState.reachedBase = 0;

  const wave = createWave(waveState.number);
  waveState.totalEnemies = wave.length;

  wave.forEach((enemyConfig, index) => {
    spawnEnemy(enemyConfig.type, index);
  });

  updateUI();
  showMessage("Волна #" + waveState.number + " запущена");
}

// ---------- RESTART / GAME OVER ----------

function restartGame() {
  resources = {
    wood: gameBalance.startWood,
    stone: gameBalance.startStone,
    food: gameBalance.startFood
  };

  base = {
    hp: gameBalance.baseHp,
    tileX: 26,
    tileY: 10
  };

  waveState = {
    active: false,
    number: 0,
    totalEnemies: 0,
    spawnedEnemies: 0,
    killedEnemies: 0,
    reachedBase: 0
  };

  gameState.gameOver = false;
  gameSpeed = 1;

  towers.length = 0;
  enemies.length = 0;

  uiState.selectedMode = null;
  uiState.selectedTower = null;
  uiState.message = "";

  createSpeedControls();
  updateUI();
  showMessage("Игра перезапущена");
}

function triggerGameOver() {
  if (gameState.gameOver) return;

  gameState.gameOver = true;
  waveState.active = false;
  base.hp = 0;
  enemies.length = 0;
  uiState.selectedMode = null;

  updateUI();
  showMessage("База уничтожена");
}

// ---------- WAVE MANAGER ----------

function createWave(number) {
  const wave = [];

  const runnerCount = gameBalance.firstWaveEnemyCount + number * gameBalance.waveGrowth;
  const scoutCount = number >= 2 ? 1 + Math.floor(number / 2) : 0;
  const tankCount = number >= 3 ? Math.floor(number / 3) : 0;

  for (let i = 0; i < runnerCount; i++) {
    wave.push({ type: "runner" });
  }

  for (let i = 0; i < scoutCount; i++) {
    wave.push({ type: "scout" });
  }

  for (let i = 0; i < tankCount; i++) {
    wave.push({ type: "tank" });
  }

  return shuffleWave(wave);
}

function shuffleWave(wave) {
  const result = [...wave];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function spawnEnemy(typeId, index) {
  const type = enemyTypes[typeId];

  const waveHpBonus = waveState.number * 5;
  const spawnSpacing = 34;

  enemies.push({
    typeId,
    pathIndex: 0,
    x: enemyPath[0].x * TILE_SIZE + TILE_SIZE / 2 - index * spawnSpacing,
    y: enemyPath[0].y * TILE_SIZE + TILE_SIZE / 2,
    hp: type.hp + waveHpBonus,
    maxHp: type.hp + waveHpBonus,
    speed: type.speed + waveState.number * 0.035,
    reachedBase: false
  });

  waveState.spawnedEnemies += 1;
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
  if (gameState.gameOver) {
    showMessage("Игра окончена. Нажми Restart");
    return;
  }

  const tile = screenToTile(screenX, screenY);

  const tower = getTowerAtTile(tile.tileX, tile.tileY);

  if (tower && uiState.selectedMode !== "tower") {
    selectTower(tower);
    return;
  }

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

  const tower = {
    id: Date.now() + Math.random(),
    typeId: towerType.id,
    tileX,
    tileY,
    x: tileX * TILE_SIZE + TILE_SIZE / 2,
    y: tileY * TILE_SIZE + TILE_SIZE / 2,
    range: towerType.range,
    damage: towerType.damage,
    target: null,
    level: 1
  };

  towers.push(tower);
  uiState.selectedTower = tower;

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

function selectTower(tower) {
  uiState.selectedTower = tower;
  uiState.selectedMode = null;

  const towerType = towerTypes[tower.typeId];
  showMessage("Выбрана башня: " + towerType.name);
}

function sellSelectedTower() {
  if (gameState.gameOver) {
    showMessage("Игра окончена");
    return;
  }

  if (!uiState.selectedTower) {
    showMessage("Башня не выбрана");
    return;
  }

  const tower = uiState.selectedTower;
  const towerType = towerTypes[tower.typeId];

  Object.entries(towerType.cost).forEach(([resource, amount]) => {
    const returned = Math.floor(amount * towerType.sellReturnRate);
    resources[resource] = (resources[resource] || 0) + returned;
  });

  const index = towers.findIndex(t => t.id === tower.id);

  if (index >= 0) {
    towers.splice(index, 1);
  }

  uiState.selectedTower = null;

  updateUI();
  showMessage("Башня продана");
}

function getTowerAtTile(tileX, tileY) {
  return towers.find(tower => tower.tileX === tileX && tower.tileY === tileY);
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

function updateEnemies(multiplier) {
  if (gameState.gameOver) return;

  enemies.forEach(enemy => {
    const target = enemyPath[enemy.pathIndex + 1];

    if (!target) {
      enemy.reachedBase = true;
      base.hp -= gameBalance.baseDamagePerEnemy;
      waveState.reachedBase += 1;

      if (base.hp <= 0) {
        triggerGameOver();
      }

      updateUI();
      return;
    }

    const targetX = target.x * TILE_SIZE + TILE_SIZE / 2;
    const targetY = target.y * TILE_SIZE + TILE_SIZE / 2;

    const dx = targetX - enemy.x;
    const dy = targetY - enemy.y;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const moveSpeed = enemy.speed * multiplier;

    if (distance < moveSpeed) {
      enemy.x = targetX;
      enemy.y = targetY;
      enemy.pathIndex++;
    } else {
      enemy.x += (dx / distance) * moveSpeed;
      enemy.y += (dy / distance) * moveSpeed;
    }
  });

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    const enemyType = enemyTypes[enemy.typeId];

    if (enemy.hp <= 0) {
      applyReward(enemyType.reward);
      waveState.killedEnemies += 1;
      enemies.splice(i, 1);
      updateUI();
    } else if (enemy.reachedBase) {
      enemies.splice(i, 1);
    }
  }

  if (waveState.active && enemies.length === 0 && !gameState.gameOver) {
    waveState.active = false;
    showMessage("Волна завершена");
  }
}

function applyReward(reward) {
  Object.entries(reward).forEach(([resource, amount]) => {
    resources[resource] = (resources[resource] || 0) + amount;
  });
}

function updateTowers(multiplier) {
  if (gameState.gameOver) return;

  towers.forEach(tower => {
    const target = enemies.find(enemy => {
      const dx = enemy.x - tower.x;
      const dy = enemy.y - tower.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= tower.range;
    });

    if (target) {
      target.hp -= tower.damage * multiplier;
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

function drawTowerRange(tower) {
  if (!tower) return;

  ctx.beginPath();
  ctx.arc(
    tower.x - camera.x,
    tower.y - camera.y,
    tower.range,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "rgba(85, 224, 224, 0.12)";
  ctx.fill();

  ctx.strokeStyle = "rgba(85, 224, 224, 0.8)";
  ctx.lineWidth = 2;
  ctx.stroke();
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

  const previewTower = {
    x: tileX * TILE_SIZE + TILE_SIZE / 2,
    y: tileY * TILE_SIZE + TILE_SIZE / 2,
    range: towerType.range
  };

  drawTowerRange(previewTower);

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

    if (uiState.selectedTower && uiState.selectedTower.id === tower.id) {
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 5, y + 5, TILE_SIZE - 10, TILE_SIZE - 10);
    }

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

function drawWaveStatus() {
  const remaining = enemies.length;
  const total = waveState.totalEnemies;

  ctx.fillStyle = "rgba(0,0,0,0.65)";
  ctx.fillRect(20, 82, 320, 72);

  ctx.fillStyle = "white";
  ctx.font = "16px Arial";

  ctx.fillText("Волна: " + waveState.number, 35, 108);
  ctx.fillText("Статус: " + (waveState.active ? "идёт" : "подготовка"), 35, 130);
  ctx.fillText("Враги: " + remaining + " / " + total + " | Скорость: x" + gameSpeed, 35, 150);
}

function drawSelectedTowerPanel() {
  if (!uiState.selectedTower) return;

  const tower = uiState.selectedTower;
  const towerType = towerTypes[tower.typeId];

  ctx.fillStyle = "rgba(0,0,0,0.72)";
  ctx.fillRect(20, 165, 320, 130);

  ctx.fillStyle = "white";
  ctx.font = "16px Arial";

  ctx.fillText("Башня: " + towerType.name, 35, 193);
  ctx.fillText("Уровень: " + tower.level, 35, 218);
  ctx.fillText("Урон: " + tower.damage.toFixed(2), 35, 243);
  ctx.fillText("Радиус: " + tower.range, 35, 268);
  ctx.fillText("Продажа: " + Math.floor(towerType.cost.wood * towerType.sellReturnRate) + " дерева", 35, 288);
}

function drawInfoPanel() {
  if (!uiState.infoPanelOpen) return;

  ctx.fillStyle = "rgba(0,0,0,0.82)";
  ctx.fillRect(canvas.width - 360, 80, 340, 360);

  ctx.fillStyle = "white";
  ctx.font = "18px Arial";
  ctx.fillText("Справка", canvas.width - 340, 115);

  ctx.font = "14px Arial";
  ctx.fillText("Башня:", canvas.width - 340, 150);
  ctx.fillText("- Базовая башня: 14 дерева", canvas.width - 330, 172);
  ctx.fillText("- Урон: 0.36", canvas.width - 330, 192);
  ctx.fillText("- Радиус: 155", canvas.width - 330, 212);

  ctx.fillText("Враги:", canvas.width - 340, 250);
  ctx.fillText("- Бегун: средний враг", canvas.width - 330, 272);
  ctx.fillText("- Разведчик: быстрый и слабый", canvas.width - 330, 292);
  ctx.fillText("- Тяжёлый: медленный и крепкий", canvas.width - 330, 312);

  ctx.fillText("Механики:", canvas.width - 340, 350);
  ctx.fillText("- Выбери башню и тапни по клетке", canvas.width - 330, 372);
  ctx.fillText("- Тап по башне показывает радиус", canvas.width - 330, 392);
  ctx.fillText("- Продажа возвращает часть дерева", canvas.width - 330, 412);
}

function drawMessage() {
  if (!uiState.message) return;

  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(20, canvas.height - 70, 540, 40);

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(uiState.message, 35, canvas.height - 43);
}

function drawGameOver() {
  if (!gameState.gameOver) return;

  ctx.fillStyle = "rgba(0,0,0,0.78)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "42px Arial";
  ctx.fillText("БАЗА УНИЧТОЖЕНА", canvas.width / 2 - 210, canvas.height / 2 - 30);

  ctx.font = "22px Arial";
  ctx.fillText("Нажми Restart, чтобы начать заново", canvas.width / 2 - 185, canvas.height / 2 + 15);
}

// ---------- LOOP ----------

function gameLoop() {
  const multiplier = gameSpeed;

  updateEnemies(multiplier);
  updateTowers(multiplier);

  drawMap();
  drawRoadTiles();
  drawPathLine();
  drawBase();

  if (uiState.selectedTower) {
    drawTowerRange(uiState.selectedTower);
  }

  drawHoveredTile();

  drawTowers();
  drawEnemies();

  drawWaveStatus();
  drawSelectedTowerPanel();
  drawInfoPanel();
  drawMessage();
  drawGameOver();

  requestAnimationFrame(gameLoop);
}

gameLoop();