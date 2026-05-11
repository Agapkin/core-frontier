// CORE FRONTIER — Stage 02.4.6-A1
// ui/controls.js — deterministic interaction controls

function createDynamicUI() {
  [
    "bottom-control-panel",
    "speed-panel",
    "zoom-panel",
    "tower-action-panel",
    "build-confirm-panel"
  ].forEach(removeElement);

  createBottomControlPanel();

  createSpeedControls();

  createZoomControls();

  createTowerActionPanel();

  createBuildConfirmPanel();

  updateDomVisibility();
}

// ---------- MAIN HUD ----------

function createBottomControlPanel() {
  const panel =
    document.createElement("div");

  panel.id =
    "bottom-control-panel";

  applyFixedStyle(panel, {
    left: "50%",
    bottom: uiLayout.compact
      ? "10px"
      : "14px",

    transform:
      "translateX(-50%)",

    display: "flex",

    gap: uiLayout.compact
      ? "6px"
      : "8px",

    padding: uiLayout.compact
      ? "8px"
      : "10px",

    borderRadius: "14px",

    background:
      "rgba(0,0,0,0.72)",

    zIndex: "20",

    maxWidth:
      "calc(100vw - 20px)"
  });

  // ---------- BUILD ----------

  const buildButton =
    createUIButton(
      uiLayout.compact
        ? "🏹"
        : "🏹 Башня",

      uiState.mode ===
      UI_MODES.BUILD
        ? "#d9a441"
        : "#2f6b3c",

      () => {
        if (
          uiState.mode ===
          UI_MODES.BUILD
        ) {
          cancelBuildMode();

          createDynamicUI();

          return;
        }

        enterBuildMode();

        createDynamicUI();
      }
    );

  // ---------- WAVE ----------

  const waveButton =
    createUIButton(
      uiLayout.compact
        ? "⚔️"
        : "⚔️ Бой",

      "#8a5a2b",

      () => {
        if (
          uiState.mode ===
            UI_MODES.MENU ||
          uiState.mode ===
            UI_MODES.CODEX
        ) {
          return;
        }

        startWave();
      }
    );

  // ---------- CODEX ----------

  const codexButton =
    createUIButton(
      uiLayout.compact
        ? "📘"
        : "📘 Codex",

      uiState.mode ===
      UI_MODES.CODEX
        ? "#d9a441"
        : "#33445f",

      () => {
        toggleCodex();

        createDynamicUI();
      }
    );

  // ---------- MENU ----------

  const menuButton =
    createUIButton(
      uiLayout.compact
        ? "☰"
        : "☰ Меню",

      uiState.mode ===
      UI_MODES.MENU
        ? "#d9a441"
        : "#444444",

      () => {
        toggleMenu();

        createDynamicUI();
      }
    );

  [
    buildButton,
    waveButton,
    codexButton,
    menuButton
  ].forEach(button => {
    panel.appendChild(button);
  });

  document.body.appendChild(panel);
}

// ---------- SPEED ----------

function createSpeedControls() {
  const panel =
    document.createElement("div");

  panel.id = "speed-panel";

  applyFixedStyle(panel, {
    right: "10px",

    top: uiLayout.compact
      ? "70px"
      : "90px",

    display: "flex",

    flexDirection:
      uiLayout.isLandscape
        ? "column"
        : "row",

    gap: "6px",

    padding: "6px",

    borderRadius: "12px",

    background:
      "rgba(0,0,0,0.72)",

    zIndex: "20"
  });

  [1, 2, 3].forEach(speed => {
    const button =
      createUIButton(
        "x" + speed,

        gameSpeed === speed
          ? "#d9a441"
          : "#2f6b3c",

        () => {
          gameSpeed = speed;

          updateUI();

          createDynamicUI();

          notify(
            "Скорость: x" +
              speed,
            "info"
          );
        }
      );

    panel.appendChild(button);
  });

  document.body.appendChild(panel);
}

// ---------- ZOOM ----------

function createZoomControls() {
  const panel =
    document.createElement("div");

  panel.id = "zoom-panel";

  applyFixedStyle(panel, {
    right: "10px",

    top: uiLayout.compact
      ? "150px"
      : "210px",

    display: "flex",

    flexDirection:
      uiLayout.isLandscape
        ? "column"
        : "row",

    gap: "6px",

    padding: "6px",

    borderRadius: "12px",

    background:
      "rgba(0,0,0,0.72)",

    zIndex: "20"
  });

  const minus =
    createUIButton(
      "−",
      "#33445f",

      () => {
        zoomAt(
          canvas.width / 2,
          canvas.height / 2,
          camera.zoom - 0.1
        );

        updateUI();
      }
    );

  const plus =
    createUIButton(
      "+",
      "#33445f",

      () => {
        zoomAt(
          canvas.width / 2,
          canvas.height / 2,
          camera.zoom + 0.1
        );

        updateUI();
      }
    );

  const reset =
    createUIButton(
      "⟲",
      "#444444",

      () => {
        resetZoom(true);

        updateUI();
      }
    );

  panel.appendChild(minus);
  panel.appendChild(plus);
  panel.appendChild(reset);

  document.body.appendChild(panel);
}

// ---------- BUILD PANEL ----------

function createBuildConfirmPanel() {
  const panel =
    document.createElement("div");

  panel.id =
    "build-confirm-panel";

  applyFixedStyle(panel, {
    left: "50%",

    bottom: uiLayout.compact
      ? "82px"
      : "96px",

    transform:
      "translateX(-50%)",

    display: "flex",

    alignItems: "center",

    gap: "6px",

    padding: uiLayout.compact
      ? "8px"
      : "10px",

    borderRadius: "12px",

    background:
      "rgba(0,0,0,0.82)",

    zIndex: "22",

    maxWidth:
      "calc(100vw - 20px)"
  });

  const text =
    document.createElement("div");

  text.id =
    "build-confirm-text";

  text.style.color = "white";

  text.style.fontSize =
    uiLayout.compact
      ? "11px"
      : "13px";

  text.style.minWidth =
    "120px";

  text.innerText =
    getBuildPanelText();

  const confirm =
    createUIButton(
      uiLayout.compact
        ? "✔"
        : "Построить",

      "#2f6b3c",

      () => {
        confirmBuild();
      }
    );

  const cancel =
    createUIButton(
      uiLayout.compact
        ? "✖"
        : "Отмена",

      "#8a2d2d",

      () => {
        cancelBuildMode();

        createDynamicUI();
      }
    );

  panel.appendChild(text);
  panel.appendChild(confirm);
  panel.appendChild(cancel);

  document.body.appendChild(panel);
}

// ---------- TOWER ACTIONS ----------

function createTowerActionPanel() {
  const panel =
    document.createElement("div");

  panel.id =
    "tower-action-panel";

  applyFixedStyle(panel, {
    left: "10px",

    bottom: uiLayout.compact
      ? "10px"
      : "14px",

    display: "flex",

    gap: "6px",

    padding: uiLayout.compact
      ? "8px"
      : "10px",

    borderRadius: "12px",

    background:
      "rgba(0,0,0,0.72)",

    zIndex: "21"
  });

  const sellButton =
    createUIButton(
      uiLayout.compact
        ? "💰"
        : "Продать",

      "#2f6b3c",

      () => {
        sellSelectedTower();
      }
    );

  const upgradeButton =
    createUIButton(
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

  panel.appendChild(
    sellButton
  );

  panel.appendChild(
    upgradeButton
  );

  document.body.appendChild(panel);
}