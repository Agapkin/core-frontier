// CORE FRONTIER — Stage 02.4.5
// ui/canvas_entities.js — tower and enemy rendering

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

    drawTextWorld(
      towerType.icon,
      x + 18,
      y + 40,
      24
    );

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
      ctx.arc(
        p.x,
        p.y,
        size,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    if (enemyType.shape === "square") {
      ctx.fillRect(
        p.x - size,
        p.y - size,
        size * 2,
        size * 2
      );
    }

    if (enemyType.shape === "triangle") {
      ctx.beginPath();

      ctx.moveTo(
        p.x,
        p.y - scaled(18)
      );

      ctx.lineTo(
        p.x - scaled(16),
        p.y + scaled(14)
      );

      ctx.lineTo(
        p.x + scaled(16),
        p.y + scaled(14)
      );

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