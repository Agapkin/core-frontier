// CORE FRONTIER — Stage 03.3
// ======================================================
// КАРТА ФАЙЛА ДЛЯ AI
// ФАЙЛ: js/data.js
// РОЛЬ: static gameplay configuration, balance definitions, enemy/tower data и world/path definitions.
// СТАТУС: Stage 03.3 strongly marked runtime foundation data layer.
// ВЛАДЕЕТ: TILE_SIZE, map, difficultyProfiles, gameBalance, towerTypes, enemyTypes, enemyPath, roadTiles, tileKey(), buildRoadTiles().
// НЕ ВЛАДЕЕТ: mutable runtime state, gameplay loops, placement validation, combat execution, rendering, UI lifecycle.
// ЧИТАЕТ: internal balance references между gameBalance и towerTypes.
// ИЗМЕНЯЕТ: roadTiles during initial buildRoadTiles() generation only.
// ИСПОЛЬЗУЕТСЯ В: js/state.js, js/systems/*, js/ui/*, js/game.js.
// RUNTIME-КОНТРАКТ: browser-global data layer; должен загружаться до state.js, systems/*, ui/* и game.js.
// НЕЛЬЗЯ: трактовать файл как generic registry framework, ECS/entity system или content pipeline.
// ======================================================

// ======================================================
// СЕКЦИЯ: CORE CONSTANTS / TILE CONFIG
// РОЛЬ: базовые tile/world constants для map, rendering и coordinate math.
// ======================================================

// TILE_SIZE: базовый размер world tile для map/grid/runtime coordinate calculations.
const TILE_SIZE = 64;

// ======================================================
// КОНЕЦ СЕКЦИИ: CORE CONSTANTS / TILE CONFIG
// ======================================================

// ======================================================
// СЕКЦИЯ: MAP / WORLD DIMENSIONS
// РОЛЬ: static world dimensions и playable map boundaries.
// ======================================================

// map: static world geometry definition для runtime coordinate и camera systems.
const map = {
  cols: 30,
  rows: 22,
  width: 30 * TILE_SIZE,
  height: 22 * TILE_SIZE
};

// ======================================================
// КОНЕЦ СЕКЦИИ: MAP / WORLD DIMENSIONS
// ======================================================

// ======================================================
// СЕКЦИЯ: DIFFICULTY PROFILES
// РОЛЬ: difficulty modifiers для enemy stats, rewards и gameplay pressure.
// ======================================================

// difficultyProfiles: structured gameplay difficulty definitions для runtime scaling.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: DIFFICULTY PROFILES
// ======================================================

// ======================================================
// СЕКЦИЯ: GAME BALANCE CONFIG
// РОЛЬ: compact gameplay balance и starting economy configuration.
// ======================================================

// gameBalance: current wave-defense balance config without production/economy framework.
// ТОЧКА РОСТА: economy/progression pressure существует.
// ВАЖНО: production-chain system и economy engine пока НЕ реализованы.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: GAME BALANCE CONFIG
// ======================================================

// ======================================================
// СЕКЦИЯ: TOWER DEFINITIONS
// РОЛЬ: structured combat tower gameplay definitions и tower metadata.
// ======================================================

// towerTypes: structured current combat tower definitions with future placeable-data pressure.
// ТОЧКА РОСТА: proto-registry pressure существует.
// ВАЖНО: generic placeable registry и entity framework пока НЕ реализованы.
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

    // upgrades: current upgrade descriptors data only.
    // ВАЖНО: upgrade runtime framework пока НЕ реализован.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: TOWER DEFINITIONS
// ======================================================

// ======================================================
// СЕКЦИЯ: ENEMY DEFINITIONS
// РОЛЬ: structured enemy gameplay definitions и combat metadata.
// ======================================================

// enemyTypes: structured current enemy definitions with scaling/registry pressure.
// ТОЧКА РОСТА: proto-registry pressure существует.
// ВАЖНО: generic entity registry пока НЕ реализован.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: ENEMY DEFINITIONS
// ======================================================

// ======================================================
// СЕКЦИЯ: PATH / ROAD DATA
// РОЛЬ: enemy movement path и derived road-tile geometry.
// ======================================================

// enemyPath: ordered world-space path points для enemy movement routing.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: PATH / ROAD DATA
// ======================================================

// ======================================================
// СЕКЦИЯ: DATA HELPERS
// РОЛЬ: lightweight geometry/data helper utilities.
// ======================================================

// tileKey(): создаёт stable string key для tile coordinate addressing.
function tileKey(tileX, tileY) {
  return tileX + "," + tileY;
}

// buildRoadTiles(): строит runtime road tile set на основе enemyPath.
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

// roadTiles: prebuilt runtime road occupancy set derived from enemyPath.
const roadTiles = buildRoadTiles(enemyPath);

// ======================================================
// КОНЕЦ СЕКЦИИ: DATA HELPERS
// ======================================================
