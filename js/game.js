// CORE FRONTIER — Stage 02.4.2
// UX / UI Overhaul & Gameplay Readability
// Build confirm, notification layer, zoom camera, cleaner HUD, Energy UX, locked upgrades

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

const difficultyProfiles = {
  easy: {
    id: "easy",
    name: "Лёгкая",
    enemyHp: 0.85,
    enemySpeed: 0.9,
    enemyCount: 0.85,
    reward: 1.15,
    baseDamage: 0.8
  },
  normal: {
    id: "normal",
    name: "Нормальная",
    enemyHp: 1,
    enemySpeed: 1,
    enemyCount: 1,
    reward: 1,
    baseDamage: 1
  },
  hard: {
    id: "hard",
    name: "Жёсткая",
    enemyHp: 1.25,
    enemySpeed: 1.08,
    enemyCount: 1.2,
    reward: 1,
    baseDamage: 1.25
  },
  extreme: {
    id: "extreme",
    name: "Экстрим",
    enemyHp: 1.55,
    enemySpeed: 1.18,
    enemyCount: 1.45,
    reward: 0.9,
    baseDamage: 1.5
  }
};

const gameBalance = {
  startWood: 78,
  startStone: 20,
  startFood: 10,
  baseHp: 100,
  baseDamagePerEnemy: 8,
  startPowerCapacity: 10,
  towerCostWood: 14,
  towerPowerUsage: 2,
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
    powerUsage: gameBalance.towerPowerUsage,
    sellReturnRate: gameBalance.towerSellReturnRate,
    range: 155,
    damage: 0.36,
    color: "#55e0e0",
    description: "Универсальная башня для первых волн.",
    upgrades: [
      {
        id: "damage_1",
        name: "Урон +1",
        locked: true,
        cost: { wood: 35 },
        reason: "Требуется технология: усиленные механизмы"
      },
      {
        id: "range_1",
        name: "Радиус +1",
        locked: true,
        cost: { wood: 30 },
        reason: "Требуется технология: дальномер"
      }
    ]
  }
};

const enemyTypes = {
  runner: {
    id: "runner",
    name: "Бегун",
    shape: "circle",
    class: "ground",
    color: "#ff3d3d",
    hp: 34,
    speed: 1.55,
    reward: { wood: 5 },
    description: "Базовый наземный враг."
  },
  scout: {
    id: "scout",
    name: "Разведчик",
    shape: "triangle",
    class: "ground_fast",
    color: "#ff4fd8",
    hp: 25,
    speed: 2.05,
    reward: { wood: 4 },
    description: "Быстрый, но слабый враг."
  },
  tank: {
    id: "tank",
    name: "Тяжёлый",
    shape: "square",
    class: "ground_heavy",
    color: "#ff9f1c",
    hp: 82,
    speed: 1.0,
    reward: { wood: 8 },
    description: "Медленный враг с повышенным запасом HP."
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
  zoom: 1,
  minZoom: 0.55,
  maxZoom: 1.65,
  dragging: false,
  moved: false,
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  pinchActive: false,
  pinchDistance: 0,
  pinchZoom: 1
};

const uiState = {
  selectedMode: null,
  selectedTowerType: "basic",
  hoveredTile: null,
  pendingBuildTile: null,
  selectedTower: null,
  infoPanelOpen: false,
  menuOpen: false,
  codexTab: "towers",
  notifications: []
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

let power = {
  used: 0,
  capacity: gameBalance.startPowerCapacity
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
  gameOver: false,
  difficulty: "normal"
};

let checkpoint = null;
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

setupInitialDom();
createDynamicUI();
updatePower();
updateUI();
notify("Stage 02.4.2: режим UX/UI активен", "info");

// ---------- DOM / UI ----------

function setupInitialDom() {
  const oldButtons = document.querySelector(".buttons");
  if (oldButtons) oldButtons.style.display = "none";

  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  ensureTopbarChip("wave-chip", "🌊 Волна: <span id='wave'>0</span>");
  ensureTopbarChip("power-chip", "⚡ <span id='power'>0/10</span>");
  ensureTopbarChip("difficulty-chip", "🎚 <span id='difficulty'>Нормальная</span>");
  ensureTopbarChip("zoom-chip", "🔍 <span id='zoom'>100%</span>");
}

function ensureTopbarChip(id, html) {
  const topbar = document.querySelector(".topbar");
  if (!topbar || document.getElementById(id)) return;

  const chip = document.createElement("div");
  chip.className = "resource";
  chip.id = id;
  chip.innerHTML = html;
  topbar.appendChild(chip);
}

function createDynamicUI() {
  [
    "bottom-control-panel",
    "speed-panel",
    "zoom-panel",
    "tower-action-panel",
    "build-confirm-panel",
    "menu-panel",
    "game-over-panel"
  ].forEach(removeElement);

  createBottomControlPanel();
  createSpeedControls();
  createZoomControls();
  createTowerActionPanel();
  createBuildConfirmPanel();
  createMenuPanel();
  createGameOverPanel();
}

function removeElement(id) {
  const element = document.getElementById(id);
  if (element) element.remove();
}

function createBottomControlPanel() {
  const panel = document.createElement("div");
  panel.id = "bottom-control-panel";
  applyFixedStyle(panel, {
    left: "10px",
    right: "10px",
    bottom: "10px",
    display: "flex",
    gap: "8px",
    zIndex: "20"
  });

  panel.appendChild(createUIButton("🏹 Башня", "#2f6b3c", () => buildTower()));
  panel.appendChild(createUIButton("⚔️ Волна", "#8a5a2b", () => startWave()));
  panel.appendChild(createUIButton("ℹ Codex", "#33445f", () => {
    uiState.infoPanelOpen = !uiState.infoPanelOpen;
    if (uiState.infoPanelOpen) uiState.menuOpen = false;
  }));
  panel.appendChild(createUIButton("☰ Меню", "#444444", () => {
    uiState.menuOpen = !uiState.menuOpen;
    if (uiState.menuOpen) uiState.infoPanelOpen = false;
  }));

  document.body.appendChild(panel);
}

function createSpeedControls() {
  const panel = document.createElement("div");
  panel.id = "speed-panel";
  applyFixedStyle(panel, {
    right: "10px",
    bottom: "82px",
    display: "flex",
    gap: "6px",
    zIndex: "20"
  });

  [1, 2, 3].forEach(speed => {
    const button = createUIButton("x" + speed, speed === gameSpeed ? "#d9a441" : "#2f6b3c", () => {
      if (gameState.gameOver) return;
      gameSpeed = speed;
      createDynamicUI();
      notify("Скорость игры: x" + speed, "info");
    });
    button.style.padding = "8px 10px";
    panel.appendChild(button);
  });

  document.body.appendChild(panel);
}

function createZoomControls() {
  const panel = document.createElement("div");
  panel.id = "zoom-panel";
  applyFixedStyle(panel, {
    right: "10px",
    bottom: "126px",
    display: "flex",
    gap: "6px",
    zIndex: "20"
  });

  const minus = createUIButton("−", "#33445f", () => zoomAt(canvas.width / 2, canvas.height / 2, camera.zoom - 0.12));
  const plus = createUIButton("+", "#33445f", () => zoomAt(canvas.width / 2, canvas.height / 2, camera.zoom + 0.12));
  const reset = createUIButton("100%", "#444444", () => zoomAt(canvas.width / 2, canvas.height / 2, 1));

  [minus, plus, reset].forEach(btn => {
    btn.style.padding = "8px 10px";
    panel.appendChild(btn);
  });

  document.body.appendChild(panel);
}

function createTowerActionPanel() {
  const panel = document.createElement("div");
  panel.id = "tower-action-panel";
  applyFixedStyle(panel, {
    left: "10px",
    bottom: "82px",
    display: "none",
    gap: "6px",
    zIndex: "20"
  });

  panel.appendChild(createUIButton("Продать", "#2f6b3c", () => sellSelectedTower()));
  panel.appendChild(createUIButton("Улучшить", "#555555", () => {
    notify("Улучшение недоступно: нужна технология", "warning");
  }));

  document.body.appendChild(panel);
}

function createBuildConfirmPanel() {
  const panel = document.createElement("div");
  panel.id = "build-confirm-panel";
  applyFixedStyle(panel, {
    left: "10px",
    right: "10px",
    bottom: "82px",
    display: "none",
    gap: "8px",
    zIndex: "21",
    padding: "8px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.72)"
  });

  const text = document.createElement("div");
  text.id = "build-confirm-text";
  text.style.color = "white";
  text.style.fontSize = "14px";
  text.style.flex = "1";
  text.style.alignSelf = "center";
  text.innerText = "Выбери клетку";

  panel.appendChild(text);
  panel.appendChild(createUIButton("Построить", "#2f6b3c", () => confirmBuild()));
  panel.appendChild(createUIButton("Отмена", "#8a2d2d", () => cancelBuildMode()));

  document.body.appendChild(panel);
}

function createMenuPanel() {
  const panel = document.createElement("div");
  panel.id = "menu-panel";
  applyFixedStyle(panel, {
    right: "10px",
    top: "78px",
    width: "270px",
    display: "none",
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.84)",
    color: "white",
    zIndex: "25"
  });

  const title = createPanelTitle("Меню");
  panel.appendChild(title);
  panel.appendChild(createSmallText("Сложность можно менять только до первой волны."));

  Object.values(difficultyProfiles).forEach(profile => {
    const active = profile.id === gameState.difficulty;
    const button = createUIButton(profile.name, active ? "#d9a441" : "#33445f", () => {
      if (waveState.number > 0 || waveState.active) {
        notify("Сложность можно менять только до первой волны", "warning");
        return;
      }
      gameState.difficulty = profile.id;
      updateUI();
      createDynamicUI();
      notify("Сложность: " + profile.name, "info");
    });
    button.style.width = "100%";
    button.style.marginTop = "6px";
    panel.appendChild(button);
  });

  const restartTitle = createSmallText("Опасная зона:");
  restartTitle.style.marginTop = "12px";
  panel.appendChild(restartTitle);

  const fullRestart = createUIButton("Новая игра", "#8a2d2d", () => {
    restartGame();
    uiState.menuOpen = false;
  });
  fullRestart.style.width = "100%";
  panel.appendChild(fullRestart);

  document.body.appendChild(panel);
}

function createGameOverPanel() {
  const panel = document.createElement("div");
  panel.id = "game-over-panel";
  applyFixedStyle(panel, {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    display: "none",
    padding: "18px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.88)",
    color: "white",
    textAlign: "center",
    minWidth: "280px",
    zIndex: "40"
  });

  const title = document.createElement("div");
  title.innerText = "БАЗА УНИЧТОЖЕНА";
  title.style.fontSize = "24px";
  title.style.fontWeight = "bold";
  title.style.marginBottom = "12px";

  const retry = createUIButton("↩ Повторить волну", "#2f6b3c", () => retryLastWave());
  retry.style.width = "100%";
  retry.style.marginBottom = "8px";

  const restart = createUIButton("⟲ Новая игра", "#8a2d2d", () => restartGame());
  restart.style.width = "100%";

  panel.appendChild(title);
  panel.appendChild(retry);
  panel.appendChild(restart);

  document.body.appendChild(panel);
}

function applyFixedStyle(element, styleMap) {
  element.style.position = "fixed";
  Object.entries(styleMap).forEach(([key, value]) => {
    element.style[key] = value;
  });
}

function createUIButton(text, background, onClick) {
  const button = document.createElement("button");
  button.innerText = text;
  button.style.background = background;
  button.style.border = "none";
  button.style.color = "white";
  button.style.padding = "10px 12px";
  button.style.borderRadius = "10px";
  button.style.fontSize = "15px";
  button.style.fontWeight = "bold";
  button.onclick = onClick;
  return button;
}

function createPanelTitle(text) {
  const title = document.createElement("div");
  title.innerText = text;
  title.style.fontWeight = "bold";
  title.style.fontSize = "18px";
  title.style.marginBottom = "8px";
  return title;
}

function createSmallText(text) {
  const element = document.createElement("div");
  element.innerText = text;
  element.style.fontSize = "13px";
  element.style.opacity = "0.85";
  element.style.marginBottom = "6px";
  return element;
}

function updateDomVisibility() {
  const towerPanel = document.getElementById("tower-action-panel");
  if (towerPanel) towerPanel.style.display = uiState.selectedTower && !gameState.gameOver ? "flex" : "none";

  const buildPanel = document.getElementById("build-confirm-panel");
  if (buildPanel) buildPanel.style.display = uiState.selectedMode === "tower" && !gameState.gameOver ? "flex" : "none";

  const buildText = document.getElementById("build-confirm-text");
  if (buildText) buildText.innerText = getBuildPanelText();

  const menuPanel = document.getElementById("menu-panel");
  if (menuPanel) menuPanel.style.display = uiState.menuOpen ? "block" : "none";

  const gameOverPanel = document.getElementById("game-over-panel");
  if (gameOverPanel) gameOverPanel.style.display = gameState.gameOver ? "block" : "none";
}

function updateUI() {
  setText("wood", Math.floor(resources.wood));
  setText("stone", Math.floor(resources.stone));
  setText("food", Math.floor(resources.food));
  setText("hp", Math.max(0, Math.floor(base.hp)));
  setText("wave", waveState.number);
  setText("power", power.used + "/" + power.capacity);
  setText("difficulty", difficultyProfiles[gameState.difficulty].name);
  setText("zoom", Math.round(camera.zoom * 100) + "%");
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.innerText = value;
}

function notify(text, type = "info") {
  uiState.notifications.push({
    text,
    type,
    life: 180
  });

  if (uiState.notifications.length > 4) uiState.notifications.shift();
}

// ---------- BUTTON ACTIONS ----------

function buildTower() {
  if (gameState.gameOver) {
    notify("Игра окончена", "warning");
    return;
  }

  uiState.selectedTower = null;

  if (uiState.selectedMode === "tower") {
    cancelBuildMode();
    return;
  }

  uiState.selectedMode = "tower";
  uiState.selectedTowerType = "basic";
  uiState.pendingBuildTile = null;
  notify("Режим строительства: выбери клетку", "info");
}

function cancelBuildMode() {
  uiState.selectedMode = null;
  uiState.pendingBuildTile = null;
  notify("Строительство отменено", "info");
}

function confirmBuild() {
  if (!uiState.pendingBuildTile) {
    notify("Сначала выбери клетку", "warning");
    return;
  }

  placeTower(uiState.pendingBuildTile.tileX, uiState.pendingBuildTile.tileY);
}

function startWave() {
  if (gameState.gameOver) {
    notify("Игра окончена", "warning");
    return;
  }

  if (waveState.active) {
    notify("Текущая волна ещё не завершена", "warning");
    return;
  }

  saveCheckpoint();

  uiState.selectedMode = null;
  uiState.pendingBuildTile = null;
  uiState.selectedTower = null;

  waveState.active = true;
  waveState.number += 1;
  waveState.spawnedEnemies = 0;
  waveState.killedEnemies = 0;
  waveState.reachedBase = 0;

  const wave = createWave(waveState.number);
  waveState.totalEnemies = wave.length;

  wave.forEach((enemyConfig, index) => spawnEnemy(enemyConfig.type, index));

  updateUI();
  notify("Волна #" + waveState.number + " запущена", "info");
}

// ---------- CHECKPOINT / RESTART ----------

function saveCheckpoint() {
  checkpoint = {
    resources: clone(resources),
    base: clone(base),
    power: clone(power),
    waveState: clone(waveState),
    towers: clone(towers),
    difficulty: gameState.difficulty,
    gameSpeed,
    camera: clone({ x: camera.x, y: camera.y, zoom: camera.zoom })
  };
}

function retryLastWave() {
  if (!checkpoint) {
    notify("Checkpoint отсутствует", "warning");
    return;
  }

  resources = clone(checkpoint.resources);
  base = clone(checkpoint.base);
  power = clone(checkpoint.power);
  waveState = clone(checkpoint.waveState);
  gameState.gameOver = false;
  gameState.difficulty = checkpoint.difficulty;
  gameSpeed = checkpoint.gameSpeed;

  camera.x = checkpoint.camera.x;
  camera.y = checkpoint.camera.y;
  camera.zoom = checkpoint.camera.zoom;
  clampCamera();

  towers.length = 0;
  checkpoint.towers.forEach(tower => towers.push(clone(tower)));

  enemies.length = 0;

  uiState.selectedMode = null;
  uiState.pendingBuildTile = null;
  uiState.selectedTower = null;
  uiState.infoPanelOpen = false;
  uiState.menuOpen = false;

  createDynamicUI();
  updatePower();
  updateUI();
  notify("Откат к подготовке перед волной", "info");
}

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

  power = {
    used: 0,
    capacity: gameBalance.startPowerCapacity
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
  gameState.difficulty = "normal";
  checkpoint = null;
  gameSpeed = 1;

  camera.zoom = 1;
  camera.x = 0;
  camera.y = 0;

  towers.length = 0;
  enemies.length = 0;

  uiState.selectedMode = null;
  uiState.pendingBuildTile = null;
  uiState.selectedTower = null;
  uiState.infoPanelOpen = false;
  uiState.menuOpen = false;

  createDynamicUI();
  updatePower();
  updateUI();
  notify("Новая игра начата", "info");
}

function triggerGameOver() {
  if (gameState.gameOver) return;

  gameState.gameOver = true;
  waveState.active = false;
  base.hp = 0;
  enemies.length = 0;
  uiState.selectedMode = null;
  uiState.pendingBuildTile = null;
  uiState.selectedTower = null;

  updateUI();
  notify("База уничтожена", "danger");
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

// ---------- WAVE MANAGER ----------

function createWave(number) {
  const profile = difficultyProfiles[gameState.difficulty];
  const wave = [];

  const runnerCount = Math.ceil((gameBalance.firstWaveEnemyCount + number * gameBalance.waveGrowth) * profile.enemyCount);
  const scoutCount = number >= 2 ? Math.ceil((1 + Math.floor(number / 2)) * profile.enemyCount) : 0;
  const tankCount = number >= 3 ? Math.ceil(Math.floor(number / 3) * profile.enemyCount) : 0;

  for (let i = 0; i < runnerCount; i++) wave.push({ type: "runner" });
  for (let i = 0; i < scoutCount; i++) wave.push({ type: "scout" });
  for (let i = 0; i < tankCount; i++) wave.push({ type: "tank" });

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
  const profile = difficultyProfiles[gameState.difficulty];

  const waveHpBonus = waveState.number * 5;
  const spawnSpacing = 34;

  const hp = Math.ceil((type.hp + waveHpBonus) * profile.enemyHp);
  const speed = (type.speed + waveState.number * 0.035) * profile.enemySpeed;

  enemies.push({
    typeId,
    pathIndex: 0,
    x: enemyPath[0].x * TILE_SIZE + TILE_SIZE / 2 - index * spawnSpacing,
    y: enemyPath[0].y * TILE_SIZE + TILE_SIZE / 2,
    hp,
    maxHp: hp,
    speed,
    reachedBase: false
  });

  waveState.spawnedEnemies += 1;
}

// ---------- INPUT ----------

canvas.addEventListener("pointerdown", pointerStart);
canvas.addEventListener("pointermove", pointerMove);
canvas.addEventListener("pointerup", pointerEnd);
canvas.addEventListener("pointercancel", pointerEnd);
canvas.addEventListener("wheel", wheelZoom, { passive: false });
canvas.addEventListener("touchstart", touchStart, { passive: false });
canvas.addEventListener("touchmove", touchMove, { passive: false });
canvas.addEventListener("touchend", touchEnd, { passive: false });

function getPointer(event) {
  return { x: event.clientX, y: event.clientY };
}

function pointerStart(event) {
  if (camera.pinchActive) return;
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
  if (camera.pinchActive) return;
  event.preventDefault();

  const pos = getPointer(event);
  updateHoveredTile(pos.x, pos.y);

  if (!camera.dragging) return;

  const totalDx = pos.x - camera.startX;
  const totalDy = pos.y - camera.startY;

  if (Math.abs(totalDx) > 7 || Math.abs(totalDy) > 7) camera.moved = true;

  if (camera.moved) {
    const dx = pos.x - camera.lastX;
    const dy = pos.y - camera.lastY;

    camera.x -= dx / camera.zoom;
    camera.y -= dy / camera.zoom;
    clampCamera();
  }

  camera.lastX = pos.x;
  camera.lastY = pos.y;
}

function pointerEnd(event) {
  if (camera.pinchActive) return;
  event.preventDefault();

  const pos = getPointer(event);

  if (!camera.moved) handleTap(pos.x, pos.y);

  camera.dragging = false;
}

function touchStart(event) {
  if (event.touches.length === 2) {
    event.preventDefault();
    camera.pinchActive = true;
    camera.dragging = false;
    camera.pinchDistance = touchDistance(event);
    camera.pinchZoom = camera.zoom;
  }
}

function touchMove(event) {
  if (event.touches.length === 2) {
    event.preventDefault();
    const center = touchCenter(event);
    const distance = touchDistance(event);
    const ratio = distance / Math.max(1, camera.pinchDistance);
    zoomAt(center.x, center.y, camera.pinchZoom * ratio);
  }
}

function touchEnd(event) {
  if (event.touches.length < 2) {
    camera.pinchActive = false;
  }
}

function touchDistance(event) {
  const a = event.touches[0];
  const b = event.touches[1];
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function touchCenter(event) {
  const a = event.touches[0];
  const b = event.touches[1];
  return {
    x: (a.clientX + b.clientX) / 2,
    y: (a.clientY + b.clientY) / 2
  };
}

function wheelZoom(event) {
  event.preventDefault();
  const delta = event.deltaY > 0 ? -0.1 : 0.1;
  zoomAt(event.clientX, event.clientY, camera.zoom + delta);
}

function zoomAt(screenX, screenY, newZoom) {
  const oldZoom = camera.zoom;
  const clampedZoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, newZoom));
  if (Math.abs(clampedZoom - oldZoom) < 0.001) return;

  const worldBefore = screenToWorld(screenX, screenY);
  camera.zoom = clampedZoom;
  camera.x = worldBefore.x - screenX / camera.zoom;
  camera.y = worldBefore.y - screenY / camera.zoom;

  clampCamera();
  updateUI();
}

function clampCamera() {
  const visibleWidth = canvas.width / camera.zoom;
  const visibleHeight = canvas.height / camera.zoom;

  camera.x = Math.max(0, Math.min(camera.x, Math.max(0, map.width - visibleWidth)));
  camera.y = Math.max(0, Math.min(camera.y, Math.max(0, map.height - visibleHeight)));
}

// ---------- TILE HELPERS ----------

function updateHoveredTile(screenX, screenY) {
  uiState.hoveredTile = screenToTile(screenX, screenY);
}

function screenToWorld(screenX, screenY) {
  return {
    x: camera.x + screenX / camera.zoom,
    y: camera.y + screenY / camera.zoom
  };
}

function screenToTile(screenX, screenY) {
  const world = screenToWorld(screenX, screenY);
  return {
    tileX: Math.floor(world.x / TILE_SIZE),
    tileY: Math.floor(world.y / TILE_SIZE)
  };
}

function worldToScreen(worldX, worldY) {
  return {
    x: (worldX - camera.x) * camera.zoom,
    y: (worldY - camera.y) * camera.zoom
  };
}

function scaled(value) {
  return value * camera.zoom;
}

function handleTap(screenX, screenY) {
  if (gameState.gameOver) {
    notify("Игра окончена", "warning");
    return;
  }

  const tile = screenToTile(screenX, screenY);
  const tower = getTowerAtTile(tile.tileX, tile.tileY);

  if (uiState.selectedMode === "tower") {
    selectBuildTile(tile.tileX, tile.tileY);
    return;
  }

  if (tower) {
    selectTower(tower);
    return;
  }

  uiState.selectedTower = null;
}

function selectBuildTile(tileX, tileY) {
  const towerType = towerTypes[uiState.selectedTowerType];
  const validation = validateBuildTile(tileX, tileY, towerType);

  uiState.pendingBuildTile = { tileX, tileY };

  if (!validation.ok) {
    notify(validation.reason, "warning");
  } else {
    notify("Клетка выбрана. Подтверди строительство", "info");
  }
}

function getBuildPanelText() {
  if (uiState.selectedMode !== "tower") return "";

  const towerType = towerTypes[uiState.selectedTowerType];
  const cost = "🌲 " + towerType.cost.wood + " | ⚡ " + towerType.powerUsage;

  if (!uiState.pendingBuildTile) return "Выбери клетку для башни — " + cost;

  const validation = validateBuildTile(uiState.pendingBuildTile.tileX, uiState.pendingBuildTile.tileY, towerType);
  return validation.ok ? "Можно строить — " + cost : validation.reason + " — " + cost;
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

function confirmBuild() {
  if (!uiState.pendingBuildTile) {
    notify("Сначала выбери клетку", "warning");
    return;
  }

  placeTower(uiState.pendingBuildTile.tileX, uiState.pendingBuildTile.tileY);
}

function placeTower(tileX, tileY) {
  const towerType = towerTypes[uiState.selectedTowerType];
  const validation = validateBuildTile(tileX, tileY, towerType);

  if (!validation.ok) {
    notify(validation.reason, "warning");
    return;
  }

  payCost(towerType.cost);
  power.used += towerType.powerUsage;

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
  uiState.selectedMode = null;
  uiState.pendingBuildTile = null;

  updateUI();
  notify("Башня построена", "success");
}

function validateBuildTile(tileX, tileY, towerType) {
  if (tileX < 0 || tileY < 0 || tileX >= map.cols || tileY >= map.rows) {
    return { ok: false, reason: "Нельзя строить за пределами карты" };
  }
  if (isRoadTile(tileX, tileY)) return { ok: false, reason: "Нельзя строить на дороге" };
  if (isBaseTile(tileX, tileY)) return { ok: false, reason: "Нельзя строить на базе" };
  if (isTowerTile(tileX, tileY)) return { ok: false, reason: "Клетка уже занята" };
  if (power.used + towerType.powerUsage > power.capacity) return { ok: false, reason: "Не хватает энергии. Нужен генератор" };
  if (!hasCost(towerType.cost)) return { ok: false, reason: "Недостаточно ресурсов" };
  return { ok: true, reason: "" };
}

function selectTower(tower) {
  uiState.selectedTower = tower;
  uiState.selectedMode = null;
  uiState.pendingBuildTile = null;
  notify("Выбрана башня: " + towerTypes[tower.typeId].name, "info");
}

function sellSelectedTower() {
  if (gameState.gameOver) {
    notify("Игра окончена", "warning");
    return;
  }
  if (!uiState.selectedTower) {
    notify("Башня не выбрана", "warning");
    return;
  }

  const tower = uiState.selectedTower;
  const towerType = towerTypes[tower.typeId];

  Object.entries(towerType.cost).forEach(([resource, amount]) => {
    const returned = Math.floor(amount * towerType.sellReturnRate);
    resources[resource] = (resources[resource] || 0) + returned;
  });

  power.used = Math.max(0, power.used - towerType.powerUsage);

  const index = towers.findIndex(t => t.id === tower.id);
  if (index >= 0) towers.splice(index, 1);

  uiState.selectedTower = null;

  updateUI();
  notify("Башня продана", "success");
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
  return Object.entries(cost).every(([resource, amount]) => (resources[resource] || 0) >= amount);
}

function payCost(cost) {
  Object.entries(cost).forEach(([resource, amount]) => {
    resources[resource] -= amount;
  });
}

function updatePower() {
  power.used = towers.reduce((sum, tower) => sum + towerTypes[tower.typeId].powerUsage, 0);
}

// ---------- UPDATE ----------

function updateEnemies(multiplier) {
  if (gameState.gameOver) return;

  enemies.forEach(enemy => {
    const target = enemyPath[enemy.pathIndex + 1];

    if (!target) {
      enemy.reachedBase = true;
      const profile = difficultyProfiles[gameState.difficulty];
      base.hp -= Math.ceil(gameBalance.baseDamagePerEnemy * profile.baseDamage);
      waveState.reachedBase += 1;

      if (base.hp <= 0) triggerGameOver();
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
    notify("Волна завершена", "success");
  }
}

function applyReward(reward) {
  const profile = difficultyProfiles[gameState.difficulty];
  Object.entries(reward).forEach(([resource, amount]) => {
    resources[resource] = (resources[resource] || 0) + Math.ceil(amount * profile.reward);
  });
}

function updateTowers(multiplier) {
  if (gameState.gameOver) return;

  towers.forEach(tower => {
    const target = enemies.find(enemy => {
      const dx = enemy.x - tower.x;
      const dy = enemy.y - tower.y;
      return Math.sqrt(dx * dx + dy * dy) <= tower.range;
    });

    if (target) {
      target.hp -= tower.damage * multiplier;
      tower.target = target;
    } else {
      tower.target = null;
    }
  });
}

function updateNotifications() {
  for (let i = uiState.notifications.length - 1; i >= 0; i--) {
    uiState.notifications[i].life -= 1;
    if (uiState.notifications[i].life <= 0) uiState.notifications.splice(i, 1);
  }
}

// ---------- DRAW HELPERS ----------

function drawRectWorld(worldX, worldY, width, height, fillStyle, strokeStyle = null, lineWidth = 1) {
  const p = worldToScreen(worldX, worldY);
  ctx.fillStyle = fillStyle;
  ctx.fillRect(p.x, p.y, scaled(width), scaled(height));

  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(p.x, p.y, scaled(width), scaled(height));
  }
}

function drawTextWorld(text, worldX, worldY, size = 24) {
  const p = worldToScreen(worldX, worldY);
  ctx.font = scaled(size) + "px Arial";
  ctx.fillText(text, p.x, p.y);
}

// ---------- DRAW ----------

function drawMap() {
  ctx.fillStyle = "#183b22";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const visibleWidth = canvas.width / camera.zoom;
  const visibleHeight = canvas.height / camera.zoom;

  const startCol = Math.floor(camera.x / TILE_SIZE);
  const endCol = Math.ceil((camera.x + visibleWidth) / TILE_SIZE);
  const startRow = Math.floor(camera.y / TILE_SIZE);
  const endRow = Math.ceil((camera.y + visibleHeight) / TILE_SIZE);

  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      if (col < 0 || row < 0 || col >= map.cols || row >= map.rows) continue;
      const p = worldToScreen(col * TILE_SIZE, row * TILE_SIZE);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(p.x, p.y, scaled(TILE_SIZE), scaled(TILE_SIZE));
    }
  }
}

function drawRoadTiles() {
  roadTiles.forEach(key => {
    const [tileX, tileY] = key.split(",").map(Number);
    drawRectWorld(tileX * TILE_SIZE, tileY * TILE_SIZE, TILE_SIZE, TILE_SIZE, "#6f5231");
  });
}

function drawPathLine() {
  ctx.strokeStyle = "#8a673d";
  ctx.lineWidth = scaled(18);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();

  enemyPath.forEach((point, index) => {
    const p = worldToScreen(point.x * TILE_SIZE + TILE_SIZE / 2, point.y * TILE_SIZE + TILE_SIZE / 2);
    if (index === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });

  ctx.stroke();
}

function drawBase() {
  const x = base.tileX * TILE_SIZE;
  const y = base.tileY * TILE_SIZE;
  drawRectWorld(x + 8, y + 8, TILE_SIZE - 16, TILE_SIZE - 16, "#8a5a2b");
  ctx.fillStyle = "white";
  drawTextWorld("🏠", x + 16, y + 42, 28);
}

function drawTowerRange(tower) {
  if (!tower) return;
  const p = worldToScreen(tower.x, tower.y);

  ctx.beginPath();
  ctx.arc(p.x, p.y, scaled(tower.range), 0, Math.PI * 2);
  ctx.fillStyle = "rgba(85, 224, 224, 0.12)";
  ctx.fill();
  ctx.strokeStyle = "rgba(85, 224, 224, 0.8)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawBuildTile(tile, isPending = false) {
  if (!tile) return;

  const towerType = towerTypes[uiState.selectedTowerType];
  const validation = validateBuildTile(tile.tileX, tile.tileY, towerType);
  const valid = validation.ok;

  const x = tile.tileX * TILE_SIZE;
  const y = tile.tileY * TILE_SIZE;
  const p = worldToScreen(x, y);

  ctx.fillStyle = valid ? "rgba(0,255,0,0.22)" : "rgba(255,0,0,0.22)";
  ctx.fillRect(p.x, p.y, scaled(TILE_SIZE), scaled(TILE_SIZE));

  ctx.strokeStyle = isPending ? "yellow" : (valid ? "lime" : "red");
  ctx.lineWidth = isPending ? 4 : 2;
  ctx.strokeRect(p.x, p.y, scaled(TILE_SIZE), scaled(TILE_SIZE));

  const previewTower = {
    x: x + TILE_SIZE / 2,
    y: y + TILE_SIZE / 2,
    range: towerType.range
  };
  drawTowerRange(previewTower);

  ctx.globalAlpha = 0.58;
  drawRectWorld(x + 10, y + 10, TILE_SIZE - 20, TILE_SIZE - 20, towerType.color);
  ctx.globalAlpha = 1;

  ctx.fillStyle = "white";
  drawTextWorld(towerType.icon, x + 18, y + 40, 24);
}

function drawBuildOverlay() {
  if (uiState.selectedMode !== "tower") return;

  if (uiState.hoveredTile) drawBuildTile(uiState.hoveredTile, false);
  if (uiState.pendingBuildTile) drawBuildTile(uiState.pendingBuildTile, true);
}

function drawTowers() {
  towers.forEach(tower => {
    const towerType = towerTypes[tower.typeId];
    const x = tower.tileX * TILE_SIZE;
    const y = tower.tileY * TILE_SIZE;

    if (uiState.selectedTower && uiState.selectedTower.id === tower.id) {
      drawRectWorld(x + 5, y + 5, TILE_SIZE - 10, TILE_SIZE - 10, "rgba(255,255,0,0.06)", "yellow", 3);
    }

    drawRectWorld(x + 10, y + 10, TILE_SIZE - 20, TILE_SIZE - 20, towerType.color);
    ctx.fillStyle = "white";
    drawTextWorld(towerType.icon, x + 18, y + 40, 24);

    if (tower.target) {
      const a = worldToScreen(tower.x, tower.y);
      const b = worldToScreen(tower.target.x, tower.target.y);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });
}

function drawEnemies() {
  enemies.forEach(enemy => {
    const enemyType = enemyTypes[enemy.typeId];
    const p = worldToScreen(enemy.x, enemy.y);
    const size = scaled(15);

    ctx.fillStyle = enemyType.color;

    if (enemyType.shape === "circle") {
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    if (enemyType.shape === "square") {
      ctx.fillRect(p.x - size, p.y - size, size * 2, size * 2);
    }

    if (enemyType.shape === "triangle") {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - scaled(18));
      ctx.lineTo(p.x - scaled(16), p.y + scaled(14));
      ctx.lineTo(p.x + scaled(16), p.y + scaled(14));
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = "black";
    ctx.fillRect(p.x - scaled(18), p.y - scaled(25), scaled(36), scaled(5));

    ctx.fillStyle = "lime";
    ctx.fillRect(p.x - scaled(18), p.y - scaled(25), scaled(36) * (enemy.hp / enemy.maxHp), scaled(5));
  });
}

function drawWaveStatus() {
  const remaining = enemies.length;
  const total = waveState.totalEnemies;

  ctx.fillStyle = "rgba(0,0,0,0.62)";
  ctx.fillRect(20, 78, 330, 72);

  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Волна: " + waveState.number, 35, 104);
  ctx.fillText("Статус: " + (waveState.active ? "идёт" : "подготовка"), 35, 126);
  ctx.fillText("Враги: " + remaining + " / " + total + " | Скорость: x" + gameSpeed, 35, 146);
}

function drawSelectedTowerPanel() {
  if (!uiState.selectedTower) return;

  const tower = uiState.selectedTower;
  const towerType = towerTypes[tower.typeId];

  ctx.fillStyle = "rgba(0,0,0,0.72)";
  ctx.fillRect(20, 160, 360, 185);

  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Башня: " + towerType.name, 35, 188);
  ctx.fillText("Уровень: " + tower.level, 35, 213);
  ctx.fillText("Урон: " + tower.damage.toFixed(2), 35, 238);
  ctx.fillText("Радиус: " + tower.range, 35, 263);
  ctx.fillText("Энергия: " + towerType.powerUsage, 35, 288);

  ctx.fillStyle = "#999";
  ctx.fillText("Улучшения:", 35, 316);
  ctx.fillText("• Урон +1 — нужна технология", 55, 338);
}

function drawInfoPanel() {
  if (!uiState.infoPanelOpen) return;

  const x = Math.max(12, canvas.width - 390);
  const y = 78;
  const w = Math.min(370, canvas.width - 24);

  ctx.fillStyle = "rgba(0,0,0,0.88)";
  ctx.fillRect(x, y, w, 505);

  ctx.fillStyle = "white";
  ctx.font = "18px Arial";
  ctx.fillText("Codex / Справка", x + 18, y + 34);

  ctx.font = "14px Arial";
  ctx.fillText("Башни:", x + 18, y + 70);

  Object.values(towerTypes).forEach((tower, index) => {
    const rowY = y + 95 + index * 80;
    ctx.fillText("- " + tower.name, x + 28, rowY);
    ctx.fillText("  Стоимость: " + tower.cost.wood + " дерева | Энергия: " + tower.powerUsage, x + 28, rowY + 18);
    ctx.fillText("  Урон: " + tower.damage + " | Радиус: " + tower.range, x + 28, rowY + 36);
  });

  ctx.fillText("Враги:", x + 18, y + 185);

  Object.values(enemyTypes).forEach((enemy, index) => {
    const rowY = y + 210 + index * 68;
    ctx.fillText("- " + enemy.name + " (" + enemy.class + ")", x + 28, rowY);
    ctx.fillText("  HP: " + enemy.hp + " | Скорость: " + enemy.speed, x + 28, rowY + 18);
    ctx.fillText("  Награда: " + enemy.reward.wood + " дерева", x + 28, rowY + 36);
  });

  ctx.fillText("Механики:", x + 18, y + 425);
  ctx.fillText("- Retry Wave возвращает к подготовке", x + 28, y + 447);
  ctx.fillText("- Энергия ограничивает спам башен", x + 28, y + 469);
  ctx.fillText("- Zoom: кнопки +/- или pinch", x + 28, y + 491);
}

function drawNotifications() {
  const startX = Math.max(20, canvas.width - 390);
  let y = 20;

  uiState.notifications.forEach(note => {
    const color = note.type === "danger" ? "rgba(138,45,45,0.88)" :
      note.type === "warning" ? "rgba(160,110,25,0.9)" :
      note.type === "success" ? "rgba(47,107,60,0.9)" :
      "rgba(0,0,0,0.78)";

    ctx.fillStyle = color;
    ctx.fillRect(startX, y, 370, 34);

    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.fillText(note.text, startX + 12, y + 22);

    y += 40;
  });
}

function drawGameOver() {
  if (!gameState.gameOver) return;
  ctx.fillStyle = "rgba(0,0,0,0.66)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ---------- LOOP ----------

function gameLoop() {
  const multiplier = gameSpeed;

  updateEnemies(multiplier);
  updateTowers(multiplier);
  updateNotifications();

  drawMap();
  drawRoadTiles();
  drawPathLine();
  drawBase();

  if (uiState.selectedTower) drawTowerRange(uiState.selectedTower);

  drawBuildOverlay();
  drawTowers();
  drawEnemies();

  drawWaveStatus();
  drawSelectedTowerPanel();
  drawInfoPanel();
  drawNotifications();
  drawGameOver();

  updateDomVisibility();
  requestAnimationFrame(gameLoop);
}

gameLoop();