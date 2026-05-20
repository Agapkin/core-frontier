// CORE FRONTIER — Game Runtime Orchestration
// КАРТА ФАЙЛА ДЛЯ AI
// ФАЙЛ: js/game.js
// РОЛЬ: runtime bootstrap, runtime init, canvas/input routing, camera helpers, coordinate mapping и main loop sequencing.
// СТАТУС: sensitive runtime orchestration file; game engine architecture/input framework/scene manager/ECS НЕ реализованы.
// ВЛАДЕЕТ: resizeCanvas(), initial DOM/UI/power/bootstrap calls, input event binding, pointer/touch/wheel routing, camera pan/zoom helpers, coordinate helpers, handleTap(), gameLoop().
// НЕ ВЛАДЕЕТ: placement validation, tower placement logic, selected object actions, enemy movement internals, tower combat internals, wave generation internals, UI panel rendering internals, entity/world drawing internals.
// ЧИТАЕТ: canvas, window, camera, uiState, uiLayout, gameState, gameSpeed, map, TILE_SIZE.
// ИЗМЕНЯЕТ: canvas size, camera drag/pinch/zoom/x/y state, uiState.hoveredTile, uiState.selectedTower.
// ИСПОЛЬЗУЕТСЯ В: browser runtime startup, initial DOM/UI bootstrap, canvas event loop, requestAnimationFrame loop.
// RUNTIME-КОНТРАКТ: файл должен загружаться после data/state/systems/ui layers and starts final gameLoop().
// НЕЛЬЗЯ: менять event binding order, input behavior, camera math, tap routing, update/render order или gameLoop sequence без отдельного inspection pass.

// ======================================================
// СЕКЦИЯ: BOOTSTRAP / RESIZE
// РОЛЬ: синхронизировать canvas size, responsive layout, camera bounds и UI refresh.
// ВКЛЮЧАЕТ: resizeCanvas(), resize/orientation listeners
// ======================================================

// resizeCanvas(): обновляет canvas size и синхронизирует layout/camera/UI после resize.
function resizeCanvas() {
  // ---------- CANVAS SIZE UPDATE ----------
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // ---------- RESPONSIVE LAYOUT SYNC ----------
  updateResponsiveLayout();

  if (typeof updateUILayout === "function") {
    updateUILayout();
  }

  // ---------- CAMERA/UI REFRESH ----------
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

// ======================================================
// КОНЕЦ СЕКЦИИ: BOOTSTRAP / RESIZE
// ======================================================

// ======================================================
// СЕКЦИЯ: RUNTIME INIT
// РОЛЬ: выполнить initial DOM/UI/power/bootstrap calls перед запуском input и loop.
// ======================================================

setupInitialDom();
createDynamicUI();
updatePower();
updateUI();

notify("Stage 02.4.5-A: mobile fix pack активен", "info");

// ======================================================
// КОНЕЦ СЕКЦИИ: RUNTIME INIT
// ======================================================

// ======================================================
// СЕКЦИЯ: INPUT EVENT BINDING
// РОЛЬ: привязать canvas pointer/wheel/touch events к routing helpers.
// ======================================================

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

// ======================================================
// КОНЕЦ СЕКЦИИ: INPUT EVENT BINDING
// ======================================================

// ======================================================
// СЕКЦИЯ: POINTER INPUT
// РОЛЬ: обработать pointer tap/drag routing и camera pan state.
// ВКЛЮЧАЕТ: getCanvasPoint(), getPointer(), getTapThreshold(), pointerStart(), pointerMove(), pointerEnd()
// ======================================================

// getCanvasPoint(): переводит client coordinates в canvas-local point.
function getCanvasPoint(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

// getPointer(): извлекает canvas-local point из pointer event.
function getPointer(event) {
  return getCanvasPoint(event.clientX, event.clientY);
}

// getTapThreshold(): возвращает movement threshold для tap/drag distinction.
function getTapThreshold() {
  if (uiState.selectedMode === "tower") {
    return uiLayout.isMobile || uiLayout.isTablet ? 22 : 12;
  }

  return uiLayout.isMobile || uiLayout.isTablet ? 12 : 7;
}

// pointerStart(): начинает pointer drag/tap tracking и обновляет hovered tile.
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

// pointerMove(): обновляет hover, определяет drag и двигает camera при pan.
// ТОЧКА РОСТА: input routing может позже получить отдельную abstraction layer.
// ВАЖНО: input framework пока НЕ реализован.
function pointerMove(event) {
  if (camera.pinchActive) return;

  event.preventDefault();

  const pos = getPointer(event);

  // ---------- HOVER UPDATE ----------
  updateHoveredTile(pos.x, pos.y);

  if (!camera.dragging) return;

  const totalDx = pos.x - camera.startX;
  const totalDy = pos.y - camera.startY;

  const threshold = getTapThreshold();

  // ---------- DRAG THRESHOLD CHECK ----------
  if (
    Math.abs(totalDx) > threshold ||
    Math.abs(totalDy) > threshold
  ) {
    camera.moved = true;
  }

  // ---------- CAMERA PAN ----------
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

// pointerEnd(): завершает pointer routing и dispatch tap если movement threshold не превышен.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: POINTER INPUT
// ======================================================

// ======================================================
// СЕКЦИЯ: TOUCH / PINCH INPUT
// РОЛЬ: обработать two-finger pinch gesture и передать zoom в camera helper.
// ВКЛЮЧАЕТ: touchStart(), touchMove(), touchEnd(), touchDistance(), touchCenter()
// ======================================================

// touchStart(): активирует pinch mode при two-finger touch.
// ТОЧКА РОСТА: mobile gestures могут позже расшириться за пределы pinch zoom.
// ВАЖНО: gesture framework пока НЕ реализован.
function touchStart(event) {
  if (event.touches.length === 2) {
    event.preventDefault();

    camera.pinchActive = true;
    camera.dragging = false;

    camera.pinchDistance = touchDistance(event);
    camera.pinchZoom = camera.zoom;
  }
}

// touchMove(): рассчитывает pinch ratio и dispatch zoomAt().
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

// touchEnd(): отключает pinch mode когда two-finger touch завершён.
function touchEnd(event) {
  if (event.touches.length < 2) {
    camera.pinchActive = false;
  }
}

// touchDistance(): рассчитывает distance между двумя touch points.
function touchDistance(event) {
  const a = event.touches[0];
  const b = event.touches[1];

  return Math.hypot(
    a.clientX - b.clientX,
    a.clientY - b.clientY
  );
}

// touchCenter(): рассчитывает canvas-local center между двумя touch points.
function touchCenter(event) {
  const a = event.touches[0];
  const b = event.touches[1];

  return getCanvasPoint(
    (a.clientX + b.clientX) / 2,
    (a.clientY + b.clientY) / 2
  );
}

// ======================================================
// КОНЕЦ СЕКЦИИ: TOUCH / PINCH INPUT
// ======================================================

// ======================================================
// СЕКЦИЯ: CAMERA / ZOOM
// РОЛЬ: изменить camera zoom/x/y state и удерживать camera внутри map bounds.
// ВКЛЮЧАЕТ: wheelZoom(), zoomAt(), resetZoom(), clampCamera()
// ======================================================

// wheelZoom(): routes wheel delta into zoomAt() вокруг pointer position.
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

// zoomAt(): меняет camera.zoom и сохраняет world point под screen position.
// ТОЧКА РОСТА: camera controls могут позже потребовать отдельной stabilization layer.
// ВАЖНО: camera subsystem пока НЕ реализован.
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

// resetZoom(): сбрасывает camera zoom/position и опционально показывает notification.
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

// clampCamera(): ограничивает camera.x/y текущими map bounds.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: CAMERA / ZOOM
// ======================================================

// ======================================================
// СЕКЦИЯ: COORDINATE MAPPING
// РОЛЬ: переводить coordinates между screen, world и tile spaces для input/render routing.
// ВКЛЮЧАЕТ: updateHoveredTile(), screenToWorld(), screenToTile(), worldToScreen(), scaled()
// ======================================================

// updateHoveredTile(): сохраняет hovered tile на основе screen coordinates.
function updateHoveredTile(screenX, screenY) {
  uiState.hoveredTile = screenToTile(
    screenX,
    screenY
  );
}

// screenToWorld(): переводит screen coordinates в world coordinates с учётом camera.
function screenToWorld(screenX, screenY) {
  return {
    x: camera.x + screenX / camera.zoom,
    y: camera.y + screenY / camera.zoom
  };
}

// screenToTile(): переводит screen coordinates в tile coordinates через world coordinates.
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

// worldToScreen(): переводит world coordinates в screen coordinates с учётом camera.
function worldToScreen(worldX, worldY) {
  return {
    x: (worldX - camera.x) * camera.zoom,
    y: (worldY - camera.y) * camera.zoom
  };
}

// scaled(): масштабирует value через current camera.zoom.
function scaled(value) {
  return value * camera.zoom;
}

// ======================================================
// КОНЕЦ СЕКЦИИ: COORDINATE MAPPING
// ======================================================

// ======================================================
// СЕКЦИЯ: TAP ROUTING
// РОЛЬ: маршрутизировать tap в placement или selected object flow без ownership над этими systems.
// ВКЛЮЧАЕТ: handleTap()
// ======================================================

// handleTap(): routes tap to placement selection, tower selection, or selection clear.
// ТОЧКА РОСТА: tap routing может позже получить mode/state routing rules.
// ВАЖНО: command router/scene manager пока НЕ реализованы.
function handleTap(screenX, screenY) {
  if (gameState.gameOver) {
    notify("Игра окончена", "warning");
    return;
  }

  // ---------- TILE RESOLUTION ----------
  const tile = screenToTile(
    screenX,
    screenY
  );

  const tower = getTowerAtTile(
    tile.tileX,
    tile.tileY
  );

  // ---------- BUILD MODE ROUTING ----------
  if (uiState.selectedMode === "tower") {
    selectBuildTile(
      tile.tileX,
      tile.tileY
    );

    return;
  }

  // ---------- TOWER SELECTION ROUTING ----------
  if (tower) {
    selectTower(tower);
    return;
  }

  uiState.selectedTower = null;
}

// ======================================================
// КОНЕЦ СЕКЦИИ: TAP ROUTING
// ======================================================

// ======================================================
// СЕКЦИЯ: MAIN LOOP / UPDATE-RENDER SEQUENCING
// РОЛЬ: orchestrate update phase, render phase, UI overlays and next animation frame.
// ВКЛЮЧАЕТ: gameLoop()
// ======================================================

// gameLoop(): выполняет fixed order update/render orchestration и запрашивает следующий frame.
// ТОЧКА РОСТА: loop orchestration может позже учитывать pause/state modes.
// ВАЖНО: game engine/scene manager/ECS пока НЕ реализованы.
function gameLoop() {
  const multiplier = gameSpeed;

  // ---------- UPDATE PHASE ----------
  updateEnemies(multiplier);
  updateTowers(multiplier);
  updateNotifications();

  // ---------- WORLD RENDER PHASE ----------
  drawMap();
  drawRoadTiles();
  drawPathLine();
  drawBase();

  if (uiState.selectedTower) {
    drawTowerRange(uiState.selectedTower);
  }

  drawBuildOverlay();

  // ---------- ENTITY RENDER PHASE ----------
  drawTowers();
  drawEnemies();

  // ---------- UI/HUD RENDER PHASE ----------
  drawWaveStatus();
  drawSelectedTowerPanel();
  drawInfoPanel();

  drawNotifications();
  drawGameOver();

  // ---------- DOM VISIBILITY SYNC ----------
  updateDomVisibility();

  // ---------- NEXT FRAME REQUEST ----------
  requestAnimationFrame(gameLoop);
}

// ======================================================
// КОНЕЦ СЕКЦИИ: MAIN LOOP / UPDATE-RENDER SEQUENCING
// ======================================================

gameLoop();
