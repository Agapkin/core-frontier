// CORE FRONTIER — Stage 02.4.6-A1
// state.js — centralized runtime state

// ---------- GAME ----------

const gameState = {
  running: true,
  paused: false,
  gameOver: false,

  difficulty: "normal"
};

// ---------- UI MODES ----------

const UI_MODES = {
  IDLE: "idle",

  BUILD: "build",

  MENU: "menu",

  CODEX: "codex",

  GAME_OVER: "game_over"
};

// ---------- UI ----------

const uiState = {
  mode: UI_MODES.IDLE,

  selectedMode: null,

  selectedTower: null,

  hoveredTile: null,

  menuOpen: false,

  infoPanelOpen: false,

  dragging: false,

  pointerDown: false,

  lastPointerX: 0,
  lastPointerY: 0
};

// ---------- CAMERA ----------

const camera = {
  x: 0,
  y: 0,

  zoom: 1,

  minZoom: 0.55,
  maxZoom: 2.2
};

// ---------- RESPONSIVE ----------

const uiLayout = {
  width: window.innerWidth,
  height: window.innerHeight,

  isMobile: false,
  isTablet: false,
  isLandscape: false,

  compact: false
};

// ---------- RESOURCES ----------

const resources = {
  wood: 120,
  stone: 80,
  food: 60
};

// ---------- POWER ----------

const power = {
  used: 0,
  capacity: 10
};

// ---------- BASE ----------

const base = {
  hp: 100,
  maxHp: 100
};

// ---------- WAVES ----------

const waveState = {
  active: false,

  number: 0,

  totalEnemies: 0,

  spawned: 0,

  completed: false
};

// ---------- RUNTIME ----------

let enemies = [];

let towers = [];

let projectiles = [];

let particles = [];

let selectedBuildTower = null;

// ---------- GAME SPEED ----------

let gameSpeed = 1;

// ---------- INPUT ----------

let pointerWorld = {
  x: 0,
  y: 0
};