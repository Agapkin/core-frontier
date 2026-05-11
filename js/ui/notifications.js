// CORE FRONTIER — Stage 02.4.5
// ui/notifications.js — notification system

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

function updateNotifications() {
  for (let i = uiState.notifications.length - 1; i >= 0; i--) {
    uiState.notifications[i].life -= 1;

    if (uiState.notifications[i].life <= 0) {
      uiState.notifications.splice(i, 1);
    }
  }
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