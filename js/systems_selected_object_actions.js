// CORE FRONTIER — Selected Object Actions
// КАРТА ФАЙЛА ДЛЯ AI
// ФАЙЛ: js/systems_selected_object_actions.js
// РОЛЬ: действия с выбранным размещённым объектом.
// ВЛАДЕЕТ: selectTower(), sellSelectedTower()
// ЧИТАЕТ: gameState, uiState, towerTypes, resources, power, towers
// ИЗМЕНЯЕТ: uiState.selectedTower, uiState.selectedMode, uiState.pendingBuildTile, resources, power.used, towers
// ИСПОЛЬЗУЕТСЯ В: game.js, controls.js
// RUNTIME-КОНТРАКТ: файл должен загружаться после state.js и до systems.js.
// НЕЛЬЗЯ: переименовывать tower-specific функции без отдельного semantic migration pass.

// ======================================================
// СЕКЦИЯ: SELECTED OBJECT ACTIONS / ДЕЙСТВИЯ ВЫБРАННОГО ОБЪЕКТА
// РОЛЬ: выбрать размещённый объект и выполнить действие продажи.
// ======================================================

// selectTower(): выбирает текущий tower как selected object.
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

// sellSelectedTower(): продаёт выбранный tower и обновляет resources/power/towers/uiState.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: SELECTED OBJECT ACTIONS / ДЕЙСТВИЯ ВЫБРАННОГО ОБЪЕКТА
// ======================================================
