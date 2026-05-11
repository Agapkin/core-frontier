// CORE FRONTIER — Stage 02.4.3
// state.js — состояние текущей игровой сессии

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

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

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function updatePower() {
  power.used = towers.reduce((sum, tower) => sum + towerTypes[tower.typeId].powerUsage, 0);
}