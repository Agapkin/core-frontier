// CORE FRONTIER — Stage 02.4.5
// ui/panels.js — menus, panels, HUD updates, info panels

function createMenuPanel() {
  const panel = document.createElement("div");
  panel.id = "menu-panel";

  applyFixedStyle(panel, getSidePanelStyle());

  const title = createPanelTitle("Меню");
  panel.appendChild(title);

  panel.appendChild(
    createSmallText("Сложность можно менять только до первой волны.")
  );

  Object.values(difficultyProfiles).forEach(profile => {
    const active = profile.id === gameState.difficulty;

    const button = createUIButton(
      profile.name,
      active ? "#d9a441" : "#33445f",
      () => {
        if (waveState.number > 0 || waveState.active) {
          notify("Сложность можно менять только до первой волны", "warning");
          return;
        }

        gameState.difficulty = profile.id;
        updateUI();
        createDynamicUI();
        notify("Сложность: " + profile.name, "info");
      }
    );

    button.style.width = "100%";
    button.style.marginTop = "6px";

    panel.appendChild(button);
  });

  const restartTitle = createSmallText("Опасная зона:");
  restartTitle.style.marginTop = "12px";
  panel.appendChild(restartTitle);

  const fullRestart = createUIButton(
    "Новая игра",
    "#8a2d2d",
    () => {
      restartGame();
      uiState.menuOpen = false;
    }
  );

  fullRestart.style.width = "100%";
  panel.appendChild(fullRestart);

  document.body.appendChild(panel);
}

function createGameOverPanel() {
  const panel = document.createElement("div");
  panel.id = "game-over-panel";

  applyFixedStyle(panel, {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    display: "none",
    padding: "18px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.88)",
    color: "white",
    textAlign: "center",
    minWidth: "280px",
    zIndex: "40"
  });

  const title = document.createElement("div");
  title.innerText = "БАЗА УНИЧТОЖЕНА";
  title.style.fontSize = "24px";
  title.style.fontWeight = "bold";
  title.style.marginBottom = "12px";

  const retry = createUIButton(
    "↩ Повторить волну",
    "#2f6b3c",
    () => retryLastWave()
  );

  retry.style.width = "100%";
  retry.style.marginBottom = "8px";

  const restart = createUIButton(
    "⟲ Новая игра",
    "#8a2d2d",
    () => restartGame()
  );

  restart.style.width = "100%";

  panel.appendChild(title);
  panel.appendChild(retry);
  panel.appendChild(restart);

  document.body.appendChild(panel);
}

function updateDomVisibility() {
  updateUILayout();

  const towerPanel = document.getElementById("tower-action-panel");

  if (towerPanel) {
    towerPanel.style.display =
      uiState.selectedTower && !gameState.gameOver
        ? "flex"
        : "none";
  }

  const buildPanel = document.getElementById("build-confirm-panel");

  if (buildPanel) {
    buildPanel.style.display =
      uiState.selectedMode === "tower" && !gameState.gameOver
        ? "flex"
        : "none";
  }

  const buildText = document.getElementById("build-confirm-text");

  if (buildText) {
    buildText.innerText = getBuildPanelText();
  }

  const menuPanel = document.getElementById("menu-panel");

  if (menuPanel) {
    menuPanel.style.display = uiState.menuOpen ? "block" : "none";
  }

  const gameOverPanel = document.getElementById("game-over-panel");

  if (gameOverPanel) {
    gameOverPanel.style.display = gameState.gameOver ? "block" : "none";
  }
}

function updateUI() {
  setText("wood", Math.floor(resources.wood));
  setText("stone", Math.floor(resources.stone));
  setText("food", Math.floor(resources.food));
  setText("hp", Math.max(0, Math.floor(base.hp)));
  setText("wave", waveState.number);
  setText("power", power.used + "/" + power.capacity);
  setText("difficulty", difficultyProfiles[gameState.difficulty].name);
  setText("zoom", Math.round(camera.zoom * 100) + "%");
}

function drawWaveStatus() {
  const remaining = enemies.length;
  const total = waveState.totalEnemies;

  const width = uiLayout.compact ? 230 : 330;
  const height = uiLayout.compact ? 54 : 72;

  const x = uiLayout.compact && uiLayout.landscape
    ? 70
    : 20;

  const y = uiLayout.hudHeight + 10;

  ctx.fillStyle = "rgba(0,0,0,0.62)";
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = "white";
  ctx.font = uiLayout.compact ? "12px Arial" : "16px Arial";

  ctx.fillText("Волна: " + waveState.number, x + 12, y + 18);

  ctx.fillText(
    "Статус: " + (waveState.active ? "идёт" : "подготовка"),
    x + 12,
    y + 36
  );

  if (!uiLayout.compact) {
    ctx.fillText(
      "Враги: " + remaining + " / " + total + " | Скорость: x" + gameSpeed,
      x + 12,
      y + 58
    );
  }
}

function drawSelectedTowerPanel() {
  if (!uiState.selectedTower) return;

  const tower = uiState.selectedTower;
  const towerType = towerTypes[tower.typeId];

  const width = uiLayout.compact ? 260 : 360;
  const height = uiLayout.compact ? 145 : 185;

  const x = uiLayout.compact && uiLayout.landscape
    ? 70
    : 20;

  const y = uiLayout.hudHeight + (uiLayout.compact ? 74 : 90);

  ctx.fillStyle = "rgba(0,0,0,0.72)";
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = "white";
  ctx.font = uiLayout.compact ? "12px Arial" : "16px Arial";

  ctx.fillText("Башня: " + towerType.name, x + 12, y + 24);
  ctx.fillText("Уровень: " + tower.level, x + 12, y + 46);
  ctx.fillText("Урон: " + tower.damage.toFixed(2), x + 12, y + 68);
  ctx.fillText("Радиус: " + tower.range, x + 12, y + 90);
  ctx.fillText("Энергия: " + towerType.powerUsage, x + 12, y + 112);

  ctx.fillStyle = "#999";
  ctx.fillText("Улучшение: нужна технология", x + 12, y + 134);
}

function drawInfoPanel() {
  if (!uiState.infoPanelOpen) return;

  const width = uiLayout.compact
    ? Math.min(320, canvas.width - 16)
    : 370;

  const x = uiLayout.compact
    ? 8
    : Math.max(12, canvas.width - width - 12);

  const y = uiLayout.hudHeight + 10;
  const height = Math.min(
    505,
    canvas.height - y - uiLayout.bottomHeight - 18
  );

  ctx.fillStyle = "rgba(0,0,0,0.88)";
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = "white";
  ctx.font = uiLayout.compact ? "15px Arial" : "18px Arial";
  ctx.fillText("Codex / Справка", x + 18, y + 30);

  ctx.font = uiLayout.compact ? "12px Arial" : "14px Arial";

  ctx.fillText("Башни:", x + 18, y + 62);

  Object.values(towerTypes).forEach((tower, index) => {
    const rowY = y + 84 + index * 64;

    ctx.fillText("- " + tower.name, x + 28, rowY);

    ctx.fillText(
      "Стоимость: " + tower.cost.wood + " | Энергия: " + tower.powerUsage,
      x + 28,
      rowY + 17
    );

    ctx.fillText(
      "Урон: " + tower.damage + " | Радиус: " + tower.range,
      x + 28,
      rowY + 34
    );
  });

  const enemyStart = y + 160;

  ctx.fillText("Враги:", x + 18, enemyStart);

  Object.values(enemyTypes).forEach((enemy, index) => {
    const rowY = enemyStart + 22 + index * 55;

    ctx.fillText("- " + enemy.name + " (" + enemy.class + ")", x + 28, rowY);

    ctx.fillText(
      "HP: " + enemy.hp + " | Скорость: " + enemy.speed,
      x + 28,
      rowY + 17
    );

    ctx.fillText(
      "Награда: " + enemy.reward.wood + " дерева",
      x + 28,
      rowY + 34
    );
  });

  if (!uiLayout.compact) {
    ctx.fillText("Механики:", x + 18, y + 425);
    ctx.fillText("- Retry Wave возвращает к подготовке", x + 28, y + 447);
    ctx.fillText("- Энергия ограничивает спам башен", x + 28, y + 469);
    ctx.fillText("- Zoom: кнопки +/- или pinch", x + 28, y + 491);
  }
}

function drawGameOver() {
  if (!gameState.gameOver) return;

  ctx.fillStyle = "rgba(0,0,0,0.66)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}