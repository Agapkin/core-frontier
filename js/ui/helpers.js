// CORE FRONTIER — Stage 02.4.6-A1
// ui/helpers.js — shared helpers and UI state authority

// ---------- DOM ----------

function removeElement(id) {
  const el = document.getElementById(id);

  if (el) {
    el.remove();
  }
}

function setText(id, value) {
  const el = document.getElementById(id);

  if (!el) return;

  el.innerText = value;
}

function applyFixedStyle(element, styles) {
  element.style.position = "fixed";

  Object.entries(styles).forEach(
    ([key, value]) => {
      element.style[key] = value;
    }
  );
}

// ---------- BUTTONS ----------

function createUIButton(
  text,
  background,
  onClick
) {
  const button =
    document.createElement("button");

  button.innerText = text;

  button.style.background =
    background;

  button.style.color = "white";

  button.style.border = "none";

  button.style.borderRadius = "10px";

  button.style.padding =
    uiLayout.compact
      ? "8px 10px"
      : "10px 14px";

  button.style.fontSize =
    uiLayout.compact
      ? "12px"
      : "14px";

  button.style.fontWeight = "bold";

  button.style.cursor = "pointer";

  button.style.pointerEvents = "auto";

  button.style.touchAction =
    "manipulation";

  button.style.userSelect = "none";

  button.style.webkitUserSelect =
    "none";

  button.onclick = event => {
    event.preventDefault();
    event.stopPropagation();

    if (isInteractionLocked()) {
      return;
    }

    onClick();
  };

  return button;
}

// ---------- PANELS ----------

function createPanelTitle(text) {
  const title =
    document.createElement("div");

  title.innerText = text;

  title.style.fontSize =
    uiLayout.compact
      ? "16px"
      : "20px";

  title.style.fontWeight = "bold";

  title.style.marginBottom = "10px";

  title.style.color = "white";

  return title;
}

function createSmallText(text) {
  const label =
    document.createElement("div");

  label.innerText = text;

  label.style.fontSize =
    uiLayout.compact
      ? "11px"
      : "13px";

  label.style.lineHeight = "1.4";

  label.style.color = "#cccccc";

  return label;
}

// ---------- UI STATE AUTHORITY ----------

function setUIMode(mode) {
  uiState.mode = mode;

  uiState.menuOpen =
    mode === UI_MODES.MENU;

  uiState.infoPanelOpen =
    mode === UI_MODES.CODEX;

  if (mode !== UI_MODES.BUILD) {
    uiState.selectedMode = null;
    uiState.hoveredTile = null;
  }

  if (
    mode !== UI_MODES.IDLE &&
    mode !== UI_MODES.BUILD
  ) {
    uiState.selectedTower = null;
  }

  updateDomVisibility();
}

function resetUIState() {
  uiState.mode =
    UI_MODES.IDLE;

  uiState.selectedMode = null;

  uiState.selectedTower = null;

  uiState.hoveredTile = null;

  uiState.menuOpen = false;

  uiState.infoPanelOpen = false;

  updateDomVisibility();
}

function closeAllPanels() {
  uiState.menuOpen = false;

  uiState.infoPanelOpen = false;

  uiState.selectedTower = null;
}

function isInteractionLocked() {
  return (
    uiState.mode ===
      UI_MODES.GAME_OVER
  );
}

// ---------- BUILD HELPERS ----------

function enterBuildMode() {
  closeAllPanels();

  uiState.selectedMode = "tower";

  setUIMode(UI_MODES.BUILD);
}

function cancelBuildMode() {
  selectedBuildTower = null;

  uiState.selectedMode = null;

  uiState.hoveredTile = null;

  setUIMode(UI_MODES.IDLE);
}

// ---------- MENU HELPERS ----------

function toggleMenu() {
  if (
    uiState.mode ===
    UI_MODES.MENU
  ) {
    setUIMode(UI_MODES.IDLE);

    return;
  }

  closeAllPanels();

  setUIMode(UI_MODES.MENU);
}

function toggleCodex() {
  if (
    uiState.mode ===
    UI_MODES.CODEX
  ) {
    setUIMode(UI_MODES.IDLE);

    return;
  }

  closeAllPanels();

  setUIMode(UI_MODES.CODEX);
}

// ---------- BUILD PANEL ----------

function getBuildPanelText() {
  if (
    uiState.mode !==
    UI_MODES.BUILD
  ) {
    return "";
  }

  if (!selectedBuildTower) {
    return "Выбери башню";
  }

  if (!uiState.hoveredTile) {
    return "Выбери клетку";
  }

  return (
    "Построить: " +
    towerTypes[
      selectedBuildTower
    ].name
  );
}