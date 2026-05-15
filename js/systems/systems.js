// CORE FRONTIER — Stage 02.4.5-A
// systems.js — remaining runtime orchestration and lifecycle-heavy systems
// КАРТА ФАЙЛА ДЛЯ AI
// ФАЙЛ: js/systems/systems.js
// РОЛЬ: orchestration/lifecycle file для button commands, wave start, checkpoint/restart/game over, enemy update, reward flow и tower combat.
// СТАТУС: файл разгружен после Stage 03.3 extractions, но НЕ является чистым orchestration shell.
// ВЫНЕСЕНО: js/systems/systems_wave_manager.js, js/systems/systems_placement.js, js/systems/systems_selected_object_actions.js
// ВЛАДЕЕТ: buildTower(), cancelBuildMode(), startWave(), saveCheckpoint(), retryLastWave(), restartGame(), triggerGameOver(), updateEnemies(), applyReward(), updateTowers()
// НЕ ВЛАДЕЕТ: wave generation helpers, placement lifecycle, selected object actions, UI panels, render layer, data/state definitions.
// ЧИТАЕТ: gameState, uiState, waveState, checkpoint, resources, base, power, towers, enemies, enemyPath, difficultyProfiles, gameBalance, camera, gameSpeed.
// ИЗМЕНЯЕТ: gameState, uiState, waveState, checkpoint, resources, base, power, towers, enemies, camera, gameSpeed.
// ИСПОЛЬЗУЕТСЯ В: controls.js, game.js, runtime button flow, update loop.
// RUNTIME-КОНТРАКТ: файл должен загружаться после extracted systems files и до ui/* + game.js.
// НЕЛЬЗЯ: делать extraction/refactor без отдельного inspection pass.

// ======================================================
// СЕКЦИЯ: BUTTON ACTIONS / UI COMMANDS
// РОЛЬ: пользовательские команды запускают build mode, отмену build mode и wave start.
// ВКЛЮЧАЕТ: buildTower(), cancelBuildMode(), startWave()
// ======================================================

// ---------- BUTTON ACTIONS ----------

// buildTower(): включает режим строительства tower и сбрасывает selectedTower.
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

// cancelBuildMode(): отключает build mode и очищает pendingBuildTile.
function cancelBuildMode() {
  uiState.selectedMode = null;
  uiState.pendingBuildTile = null;

  notify("Строительство отменено", "info");
}

// startWave(): запускает новую волну и связывает checkpoint, waveState и spawn flow.
function startWave() {
  // ---------- WAVE START GUARDS ----------
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

  // ---------- CHECKPOINT SAVE ----------
  saveCheckpoint();

  // ---------- UI SELECTION RESET ----------
  uiState.selectedMode = null;
  uiState.pendingBuildTile = null;
  uiState.selectedTower = null;

  // ---------- WAVE STATE ACTIVATION ----------
  waveState.active = true;

  waveState.number += 1;

  waveState.spawnedEnemies = 0;
  waveState.killedEnemies = 0;
  waveState.reachedBase = 0;

  // ---------- WAVE CREATION / SPAWN FLOW ----------
  const wave = createWave(waveState.number);

  waveState.totalEnemies = wave.length;

  wave.forEach((enemyConfig, index) => {
    spawnEnemy(enemyConfig.type, index);
  });

  // ---------- UI FEEDBACK ----------
  updateUI();

  notify(
    "Волна #" + waveState.number + " запущена",
    "info"
  );
}

// ======================================================
// КОНЕЦ СЕКЦИИ: BUTTON ACTIONS / UI COMMANDS
// ======================================================

// ======================================================
// СЕКЦИЯ: CHECKPOINT / RESTART / GAME OVER
// РОЛЬ: сохранить состояние, восстановить волну, начать новую игру и завершить игру.
// ВКЛЮЧАЕТ: saveCheckpoint(), retryLastWave(), restartGame(), triggerGameOver()
// ======================================================

// ---------- CHECKPOINT / RESTART ----------

// saveCheckpoint(): сохраняет rollback-состояние перед запуском волны.
function saveCheckpoint() {
  // ---------- CHECKPOINT SNAPSHOT ----------
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

// retryLastWave(): восстанавливает checkpoint и возвращает игру к подготовке перед волной.
function retryLastWave() {
  // ---------- CHECKPOINT GUARD ----------
  if (!checkpoint) {
    notify("Checkpoint отсутствует", "warning");
    return;
  }

  // ---------- CORE STATE RESTORE ----------
  resources = clone(checkpoint.resources);
  base = clone(checkpoint.base);
  power = clone(checkpoint.power);

  waveState = clone(checkpoint.waveState);

  gameState.gameOver = false;

  gameState.difficulty =
    checkpoint.difficulty;

  gameSpeed = checkpoint.gameSpeed;

  // ---------- CAMERA RESTORE ----------
  camera.x = checkpoint.camera.x;
  camera.y = checkpoint.camera.y;
  camera.zoom = checkpoint.camera.zoom;

  clampCamera();

  // ---------- ENTITY RESTORE ----------
  towers.length = 0;

  checkpoint.towers.forEach(tower => {
    towers.push(clone(tower));
  });

  enemies.length = 0;

  // ---------- UI STATE RESET ----------
  uiState.selectedMode = null;
  uiState.pendingBuildTile = null;
  uiState.selectedTower = null;

  uiState.infoPanelOpen = false;
  uiState.menuOpen = false;

  // ---------- UI REBUILD / FEEDBACK ----------
  createDynamicUI();

  updatePower();
  updateUI();

  notify(
    "Откат к подготовке перед волной",
    "info"
  );
}

// restartGame(): полностью сбрасывает runtime state в состояние новой игры.
function restartGame() {
  // ---------- CORE STATE RESET ----------
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

  // ---------- CAMERA RESET ----------
  camera.zoom = 1;
  camera.x = 0;
  camera.y = 0;

  // ---------- ENTITY RESET ----------
  towers.length = 0;
  enemies.length = 0;

  // ---------- UI STATE RESET ----------
  uiState.selectedMode = null;
  uiState.pendingBuildTile = null;
  uiState.selectedTower = null;

  uiState.infoPanelOpen = false;
  uiState.menuOpen = false;

  // ---------- UI REBUILD / FEEDBACK ----------
  createDynamicUI();

  updatePower();
  updateUI();

  notify("Новая игра начата", "info");
}

// triggerGameOver(): переводит runtime в game over state и очищает активные enemies/UI selection.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: CHECKPOINT / RESTART / GAME OVER
// ======================================================

// ======================================================
// СЕКЦИЯ: UPDATE / ENEMY FLOW
// РОЛЬ: обновить enemies, применить base damage и завершить волну.
// ВКЛЮЧАЕТ: updateEnemies()
// ======================================================

// ---------- UPDATE ----------

// updateEnemies(): двигает enemies, применяет damage к базе и обрабатывает death/reward flow.
function updateEnemies(multiplier) {
  if (gameState.gameOver) return;

  // ---------- ENEMY MOVEMENT / BASE HIT ----------
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

  // ---------- ENEMY CLEANUP / DEATH FLOW ----------
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

  // ---------- WAVE COMPLETION CHECK ----------
  if (
    waveState.active &&
    enemies.length === 0 &&
    !gameState.gameOver
  ) {
    waveState.active = false;

    notify("Волна завершена", "success");
  }
}

// ======================================================
// КОНЕЦ СЕКЦИИ: UPDATE / ENEMY FLOW
// ======================================================

// ======================================================
// СЕКЦИЯ: RESOURCE / REWARD FLOW
// РОЛЬ: начислить reward за уничтоженных enemies.
// ВКЛЮЧАЕТ: applyReward()
// ======================================================

// applyReward(): начисляет resources с учётом difficulty reward multiplier.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: RESOURCE / REWARD FLOW
// ======================================================

// ======================================================
// СЕКЦИЯ: TOWER COMBAT FLOW
// РОЛЬ: обновить tower targeting и нанести damage enemies.
// ВКЛЮЧАЕТ: updateTowers()
// ======================================================

// updateTowers(): ищет цели в range и применяет tower damage.
function updateTowers(multiplier) {
  if (gameState.gameOver) return;

  // ---------- TARGET ACQUISITION ----------
  towers.forEach(tower => {
    const target = enemies.find(enemy => {
      const dx = enemy.x - tower.x;
      const dy = enemy.y - tower.y;

      return (
        Math.sqrt(dx * dx + dy * dy) <=
        tower.range
      );
    });

    // ---------- DAMAGE APPLICATION ----------
    if (target) {
      target.hp -=
        tower.damage * multiplier;

      tower.target = target;
    } else {
      tower.target = null;
    }
  });
}

// ======================================================
// КОНЕЦ СЕКЦИИ: TOWER COMBAT FLOW
// ======================================================
