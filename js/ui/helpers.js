function removeElement(id) {
  const el =
    document.getElementById(id);

  if (el) {
    el.remove();
  }
}

function setText(id, value) {
  const el =
    document.getElementById(id);

  if (!el) return;

  el.innerText = value;
}

function notify(
  text,
  type = "info"
) {
  uiState.notifications.push({
    text,
    type,
    created: Date.now()
  });
}

// ---------- SAFE UI MODE HELPERS ----------

function setUIMode(mode) {
  uiState.mode = mode;

  if (
    mode !== UI_MODES.MENU
  ) {
    uiState.menuOpen = false;
  }

  if (
    mode !== UI_MODES.CODEX
  ) {
    uiState.infoPanelOpen = false;
  }

  if (
    mode !== UI_MODES.BUILD
  ) {
    uiState.pendingBuildTile = null;
  }
}

function resetUIMode() {
  uiState.mode =
    UI_MODES.IDLE;

  uiState.menuOpen = false;

  uiState.infoPanelOpen = false;
}

// ---------- BUTTONS ----------

function createUIButton(
  text,
  background,
  onClick
) {
  const button =
    document.createElement(
      "button"
    );

  button.innerText = text;

  button.style.background =
    background;

  button.style.color =
    "white";

  button.style.border =
    "none";

  button.style.borderRadius =
    "10px";

  button.style.cursor =
    "pointer";

  button.style.fontWeight =
    "bold";

  button.style.pointerEvents =
    "auto";

  button.style.touchAction =
    "manipulation";

  button.style.padding =
    uiLayout.compact
      ? "8px 10px"
      : "10px 14px";

  button.style.fontSize =
    uiLayout.compact
      ? "12px"
      : "14px";

  button.onclick = event => {
    event.preventDefault();

    event.stopPropagation();

    onClick();
  };

  return button;
}

// ---------- PANELS ----------

function createPanelTitle(
  text
) {
  const title =
    document.createElement(
      "div"
    );

  title.innerText = text;

  title.style.fontWeight =
    "bold";

  title.style.color =
    "white";

  title.style.marginBottom =
    "10px";

  title.style.fontSize =
    uiLayout.compact
      ? "16px"
      : "20px";

  return title;
}

function createSmallText(
  text
) {
  const label =
    document.createElement(
      "div"
    );

  label.innerText = text;

  label.style.color =
    "#cccccc";

  label.style.lineHeight =
    "1.45";

  label.style.fontSize =
    uiLayout.compact
      ? "11px"
      : "13px";

  return label;
}