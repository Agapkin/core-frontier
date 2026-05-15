// CORE FRONTIER — Placement helpers
// КАРТА ФАЙЛА ДЛЯ AI
// ФАЙЛ: js/systems_placement.js
// РОЛЬ: выбор клетки, проверка placement, установка tower object.
// ВЛАДЕЕТ: selectBuildTile(), getBuildPanelText(), placeTower(), validateBuildTile(), getTowerAtTile(), isRoadTile(), isBaseTile(), isTowerTile(), hasCost(), payCost()
// ЧИТАЕТ: uiState, towerTypes, resources, power, towers, map, roadTiles, base, TILE_SIZE
// ИЗМЕНЯЕТ: uiState.pendingBuildTile, uiState.selectedTower, uiState.selectedMode, resources, power.used, towers
// ИСПОЛЬЗУЕТСЯ В: systems.js, panels.js, canvas_world.js, game.js
// RUNTIME-КОНТРАКТ: файл должен загружаться после state.js и до systems.js.
// НЕЛЬЗЯ: менять порядок загрузки без проверки build flow.

// ======================================================
// СЕКЦИЯ: PLACEMENT / РАЗМЕЩЕНИЕ
// РОЛЬ: выбрать клетку, проверить placement и создать текущий tower object.
// ======================================================

// selectBuildTile(): фиксирует pending placement candidate.
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

// getBuildPanelText(): формирует текст build confirm panel.
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

// confirmBuild(): подтверждает placement и вызывает placeTower().
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

// placeTower(): создаёт tower и мутирует resources/power/towers/uiState.
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

// validateBuildTile(): главный источник проверки placement.
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

// getTowerAtTile(): текущий tower occupancy lookup.
function getTowerAtTile(tileX, tileY) {
  return towers.find(
    tower =>
      tower.tileX === tileX &&
      tower.tileY === tileY
  );
}

// isRoadTile(), isBaseTile(), isTowerTile(): tile restriction helpers.
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

// hasCost(), payCost(): cost helpers для placement.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: PLACEMENT / РАЗМЕЩЕНИЕ
// ======================================================
