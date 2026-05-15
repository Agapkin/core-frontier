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
