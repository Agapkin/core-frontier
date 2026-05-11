// CORE FRONTIER — Stage 02.4.5
// ui/canvas_world.js — world rendering and build overlays

function drawRectWorld(
  worldX,
  worldY,
  width,
  height,
  fillStyle,
  strokeStyle = null,
  lineWidth = 1
) {
  const p = worldToScreen(worldX, worldY);

  ctx.fillStyle = fillStyle;
  ctx.fillRect(
    p.x,
    p.y,
    scaled(width),
    scaled(height)
  );

  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;

    ctx.strokeRect(
      p.x,
      p.y,
      scaled(width),
      scaled(height)
    );
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
      if (
        col < 0 ||
        row < 0 ||
        col >= map.cols ||
        row >= map.rows
      ) {
        continue;
      }

      const p = worldToScreen(
        col * TILE_SIZE,
        row * TILE_SIZE
      );

      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;

      ctx.strokeRect(
        p.x,
        p.y,
        scaled(TILE_SIZE),
        scaled(TILE_SIZE)
      );
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

  drawTextWorld(
    "🏠",
    x + 16,
    y + 42,
    28
  );
}

function drawTowerRange(tower) {
  if (!tower) return;

  const p = worldToScreen(tower.x, tower.y);

  ctx.beginPath();

  ctx.arc(
    p.x,
    p.y,
    scaled(tower.range),
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "rgba(85, 224, 224, 0.12)";
  ctx.fill();

  ctx.strokeStyle = "rgba(85, 224, 224, 0.8)";
  ctx.lineWidth = 2;

  ctx.stroke();
}

function drawBuildTile(tile, isPending = false) {
  if (!tile) return;

  const towerType = towerTypes[uiState.selectedTowerType];

  const validation = validateBuildTile(
    tile.tileX,
    tile.tileY,
    towerType
  );

  const valid = validation.ok;

  const x = tile.tileX * TILE_SIZE;
  const y = tile.tileY * TILE_SIZE;

  const p = worldToScreen(x, y);

  ctx.fillStyle = valid
    ? "rgba(0,255,0,0.22)"
    : "rgba(255,0,0,0.22)";

  ctx.fillRect(
    p.x,
    p.y,
    scaled(TILE_SIZE),
    scaled(TILE_SIZE)
  );

  ctx.strokeStyle = isPending
    ? "yellow"
    : valid
    ? "lime"
    : "red";

  ctx.lineWidth = isPending ? 4 : 2;

  ctx.strokeRect(
    p.x,
    p.y,
    scaled(TILE_SIZE),
    scaled(TILE_SIZE)
  );

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

  drawTextWorld(
    towerType.icon,
    x + 18,
    y + 40,
    24
  );
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