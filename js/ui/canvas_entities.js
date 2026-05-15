// CORE FRONTIER — Canvas Entity Rendering
// КАРТА ФАЙЛА ДЛЯ AI
// ФАЙЛ: js/ui/canvas_entities.js
// РОЛЬ: entity render layer для towers, enemies, selected tower highlight, target lines и HP bars.
// СТАТУС: render-only visualization layer; generic entity render system / ECS pipeline НЕ реализованы.
// ВЛАДЕЕТ: drawTowers(), drawEnemies()
// НЕ ВЛАДЕЕТ: enemy movement/update, tower targeting logic, damage calculation, combat rules, selected object actions, placement lifecycle, tower creation, enemy spawning, gameplay mutations.
// ЧИТАЕТ: towers, towerTypes, uiState.selectedTower, enemies, enemyTypes, TILE_SIZE, ctx, worldToScreen(), scaled(), drawRectWorld(), drawTextWorld().
// ИЗМЕНЯЕТ: canvas drawing state только во время render pass.
// ИСПОЛЬЗУЕТСЯ В: game render flow, entity rendering pass.
// RUNTIME-КОНТРАКТ: файл должен загружаться после canvas_world helpers и runtime state, до game render usage.
// НЕЛЬЗЯ: менять draw order, combat semantics или targeting ownership без отдельного inspection pass.

// ======================================================
// СЕКЦИЯ: TOWER ENTITY RENDER / РЕНДЕР БАШЕН
// РОЛЬ: визуализировать towers, selected tower highlight и target lines.
// ВКЛЮЧАЕТ: drawTowers()
// ВАЖНО: target lines визуализируют tower.target, но НЕ выбирают цель.
// ======================================================

// drawTowers(): визуализирует towers, selected tower highlight и target lines без combat ownership.
// ТОЧКА РОСТА: selected highlight может позже поддержать non-tower placeable objects.
// ВАЖНО: generic entity render system пока НЕ реализован.
function drawTowers() {
  towers.forEach(tower => {
    const towerType = towerTypes[tower.typeId];

    const x = tower.tileX * TILE_SIZE;
    const y = tower.tileY * TILE_SIZE;

    // ---------- SELECTED TOWER HIGHLIGHT ----------
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

    // ---------- TOWER BODY / ICON ----------
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

    // ---------- TARGET LINE VISUALIZATION ----------
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

// ======================================================
// КОНЕЦ СЕКЦИИ: TOWER ENTITY RENDER / РЕНДЕР БАШЕН
// ======================================================

// ======================================================
// СЕКЦИЯ: ENEMY ENTITY RENDER / РЕНДЕР ВРАГОВ
// РОЛЬ: визуализировать enemies, body shapes и HP bars.
// ВКЛЮЧАЕТ: drawEnemies()
// ВАЖНО: HP bars визуализируют enemy.hp, но НЕ владеют damage/death flow.
// ======================================================

// drawEnemies(): визуализирует enemy shapes и HP bars без enemy update ownership.
// ТОЧКА РОСТА: enemy rendering may later show status effects/projectile impact visuals.
// ВАЖНО: projectile/status-effect render system пока НЕ реализован.
function drawEnemies() {
  enemies.forEach(enemy => {
    const enemyType = enemyTypes[enemy.typeId];

    const p = worldToScreen(enemy.x, enemy.y);
    const size = scaled(15);

    ctx.fillStyle = enemyType.color;

    // ---------- ENEMY BODY SHAPE ----------
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

    // ---------- ENEMY HEALTH BAR ----------
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

// ======================================================
// КОНЕЦ СЕКЦИИ: ENEMY ENTITY RENDER / РЕНДЕР ВРАГОВ
// ======================================================
