// CORE FRONTIER — Stage 02.4.5-A
// ui/controls.js — gameplay controls and action panels

function createDynamicUI() {
  updateUILayout();

  [
    "bottom-control-panel",
    "speed-panel",
    "zoom-panel",
    "tower-action-panel",
    "build-confirm-panel",
    "menu-panel",
    "game-over-panel"
  ].forEach(removeElement);

  createBottomControlPanel();
  createUtilityControls();
  createTowerActionPanel();
  createBuildConfirmPanel();
  createMenuPanel();
  createGameOverPanel();

  updateTopbarVisibility();
}

function createBottomControlPanel() {
  const panel = document.createElement("div");

  panel.id = "bottom-control-panel";

  applyFixedStyle(
    panel,
    getBottomPanelStyle()
  );

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

  panel.appendChild(buildButton);
  panel.appendChild(waveButton);
  panel.appendChild(codexButton);
  panel.appendChild(menuButton);

  document.body.appendChild(panel);
}

function createUtilityControls() {
  createSpeedControls();
  createZoomControls();
}

function createSpeedControls() {
  const panel = document.createElement("div");

  panel.id = "speed-panel";

  applyFixedStyle(
    panel,
    getSpeedPanelStyle()
  );

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

  document.body.appendChild(panel);
}

function createZoomControls() {
  const panel = document.createElement("div");

  panel.id = "zoom-panel";

  applyFixedStyle(
    panel,
    getZoomPanelStyle()
  );

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

  document.body.appendChild(panel);
}

function createTowerActionPanel() {
  const panel = document.createElement("div");

  panel.id = "tower-action-panel";

  applyFixedStyle(
    panel,
    getTowerActionPanelStyle()
  );

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

  panel.appendChild(sellButton);
  panel.appendChild(upgradeButton);

  document.body.appendChild(panel);
}

function createBuildConfirmPanel() {
  const panel = document.createElement("div");

  panel.id = "build-confirm-panel";

  applyFixedStyle(
    panel,
    getBuildPanelStyle()
  );

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

  panel.appendChild(text);
  panel.appendChild(confirmButton);
  panel.appendChild(cancelButton);

  document.body.appendChild(panel);
}