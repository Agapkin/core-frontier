const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ---------- CAMERA ----------

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

// ---------- RESPONSIVE UI ----------

const uiLayout = {
  deviceMode: "desktop",
  orientation: "landscape",
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isLandscape: true,
  isPortrait: false
};

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

// ---------- UI STATE ----------

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

// ---------- RESOURCES ----------

let resources = {
  wood: gameBalance.startWood,
  stone: gameBalance.startStone,
  food: gameBalance.startFood
};

// ---------- BASE ----------

let base = {
  hp: gameBalance.baseHp,
  tileX: 26,
  tileY: 10
};

// ---------- POWER ----------

let power = {
  used: 0,
  capacity: gameBalance.startPowerCapacity
};

// ---------- WAVE ----------

let waveState = {
  active: false,
  number: 0,
  totalEnemies: 0,
  spawnedEnemies: 0,
  killedEnemies: 0,
  reachedBase: 0
};

// ---------- GAME ----------

let gameState = {
  gameOver: false,
  difficulty: "normal"
};

let checkpoint = null;
let gameSpeed = 1;

// ---------- ENTITIES ----------

const towers = [];
const enemies = [];

// ---------- HELPERS ----------

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function updatePower() {
  power.used = towers.reduce((sum, tower) => {
    return sum + towerTypes[tower.typeId].powerUsage;
  }, 0);
}