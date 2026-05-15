// CORE FRONTIER — Runtime State
// КАРТА ФАЙЛА ДЛЯ AI
// ФАЙЛ: js/state.js
// РОЛЬ: mutable browser-global runtime state container и initial runtime state definition layer.
// СТАТУС: shared state foundation; current naming остаётся tower-specific там, где runtime ещё tower-specific.
// ВЛАДЕЕТ: canvas, ctx, camera, uiLayout, uiState, resources, base, power, waveState, gameState, checkpoint, gameSpeed, towers, enemies, clone(), updatePower().
// НЕ ВЛАДЕЕТ: gameplay rules, placement validation, tower combat execution, enemy movement, wave generation, rendering implementation, UI panel creation.
// ЧИТАЕТ: document, window, gameBalance, towerTypes.
// ИЗМЕНЯЕТ: uiLayout through updateResponsiveLayout(), power.used through updatePower().
// ИСПОЛЬЗУЕТСЯ В: js/game.js, js/systems/*, js/ui/* runtime and rendering flows.
// RUNTIME-КОНТРАКТ: файл должен загружаться после js/data.js and before systems/ui/game runtime files.
// НЕЛЬЗЯ: менять state shape, declaration order, initial values или tower-specific identifiers без отдельного semantic migration pass.

// ======================================================
// СЕКЦИЯ: CANVAS CONTEXT / CANVAS RUNTIME ROOT
// РОЛЬ: получить shared canvas и drawing context для runtime/render layers.
// ВКЛЮЧАЕТ: canvas, ctx
// ======================================================

// canvas: DOM canvas root used by game.js and render/UI layers.
const canvas = document.getElementById("game");

// ctx: shared 2D drawing context used by canvas render files.
const ctx = canvas.getContext("2d");

// ======================================================
// КОНЕЦ СЕКЦИИ: CANVAS CONTEXT / CANVAS RUNTIME ROOT
// ======================================================

// ======================================================
// СЕКЦИЯ: CAMERA / VIEWPORT STATE
// РОЛЬ: хранить runtime viewport/pan/zoom state shared между input и rendering.
// ВКЛЮЧАЕТ: camera
// ======================================================

// camera: mutable viewport state for pan, zoom, drag and pinch interactions.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: CAMERA / VIEWPORT STATE
// ======================================================

// ======================================================
// СЕКЦИЯ: RESPONSIVE UI STATE
// РОЛЬ: хранить responsive layout mode и обновлять device/orientation flags.
// ВКЛЮЧАЕТ: uiLayout, updateResponsiveLayout()
// ======================================================

// uiLayout: current responsive UI/device mode flags used by UI and rendering.
const uiLayout = {
  deviceMode: "desktop",
  orientation: "landscape",
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isLandscape: true,
  isPortrait: false
};

// updateResponsiveLayout(): recalculates uiLayout flags from window size.
function updateResponsiveLayout() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  uiLayout.orientation = width > height
    ? "landscape"
    : "portrait";

  uiLayout.isLandscape = uiLayout.orientation === "landscape";
  uiLayout.isPortrait = uiLayout.orientation === "portrait";

  uiLayout.isMobile = width <= 768;
  uiLayout.isTablet = width > 768 && width <= 1180;
  uiLayout.isDesktop = width > 1180;

  if (uiLayout.isMobile) {
    uiLayout.deviceMode = "mobile";
  } else if (uiLayout.isTablet) {
    uiLayout.deviceMode = "tablet";
  } else {
    uiLayout.deviceMode = "desktop";
  }
}

updateResponsiveLayout();

// ======================================================
// КОНЕЦ СЕКЦИИ: RESPONSIVE UI STATE
// ======================================================

// ======================================================
// СЕКЦИЯ: UI INTERACTION STATE
// РОЛЬ: хранить current UI interaction/runtime context.
// ВКЛЮЧАЕТ: uiState
// ======================================================

// uiState: mutable UI interaction state for build mode, hover, selection, panels and notifications.
// ТОЧКА РОСТА: selectedTower/selectedTowerType are current tower-specific names with future selected-object pressure.
// ВАЖНО: selectedObject architecture и generic object system пока НЕ реализованы.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: UI INTERACTION STATE
// ======================================================

// ======================================================
// СЕКЦИЯ: ECONOMY / BASE / POWER STATE
// РОЛЬ: хранить mutable resources, base HP/position и power usage/capacity.
// ВКЛЮЧАЕТ: resources, base, power
// ======================================================

// resources: mutable economy resource pool used by placement/rewards/UI.
let resources = {
  wood: gameBalance.startWood,
  stone: gameBalance.startStone,
  food: gameBalance.startFood
};

// base: mutable base state for HP and tile position.
let base = {
  hp: gameBalance.baseHp,
  tileX: 26,
  tileY: 10
};

// power: mutable power budget state used by placement and tower selling.
let power = {
  used: 0,
  capacity: gameBalance.startPowerCapacity
};

// ======================================================
// КОНЕЦ СЕКЦИИ: ECONOMY / BASE / POWER STATE
// ======================================================

// ======================================================
// СЕКЦИЯ: WAVE / GAMEPLAY RUNTIME STATE
// РОЛЬ: хранить current wave progression и core gameplay flags.
// ВКЛЮЧАЕТ: waveState, gameState
// ======================================================

// waveState: mutable wave lifecycle counters and active state.
let waveState = {
  active: false,
  number: 0,
  totalEnemies: 0,
  spawnedEnemies: 0,
  killedEnemies: 0,
  reachedBase: 0
};

// gameState: core gameplay progression flags.
let gameState = {
  gameOver: false,
  difficulty: "normal"
};

// ======================================================
// КОНЕЦ СЕКЦИИ: WAVE / GAMEPLAY RUNTIME STATE
// ======================================================

// ======================================================
// СЕКЦИЯ: CHECKPOINT / SPEED STATE
// РОЛЬ: хранить retry checkpoint и runtime game speed.
// ВКЛЮЧАЕТ: checkpoint, gameSpeed
// ======================================================

// checkpoint: rollback snapshot used by retryLastWave().
// ТОЧКА РОСТА: checkpoint shape follows current runtime globals; generic state store пока НЕ реализован.
let checkpoint = null;

// gameSpeed: runtime speed multiplier used by update loop and UI controls.
let gameSpeed = 1;

// ======================================================
// КОНЕЦ СЕКЦИИ: CHECKPOINT / SPEED STATE
// ======================================================

// ======================================================
// СЕКЦИЯ: ENTITY COLLECTIONS
// РОЛЬ: хранить mutable runtime collections for towers and enemies.
// ВКЛЮЧАЕТ: towers, enemies
// ======================================================

// towers: mutable runtime collection текущих combat towers.
// ТОЧКА РОСТА: towers may later face placed-object pressure, but placedObjects system НЕ реализован.
const towers = [];

// enemies: mutable runtime collection текущих spawned enemies.
const enemies = [];

// ======================================================
// КОНЕЦ СЕКЦИИ: ENTITY COLLECTIONS
// ======================================================

// ======================================================
// СЕКЦИЯ: STATE HELPERS
// РОЛЬ: предоставить small helpers for cloning and derived power state.
// ВКЛЮЧАЕТ: clone(), updatePower()
// ======================================================

// clone(): creates JSON-safe deep copy for checkpoint/state restore flows.
function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

// updatePower(): recalculates power.used from current towers collection.
function updatePower() {
  power.used = towers.reduce((sum, tower) => {
    return sum + towerTypes[tower.typeId].powerUsage;
  }, 0);
}

// ======================================================
// КОНЕЦ СЕКЦИИ: STATE HELPERS
// ======================================================
