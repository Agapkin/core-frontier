// CORE FRONTIER — Stage 02.4.6-A
// ui/panels.js — compact HUD panels and overlays

function createMenuPanel() {
  const panel = document.createElement("div");

  panel.id = "menu-panel";

  applyFixedStyle(
    panel,
    getSidePanelStyle()
  );

  const title =
    createPanelTitle("Меню");

  panel.appendChild(title);

  panel.appendChild(
    createSmallText(
      "Сложность можно менять только до первой волны."
    )
  );

  Object.values(difficultyProfiles).forEach(
    profile => {
      const active =
        profile.id ===
        gameState.difficulty;

      const button = createUIButton(
        profile.name,

        active
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
          createDynamicUI();

          notify(
            "Сложность: " +
              profile.name,
            "info"
          );
        }
      );

      button.style.width = "100%";
      button.style.marginTop = "6px";

      panel.appendChild(button);
    }
  );

  const restartTitle =
    createSmallText("Система");

  restartTitle.style.marginTop = "12px";

  panel.appendChild(restartTitle);

  const restartButton =
    createUIButton(
      "⟲ Новая игра",
      "#8a2d2d",

      () => {
        restartGame();
        uiState.menuOpen = false;
      }
    );

  restartButton.style.width = "100%";

  panel.appendChild(restartButton);

  document.body.appendChild(panel);
}

// ---------- GAME OVER ----------

function createGameOverPanel() {
  const panel = document.createElement("div");

  panel.id = "game-over-panel";

  applyFixedStyle(panel, {
    left: "50%",
    top: "50%",

    transform:
      "translate(-50%, -50%)",

    display: "none",

    padding:
      uiLayout.compact
        ? "14px"
        : "18px",

    borderRadius: "14px",

    background: "rgba(0,0,0,0.88)",

    color: "white",

    textAlign: "center",

    minWidth:
      uiLayout.compact
        ? "240px"
        : "280px",

    maxWidth: "92vw",

    zIndex: "40"
  });

  const title =
    document.createElement("div");

  title.innerText =
    "БАЗА УНИЧТОЖЕНА";

  title.style.fontSize =
    uiLayout.compact
      ? "20px"
      : "24px";

  title.style.fontWeight = "bold";

  title.style.marginBottom = "12px";

  const retryButton =
    createUIButton(
      "↩ Повторить",
      "#2f6b3c",

      () => retryLastWave()
    );

  retryButton.style.width = "100%";
  retryButton.style.marginBottom = "8px";

  const restartButton =
    createUIButton(
      "⟲ Новая игра",
      "#8a2d2d",

      () => restartGame()
    );

  restartButton.style.width = "100%";

  panel.appendChild(title);
  panel.appendChild(retryButton);
  panel.appendChild(restartButton);

  document.body.appendChild(panel);
}

// ---------- DOM VISIBILITY ----------

function updateDomVisibility() {
  const towerPanel =
    document.getElementById(
      "tower-action-panel"
    );

  if (towerPanel) {
    towerPanel.style.display =
      uiState.selectedTower &&
      !gameState.gameOver
        ? "flex"
        : "none";
  }

  const buildPanel =
    document.getElementById(
      "build-confirm-panel"
    );

  if (buildPanel) {
    buildPanel.style.display =
      uiState.selectedMode ===
        "tower" &&
      !gameState.gameOver
        ? "flex"
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

  const menuPanel =
    document.getElementById(
      "menu-panel"
    );

  if (menuPanel) {
    menuPanel.style.display =
      uiState.menuOpen
        ? "block"
        : "none";
  }

  const gameOverPanel =
    document.getElementById(
      "game-over-panel"
    );

  if (gameOverPanel) {
    gameOverPanel.style.display =
      gameState.gameOver
        ? "block"
        : "none";
  }

  updateCompactWaveHUD();
}

// ---------- HUD TEXT ----------

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
    "power",
    power.used +
      "/" +
      power.capacity
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

  updateCompactWaveHUD();
}

function updateCompactWaveHUD() {
  const wave =
    document.getElementById(
      "compact-wave-text"
    );

  const enemies =
    document.getElementById(
      "compact-enemies-text"
    );

  const speed =
    document.getElementById(
      "compact-speed-text"
    );

  if (wave) {
    wave.innerText =
      "🌊 " + waveState.number;
  }

  if (enemies) {
    enemies.innerText =
      "👾 " +
      enemiesAlive() +
      "/" +
      waveState.totalEnemies;
  }

  if (speed) {
    speed.innerText =
      "⏩ x" + gameSpeed;
  }
}

// ---------- SELECTED TOWER ----------

function drawSelectedTowerPanel() {
  if (!uiState.selectedTower) return;

  const tower =
    uiState.selectedTower;

  const towerType =
    towerTypes[tower.typeId];

  const width =
    uiLayout.compact
      ? 230
      : 300;

  const height =
    uiLayout.compact
      ? 118
      : 150;

  const x = 12;

  const y =
    uiLayout.compact
      ? 108
      : 130;

  ctx.fillStyle =
    "rgba(0,0,0,0.68)";

  ctx.fillRect(
    x,
    y,
    width,
    height
  );

  ctx.fillStyle = "white";

  ctx.font =
    uiLayout.compact
      ? "11px Arial"
      : "14px Arial";

  ctx.fillText(
    towerType.name,
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
    "RNG " + tower.range,
    x + 12,
    y + 82
  );

  ctx.fillStyle = "#aaa";

  ctx.fillText(
    "Улучшения позже",
    x + 12,
    y + 104
  );
}

// ---------- CODEX ----------

function drawInfoPanel() {
  if (!uiState.infoPanelOpen) return;

  const compact =
    uiLayout.compact;

  const width = compact
    ? Math.min(
        canvas.width - 20,
        300
      )
    : 360;

  const height = compact
    ? Math.min(
        canvas.height - 120,
        360
      )
    : 480;

  const x =
    canvas.width -
    width -
    10;

  const y =
    compact
      ? 54
      : 74;

  ctx.fillStyle =
    "rgba(0,0,0,0.88)";

  ctx.fillRect(
    x,
    y,
    width,
    height
  );

  ctx.fillStyle = "white";

  ctx.font =
    compact
      ? "15px Arial"
      : "18px Arial";

  ctx.fillText(
    "📘 Codex",
    x + 14,
    y + 24
  );

  ctx.font =
    compact
      ? "11px Arial"
      : "13px Arial";

  let lineY = y + 48;

  ctx.fillText(
    "Башни:",
    x + 14,
    lineY
  );

  lineY += compact
    ? 18
    : 24;

  Object.values(towerTypes).forEach(
    tower => {
      ctx.fillText(
        tower.name +
          " | ⚡ " +
          tower.powerUsage,
        x + 18,
        lineY
      );

      lineY += compact
        ? 16
        : 20;
    }
  );

  lineY += compact
    ? 8
    : 12;

  ctx.fillText(
    "Враги:",
    x + 14,
    lineY
  );

  lineY += compact
    ? 18
    : 24;

  Object.values(enemyTypes).forEach(
    enemy => {
      ctx.fillText(
        enemy.name +
          " | HP " +
          enemy.hp,
        x + 18,
        lineY
      );

      lineY += compact
        ? 16
        : 20;
    }
  );

  lineY += compact
    ? 10
    : 14;

  ctx.fillStyle = "#aaa";

  ctx.fillText(
    "Построй башни и защити базу",
    x + 14,
    lineY
  );

  lineY += compact
    ? 16
    : 20;

  ctx.fillText(
    "⚔ запускает волну врагов",
    x + 14,
    lineY
  );
}

// ---------- GAME OVER OVERLAY ----------

function drawGameOver() {
  if (!gameState.gameOver) return;

  ctx.fillStyle =
    "rgba(0,0,0,0.66)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
}