function updateUI() {
  updateTopbar();

  drawSelectedTowerPanel();

  drawInfoPanel();

  drawMenuPanel();

  drawNotifications();
}

// ---------- MENU ----------

function drawMenuPanel() {
  if (!uiState.menuOpen) {
    return;
  }

  const width =
    uiLayout.compact
      ? Math.min(
          canvas.width - 20,
          280
        )
      : 320;

  const height =
    uiLayout.compact
      ? Math.min(
          canvas.height - 100,
          340
        )
      : 420;

  const x = 10;

  const y =
    uiLayout.compact
      ? 58
      : 76;

  ctx.fillStyle =
    "rgba(0,0,0,0.88)";

  ctx.fillRect(
    x,
    y,
    width,
    height
  );

  ctx.fillStyle =
    "white";

  ctx.font =
    uiLayout.compact
      ? "15px Arial"
      : "18px Arial";

  ctx.fillText(
    "☰ Меню",
    x + 14,
    y + 24
  );

  ctx.font =
    uiLayout.compact
      ? "11px Arial"
      : "13px Arial";

  let lineY = y + 54;

  ctx.fillText(
    "Сложность:",
    x + 14,
    lineY
  );

  lineY += 24;

  Object.values(
    difficultyProfiles
  ).forEach(profile => {
    const active =
      gameState.difficulty ===
      profile.id;

    ctx.fillStyle = active
      ? "#d9a441"
      : "#cccccc";

    ctx.fillText(
      active
        ? "● " + profile.name
        : "○ " + profile.name,

      x + 20,
      lineY
    );

    lineY += 22;
  });

  lineY += 12;

  ctx.fillStyle =
    "#aaaaaa";

  ctx.fillText(
    "Новая игра:",
    x + 14,
    lineY
  );

  lineY += 22;

  ctx.fillStyle =
    "#ffffff";

  ctx.fillText(
    "↻ Перезапусти через кнопку",
    x + 20,
    lineY
  );
}

// ---------- CODEX ----------

function drawInfoPanel() {
  if (
    !uiState.infoPanelOpen
  ) {
    return;
  }

  const width =
    uiLayout.compact
      ? Math.min(
          canvas.width - 20,
          300
        )
      : 360;

  const height =
    uiLayout.compact
      ? Math.min(
          canvas.height - 100,
          360
        )
      : 460;

  const x =
    canvas.width -
    width -
    10;

  const y =
    uiLayout.compact
      ? 56
      : 76;

  ctx.fillStyle =
    "rgba(0,0,0,0.9)";

  ctx.fillRect(
    x,
    y,
    width,
    height
  );

  ctx.fillStyle =
    "white";

  ctx.font =
    uiLayout.compact
      ? "15px Arial"
      : "18px Arial";

  ctx.fillText(
    "📘 Codex",
    x + 14,
    y + 24
  );

  ctx.font =
    uiLayout.compact
      ? "11px Arial"
      : "13px Arial";

  let lineY = y + 50;

  ctx.fillText(
    "⚔️ Нажми Бой для запуска волны",
    x + 14,
    lineY
  );

  lineY += 24;

  ctx.fillText(
    "🏹 Построй башни",
    x + 14,
    lineY
  );

  lineY += 24;

  ctx.fillText(
    "🛡️ Защити базу",
    x + 14,
    lineY
  );

  lineY += 24;

  ctx.fillText(
    "🌲 🪨 🥩 ⚡ — ресурсы",
    x + 14,
    lineY
  );

  lineY += 24;

  ctx.fillText(
    "❤️ — здоровье базы",
    x + 14,
    lineY
  );
}

// ---------- SELECTED TOWER ----------

function drawSelectedTowerPanel() {
  if (
    !uiState.selectedTower
  ) {
    return;
  }

  // Во время menu/codex
  // tower panel скрываем.
  if (
    uiState.menuOpen ||
    uiState.infoPanelOpen
  ) {
    return;
  }

  const tower =
    uiState.selectedTower;

  const type =
    towerTypes[
      tower.typeId
    ];

  const width =
    uiLayout.compact
      ? 220
      : 280;

  const height =
    uiLayout.compact
      ? 100
      : 132;

  const x = 12;

  const y =
    uiLayout.compact
      ? 84
      : 104;

  ctx.fillStyle =
    "rgba(0,0,0,0.72)";

  ctx.fillRect(
    x,
    y,
    width,
    height
  );

  ctx.fillStyle =
    "white";

  ctx.font =
    uiLayout.compact
      ? "11px Arial"
      : "14px Arial";

  ctx.fillText(
    type.name,
    x + 12,
    y + 22
  );

  ctx.fillText(
    "Уровень: " +
      tower.level,
    x + 12,
    y + 46
  );

  ctx.fillText(
    "Урон: " +
      tower.damage.toFixed(1),
    x + 12,
    y + 68
  );

  ctx.fillText(
    "Радиус: " +
      tower.range,
    x + 12,
    y + 90
  );

  ctx.fillStyle =
    "#aaaaaa";

  ctx.fillText(
    "Улучшения позже",
    x + 12,
    y + 112
  );
}