// CORE FRONTIER — Stage 02.4.6-A
// ui/controls.js — compact HUD controls and gameplay actions

function createDynamicUI() {
  updateUILayout();

  [
    "bottom-control-panel",
    "speed-panel",
    "zoom-panel",
    "tower-action-panel",
    "build-confirm-panel",
    "menu-panel",
    "game-over-panel",
    "compact-wave-panel"
  ].forEach(removeElement);

  createBottomControlPanel();
  createUtilityControls();
  createTowerActionPanel();
  createBuildConfirmPanel();
  createCompactWavePanel();
  createMenuPanel();
  createGameOverPanel();

  updateTopbarVisibility();
}

// ---------- MAIN ACTIONS ----------

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
      ? "⚔"
      : "⚔ Волна",

    "#8a5a2b",

    () => startWave()
  );

  const codexButton = createUIButton(
    uiLayout.compact
      ? "📘"
      : "📘 Codex",

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

  [
    buildButton,
    waveButton,
    codexButton,
    menuButton
  ].forEach(button => {
    button.style.minWidth =
      uiLayout.compact
        ? "44px"
        : "unset";

    panel.appendChild(button);
  });

  document.body.appendChild(panel);
}

// ---------- SPEED / ZOOM ----------

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
        ? "6px 8px"
        : "8px 10px";

    button.style.fontSize =
      uiLayout.compact
        ? "11px"
        : "13px";

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
        ? "6px 8px"
        : "8px 10px";

    button.style.fontSize =
      uiLayout.compact
        ? "11px"
        : "13px";

    panel.appendChild(button);
  });

  document.body.appendChild(panel);
}

// ---------- BUILD ----------

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
      ? "11px"
      : "13px";

  text.style.flex = "1";

  text.style.alignSelf = "center";

  text.style.minWidth = "0";

  text.style.overflow = "hidden";

  text.style.textOverflow = "ellipsis";

  text.style.whiteSpace = "nowrap";

  text.innerText =
    "Выбери клетку";

  const confirmButton = createUIButton(
    uiLayout.compact
      ? "✔"
      : "Построить",

    "#2f6b3c",

    () => confirmBuild()
  );

  const cancelButton = createUIButton(
    uiLayout.compact
      ? "✖"
      : "Отмена",

    "#8a2d2d",

    () => cancelBuildMode()
  );

  panel.appendChild(text);
  panel.appendChild(confirmButton);
  panel.appendChild(cancelButton);

  document.body.appendChild(panel);
}

// ---------- TOWER PANEL ----------

function createTowerActionPanel() {
  const panel = document.createElement("div");

  panel.id = "tower-action-panel";

  applyFixedStyle(
    panel,
    getTowerActionPanelStyle()
  );

  const sellButton = createUIButton(
    uiLayout.compact
      ? "💰"
      : "Продать",

    "#2f6b3c",

    () => sellSelectedTower()
  );

  const upgradeButton = createUIButton(
    uiLayout.compact
      ? "🔒"
      : "Улучшить",

    "#555555",

    () => {
      notify(
        "Улучшения пока недоступны",
        "warning"
      );
    }
  );

  panel.appendChild(sellButton);
  panel.appendChild(upgradeButton);

  document.body.appendChild(panel);
}

// ---------- COMPACT WAVE HUD ----------

function createCompactWavePanel() {
  const panel = document.createElement("div");

  panel.id = "compact-wave-panel";

  applyFixedStyle(
    panel,
    getCompactWavePanelStyle()
  );

  panel.style.color = "white";

  panel.style.fontSize =
    uiLayout.compact
      ? "11px"
      : "13px";

  panel.style.pointerEvents = "none";

  const wave = document.createElement("div");

  wave.id = "compact-wave-text";

  const enemies = document.createElement("div");

  enemies.id = "compact-enemies-text";

  const speed = document.createElement("div");

  speed.id = "compact-speed-text";

  panel.appendChild(wave);
  panel.appendChild(enemies);
  panel.appendChild(speed);

  document.body.appendChild(panel);
}