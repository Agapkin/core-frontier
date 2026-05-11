// CORE FRONTIER — Stage 02.4.3
// game.js — точка запуска, input, camera / zoom и главный игровой цикл

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  clampCamera();
}

function initGame() {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  setupInitialDom();
  createDynamicUI();
  updatePower();
  updateUI();
  notify("Stage 02.4.3: модульная структура активна", "info");

  bindInputHandlers();
  gameLoop();
}

function bindInputHandlers() {
  canvas.addEventListener("pointerdown", pointerStart);
  canvas.addEventListener("pointermove", pointerMove);
  canvas.addEventListener("pointerup", pointerEnd);
  canvas.addEventListener("pointercancel", pointerEnd);
  canvas.addEventListener("wheel", wheelZoom, { passive: false });
  canvas.addEventListener("touchstart", touchStart, { passive: false });
  canvas.addEventListener("touchmove", touchMove, { passive: false });
  canvas.addEventListener("touchend", touchEnd, { passive: false });
}

function getPointer(event) {
  return { x: event.clientX, y: event.clientY };
}

function pointerStart(event) {
  if (camera.pinchActive) return;
  event.preventDefault();

  const pos = getPointer(event);
  camera.dragging = true;
  camera.moved = false;
  camera.startX = pos.x;
  camera.startY = pos.y;
  camera.lastX = pos.x;
  camera.lastY = pos.y;

  updateHoveredTile(pos.x, pos.y);
}

function pointerMove(event) {
  if (camera.pinchActive) return;
  event.preventDefault();

  const pos = getPointer(event);
  updateHoveredTile(pos.x, pos.y);

  if (!camera.dragging) return;

  const totalDx = pos.x - camera.startX;
  const totalDy = pos.y - camera.startY;

  if (Math.abs(totalDx) > 7 || Math.abs(totalDy) > 7) camera.moved = true;

  if (camera.moved) {
    const dx = pos.x - camera.lastX;
    const dy = pos.y - camera.lastY;

    camera.x -= dx / camera.zoom;
    camera.y -= dy / camera.zoom;
    clampCamera();
  }

  camera.lastX = pos.x;
  camera.lastY = pos.y;
}

function pointerEnd(event) {
  if (camera.pinchActive) return;
  event.preventDefault();

  const pos = getPointer(event);

  if (!camera.moved) handleTap(pos.x, pos.y);

  camera.dragging = false;
}

function touchStart(event) {
  if (event.touches.length === 2) {
    event.preventDefault();
    camera.pinchActive = true;
    camera.dragging = false;
    camera.pinchDistance = touchDistance(event);
    camera.pinchZoom = camera.zoom;
  }
}

function touchMove(event) {
  if (event.touches.length === 2) {
    event.preventDefault();
    const center = touchCenter(event);
    const distance = touchDistance(event);
    const ratio = distance / Math.max(1, camera.pinchDistance);
    zoomAt(center.x, center.y, camera.pinchZoom * ratio);
  }
}

function touchEnd(event) {
  if (event.touches.length < 2) {
    camera.pinchActive = false;
  }
}

function touchDistance(event) {
  const a = event.touches[0];
  const b = event.touches[1];
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function touchCenter(event) {
  const a = event.touches[0];
  const b = event.touches[1];
  return {
    x: (a.clientX + b.clientX) / 2,
    y: (a.clientY + b.clientY) / 2
  };
}

function wheelZoom(event) {
  event.preventDefault();
  const delta = event.deltaY > 0 ? -0.1 : 0.1;
  zoomAt(event.clientX, event.clientY, camera.zoom + delta);
}

function zoomAt(screenX, screenY, newZoom) {
  const oldZoom = camera.zoom;
  const clampedZoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, newZoom));
  if (Math.abs(clampedZoom - oldZoom) < 0.001) return;

  const worldBefore = screenToWorld(screenX, screenY);
  camera.zoom = clampedZoom;
  camera.x = worldBefore.x - screenX / camera.zoom;
  camera.y = worldBefore.y - screenY / camera.zoom;

  clampCamera();
  updateUI();
}

function clampCamera() {
  const visibleWidth = canvas.width / camera.zoom;
  const visibleHeight = canvas.height / camera.zoom;

  camera.x = Math.max(0, Math.min(camera.x, Math.max(0, map.width - visibleWidth)));
  camera.y = Math.max(0, Math.min(camera.y, Math.max(0, map.height - visibleHeight)));
}

function updateHoveredTile(screenX, screenY) {
  uiState.hoveredTile = screenToTile(screenX, screenY);
}

function screenToWorld(screenX, screenY) {
  return {
    x: camera.x + screenX / camera.zoom,
    y: camera.y + screenY / camera.zoom
  };
}

function screenToTile(screenX, screenY) {
  const world = screenToWorld(screenX, screenY);
  return {
    tileX: Math.floor(world.x / TILE_SIZE),
    tileY: Math.floor(world.y / TILE_SIZE)
  };
}

function worldToScreen(worldX, worldY) {
  return {
    x: (worldX - camera.x) * camera.zoom,
    y: (worldY - camera.y) * camera.zoom
  };
}

function scaled(value) {
  return value * camera.zoom;
}

function handleTap(screenX, screenY) {
  if (gameState.gameOver) {
    notify("Игра окончена", "warning");
    return;
  }

  const tile = screenToTile(screenX, screenY);
  const tower = getTowerAtTile(tile.tileX, tile.tileY);

  if (uiState.selectedMode === "tower") {
    selectBuildTile(tile.tileX, tile.tileY);
    return;
  }

  if (tower) {
    selectTower(tower);
    return;
  }

  uiState.selectedTower = null;
}

function gameLoop() {
  const multiplier = gameSpeed;

  updateEnemies(multiplier);
  updateTowers(multiplier);
  updateNotifications();

  drawMap();
  drawRoadTiles();
  drawPathLine();
  drawBase();

  if (uiState.selectedTower) drawTowerRange(uiState.selectedTower);

  drawBuildOverlay();
  drawTowers();
  drawEnemies();

  drawWaveStatus();
  drawSelectedTowerPanel();
  drawInfoPanel();
  drawNotifications();
  drawGameOver();

  updateDomVisibility();
  requestAnimationFrame(gameLoop);
}

initGame();