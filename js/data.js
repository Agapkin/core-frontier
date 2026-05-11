// CORE FRONTIER — Stage 02.4.3
// data.js — единый источник игровых данных

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

const roadTiles = buildRoadTiles(enemyPath);