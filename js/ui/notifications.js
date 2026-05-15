// CORE FRONTIER — UI Notifications
// КАРТА ФАЙЛА ДЛЯ AI
// ФАЙЛ: js/ui/notifications.js
// РОЛЬ: compact canvas notification lifecycle layer.
// СТАТУС: notification UI state/render layer; notification framework / priority system / animation system НЕ реализованы.
// ВЛАДЕЕТ: notify(), updateNotifications(), drawNotifications()
// НЕ ВЛАДЕЕТ: gameplay decisions that trigger notifications, wave lifecycle, placement lifecycle, game over logic, UI panel lifecycle, DOM control creation, gameplay state mutation.
// ЧИТАЕТ: uiState.notifications, uiState.infoPanelOpen, uiState.menuOpen, uiLayout, canvas.width, ctx, notification fields.
// ИЗМЕНЯЕТ: uiState.notifications queue/lifetime, canvas drawing state во время notification render pass.
// ИСПОЛЬЗУЕТСЯ В: runtime feedback flow, game update loop, canvas UI render pass.
// RUNTIME-КОНТРАКТ: notify() принимает message intent от других systems, но не владеет причиной gameplay event.
// НЕЛЬЗЯ: менять queue size, lifetime, colors, positioning или notification timing без отдельного inspection pass.

// ======================================================
// СЕКЦИЯ: NOTIFICATION QUEUE / CREATION
// РОЛЬ: создать notification entry и ограничить размер queue.
// ВКЛЮЧАЕТ: notify()
// ======================================================

// notify(): создаёт notification entry и добавляет её в runtime queue.
// ТОЧКА РОСТА: notification categories/timing may later need priority or animation rules.
// ВАЖНО: notification framework / priority / animation system пока НЕ реализованы.
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

// ======================================================
// КОНЕЦ СЕКЦИИ: NOTIFICATION QUEUE / CREATION
// ======================================================

// ======================================================
// СЕКЦИЯ: NOTIFICATION LIFETIME UPDATE
// РОЛЬ: обновить lifetime active notifications и удалить expired entries.
// ВКЛЮЧАЕТ: updateNotifications()
// ======================================================

// updateNotifications(): обновляет notification lifetime и удаляет expired entries.
function updateNotifications() {
  for (let i = uiState.notifications.length - 1; i >= 0; i--) {
    // ---------- LIFETIME DECREMENT ----------
    uiState.notifications[i].life -= 1;

    // ---------- EXPIRED ENTRY CLEANUP ----------
    if (uiState.notifications[i].life <= 0) {
      uiState.notifications.splice(i, 1);
    }
  }
}

// ======================================================
// КОНЕЦ СЕКЦИИ: NOTIFICATION LIFETIME UPDATE
// ======================================================

// ======================================================
// СЕКЦИЯ: NOTIFICATION CANVAS RENDER
// РОЛЬ: визуализировать active notifications через canvas overlay rendering.
// ВКЛЮЧАЕТ: drawNotifications()
// ======================================================

// drawNotifications(): визуализирует active notifications через canvas overlay rendering.
function drawNotifications() {
  // ---------- POSITION / WIDTH CALCULATION ----------
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
    // ---------- TYPE COLOR SELECTION ----------
    const color =
      note.type === "danger"
        ? "rgba(138,45,45,0.88)"
        : note.type === "warning"
        ? "rgba(160,110,25,0.9)"
        : note.type === "success"
        ? "rgba(47,107,60,0.9)"
        : "rgba(0,0,0,0.78)";

    // ---------- NOTIFICATION BOX RENDER ----------
    ctx.fillStyle = color;

    ctx.fillRect(
      startX,
      y,
      width,
      uiLayout.compact ? 28 : 34
    );

    // ---------- NOTIFICATION TEXT RENDER ----------
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

// ======================================================
// КОНЕЦ СЕКЦИИ: NOTIFICATION CANVAS RENDER
// ======================================================
