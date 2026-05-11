// CORE FRONTIER — Stage 02.4.6-A1
// ui/panels.js — deterministic panels and visibility system

// ---------- MENU PANEL ----------

function createMenuPanel() {
  removeElement("menu-panel");

  const panel =
    document.createElement("div");

  panel.id = "menu-panel";

  applyFixedStyle(panel, {
    left: uiLayout.compact
      ? "10px"
      : "20px",

    top: uiLayout.compact
      ? "70px"
      : "90px",

    width: uiLayout.compact
      ? "260px"
      : "320px",

    maxWidth:
      "calc(100vw - 20px)",

    maxHeight:
      "70vh",

    overflowY: "auto",

    padding: uiLayout.compact
      ? "12px"
      : "16px",

    borderRadius: "14px",

    background:
      "rgba(0,0,0,0.88)",

    color: "white",

    zIndex: "40"
  });

  // ---------- TITLE ----------

  panel.appendChild(
    createPanelTitle("Меню")
  );

  panel.appendChild(
    createSmallText(
      "Сложность можно менять только до первой волны."
    )
  );

  // ---------- DIFFICULTIES ----------

  Object.values(
    difficultyProfiles
  ).forEach(profile => {
    const button =
      createUIButton(
        profile.name,

        gameState.difficulty ===
        profile.id
          ? "#d9a441"
          : "#33445f",

        () => {
          if (
            waveState.number > 0 ||
            waveState.active
          ) {
            notify(
              "Сложность можно менять только до первой волны",
              "warning"
            );

            return;
          }

          gameState.difficulty =
            profile.id;

          updateUI();

          notify(
            "Сложность: " +
              profile.name,
            "info"
          );
        }
      );

    button.style.width = "100%";

    button.style.marginTop =
      "6px";

    panel.appendChild(button);
  });

  // ---------- SYSTEM ----------

  const systemLabel =
    createSmallText("Система");

  systemLabel.style.marginTop =
    "14px";

  panel.appendChild(
    systemLabel
  );

  const restartButton =
    createUIButton(
      "⟲ Новая игра",

      "#8a2d2d",

      () => {
        restartGame();

        resetUIState();

        createDynamicUI();
      }
    );

  restartButton.style.width =
    "100%";

  restartButton.style.marginTop =
    "6px";

  panel.appendChild(
    restartButton
  );

  document.body.appendChild(
    panel
  );
}

// ---------- GAME OVER ----------

function createGameOverPanel() {
  removeElement(
    "game-over-panel"
  );

  const panel =
    document.createElement("div");

  panel.id =
    "game-over-panel";

  applyFixedStyle(panel, {
    left: "50%",
    top: "50%",

    transform:
      "translate(-50%, -50%)",

    padding: uiLayout.compact
      ? "14px"
      : "18px",

    borderRadius: "16px",

    background:
      "rgba(0,0,0,0.9)",

    color: "white",

    textAlign: "center",

    minWidth:
      uiLayout.compact
        ? "240px"
        : "300px",

    zIndex: "60"
  });

  const title =
    document.createElement("div");

  title.innerText =
    "БАЗА УНИЧТОЖЕНА";

  title.style.fontWeight =
    "bold";

  title.style.fontSize =
    uiLayout.compact
      ? "20px"
      : "24px";

  title.style.marginBottom =
    "14px";

  const retryButton =
    createUIButton(
      "↩ Повторить волну",

      "#2f6b3c",

      () => {
        retryLastWave();

        resetUIState();

        createDynamicUI();
      }
    );

  retryButton.style.width =
    "100%";

  retryButton.style.marginBottom =
    "8px";

  const restartButton =
    createUIButton(
      "⟲ Новая игра",

      "#8a2d2d",

      () => {
        restartGame();

        resetUIState();

        createDynamicUI();
      }
    );

  restartButton.style.width =
    "100%";

  panel.appendChild(title);

  panel.appendChild(
    retryButton
  );

  panel.appendChild(
    restartButton
  );

  document.body.appendChild(
    panel
  );
}

// ---------- VISIBILITY ----------

function updateDomVisibility() {
  const menuPanel =
    document.getElementById(
      "menu-panel"
    );

  if (menuPanel) {
    menuPanel.style.display =
      uiState.mode ===
      UI_MODES.MENU
        ? "block"
        : "none";
  }

  const buildPanel =
    document.getElementById(
      "build-confirm-panel"
    );

  if (buildPanel) {
    buildPanel.style.display =
      uiState.mode ===
      UI_MODES.BUILD
        ? "flex"
        : "none";
  }

  const towerPanel =
    document.getElementById(
      "tower-action-panel"
    );

  if (towerPanel) {
    towerPanel.style.display =
      uiState.selectedTower &&
      uiState.mode ===
        UI_MODES.IDLE
        ? "flex"
        : "none";
  }

  const gameOverPanel =
    document.getElementById(
      "game-over-panel"
    );

  if (gameOverPanel) {
    gameOverPanel.style.display =
      uiState.mode ===
      UI_MODES.GAME_OVER
        ? "block"
        : "none";
  }

  const buildText =
    document.getElementById(
      "build-confirm-text"
    );

  if (buildText) {
    buildText.innerText =
      getBuildPanelText();
  }
}

// ---------- HUD ----------

function updateUI() {
  setText(
    "wood",
    Math.floor(resources.wood)
  );

  setText(
    "stone",
    Math.floor(resources.stone)
  );

  setText(
    "food",
    Math.floor(resources.food)
  );

  setText(
    "power",
    power.used +
      "/" +
      power.capacity
  );

  setText(
    "hp",
    Math.max(
      0,
      Math.floor(base.hp)
    )
  );

  setText(
    "wave",
    waveState.number
  );

  setText(
    "difficulty",
    difficultyProfiles[
      gameState.difficulty
    ].name
  );

  setText(
    "zoom",
    Math.round(
      camera.zoom * 100
    ) + "%"
  );
}

// ---------- TOWER PANEL ----------

function drawSelectedTowerPanel() {
  if (
    !uiState.selectedTower ||
    uiState.mode !==
      UI_MODES.IDLE
  ) {
    return;
  }

  const tower =
    uiState.selectedTower;

  const type =
    towerTypes[
      tower.typeId
    ];

  const width =
    uiLayout.compact
      ? 230
      : 290;

  const height =
    uiLayout.compact
      ? 110
      : 138;

  const x = 12;

  const y =
    uiLayout.compact
      ? 88
      : 110;

  ctx.fillStyle =
    "rgba(0,0,0,0.7)";

  ctx.fillRect(
    x,
    y,
    width,
    height
  );

  ctx.fillStyle =
    "white";

  ctx.font =
    uiLayout.compact
      ? "11px Arial"
      : "14px Arial";

  ctx.fillText(
    type.name,
    x + 12,
    y + 22
  );

  ctx.fillText(
    "LVL " + tower.level,
    x + 12,
    y + 42
  );

  ctx.fillText(
    "DMG " +
      tower.damage.toFixed(1),
    x + 12,
    y + 62
  );

  ctx.fillText(
    "RNG " +
      tower.range,
    x + 12,
    y + 82
  );

  ctx.fillStyle =
    "#aaaaaa";

  ctx.fillText(
    "Улучшения позже",
    x + 12,
    y + 102
  );
}

// ---------- CODEX ----------

function drawInfoPanel() {
  if (
    uiState.mode !==
    UI_MODES.CODEX
  ) {
    return;
  }

  const width =
    uiLayout.compact
      ? Math.min(
          canvas.width - 20,
          300
        )
      : 360;

  const height =
    uiLayout.compact
      ? Math.min(
          canvas.height - 100,
          360
        )
      : 480;

  const x =
    canvas.width -
    width -
    10;

  const y =
    uiLayout.compact
      ? 56
      : 76;

  ctx.fillStyle =
    "rgba(0,0,0,0.9)";

  ctx.fillRect(
    x,
    y,
    width,
    height
  );

  ctx.fillStyle =
    "white";

  ctx.font =
    uiLayout.compact
      ? "15px Arial"
      : "18px Arial";

  ctx.fillText(
    "📘 Codex",
    x + 14,
    y + 24
  );

  ctx.font =
    uiLayout.compact
      ? "11px Arial"
      : "13px Arial";

  let lineY = y + 48;

  ctx.fillText(
    "⚔️ Начни бой кнопкой Бой",
    x + 14,
    lineY
  );

  lineY += 24;

  ctx.fillText(
    "🏹 Строй башни",
    x + 14,
    lineY
  );

  lineY += 24;

  ctx.fillText(
    "🛡️ Защити базу",
    x + 14,
    lineY
  );
}

// ---------- GAME OVER OVERLAY ----------

function drawGameOver() {
  if (
    uiState.mode !==
    UI_MODES.GAME_OVER
  ) {
    return;
  }

  ctx.fillStyle =
    "rgba(0,0,0,0.65)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
}