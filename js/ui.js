// CORE FRONTIER — Stage 02.4.4
// ui.js — responsive mobile HUD, panels, Codex, notifications and drawing

function setupInitialDom() {
  const oldButtons = document.querySelector(".buttons");
  if (oldButtons) oldButtons.style.display = "none";

  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  topbar.innerHTML = "";
  topbar.classList.add("cf-topbar");

  ensureTopbarChip("wood-chip", "🌲<span id='wood'>0</span>");
  ensureTopbarChip("stone-chip", "🪨<span id='stone'>0</span>");
  ensureTopbarChip("food-chip", "🍖<span id='food'>0</span>");
  ensureTopbarChip("hp-chip", "❤️<span id='hp'>0</span>");
  ensureTopbarChip("power-chip", "⚡<span id='power'>0/10</span>");
  ensureTopbarChip("wave-chip", "🌊<span id='wave'>0</span>");
  ensureTopbarChip("difficulty-chip", "🎚<span id='difficulty'>Нормальная</span>");
}

function ensureTopbarChip(id, html) {
  const topbar = document.querySelector(".topbar");
  if (!topbar || document.getElementById(id)) return;

  const chip = document.createElement("div");
  chip.className = "resource cf-chip";
  chip.id = id;
  chip.innerHTML = html;
  topbar.appendChild(chip);
}

function createDynamicUI() {
  [
    "bottom-control-panel",
    "utility-control-panel",
    "tower-action-panel",
    "build-confirm-panel",
    "menu-panel",
    "game-over-panel"
  ].forEach(removeElement);

  document.body.classList.toggle("cf-compact", uiLayout.compact);
  document.body.classList.toggle("cf-portrait", uiLayout.isPortrait);
  document.body.classList.toggle("cf-landscape", uiLayout.isLandscape);

  createBottomControlPanel();
  createUtilityControls();
  createTowerActionPanel();
  createBuildConfirmPanel();
  createMenuPanel();
  createGameOverPanel();
  updateTopbarVisibility();
}

function removeElement(id) {
  const element = document.getElementById(id);
  if (element) element.remove();
}

function createBottomControlPanel() {
  const panel = document.createElement("div");
  panel.id = "bottom-control-panel";
  applyFixedStyle(panel, getBottomPanelStyle());

  const compact = uiLayout.compact;

  panel.appendChild(createUIButton(compact ? "🏹" : "🏹 Башня", "#2f6b3c", () => buildTower()));
  panel.appendChild(createUIButton(compact ? "⚔️" : "⚔️ Волна", "#8a5a2b", () => startWave()));
  panel.appendChild(createUIButton(compact ? "ℹ" : "ℹ Codex", "#33445f", () => {
    uiState.infoPanelOpen = !uiState.infoPanelOpen;
    if (uiState.infoPanelOpen) uiState.menuOpen = false;
  }));
  panel.appendChild(createUIButton(compact ? "☰" : "☰ Меню", "#444444", () => {
    uiState.menuOpen = !uiState.menuOpen;
    if (uiState.menuOpen) uiState.infoPanelOpen = false;
  }));

  document.body.appendChild(panel);
}

function getBottomPanelStyle() {
  const base = {
    zIndex: "30",
    display: "flex",
    gap: uiLayout.compact ? "6px" : "8px",
    padding: uiLayout.compact ? "6px" : "8px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.42)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)"
  };

  if (uiLayout.isLandscape && uiLayout.isMobile) {
    return {
      ...base,
      right: "calc(8px + env(safe-area-inset-right))",
      bottom: "calc(8px + env(safe-area-inset-bottom))"
    };
  }

  return {
    ...base,
    left: "calc(8px + env(safe-area-inset-left))",
    right: "calc(8px + env(safe-area-inset-right))",
    bottom: "calc(8px + env(safe-area-inset-bottom))"
  };
}

function createUtilityControls() {
  const panel = document.createElement("div");
  panel.id = "utility-control-panel";
  applyFixedStyle(panel, getUtilityPanelStyle());

  const zoomOut = createUIButton("−", "#33445f", () => zoomAt(canvas.width / 2, canvas.height / 2, camera.zoom - 0.12));
  const zoomIn = createUIButton("+", "#33445f", () => zoomAt(canvas.width / 2, canvas.height / 2, camera.zoom + 0.12));
  const zoomReset = createUIButton(Math.round(camera.zoom * 100) + "%", "#444444", () => zoomAt(canvas.width / 2, canvas.height / 2, 1));

  [zoomOut, zoomIn, zoomReset].forEach(button => {
    button.style.padding = uiLayout.compact ? "7px 9px" : "8px 10px";
    panel.appendChild(button);
  });

  [1, 2, 3].forEach(speed => {
    const button = createUIButton("x" + speed, speed === gameSpeed ? "#d9a441" : "#2f6b3c", () => {
      if (gameState.gameOver) return;

      gameSpeed = speed;
      createDynamicUI();
      notify("Скорость игры: x" + speed, "info");
    });

    button.style.padding = uiLayout.compact ? "7px 9px" : "8px 10px";
    panel.appendChild(button);
  });

  document.body.appendChild(panel);
}

function getUtilityPanelStyle() {
  const base = {
    zIndex: "28",
    display: "flex",
    gap: uiLayout.compact ? "5px" : "6px",
    padding: uiLayout.compact ? "5px" : "6px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.38)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)"
  };

  if (uiLayout.isLandscape && uiLayout.isMobile) {
    return {
      ...base,
      right: "calc(8px + env(safe-area-inset-right))",
      top: "calc(48px + env(safe-area-inset-top))"
    };
  }

  return {
    ...base,
    right: "calc(8px + env(safe-area-inset-right))",
    bottom: uiLayout.compact
      ? "calc(64px + env(safe-area-inset-bottom))"
      : "calc(82px + env(safe-area-inset-bottom))"
  };
}

function createTowerActionPanel() {
  const panel = document.createElement("div");
  panel.id = "tower-action-panel";
  applyFixedStyle(panel, {
    left: "calc(8px + env(safe-area-inset-left))",
    bottom: uiLayout.compact
      ? "calc(64px + env(safe-area-inset-bottom))"
      : "calc(82px + env(safe-area-inset-bottom))",
    display: "none",
    gap: "6px",
    zIndex: "31"
  });

  panel.appendChild(createUIButton(uiLayout.compact ? "Продать" : "Продать башню", "#2f6b3c", () => sellSelectedTower()));
  panel.appendChild(createUIButton("Улучшить", "#555555", () => {
    notify("Улучшение недоступно: нужна технология", "warning");
  }));

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
  text.style.whiteSpace = "nowrap";
  text.style.overflow = "hidden";
  text.style.textOverflow = "ellipsis";
  text.innerText = "Выбери клетку";

  panel.appendChild(text);
  panel.appendChild(createUIButton(uiLayout.compact ? "✓" : "Построить", "#2f6b3c", () => confirmBuild()));
  panel.appendChild(createUIButton(uiLayout.compact ? "×" : "Отмена", "#8a2d2d", () => cancelBuildMode()));

  document.body.appendChild(panel);
}

function getBuildPanelStyle() {
  return {
    left: "calc(8px + env(safe-area-inset-left))",
    right: "calc(8px + env(safe-area-inset-right))",
    bottom: uiLayout.compact
      ? "calc(64px + env(safe-area-inset-bottom))"
      : "calc(82px + env(safe-area-inset-bottom))",
    display: "none",
    gap: "6px",
    zIndex: "32",
    padding: uiLayout.compact ? "6px" : "8px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.76)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)"
  };
}

function createMenuPanel() {
  const panel = document.createElement("div");
  panel.id = "menu-panel";
  applyFixedStyle(panel, getSidePanelStyle());

  const title = createPanelTitle("Меню");
  panel.appendChild(title);
  panel.appendChild(createSmallText("Сложность можно менять только до первой волны."));

  Object.values(difficultyProfiles).forEach(profile => {
    const active = profile.id === gameState.difficulty;

    const button = createUIButton(profile.name, active ? "#d9a441" : "#33445f", () => {
      if (waveState.number > 0 || waveState.active) {
        notify("Сложность можно менять только до первой волны", "warning");
        return;
      }

      gameState.difficulty = profile.id;
      updateUI();
      createDynamicUI();
      notify("Сложность: " + profile.name, "info");
    });

    button.style.width = "100%";
    button.style.marginTop = "6px";
    panel.appendChild(button);
  });

  const restartTitle = createSmallText("Опасная зона:");
  restartTitle.style.marginTop = "12px";
  panel.appendChild(restartTitle);

  const fullRestart = createUIButton("Новая игра", "#8a2d2d", () => {
    restartGame();
    uiState.menuOpen = false;
  });

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
    minWidth: uiLayout.compact ? "260px" : "280px",
    zIndex: "50"
  });

  const title = document.createElement("div");
  title.innerText = "БАЗА УНИЧТОЖЕНА";
  title.style.fontSize = uiLayout.compact ? "20px" : "24px";
  title.style.fontWeight = "bold";
  title.style.marginBottom = "12px";

  const retry = createUIButton("↩ Повторить волну", "#2f6b3c", () => retryLastWave());
  retry.style.width = "100%";
  retry.style.marginBottom = "8px";

  const restart = createUIButton("⟲ Новая игра", "#8a2d2d", () => restartGame());
  restart.style.width = "100%";

  panel.appendChild(title);
  panel.appendChild(retry);
  panel.appendChild(restart);

  document.body.appendChild(panel);
}

function getSidePanelStyle() {
  const width = uiLayout.compact ? Math.min(300, uiLayout.width - 20) : 300;

  return {
    right: "calc(8px + env(safe-area-inset-right))",
    top: "calc(46px + env(safe-area-inset-top))",
    width: width + "px",
    maxHeight: "calc(100vh - 110px - env(safe-area-inset-bottom))",
    overflowY: "auto",
    display: "none",
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.86)",
    color: "white",
    zIndex: "35"
  };
}

function applyFixedStyle(element, styleMap) {
  element.style.position = "fixed";

  Object.entries(styleMap).forEach(([key, value]) => {
    element.style[key] = value;
  });
}

function createUIButton(text, background, onClick) {
  const button = document.createElement("button");

  button.innerText = text;
  button.style.background = background;
  button.style.border = "none";
  button.style.color = "white";
  button.style.padding = uiLayout.compact ? "8px 10px" : "10px 12px";
  button.style.borderRadius = "10px";
  button.style.fontSize = uiLayout.compact ? "14px" : "15px";
  button.style.fontWeight = "bold";
  button.style.minWidth = uiLayout.compact ? "40px" : "auto";
  button.onclick = onClick;

  return button;
}

function createPanelTitle(text) {
  const title = document.createElement("div");

  title.innerText = text;
  title.style.fontWeight = "bold";
  title.style.fontSize = uiLayout.compact ? "16px" : "18px";
  title.style.marginBottom = "8px";

  return title;
}

function createSmallText(text) {
  const element = document.createElement("div");

  element.innerText = text;
  element.style.fontSize = "13px";
  element.style.opacity = "0.85";
  element.style.marginBottom = "6px";

  return element;
}

function updateTopbarVisibility() {
  const difficulty = document.getElementById("difficulty-chip");
  const wave = document.getElementById("wave-chip");

  if (difficulty) {
    difficulty.style.display = uiLayout.compact ? "none" : "flex";
  }

  if (wave) {
    wave.style.display = uiLayout.compact ? "none" : "flex";
  }
}

function updateDomVisibility() {
  const towerPanel = document.getElementById("tower-action-panel");
  if (towerPanel) {
    towerPanel.style.display = uiState.selectedTower && !gameState.gameOver ? "flex" : "none";
  }

  const buildPanel = document.getElementById("build-confirm-panel");
  if (buildPanel) {
    buildPanel.style.display = uiState.selectedMode === "tower" && !gameState.gameOver ? "flex" : "none";
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
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.innerText = value;
  }
}

function notify(text, type = "info") {
  uiState.notifications.push({
    text,
    type,
    life: 180
  });

  if (uiState.notifications.length > 4) {
    uiState.notifications.shift();
  }
}

function drawRectWorld(worldX, worldY, width, height, fillStyle, strokeStyle = null, lineWidth = 1) {
  const p = worldToScreen(worldX, worldY);

  ctx.fillStyle = fillStyle;
  ctx.fillRect(p.x, p.y, scaled(width), scaled(height));

  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(p.x, p.y, scaled(width), scaled(height));
  }
}

function drawTextWorld(text, worldX, worldY, size = 24) {
  const p = worldToScreen(worldX, worldY);

  ctx.font = scaled(size) + "px Arial";
  ctx.fillText(text, p.x, p.y);
}

function drawMap() {
  ctx.fillStyle = "#183b22";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const visibleWidth = canvas.width / camera.zoom;
  const visibleHeight = canvas.height / camera.zoom;

  const startCol = Math.floor(camera.x / TILE_SIZE);
  const endCol = Math.ceil((camera.x + visibleWidth) / TILE_SIZE);

  const startRow = Math.floor(camera.y / TILE_SIZE);
  const endRow = Math.ceil((camera.y + visibleHeight) / TILE_SIZE);

  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      if (col < 0 || row < 0 || col >= map.cols || row >= map.rows) continue;

      const p = worldToScreen(col * TILE_SIZE, row * TILE_SIZE);

      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(p.x, p.y, scaled(TILE_SIZE), scaled(TILE_SIZE));
    }
  }
}

function drawRoadTiles() {
  roadTiles.forEach(key => {
    const [tileX, tileY] = key.split(",").map(Number);

    drawRectWorld(
      tileX * TILE_SIZE,
      tileY * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE,
      "#6f5231"
    );
  });
}

function drawPathLine() {
  ctx.strokeStyle = "#8a673d";
  ctx.lineWidth = scaled(18);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();

  enemyPath.forEach((point, index) => {
    const p = worldToScreen(
      point.x * TILE_SIZE + TILE_SIZE / 2,
      point.y * TILE_SIZE + TILE_SIZE / 2
    );

    if (index === 0) {
      ctx.moveTo(p.x, p.y);
    } else {
      ctx.lineTo(p.x, p.y);
    }
  });

  ctx.stroke();
}

function drawBase() {
  const x = base.tileX * TILE_SIZE;
  const y = base.tileY * TILE_SIZE;

  drawRectWorld(
    x + 8,
    y + 8,
    TILE_SIZE - 16,
    TILE_SIZE - 16,
    "#8a5a2b"
  );

  ctx.fillStyle = "white";
  drawTextWorld("🏠", x + 16, y + 42, 28);
}

function drawTowerRange(tower) {
  if (!tower) return;

  const p = worldToScreen(tower.x, tower.y);

  ctx.beginPath();
  ctx.arc(p.x, p.y, scaled(tower.range), 0, Math.PI * 2);

  ctx.fillStyle = "rgba(85, 224, 224, 0.12)";
  ctx.fill();

  ctx.strokeStyle = "rgba(85, 224, 224, 0.8)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawBuildTile(tile, isPending = false) {
  if (!tile) return;

  const towerType = towerTypes[uiState.selectedTowerType];
  const validation = validateBuildTile(tile.tileX, tile.tileY, towerType);
  const valid = validation.ok;

  const x = tile.tileX * TILE_SIZE;
  const y = tile.tileY * TILE_SIZE;

  const p = worldToScreen(x, y);

  ctx.fillStyle = valid ? "rgba(0,255,0,0.22)" : "rgba(255,0,0,0.22)";
  ctx.fillRect(p.x, p.y, scaled(TILE_SIZE), scaled(TILE_SIZE));

  ctx.strokeStyle = isPending ? "yellow" : (valid ? "lime" : "red");
  ctx.lineWidth = isPending ? 4 : 2;
  ctx.strokeRect(p.x, p.y, scaled(TILE_SIZE), scaled(TILE_SIZE));

  const previewTower = {
    x: x + TILE_SIZE / 2,
    y: y + TILE_SIZE / 2,
    range: towerType.range
  };

  drawTowerRange(previewTower);

  ctx.globalAlpha = 0.58;

  drawRectWorld(
    x + 10,
    y + 10,
    TILE_SIZE - 20,
    TILE_SIZE - 20,
    towerType.color
  );

  ctx.globalAlpha = 1;

  ctx.fillStyle = "white";
  drawTextWorld(towerType.icon, x + 18, y + 40, 24);
}

function drawBuildOverlay() {
  if (uiState.selectedMode !== "tower") return;

  if (uiState.hoveredTile) {
    drawBuildTile(uiState.hoveredTile, false);
  }

  if (uiState.pendingBuildTile) {
    drawBuildTile(uiState.pendingBuildTile, true);
  }
}

function drawTowers() {
  towers.forEach(tower => {
    const towerType = towerTypes[tower.typeId];

    const x = tower.tileX * TILE_SIZE;
    const y = tower.tileY * TILE_SIZE;

    if (uiState.selectedTower && uiState.selectedTower.id === tower.id) {
      drawRectWorld(
        x + 5,
        y + 5,
        TILE_SIZE - 10,
        TILE_SIZE - 10,
        "rgba(255,255,0,0.06)",
        "yellow",
        3
      );
    }

    drawRectWorld(
      x + 10,
      y + 10,
      TILE_SIZE - 20,
      TILE_SIZE - 20,
      towerType.color
    );

    ctx.fillStyle = "white";
    drawTextWorld(towerType.icon, x + 18, y + 40, 24);

    if (tower.target) {
      const a = worldToScreen(tower.x, tower.y);
      const b = worldToScreen(tower.target.x, tower.target.y);

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);

      ctx.strokeStyle = "#00ffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });
}

function drawEnemies() {
  enemies.forEach(enemy => {
    const enemyType = enemyTypes[enemy.typeId];

    const p = worldToScreen(enemy.x, enemy.y);
    const size = scaled(15);

    ctx.fillStyle = enemyType.color;

    if (enemyType.shape === "circle") {
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    if (enemyType.shape === "square") {
      ctx.fillRect(p.x - size, p.y - size, size * 2, size * 2);
    }

    if (enemyType.shape === "triangle") {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - scaled(18));
      ctx.lineTo(p.x - scaled(16), p.y + scaled(14));
      ctx.lineTo(p.x + scaled(16), p.y + scaled(14));
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = "black";
    ctx.fillRect(
      p.x - scaled(18),
      p.y - scaled(25),
      scaled(36),
      scaled(5)
    );

    ctx.fillStyle = "lime";
    ctx.fillRect(
      p.x - scaled(18),
      p.y - scaled(25),
      scaled(36) * (enemy.hp / enemy.maxHp),
      scaled(5)
    );
  });
}

function drawWaveStatus() {
  const remaining = enemies.length;
  const total = waveState.totalEnemies;

  const text =
    "🌊 " +
    waveState.number +
    " | " +
    (waveState.active ? "идёт" : "подготовка") +
    " | " +
    remaining +
    "/" +
    total +
    " | x" +
    gameSpeed;

  ctx.fillStyle = "rgba(0,0,0,0.58)";
  ctx.fillRect(
    8,
    uiLayout.hudHeight + 8,
    uiLayout.compact ? 238 : 330,
    uiLayout.compact ? 28 : 36
  );

  ctx.fillStyle = "white";
  ctx.font = uiLayout.compact ? "13px Arial" : "16px Arial";
  ctx.fillText(
    text,
    18,
    uiLayout.hudHeight + (uiLayout.compact ? 27 : 31)
  );
}

function drawSelectedTowerPanel() {
  if (!uiState.selectedTower) return;

  const tower = uiState.selectedTower;
  const towerType = towerTypes[tower.typeId];

  const compact = uiLayout.compact;
  const x = 8;
  const y = uiLayout.hudHeight + (compact ? 44 : 58);
  const w = compact ? 260 : 360;
  const h = compact ? 104 : 165;

  ctx.fillStyle = "rgba(0,0,0,0.70)";
  ctx.fillRect(x, y, w, h);

  ctx.fillStyle = "white";
  ctx.font = compact ? "12px Arial" : "16px Arial";

  ctx.fillText("Башня: " + towerType.name, x + 12, y + 22);
  ctx.fillText(
    "Ур: " +
      tower.level +
      " | Урон: " +
      tower.damage.toFixed(2) +
      " | R: " +
      tower.range,
    x + 12,
    y + 44
  );
  ctx.fillText("Энергия: " + towerType.powerUsage, x + 12, y + 66);

  ctx.fillStyle = "#aaa";
  ctx.fillText("Улучшение: нужна технология", x + 12, y + 88);
}

function drawInfoPanel() {
  if (!uiState.infoPanelOpen) return;

  const compact = uiLayout.compact;
  const margin = 8;
  const w = compact
    ? Math.min(330, canvas.width - margin * 2)
    : 370;

  const h = Math.min(
    compact ? 420 : 505,
    canvas.height - uiLayout.hudHeight - uiLayout.bottomHeight - 32
  );

  const x = compact
    ? margin
    : Math.max(margin, canvas.width - w - margin);

  const y = uiLayout.hudHeight + 8;

  ctx.fillStyle = "rgba(0,0,0,0.88)";
  ctx.fillRect(x, y, w, h);

  ctx.fillStyle = "white";
  ctx.font = compact ? "15px Arial" : "18px Arial";
  ctx.fillText("Codex / Справка", x + 14, y + 28);

  ctx.font = compact ? "12px Arial" : "14px Arial";
  ctx.fillText("Башни:", x + 14, y + 60);

  Object.values(towerTypes).forEach((tower, index) => {
    const rowY = y + 82 + index * 62;

    ctx.fillText("- " + tower.name, x + 22, rowY);
    ctx.fillText(
      "  🌲" +
        tower.cost.wood +
        " ⚡" +
        tower.powerUsage +
        " Урон:" +
        tower.damage +
        " R:" +
        tower.range,
      x + 22,
      rowY + 18
    );
  });

  ctx.fillText("Враги:", x + 14, y + 150);

  Object.values(enemyTypes).forEach((enemy, index) => {
    const rowY = y + 172 + index * 52;

    ctx.fillText(
      "- " +
        enemy.name +
        " | HP:" +
        enemy.hp +
        " | V:" +
        enemy.speed,
      x + 22,
      rowY
    );

    ctx.fillText(
      "  Награда: " + enemy.reward.wood + " дерева",
      x + 22,
      rowY + 18
    );
  });

  ctx.fillText("Механики:", x + 14, y + h - 72);
  ctx.fillText("- Retry Wave: откат перед волной", x + 22, y + h - 50);
  ctx.fillText("- Энергия ограничивает башни", x + 22, y + h - 30);
  ctx.fillText("- Zoom: +/- или pinch", x + 22, y + h - 10);
}

function drawNotifications() {
  const width = uiLayout.compact
    ? Math.min(300, canvas.width - 16)
    : 370;

  const startX = uiLayout.compact
    ? 8
    : Math.max(20, canvas.width - width - 20);

  let y = uiLayout.hudHeight + 46;

  if (uiState.infoPanelOpen || uiState.menuOpen) {
    y += 8;
  }

  uiState.notifications.forEach(note => {
    const color =
      note.type === "danger"
        ? "rgba(138,45,45,0.88)"
        : note.type === "warning"
        ? "rgba(160,110,25,0.9)"
        : note.type === "success"
        ? "rgba(47,107,60,0.9)"
        : "rgba(0,0,0,0.78)";

    ctx.fillStyle = color;
    ctx.fillRect(
      startX,
      y,
      width,
      uiLayout.compact ? 28 : 34
    );

    ctx.fillStyle = "white";
    ctx.font = uiLayout.compact ? "12px Arial" : "15px Arial";

    ctx.fillText(
      note.text,
      startX + 10,
      y + (uiLayout.compact ? 19 : 22)
    );

    y += uiLayout.compact ? 32 : 40;
  });
}

function drawGameOver() {
  if (!gameState.gameOver) return;

  ctx.fillStyle = "rgba(0,0,0,0.66)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}