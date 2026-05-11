// CORE FRONTIER — Stage 02.4.3
// ui.js — интерфейс, HUD, Codex, уведомления и отрисовка

function setupInitialDom() {
  const oldButtons = document.querySelector(".buttons");
  if (oldButtons) oldButtons.style.display = "none";

  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  ensureTopbarChip("wave-chip", "🌊 Волна: <span id='wave'>0</span>");
  ensureTopbarChip("power-chip", "⚡ <span id='power'>0/10</span>");
  ensureTopbarChip("difficulty-chip", "🎚 <span id='difficulty'>Нормальная</span>");
  ensureTopbarChip("zoom-chip", "🔍 <span id='zoom'>100%</span>");
}

function ensureTopbarChip(id, html) {
  const topbar = document.querySelector(".topbar");
  if (!topbar || document.getElementById(id)) return;

  const chip = document.createElement("div");
  chip.className = "resource";
  chip.id = id;
  chip.innerHTML = html;
  topbar.appendChild(chip);
}

function createDynamicUI() {
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
  createSpeedControls();
  createZoomControls();
  createTowerActionPanel();
  createBuildConfirmPanel();
  createMenuPanel();
  createGameOverPanel();
}

function removeElement(id) {
  const element = document.getElementById(id);
  if (element) element.remove();
}

function createBottomControlPanel() {
  const panel = document.createElement("div");
  panel.id = "bottom-control-panel";
  applyFixedStyle(panel, {
    left: "10px",
    right: "10px",
    bottom: "10px",
    display: "flex",
    gap: "8px",
    zIndex: "20"
  });

  panel.appendChild(createUIButton("🏹 Башня", "#2f6b3c", () => buildTower()));
  panel.appendChild(createUIButton("⚔️ Волна", "#8a5a2b", () => startWave()));
  panel.appendChild(createUIButton("ℹ Codex", "#33445f", () => {
    uiState.infoPanelOpen = !uiState.infoPanelOpen;
    if (uiState.infoPanelOpen) uiState.menuOpen = false;
  }));
  panel.appendChild(createUIButton("☰ Меню", "#444444", () => {
    uiState.menuOpen = !uiState.menuOpen;
    if (uiState.menuOpen) uiState.infoPanelOpen = false;
  }));

  document.body.appendChild(panel);
}

function createSpeedControls() {
  const panel = document.createElement("div");
  panel.id = "speed-panel";
  applyFixedStyle(panel, {
    right: "10px",
    bottom: "82px",
    display: "flex",
    gap: "6px",
    zIndex: "20"
  });

  [1, 2, 3].forEach(speed => {
    const button = createUIButton("x" + speed, speed === gameSpeed ? "#d9a441" : "#2f6b3c", () => {
      if (gameState.gameOver) return;
      gameSpeed = speed;
      createDynamicUI();
      notify("Скорость игры: x" + speed, "info");
    });
    button.style.padding = "8px 10px";
    panel.appendChild(button);
  });

  document.body.appendChild(panel);
}

function createZoomControls() {
  const panel = document.createElement("div");
  panel.id = "zoom-panel";
  applyFixedStyle(panel, {
    right: "10px",
    bottom: "126px",
    display: "flex",
    gap: "6px",
    zIndex: "20"
  });

  const minus = createUIButton("−", "#33445f", () => zoomAt(canvas.width / 2, canvas.height / 2, camera.zoom - 0.12));
  const plus = createUIButton("+", "#33445f", () => zoomAt(canvas.width / 2, canvas.height / 2, camera.zoom + 0.12));
  const reset = createUIButton("100%", "#444444", () => zoomAt(canvas.width / 2, canvas.height / 2, 1));

  [minus, plus, reset].forEach(btn => {
    btn.style.padding = "8px 10px";
    panel.appendChild(btn);
  });

  document.body.appendChild(panel);
}

function createTowerActionPanel() {
  const panel = document.createElement("div");
  panel.id = "tower-action-panel";
  applyFixedStyle(panel, {
    left: "10px",
    bottom: "82px",
    display: "none",
    gap: "6px",
    zIndex: "20"
  });

  panel.appendChild(createUIButton("Продать", "#2f6b3c", () => sellSelectedTower()));
  panel.appendChild(createUIButton("Улучшить", "#555555", () => {
    notify("Улучшение недоступно: нужна технология", "warning");
  }));

  document.body.appendChild(panel);
}

function createBuildConfirmPanel() {
  const panel = document.createElement("div");
  panel.id = "build-confirm-panel";
  applyFixedStyle(panel, {
    left: "10px",
    right: "10px",
    bottom: "82px",
    display: "none",
    gap: "8px",
    zIndex: "21",
    padding: "8px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.72)"
  });

  const text = document.createElement("div");
  text.id = "build-confirm-text";
  text.style.color = "white";
  text.style.fontSize = "14px";
  text.style.flex = "1";
  text.style.alignSelf = "center";
  text.innerText = "Выбери клетку";

  panel.appendChild(text);
  panel.appendChild(createUIButton("Построить", "#2f6b3c", () => confirmBuild()));
  panel.appendChild(createUIButton("Отмена", "#8a2d2d", () => cancelBuildMode()));

  document.body.appendChild(panel);
}

function createMenuPanel() {
  const panel = document.createElement("div");
  panel.id = "menu-panel";
  applyFixedStyle(panel, {
    right: "10px",
    top: "78px",
    width: "270px",
    display: "none",
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.84)",
    color: "white",
    zIndex: "25"
  });

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
    minWidth: "280px",
    zIndex: "40"
  });

  const title = document.createElement("div");
  title.innerText = "БАЗА УНИЧТОЖЕНА";
  title.style.fontSize = "24px";
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
  button.style.padding = "10px 12px";
  button.style.borderRadius = "10px";
  button.style.fontSize = "15px";
  button.style.fontWeight = "bold";
  button.onclick = onClick;
  return button;
}

function createPanelTitle(text) {
  const title = document.createElement("div");
  title.innerText = text;
  title.style.fontWeight = "bold";
  title.style.fontSize = "18px";
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

function updateDomVisibility() {
  const towerPanel = document.getElementById("tower-action-panel");
  if (towerPanel) towerPanel.style.display = uiState.selectedTower && !gameState.gameOver ? "flex" : "none";

  const buildPanel = document.getElementById("build-confirm-panel");
  if (buildPanel) buildPanel.style.display = uiState.selectedMode === "tower" && !gameState.gameOver ? "flex" : "none";

  const buildText = document.getElementById("build-confirm-text");
  if (buildText) buildText.innerText = getBuildPanelText();

  const menuPanel = document.getElementById("menu-panel");
  if (menuPanel) menuPanel.style.display = uiState.menuOpen ? "block" : "none";

  const gameOverPanel = document.getElementById("game-over-panel");
  if (gameOverPanel) gameOverPanel.style.display = gameState.gameOver ? "block" : "none";
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

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.innerText = value;
}

function notify(text, type = "info") {
  uiState.notifications.push({
    text,
    type,
    life: 180
  });

  if (uiState.notifications.length > 4) uiState.notifications.shift();
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
    drawRectWorld(tileX * TILE_SIZE, tileY * TILE_SIZE, TILE_SIZE, TILE_SIZE, "#6f5231");
  });
}

function drawPathLine() {
  ctx.strokeStyle = "#8a673d";
  ctx.lineWidth = scaled(18);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();

  enemyPath.forEach((point, index) => {
    const p = worldToScreen(point.x * TILE_SIZE + TILE_SIZE / 2, point.y * TILE_SIZE + TILE_SIZE / 2);
    if (index === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });

  ctx.stroke();
}

function drawBase() {
  const x = base.tileX * TILE_SIZE;
  const y = base.tileY * TILE_SIZE;
  drawRectWorld(x + 8, y + 8, TILE_SIZE - 16, TILE_SIZE - 16, "#8a5a2b");
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
  drawRectWorld(x + 10, y + 10, TILE_SIZE - 20, TILE_SIZE - 20, towerType.color);
  ctx.globalAlpha = 1;

  ctx.fillStyle = "white";
  drawTextWorld(towerType.icon, x + 18, y + 40, 24);
}

function drawBuildOverlay() {
  if (uiState.selectedMode !== "tower") return;

  if (uiState.hoveredTile) drawBuildTile(uiState.hoveredTile, false);
  if (uiState.pendingBuildTile) drawBuildTile(uiState.pendingBuildTile, true);
}

function drawTowers() {
  towers.forEach(tower => {
    const towerType = towerTypes[tower.typeId];
    const x = tower.tileX * TILE_SIZE;
    const y = tower.tileY * TILE_SIZE;

    if (uiState.selectedTower && uiState.selectedTower.id === tower.id) {
      drawRectWorld(x + 5, y + 5, TILE_SIZE - 10, TILE_SIZE - 10, "rgba(255,255,0,0.06)", "yellow", 3);
    }

    drawRectWorld(x + 10, y + 10, TILE_SIZE - 20, TILE_SIZE - 20, towerType.color);
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
    ctx.fillRect(p.x - scaled(18), p.y - scaled(25), scaled(36), scaled(5));

    ctx.fillStyle = "lime";
    ctx.fillRect(p.x - scaled(18), p.y - scaled(25), scaled(36) * (enemy.hp / enemy.maxHp), scaled(5));
  });
}

function drawWaveStatus() {
  const remaining = enemies.length;
  const total = waveState.totalEnemies;

  ctx.fillStyle = "rgba(0,0,0,0.62)";
  ctx.fillRect(20, 78, 330, 72);

  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Волна: " + waveState.number, 35, 104);
  ctx.fillText("Статус: " + (waveState.active ? "идёт" : "подготовка"), 35, 126);
  ctx.fillText("Враги: " + remaining + " / " + total + " | Скорость: x" + gameSpeed, 35, 146);
}

function drawSelectedTowerPanel() {
  if (!uiState.selectedTower) return;

  const tower = uiState.selectedTower;
  const towerType = towerTypes[tower.typeId];

  ctx.fillStyle = "rgba(0,0,0,0.72)";
  ctx.fillRect(20, 160, 360, 185);

  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Башня: " + towerType.name, 35, 188);
  ctx.fillText("Уровень: " + tower.level, 35, 213);
  ctx.fillText("Урон: " + tower.damage.toFixed(2), 35, 238);
  ctx.fillText("Радиус: " + tower.range, 35, 263);
  ctx.fillText("Энергия: " + towerType.powerUsage, 35, 288);

  ctx.fillStyle = "#999";
  ctx.fillText("Улучшения:", 35, 316);
  ctx.fillText("• Урон +1 — нужна технология", 55, 338);
}

function drawInfoPanel() {
  if (!uiState.infoPanelOpen) return;

  const x = Math.max(12, canvas.width - 390);
  const y = 78;
  const w = Math.min(370, canvas.width - 24);

  ctx.fillStyle = "rgba(0,0,0,0.88)";
  ctx.fillRect(x, y, w, 505);

  ctx.fillStyle = "white";
  ctx.font = "18px Arial";
  ctx.fillText("Codex / Справка", x + 18, y + 34);

  ctx.font = "14px Arial";
  ctx.fillText("Башни:", x + 18, y + 70);

  Object.values(towerTypes).forEach((tower, index) => {
    const rowY = y + 95 + index * 80;
    ctx.fillText("- " + tower.name, x + 28, rowY);
    ctx.fillText("  Стоимость: " + tower.cost.wood + " дерева | Энергия: " + tower.powerUsage, x + 28, rowY + 18);
    ctx.fillText("  Урон: " + tower.damage + " | Радиус: " + tower.range, x + 28, rowY + 36);
  });

  ctx.fillText("Враги:", x + 18, y + 185);

  Object.values(enemyTypes).forEach((enemy, index) => {
    const rowY = y + 210 + index * 68;
    ctx.fillText("- " + enemy.name + " (" + enemy.class + ")", x + 28, rowY);
    ctx.fillText("  HP: " + enemy.hp + " | Скорость: " + enemy.speed, x + 28, rowY + 18);
    ctx.fillText("  Награда: " + enemy.reward.wood + " дерева", x + 28, rowY + 36);
  });

  ctx.fillText("Механики:", x + 18, y + 425);
  ctx.fillText("- Retry Wave возвращает к подготовке", x + 28, y + 447);
  ctx.fillText("- Энергия ограничивает спам башен", x + 28, y + 469);
  ctx.fillText("- Zoom: кнопки +/- или pinch", x + 28, y + 491);
}

function drawNotifications() {
  const startX = Math.max(20, canvas.width - 390);
  let y = 20;

  uiState.notifications.forEach(note => {
    const color = note.type === "danger" ? "rgba(138,45,45,0.88)" :
      note.type === "warning" ? "rgba(160,110,25,0.9)" :
      note.type === "success" ? "rgba(47,107,60,0.9)" :
      "rgba(0,0,0,0.78)";

    ctx.fillStyle = color;
    ctx.fillRect(startX, y, 370, 34);

    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.fillText(note.text, startX + 12, y + 22);

    y += 40;
  });
}

function drawGameOver() {
  if (!gameState.gameOver) return;
  ctx.fillStyle = "rgba(0,0,0,0.66)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}