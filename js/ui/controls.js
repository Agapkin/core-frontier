// CORE FRONTIER — Stage 02.4.5
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

  applyFixedStyle(panel, getBottomPanelStyle());

  panel.appendChild(
    createUIButton(
      uiLayout.compact ? "🏹" : "🏹 Башня",
      "#2f6b3c",
      () => buildTower()
    )
  );

  panel.appendChild(
    createUIButton(
      uiLayout.compact ? "⚔️" : "⚔️ Волна",
      "#8a5a2b",
      () => startWave()
    )
  );

  panel.appendChild(
    createUIButton(
      uiLayout.compact ? "ℹ" : "ℹ Codex",
      "#33445f",
      () => {
        uiState.infoPanelOpen = !uiState.infoPanelOpen;

        if (uiState.infoPanelOpen) {
          uiState.menuOpen = false;
        }
      }
    )
  );

  panel.appendChild(
    createUIButton(
      uiLayout.compact ? "☰" : "☰ Меню",
      "#444444",
      () => {
        uiState.menuOpen = !uiState.menuOpen;

        if (uiState.menuOpen) {
          uiState.infoPanelOpen = false;
        }
      }
    )
  );

  document.body.appendChild(panel);
}

function createUtilityControls() {
  createSpeedControls();
  createZoomControls();
}

function createSpeedControls() {
  const panel = document.createElement("div");
  panel.id = "speed-panel";

  const bottomOffset = uiLayout.compact && uiLayout.landscape ? 8 : 72;

  applyFixedStyle(panel, getUtilityPanelStyle(bottomOffset));

  [1, 2, 3].forEach(speed => {
    const button = createUIButton(
      "x" + speed,
      speed === gameSpeed ? "#d9a441" : "#2f6b3c",
      () => {
        if (gameState.gameOver) return;

        gameSpeed = speed;
        createDynamicUI();
        notify("Скорость игры: x" + speed, "info");
      }
    );

    button.style.padding = uiLayout.compact ? "7px 8px" : "8px 10px";
    panel.appendChild(button);
  });

  document.body.appendChild(panel);
}

function createZoomControls() {
  const panel = document.createElement("div");
  panel.id = "zoom-panel";

  const compactLandscape = uiLayout.compact && uiLayout.landscape;

  const style = getUtilityPanelStyle(compactLandscape ? 8 : 116);
  style.right = compactLandscape ? "52px" : "8px";

  applyFixedStyle(panel, style);

  const minus = createUIButton(
    "−",
    "#33445f",
    () => zoomAt(canvas.width / 2, canvas.height / 2, camera.zoom - 0.12)
  );

  const plus = createUIButton(
    "+",
    "#33445f",
    () => zoomAt(canvas.width / 2, canvas.height / 2, camera.zoom + 0.12)
  );

  const reset = createUIButton(
    "100%",
    "#444444",
    () => zoomAt(canvas.width / 2, canvas.height / 2, 1)
  );

  [minus, plus, reset].forEach(button => {
    button.style.padding = uiLayout.compact ? "7px 8px" : "8px 10px";
    panel.appendChild(button);
  });

  document.body.appendChild(panel);
}

function createTowerActionPanel() {
  const panel = document.createElement("div");
  panel.id = "tower-action-panel";

  applyFixedStyle(panel, {
    left: "8px",
    bottom: uiLayout.compact && uiLayout.landscape ? "150px" : "72px",
    display: "none",
    gap: "6px",
    zIndex: "21"
  });

  panel.appendChild(
    createUIButton(
      "Продать",
      "#2f6b3c",
      () => sellSelectedTower()
    )
  );

  panel.appendChild(
    createUIButton(
      "Улучшить",
      "#555555",
      () => {
        notify("Улучшение недоступно: нужна технология", "warning");
      }
    )
  );

  document.body.appendChild(panel);
}

function createBuildConfirmPanel() {
  const panel = document.createElement("div");
  panel.id = "build-confirm-panel";

  applyFixedStyle(panel, getBuildPanelStyle());

  const text = document.createElement("div");
  text.id = "build-confirm-text";
  text.style.color = "white";
  text.style.fontSize = uiLayout.compact ? "12px" : "14px";
  text.style.flex = "1";
  text.style.alignSelf = "center";
  text.innerText = "Выбери клетку";

  panel.appendChild(text);

  panel.appendChild(
    createUIButton(
      "Построить",
      "#2f6b3c",
      () => confirmBuild()
    )
  );

  panel.appendChild(
    createUIButton(
      "Отмена",
      "#8a2d2d",
      () => cancelBuildMode()
    )
  );

  document.body.appendChild(panel);
}