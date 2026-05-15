// CORE FRONTIER — UI Panels
// КАРТА ФАЙЛА ДЛЯ AI
// ФАЙЛ: js/ui/panels.js
// РОЛЬ: DOM panels, HUD text updates и canvas overlay panels.
// СТАТУС: UI semantic layer; часть panels всё ещё tower-specific, generic object panel system НЕ реализован.
// ВЛАДЕЕТ: createMenuPanel(), createGameOverPanel(), updateDomVisibility(), updateUI(), drawWaveStatus(), drawSelectedTowerPanel(), drawInfoPanel(), drawGameOver()
// НЕ ВЛАДЕЕТ: gameplay logic, placement validation, tower combat, wave lifecycle, reward system, render world/entities.
// ЧИТАЕТ: uiState, gameState, waveState, resources, base, power, camera, gameSpeed, difficultyProfiles, towerTypes, enemyTypes, enemies, uiLayout, canvas.
// ИЗМЕНЯЕТ: DOM panel visibility/text, menu difficulty selection, canvas overlay drawing.
// ИСПОЛЬЗУЕТСЯ В: createDynamicUI(), game render/update flow, runtime UI refresh.
// RUNTIME-КОНТРАКТ: файл должен загружаться после ui helpers/layout/controls и после runtime systems files.
// НЕЛЬЗЯ: менять UI lifecycle или gameplay callbacks без отдельного inspection pass.

// ======================================================
// СЕКЦИЯ: DOM PANEL CREATION / СОЗДАНИЕ DOM-ПАНЕЛЕЙ
// РОЛЬ: создать persistent DOM panels и привязать UI callbacks.
// ВКЛЮЧАЕТ: createMenuPanel(), createGameOverPanel()
// ======================================================

// createMenuPanel(): создаёт menu panel и difficulty/new game controls.
// ТОЧКА РОСТА: menu panel может позже стать entrypoint для nested menus/subpanels.
// ВАЖНО: nested menu system пока НЕ реализована.
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
    createSmallText("Опасная зона:");

  restartTitle.style.marginTop = "12px";

  panel.appendChild(restartTitle);

  const restartButton =
    createUIButton(
      "Новая игра",
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

// createGameOverPanel(): создаёт DOM panel для retry/new game после game over.
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
      "↩ Повторить волну",
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

// ======================================================
// КОНЕЦ СЕКЦИИ: DOM PANEL CREATION / СОЗДАНИЕ DOM-ПАНЕЛЕЙ
// ======================================================

// ======================================================
// СЕКЦИЯ: DOM VISIBILITY / HUD TEXT UPDATE
// РОЛЬ: синхронизировать DOM panels и HUD text с runtime state.
// ВКЛЮЧАЕТ: updateDomVisibility(), updateUI()
// ======================================================

// updateDomVisibility(): показывает/скрывает DOM panels на основе uiState/gameState.
// ТОЧКА РОСТА: visibility может позже учитывать category/object-specific panels.
// ВАЖНО: generic panel visibility system пока НЕ реализована.
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
}

// updateUI(): обновляет HUD text values без изменения gameplay state.
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
}

// ======================================================
// КОНЕЦ СЕКЦИИ: DOM VISIBILITY / HUD TEXT UPDATE
// ======================================================

// ======================================================
// СЕКЦИЯ: CANVAS HUD OVERLAYS / CANVAS-ПАНЕЛИ
// РОЛЬ: рисовать runtime status, selected tower info, codex и game over overlay.
// ВКЛЮЧАЕТ: drawWaveStatus(), drawSelectedTowerPanel(), drawInfoPanel(), drawGameOver()
// ======================================================

// drawWaveStatus(): рисует canvas HUD со статусом волны и speed.
function drawWaveStatus() {
  const remaining =
    enemies.length;

  const total =
    waveState.totalEnemies;

  const width =
    uiLayout.compact
      ? 250
      : 330;

  const height =
    uiLayout.compact
      ? 62
      : 72;

  const x = 20;

  const y =
    uiLayout.compact
      ? 70
      : 78;

  ctx.fillStyle =
    "rgba(0,0,0,0.62)";

  ctx.fillRect(
    x,
    y,
    width,
    height
  );

  ctx.fillStyle = "white";

  ctx.font =
    uiLayout.compact
      ? "13px Arial"
      : "16px Arial";

  ctx.fillText(
    "Волна: " +
      waveState.number,
    x + 14,
    y + 22
  );

  ctx.fillText(
    "Статус: " +
      (waveState.active
        ? "идёт"
        : "подготовка"),
    x + 14,
    y + 42
  );

  ctx.fillText(
    "Враги: " +
      remaining +
      " / " +
      total +
      " | x" +
      gameSpeed,
    x + 14,
    y + 60
  );
}

// drawSelectedTowerPanel(): рисует canvas info panel для выбранной tower.
// ТОЧКА РОСТА: current tower-specific UI; future selected object panel candidate.
// ВАЖНО: generic object panel system пока НЕ реализован.
function drawSelectedTowerPanel() {
  if (!uiState.selectedTower) return;

  const tower =
    uiState.selectedTower;

  const towerType =
    towerTypes[tower.typeId];

  const width =
    uiLayout.compact
      ? 270
      : 360;

  const height =
    uiLayout.compact
      ? 155
      : 185;

  const x = 20;

  const y =
    uiLayout.compact
      ? 140
      : 160;

  ctx.fillStyle =
    "rgba(0,0,0,0.72)";

  ctx.fillRect(
    x,
    y,
    width,
    height
  );

  ctx.fillStyle = "white";

  ctx.font =
    uiLayout.compact
      ? "13px Arial"
      : "16px Arial";

  ctx.fillText(
    "Башня: " +
      towerType.name,
    x + 14,
    y + 24
  );

  ctx.fillText(
    "Уровень: " +
      tower.level,
    x + 14,
    y + 46
  );

  ctx.fillText(
    "Урон: " +
      tower.damage.toFixed(2),
    x + 14,
    y + 68
  );

  ctx.fillText(
    "Радиус: " +
      tower.range,
    x + 14,
    y + 90
  );

  ctx.fillText(
    "Энергия: " +
      towerType.powerUsage,
    x + 14,
    y + 112
  );

  ctx.fillStyle = "#999";

  ctx.fillText(
    "Улучшения: нужны технологии",
    x + 14,
    y + 138
  );
}

// drawInfoPanel(): рисует canvas codex/info panel с tower/enemy справкой.
// ТОЧКА РОСТА: codex может позже стать categorized encyclopedia для objects/enemies/resources.
// ВАЖНО: categorized codex system пока НЕ реализована.
function drawInfoPanel() {
  if (!uiState.infoPanelOpen) return;

  const compact =
    uiLayout.compact;

  const width = compact
    ? Math.min(
        canvas.width - 20,
        320
      )
    : Math.min(
        canvas.width - 24,
        370
      );

  const height = compact
    ? Math.min(
        canvas.height - 120,
        420
      )
    : 505;

  const x =
    canvas.width -
    width -
    10;

  const y =
    compact
      ? 64
      : 78;

  ctx.fillStyle =
    "rgba(0,0,0,0.88)";

  ctx.fillRect(
    x,
    y,
    width,
    height
  );

  ctx.fillStyle = "white";

  ctx.font = compact
    ? "16px Arial"
    : "18px Arial";

  ctx.fillText(
    "Codex / Справка",
    x + 14,
    y + 28
  );

  ctx.font = compact
    ? "11px Arial"
    : "14px Arial";

  let lineY = y + 56;

  ctx.fillText(
    "Башни:",
    x + 14,
    lineY
  );

  lineY += compact
    ? 20
    : 26;

  Object.values(towerTypes).forEach(
    tower => {
      ctx.fillText(
        "- " + tower.name,
        x + 20,
        lineY
      );

      lineY += compact
        ? 16
        : 20;

      ctx.fillText(
        "  🌲 " +
          tower.cost.wood +
          " | ⚡ " +
          tower.powerUsage,
        x + 20,
        lineY
      );

      lineY += compact
        ? 16
        : 20;

      ctx.fillText(
        "  DMG " +
          tower.damage +
          " | RNG " +
          tower.range,
        x + 20,
        lineY
      );

      lineY += compact
        ? 24
        : 34;
    }
  );

  ctx.fillText(
    "Враги:",
    x + 14,
    lineY
  );

  lineY += compact
    ? 20
    : 26;

  Object.values(enemyTypes).forEach(
    enemy => {
      ctx.fillText(
        "- " + enemy.name,
        x + 20,
        lineY
      );

      lineY += compact
        ? 16
        : 20;

      ctx.fillText(
        "  HP " +
          enemy.hp +
          " | SPD " +
          enemy.speed,
        x + 20,
        lineY
      );

      lineY += compact
        ? 16
        : 20;

      ctx.fillText(
        "  🌲 +" +
          enemy.reward.wood,
        x + 20,
        lineY
      );

      lineY += compact
        ? 24
        : 32;
    }
  );

  if (!compact) {
    ctx.fillText(
      "Механики:",
      x + 14,
      lineY
    );

    lineY += 24;

    ctx.fillText(
      "- Retry Wave возвращает к подготовке",
      x + 20,
      lineY
    );

    lineY += 20;

    ctx.fillText(
      "- Энергия ограничивает спам башен",
      x + 20,
      lineY
    );

    lineY += 20;

    ctx.fillText(
      "- Zoom: pinch или кнопки",
      x + 20,
      lineY
    );
  }
}

// drawGameOver(): рисует затемнение canvas при game over.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: CANVAS HUD OVERLAYS / CANVAS-ПАНЕЛИ
// ======================================================
