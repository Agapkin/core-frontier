// CORE FRONTIER — Stage 02.4.5-A
// game.js — input, camera, zoom, coordinate mapping, game loop

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  updateResponsiveLayout();

  if (typeof updateUILayout === "function") {
    updateUILayout();
  }

  clampCamera();

  if (typeof createDynamicUI === "function") {
    createDynamicUI();
  }

  if (typeof updateUI === "function") {
    updateUI();
  }
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    resizeCanvas();
    resetZoom(false);
  }, 160);
});

// ---------- INIT ----------

setupInitialDom();
createDynamicUI();
updatePower();
updateUI();

notify("Stage 02.4.5-A: mobile fix pack активен", "info");

// ---------- INPUT ----------

canvas.addEventListener("pointerdown", pointerStart);
canvas.addEventListener("pointermove", pointerMove);
canvas.addEventListener("pointerup", pointerEnd);
canvas.addEventListener("pointercancel", pointerEnd);

canvas.addEventListener("wheel", wheelZoom, {
  passive: false
});

canvas.addEventListener("touchstart", touchStart, {
  passive: false
});

canvas.addEventListener("touchmove", touchMove, {
  passive: false
});

canvas.addEventListener("touchend", touchEnd, {
  passive: false
});

// ---------- POINTER HELPERS ----------

function getCanvasPoint(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

function getPointer(event) {
  return getCanvasPoint(event.clientX, event.clientY);
}

function getTapThreshold() {
  if (uiState.selectedMode === "tower") {
    return uiLayout.isMobile || uiLayout.isTablet ? 22 : 12;
  }

  return uiLayout.isMobile || uiLayout.isTablet ? 12 : 7;
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

  const threshold = getTapThreshold();

  if (
    Math.abs(totalDx) > threshold ||
    Math.abs(totalDy) > threshold
  ) {
    camera.moved = true;
  }

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

  const totalDx = pos.x - camera.startX;
  const totalDy = pos.y - camera.startY;

  const distance = Math.hypot(totalDx, totalDy);

  const threshold = getTapThreshold();

  if (!camera.moved || distance <= threshold) {
    handleTap(pos.x, pos.y);
  }

  camera.dragging = false;
}

// ---------- TOUCH ----------

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

    const ratio =
      distance / Math.max(1, camera.pinchDistance);

    zoomAt(
      center.x,
      center.y,
      camera.pinchZoom * ratio
    );
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

  return Math.hypot(
    a.clientX - b.clientX,
    a.clientY - b.clientY
  );
}

function touchCenter(event) {
  const a = event.touches[0];
  const b = event.touches[1];

  return getCanvasPoint(
    (a.clientX + b.clientX) / 2,
    (a.clientY + b.clientY) / 2
  );
}

// ---------- ZOOM ----------

function wheelZoom(event) {
  event.preventDefault();

  const pos = getPointer(event);

  const delta =
    event.deltaY > 0
      ? -0.1
      : 0.1;

  zoomAt(
    pos.x,
    pos.y,
    camera.zoom + delta
  );
}

function zoomAt(screenX, screenY, newZoom) {
  const oldZoom = camera.zoom;

  const clampedZoom = Math.max(
    camera.minZoom,
    Math.min(camera.maxZoom, newZoom)
  );

  if (Math.abs(clampedZoom - oldZoom) < 0.001) {
    return;
  }

  const worldBefore = screenToWorld(
    screenX,
    screenY
  );

  camera.zoom = clampedZoom;

  camera.x =
    worldBefore.x -
    screenX / camera.zoom;

  camera.y =
    worldBefore.y -
    screenY / camera.zoom;

  clampCamera();

  updateUI();
}

function resetZoom(showNotification = true) {
  camera.zoom = 1;
  camera.x = 0;
  camera.y = 0;

  clampCamera();
  updateUI();

  if (showNotification) {
    notify("Масштаб сброшен", "info");
  }
}

function clampCamera() {
  const visibleWidth =
    canvas.width / camera.zoom;

  const visibleHeight =
    canvas.height / camera.zoom;

  camera.x = Math.max(
    0,
    Math.min(
      camera.x,
      Math.max(0, map.width - visibleWidth)
    )
  );

  camera.y = Math.max(
    0,
    Math.min(
      camera.y,
      Math.max(0, map.height - visibleHeight)
    )
  );
}

// ---------- TILE HELPERS ----------

function updateHoveredTile(screenX, screenY) {
  uiState.hoveredTile = screenToTile(
    screenX,
    screenY
  );
}

function screenToWorld(screenX, screenY) {
  return {
    x: camera.x + screenX / camera.zoom,
    y: camera.y + screenY / camera.zoom
  };
}

function screenToTile(screenX, screenY) {
  const world = screenToWorld(
    screenX,
    screenY
  );

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

  const tile = screenToTile(
    screenX,
    screenY
  );

  const tower = getTowerAtTile(
    tile.tileX,
    tile.tileY
  );

  if (uiState.selectedMode === "tower") {
    selectBuildTile(
      tile.tileX,
      tile.tileY
    );

    return;
  }

  if (tower) {
    selectTower(tower);
    return;
  }

  uiState.selectedTower = null;
}

// ---------- MAIN LOOP ----------

function gameLoop() {
  const multiplier = gameSpeed;

  updateEnemies(multiplier);
  updateTowers(multiplier);
  updateNotifications();

  drawMap();
  drawRoadTiles();
  drawPathLine();
  drawBase();

  if (uiState.selectedTower) {
    drawTowerRange(uiState.selectedTower);
  }

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

gameLoop();