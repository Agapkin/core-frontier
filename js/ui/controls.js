// CORE FRONTIER — UI Controls
// КАРТА ФАЙЛА ДЛЯ AI
// ФАЙЛ: js/ui/controls.js
// РОЛЬ: DOM controls layer, runtime command bridge и callback wiring layer.
// СТАТУС: UI command/control layer; generic input abstraction и command routing architecture НЕ реализованы.
// ВЛАДЕЕТ: createDynamicUI(), createBottomControlPanel(), createUtilityControls(), createSpeedControls(), createZoomControls(), createTowerActionPanel(), createBuildConfirmPanel()
// НЕ ВЛАДЕЕТ: gameplay logic, placement validation, tower combat, enemy update, wave lifecycle, camera state ownership, hotkey system, generic object action framework.
// ЧИТАЕТ: uiState, gameState, waveState, gameSpeed, camera, canvas, uiLayout.
// ИЗМЕНЯЕТ: DOM controls/panels, local UI visibility state, runtime command callbacks.
// ИСПОЛЬЗУЕТСЯ В: runtime UI rebuild flow, gameplay command dispatch, panels.js visibility/update flow.
// RUNTIME-КОНТРАКТ: файл должен загружаться после runtime systems files и before panels.js/game.js.
// НЕЛЬЗЯ: менять runtime callbacks или gameplay dispatch semantics без отдельного inspection pass.

// ======================================================
// СЕКЦИЯ: DYNAMIC UI REBUILD / ПЕРЕСБОРКА UI
// РОЛЬ: пересобрать runtime UI controls и синхронизировать active panels.
// ВКЛЮЧАЕТ: createDynamicUI()
// ======================================================

// createDynamicUI(): пересобирает runtime DOM controls и синхронизирует visibility panels.
function createDynamicUI() {
  // ---------- UI LAYOUT REFRESH ----------
  updateUILayout();

  // ---------- OLD PANEL CLEANUP ----------
  [
    "bottom-control-panel",
    "speed-panel",
    "zoom-panel",
    "tower-action-panel",
    "build-confirm-panel",
    "menu-panel",
    "game-over-panel"
  ].forEach(removeElement);

  // ---------- CONTROL PANEL REBUILD ----------
  createBottomControlPanel();
  createUtilityControls();
  createTowerActionPanel();
  createBuildConfirmPanel();
  createMenuPanel();
  createGameOverPanel();

  // ---------- TOPBAR VISIBILITY SYNC ----------
  updateTopbarVisibility();
}

// ======================================================
// КОНЕЦ СЕКЦИИ: DYNAMIC UI REBUILD / ПЕРЕСБОРКА UI
// ======================================================

// ======================================================
// СЕКЦИЯ: BOTTOM COMMAND PANEL / НИЖНЯЯ ПАНЕЛЬ КОМАНД
// РОЛЬ: создать основные gameplay command buttons.
// ВКЛЮЧАЕТ: createBottomControlPanel()
// ======================================================

// createBottomControlPanel(): создаёт bottom command panel для build/wave/menu/codex actions.
// ТОЧКА РОСТА: build controls могут позже перейти к category/nested build menus.
// ВАЖНО: generic build-category system пока НЕ реализована.
function createBottomControlPanel() {
  // ---------- PANEL ROOT CREATION ----------
  const panel = document.createElement("div");

  panel.id = "bottom-control-panel";

  applyFixedStyle(
    panel,
    getBottomPanelStyle()
  );

  // ---------- PRIMARY COMMAND BUTTONS ----------
  const buildButton = createUIButton(
    uiLayout.compact
      ? "🏹"
      : "🏹 Башня",

    uiState.selectedMode === "tower"
      ? "#d9a441"
      : "#2f6b3c",

    () => buildTower()
  );

  const waveButton = createUIButton(
    uiLayout.compact
      ? "⚔️"
      : "⚔️ Волна",

    "#8a5a2b",

    () => startWave()
  );

  const codexButton = createUIButton(
    uiLayout.compact
      ? "ℹ"
      : "ℹ Codex",

    uiState.infoPanelOpen
      ? "#d9a441"
      : "#33445f",

    () => {
      uiState.infoPanelOpen =
        !uiState.infoPanelOpen;

      if (uiState.infoPanelOpen) {
        uiState.menuOpen = false;
      }
    }
  );

  const menuButton = createUIButton(
    uiLayout.compact
      ? "☰"
      : "☰ Меню",

    uiState.menuOpen
      ? "#d9a441"
      : "#444444",

    () => {
      uiState.menuOpen =
        !uiState.menuOpen;

      if (uiState.menuOpen) {
        uiState.infoPanelOpen = false;
      }
    }
  );

  // ---------- DOM ATTACH ----------
  panel.appendChild(buildButton);
  panel.appendChild(waveButton);
  panel.appendChild(codexButton);
  panel.appendChild(menuButton);

  document.body.appendChild(panel);
}

// ======================================================
// КОНЕЦ СЕКЦИИ: BOTTOM COMMAND PANEL / НИЖНЯЯ ПАНЕЛЬ КОМАНД
// ======================================================

// ======================================================
// СЕКЦИЯ: UTILITY CONTROLS / ВСПОМОГАТЕЛЬНЫЕ КОНТРОЛЫ
// РОЛЬ: собрать speed/zoom utility controls.
// ВКЛЮЧАЕТ: createUtilityControls()
// ======================================================

// createUtilityControls(): создаёт utility control panels для speed и zoom.
function createUtilityControls() {
  createSpeedControls();
  createZoomControls();
}

// ======================================================
// КОНЕЦ СЕКЦИИ: UTILITY CONTROLS / ВСПОМОГАТЕЛЬНЫЕ КОНТРОЛЫ
// ======================================================

// ======================================================
// СЕКЦИЯ: SPEED CONTROLS / КОНТРОЛЫ СКОРОСТИ
// РОЛЬ: создать runtime speed control buttons.
// ВКЛЮЧАЕТ: createSpeedControls()
// ======================================================

// createSpeedControls(): создаёт speed buttons и dispatch gameSpeed changes.
function createSpeedControls() {
  // ---------- PANEL ROOT CREATION ----------
  const panel = document.createElement("div");

  panel.id = "speed-panel";

  applyFixedStyle(
    panel,
    getSpeedPanelStyle()
  );

  // ---------- SPEED BUTTON CREATION ----------
  [1, 2, 3].forEach(speed => {
    const button = createUIButton(
      "x" + speed,

      speed === gameSpeed
        ? "#d9a441"
        : "#2f6b3c",

      () => {
        if (gameState.gameOver) return;

        gameSpeed = speed;

        createDynamicUI();

        notify(
          "Скорость игры: x" + speed,
          "info"
        );
      }
    );

    button.style.padding =
      uiLayout.compact
        ? "7px 8px"
        : "8px 10px";

    panel.appendChild(button);
  });

  // ---------- DOM ATTACH ----------
  document.body.appendChild(panel);
}

// ======================================================
// КОНЕЦ СЕКЦИИ: SPEED CONTROLS / КОНТРОЛЫ СКОРОСТИ
// ======================================================

// ======================================================
// СЕКЦИЯ: ZOOM CONTROLS / КОНТРОЛЫ ZOOM
// РОЛЬ: создать zoom buttons для camera-aware world navigation.
// ВКЛЮЧАЕТ: createZoomControls()
// ======================================================

// createZoomControls(): создаёт zoom buttons и dispatch camera zoom helpers.
function createZoomControls() {
  // ---------- PANEL ROOT CREATION ----------
  const panel = document.createElement("div");

  panel.id = "zoom-panel";

  applyFixedStyle(
    panel,
    getZoomPanelStyle()
  );

  // ---------- ZOOM ACTION BUTTONS ----------
  const minus = createUIButton(
    "−",
    "#33445f",

    () =>
      zoomAt(
        canvas.width / 2,
        canvas.height / 2,
        camera.zoom - 0.12
      )
  );

  const plus = createUIButton(
    "+",
    "#33445f",

    () =>
      zoomAt(
        canvas.width / 2,
        canvas.height / 2,
        camera.zoom + 0.12
      )
  );

  const reset = createUIButton(
    "⟲",
    "#444444",

    () => resetZoom(true)
  );

  [minus, plus, reset].forEach(button => {
    button.style.padding =
      uiLayout.compact
        ? "7px 8px"
        : "8px 10px";

    panel.appendChild(button);
  });

  // ---------- DOM ATTACH ----------
  document.body.appendChild(panel);
}

// ======================================================
// КОНЕЦ СЕКЦИИ: ZOOM CONTROLS / КОНТРОЛЫ ZOOM
// ======================================================

// ======================================================
// СЕКЦИЯ: SELECTED OBJECT ACTION CONTROLS
// РОЛЬ: создать action controls для выбранного placed object.
// ВКЛЮЧАЕТ: createTowerActionPanel()
// ======================================================

// createTowerActionPanel(): создаёт action panel для selected tower/object actions.
// ТОЧКА РОСТА: current implementation tower-specific; future selected object actions pressure.
// ВАЖНО: generic object action system пока НЕ реализован.
function createTowerActionPanel() {
  // ---------- PANEL ROOT CREATION ----------
  const panel = document.createElement("div");

  panel.id = "tower-action-panel";

  applyFixedStyle(
    panel,
    getTowerActionPanelStyle()
  );

  // ---------- OBJECT ACTION BUTTONS ----------
  const sellButton = createUIButton(
    "Продать",
    "#2f6b3c",

    () => sellSelectedTower()
  );

  const upgradeButton = createUIButton(
    "Улучшить",
    "#555555",

    () => {
      notify(
        "Улучшение недоступно: нужна технология",
        "warning"
      );
    }
  );

  // ---------- DOM ATTACH ----------
  panel.appendChild(sellButton);
  panel.appendChild(upgradeButton);

  document.body.appendChild(panel);
}

// ======================================================
// КОНЕЦ СЕКЦИИ: SELECTED OBJECT ACTION CONTROLS
// ======================================================

// ======================================================
// СЕКЦИЯ: BUILD CONFIRM CONTROLS / КОНТРОЛЫ ПОДТВЕРЖДЕНИЯ СТРОИТЕЛЬСТВА
// РОЛЬ: создать confirm/cancel controls для placement flow.
// ВКЛЮЧАЕТ: createBuildConfirmPanel()
// ======================================================

// createBuildConfirmPanel(): создаёт build confirm panel и dispatch placement commands.
function createBuildConfirmPanel() {
  // ---------- PANEL ROOT CREATION ----------
  const panel = document.createElement("div");

  panel.id = "build-confirm-panel";

  applyFixedStyle(
    panel,
    getBuildPanelStyle()
  );

  // ---------- BUILD STATUS TEXT ----------
  const text = document.createElement("div");

  text.id = "build-confirm-text";

  text.style.color = "white";

  text.style.fontSize =
    uiLayout.compact
      ? "12px"
      : "14px";

  text.style.flex = "1";

  text.style.alignSelf = "center";

  text.style.minWidth = "0";

  text.style.overflow = "hidden";

  text.style.textOverflow = "ellipsis";

  text.style.whiteSpace = "nowrap";

  text.innerText =
    "Выбери клетку";

  // ---------- BUILD ACTION BUTTONS ----------
  const confirmButton = createUIButton(
    "Построить",
    "#2f6b3c",

    () => confirmBuild()
  );

  const cancelButton = createUIButton(
    "Отмена",
    "#8a2d2d",

    () => cancelBuildMode()
  );

  // ---------- DOM ATTACH ----------
  panel.appendChild(text);
  panel.appendChild(confirmButton);
  panel.appendChild(cancelButton);

  document.body.appendChild(panel);
}

// ======================================================
// КОНЕЦ СЕКЦИИ: BUILD CONFIRM CONTROLS / КОНТРОЛЫ ПОДТВЕРЖДЕНИЯ СТРОИТЕЛЬСТВА
// ======================================================
