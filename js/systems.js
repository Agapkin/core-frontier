// CORE FRONTIER — Stage 02.4.5-A
// systems.js — gameplay systems, build logic, waves, enemies, towers

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

  notify(
    "Режим строительства: выбери клетку",
    "info"
  );
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

  const tile = {
    tileX: uiState.pendingBuildTile.tileX,
    tileY: uiState.pendingBuildTile.tileY
  };

  placeTower(tile.tileX, tile.tileY);
}

function startWave() {
  if (gameState.gameOver) {
    notify("Игра окончена", "warning");
    return;
  }

  if (waveState.active) {
    notify(
      "Текущая волна ещё не завершена",
      "warning"
    );

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

  wave.forEach((enemyConfig, index) => {
    spawnEnemy(enemyConfig.type, index);
  });

  updateUI();

  notify(
    "Волна #" + waveState.number + " запущена",
    "info"
  );
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

    camera: clone({
      x: camera.x,
      y: camera.y,
      zoom: camera.zoom
    })
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

  gameState.difficulty =
    checkpoint.difficulty;

  gameSpeed = checkpoint.gameSpeed;

  camera.x = checkpoint.camera.x;
  camera.y = checkpoint.camera.y;
  camera.zoom = checkpoint.camera.zoom;

  clampCamera();

  towers.length = 0;

  checkpoint.towers.forEach(tower => {
    towers.push(clone(tower));
  });

  enemies.length = 0;

  uiState.selectedMode = null;
  uiState.pendingBuildTile = null;
  uiState.selectedTower = null;

  uiState.infoPanelOpen = false;
  uiState.menuOpen = false;

  createDynamicUI();

  updatePower();
  updateUI();

  notify(
    "Откат к подготовке перед волной",
    "info"
  );
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

// ---------- WAVE MANAGER ----------

function createWave(number) {
  const profile =
    difficultyProfiles[gameState.difficulty];

  const wave = [];

  const runnerCount = Math.ceil(
    (
      gameBalance.firstWaveEnemyCount +
      number * gameBalance.waveGrowth
    ) * profile.enemyCount
  );

  const scoutCount =
    number >= 2
      ? Math.ceil(
          (
            1 +
            Math.floor(number / 2)
          ) * profile.enemyCount
        )
      : 0;

  const tankCount =
    number >= 3
      ? Math.ceil(
          Math.floor(number / 3) *
          profile.enemyCount
        )
      : 0;

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
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [result[i], result[j]] =
      [result[j], result[i]];
  }

  return result;
}

function spawnEnemy(typeId, index) {
  const type = enemyTypes[typeId];

  const profile =
    difficultyProfiles[gameState.difficulty];

  const waveHpBonus =
    waveState.number * 5;

  const spawnSpacing = 34;

  const hp = Math.ceil(
    (
      type.hp +
      waveHpBonus
    ) * profile.enemyHp
  );

  const speed =
    (
      type.speed +
      waveState.number * 0.035
    ) * profile.enemySpeed;

  enemies.push({
    typeId,

    pathIndex: 0,

    x:
      enemyPath[0].x * TILE_SIZE +
      TILE_SIZE / 2 -
      index * spawnSpacing,

    y:
      enemyPath[0].y * TILE_SIZE +
      TILE_SIZE / 2,

    hp,
    maxHp: hp,

    speed,

    reachedBase: false
  });

  waveState.spawnedEnemies += 1;
}

// ---------- BUILDING ----------

function selectBuildTile(tileX, tileY) {
  const towerType =
    towerTypes[uiState.selectedTowerType];

  const validation = validateBuildTile(
    tileX,
    tileY,
    towerType
  );

  uiState.pendingBuildTile = {
    tileX,
    tileY
  };

  if (!validation.ok) {
    notify(validation.reason, "warning");
  } else {
    notify(
      "Клетка выбрана. Подтверди строительство",
      "info"
    );
  }
}

function getBuildPanelText() {
  if (uiState.selectedMode !== "tower") {
    return "";
  }

  const towerType =
    towerTypes[uiState.selectedTowerType];

  const cost =
    "🌲 " +
    towerType.cost.wood +
    " | ⚡ " +
    towerType.powerUsage;

  if (!uiState.pendingBuildTile) {
    return "Выбери клетку для башни — " + cost;
  }

  const validation = validateBuildTile(
    uiState.pendingBuildTile.tileX,
    uiState.pendingBuildTile.tileY,
    towerType
  );

  return validation.ok
    ? "Можно строить — " + cost
    : "Нельзя построить здесь: " + validation.reason + " — " + cost;
}

function placeTower(tileX, tileY) {
  const towerType =
    towerTypes[uiState.selectedTowerType];

  const validation = validateBuildTile(
    tileX,
    tileY,
    towerType
  );

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

    x:
      tileX * TILE_SIZE +
      TILE_SIZE / 2,

    y:
      tileY * TILE_SIZE +
      TILE_SIZE / 2,

    range: towerType.range,
    damage: towerType.damage,

    target: null,

    level: 1
  };

  towers.push(tower);

  uiState.selectedTower = tower;

  // IMPORTANT:
  // Build mode intentionally stays active
  // for fast mobile building flow.

  uiState.selectedMode = "tower";

  uiState.pendingBuildTile = null;

  updateUI();

  notify(
    "Башня построена. Можно выбрать следующую клетку",
    "success"
  );
}

function validateBuildTile(
  tileX,
  tileY,
  towerType
) {
  if (
    tileX < 0 ||
    tileY < 0 ||
    tileX >= map.cols ||
    tileY >= map.rows
  ) {
    return {
      ok: false,
      reason:
        "Нельзя строить за пределами карты"
    };
  }

  if (isRoadTile(tileX, tileY)) {
    return {
      ok: false,
      reason:
        "Нельзя строить на дороге"
    };
  }

  if (isBaseTile(tileX, tileY)) {
    return {
      ok: false,
      reason:
        "Нельзя строить на базе"
    };
  }

  if (isTowerTile(tileX, tileY)) {
    return {
      ok: false,
      reason:
        "Клетка уже занята"
    };
  }

  if (
    power.used +
      towerType.powerUsage >
    power.capacity
  ) {
    return {
      ok: false,
      reason:
        "Не хватает энергии. Нужен генератор"
    };
  }

  if (!hasCost(towerType.cost)) {
    return {
      ok: false,
      reason:
        "Недостаточно ресурсов"
    };
  }

  return {
    ok: true,
    reason: ""
  };
}

function selectTower(tower) {
  uiState.selectedTower = tower;

  uiState.selectedMode = null;
  uiState.pendingBuildTile = null;

  notify(
    "Выбрана башня: " +
      towerTypes[tower.typeId].name,
    "info"
  );
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

  const towerType =
    towerTypes[tower.typeId];

  Object.entries(towerType.cost).forEach(
    ([resource, amount]) => {
      const returned = Math.floor(
        amount *
        towerType.sellReturnRate
      );

      resources[resource] =
        (resources[resource] || 0) +
        returned;
    }
  );

  power.used = Math.max(
    0,
    power.used -
      towerType.powerUsage
  );

  const index = towers.findIndex(
    t => t.id === tower.id
  );

  if (index >= 0) {
    towers.splice(index, 1);
  }

  uiState.selectedTower = null;

  updateUI();

  notify("Башня продана", "success");
}

function getTowerAtTile(tileX, tileY) {
  return towers.find(
    tower =>
      tower.tileX === tileX &&
      tower.tileY === tileY
  );
}

function isRoadTile(tileX, tileY) {
  return roadTiles.has(
    tileKey(tileX, tileY)
  );
}

function isBaseTile(tileX, tileY) {
  return (
    tileX === base.tileX &&
    tileY === base.tileY
  );
}

function isTowerTile(tileX, tileY) {
  return towers.some(
    tower =>
      tower.tileX === tileX &&
      tower.tileY === tileY
  );
}

function hasCost(cost) {
  return Object.entries(cost).every(
    ([resource, amount]) =>
      (resources[resource] || 0) >= amount
  );
}

function payCost(cost) {
  Object.entries(cost).forEach(
    ([resource, amount]) => {
      resources[resource] -= amount;
    }
  );
}

// ---------- UPDATE ----------

function updateEnemies(multiplier) {
  if (gameState.gameOver) return;

  enemies.forEach(enemy => {
    const target =
      enemyPath[enemy.pathIndex + 1];

    if (!target) {
      enemy.reachedBase = true;

      const profile =
        difficultyProfiles[
          gameState.difficulty
        ];

      base.hp -= Math.ceil(
        gameBalance.baseDamagePerEnemy *
          profile.baseDamage
      );

      waveState.reachedBase += 1;

      if (base.hp <= 0) {
        triggerGameOver();
      }

      updateUI();

      return;
    }

    const targetX =
      target.x * TILE_SIZE +
      TILE_SIZE / 2;

    const targetY =
      target.y * TILE_SIZE +
      TILE_SIZE / 2;

    const dx = targetX - enemy.x;
    const dy = targetY - enemy.y;

    const distance = Math.sqrt(
      dx * dx + dy * dy
    );

    const moveSpeed =
      enemy.speed * multiplier;

    if (distance < moveSpeed) {
      enemy.x = targetX;
      enemy.y = targetY;

      enemy.pathIndex++;
    } else {
      enemy.x +=
        (dx / distance) * moveSpeed;

      enemy.y +=
        (dy / distance) * moveSpeed;
    }
  });

  for (
    let i = enemies.length - 1;
    i >= 0;
    i--
  ) {
    const enemy = enemies[i];

    const enemyType =
      enemyTypes[enemy.typeId];

    if (enemy.hp <= 0) {
      applyReward(enemyType.reward);

      waveState.killedEnemies += 1;

      enemies.splice(i, 1);

      updateUI();
    } else if (enemy.reachedBase) {
      enemies.splice(i, 1);
    }
  }

  if (
    waveState.active &&
    enemies.length === 0 &&
    !gameState.gameOver
  ) {
    waveState.active = false;

    notify("Волна завершена", "success");
  }
}

function applyReward(reward) {
  const profile =
    difficultyProfiles[gameState.difficulty];

  Object.entries(reward).forEach(
    ([resource, amount]) => {
      resources[resource] =
        (resources[resource] || 0) +
        Math.ceil(amount * profile.reward);
    }
  );
}

function updateTowers(multiplier) {
  if (gameState.gameOver) return;

  towers.forEach(tower => {
    const target = enemies.find(enemy => {
      const dx = enemy.x - tower.x;
      const dy = enemy.y - tower.y;

      return (
        Math.sqrt(dx * dx + dy * dy) <=
        tower.range
      );
    });

    if (target) {
      target.hp -=
        tower.damage * multiplier;

      tower.target = target;
    } else {
      tower.target = null;
    }
  });
}
