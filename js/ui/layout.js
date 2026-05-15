// CORE FRONTIER — UI Layout
// КАРТА ФАЙЛА ДЛЯ AI
// ФАЙЛ: js/ui/layout.js
// РОЛЬ: responsive layout state, topbar DOM setup, topbar style sync и panel style factories.
// СТАТУС: layout helper layer; layout engine / responsive framework / UI framework НЕ реализованы.
// ВЛАДЕЕТ: updateResponsiveLayout(), updateUILayout(), setupInitialDom(), createTopbarChip(), updateTopbarVisibility(), getBottomPanelStyle(), getSpeedPanelStyle(), getZoomPanelStyle(), getBuildPanelStyle(), getTowerActionPanelStyle(), getSidePanelStyle()
// НЕ ВЛАДЕЕТ: gameplay logic, runtime commands, render/canvas drawing, panel lifecycle, button callbacks, entity rendering, game state mutation.
// ЧИТАЕТ: window.innerWidth, window.innerHeight, document, uiLayout.
// ИЗМЕНЯЕТ: uiLayout responsive flags, topbar DOM content, topbar style fields.
// ИСПОЛЬЗУЕТСЯ В: dynamic UI rebuild flow, topbar setup, UI controls/panels style calculation.
// RUNTIME-КОНТРАКТ: файл должен загружаться до UI files that call layout/style helpers.
// НЕЛЬЗЯ: менять breakpoints, style values, DOM structure или compact logic без отдельного inspection pass.

// ======================================================
// СЕКЦИЯ: RESPONSIVE LAYOUT STATE
// РОЛЬ: обновить viewport-dependent uiLayout flags.
// ВКЛЮЧАЕТ: updateResponsiveLayout(), updateUILayout()
// ======================================================

// updateResponsiveLayout(): обновляет responsive flags и viewport-dependent uiLayout state.
// ТОЧКА РОСТА: compact/mobile layout может позже потребовать broader layout coordination.
// ВАЖНО: generalized layout engine / responsive framework пока НЕ реализованы.
function updateResponsiveLayout() {
  // ---------- VIEWPORT SIZE READ ----------
  const width = window.innerWidth;
  const height = window.innerHeight;

  uiLayout.width = width;
  uiLayout.height = height;

  // ---------- RESPONSIVE FLAG UPDATE ----------
  uiLayout.isMobile = width <= 768;

  uiLayout.isTablet =
    width > 768 && width <= 1200;

  uiLayout.isLandscape = width > height;

  uiLayout.compact =
    uiLayout.isMobile ||
    (uiLayout.isTablet && uiLayout.isLandscape);
}

// updateUILayout(): обновляет layout state через responsive recalculation.
function updateUILayout() {
  updateResponsiveLayout();
}

// ======================================================
// КОНЕЦ СЕКЦИИ: RESPONSIVE LAYOUT STATE
// ======================================================

// ======================================================
// СЕКЦИЯ: TOPBAR DOM SETUP
// РОЛЬ: создать initial topbar DOM structure и HUD chips.
// ВКЛЮЧАЕТ: setupInitialDom(), createTopbarChip()
// ======================================================

// setupInitialDom(): создаёт initial topbar DOM structure и HUD chips.
function setupInitialDom() {
  // ---------- TOPBAR ROOT READ / RESET ----------
  const topbar = document.getElementById("topbar");

  if (!topbar) return;

  topbar.innerHTML = "";

  // ---------- CHIP CREATION ----------
  createTopbarChip(
    topbar,
    "wood-chip",
    "🌲",
    "wood",
    "0"
  );

  createTopbarChip(
    topbar,
    "stone-chip",
    "🪨",
    "stone",
    "0"
  );

  createTopbarChip(
    topbar,
    "food-chip",
    "🍖",
    "food",
    "0"
  );

  createTopbarChip(
    topbar,
    "power-chip",
    "⚡",
    "power",
    "0/10"
  );

  createTopbarChip(
    topbar,
    "hp-chip",
    "❤️",
    "hp",
    "100"
  );

  createTopbarChip(
    topbar,
    "wave-chip",
    "🌊",
    "wave",
    "0"
  );

  createTopbarChip(
    topbar,
    "difficulty-chip",
    "🎚",
    "difficulty",
    "Нормальная"
  );

  createTopbarChip(
    topbar,
    "zoom-chip",
    "🔍",
    "zoom",
    "100%"
  );

  // ---------- TOPBAR STYLE SYNC ----------
  updateTopbarVisibility();
}

// createTopbarChip(): создаёт один topbar chip с value span id для HUD updates.
function createTopbarChip(
  parent,
  chipId,
  icon,
  valueId,
  defaultValue
) {
  const chip = document.createElement("div");

  chip.className = "resource";
  chip.id = chipId;

  chip.innerHTML =
    icon +
    ' <span id="' +
    valueId +
    '">' +
    defaultValue +
    "</span>";

  parent.appendChild(chip);
}

// ======================================================
// КОНЕЦ СЕКЦИИ: TOPBAR DOM SETUP
// ======================================================

// ======================================================
// СЕКЦИЯ: TOPBAR VISIBILITY / STYLE SYNC
// РОЛЬ: синхронизировать topbar DOM style с responsive layout state.
// ВКЛЮЧАЕТ: updateTopbarVisibility()
// ======================================================

// updateTopbarVisibility(): применяет responsive fixed style к topbar.
function updateTopbarVisibility() {
  const topbar = document.getElementById("topbar");

  if (!topbar) return;

  topbar.style.display = "flex";
  topbar.style.flexWrap = "wrap";

  topbar.style.gap = uiLayout.compact
    ? "4px"
    : "6px";

  topbar.style.position = "fixed";

  topbar.style.left = "10px";
  topbar.style.top = "10px";

  topbar.style.right = uiLayout.compact
    ? "10px"
    : "auto";

  topbar.style.zIndex = "20";

  topbar.style.maxWidth = uiLayout.compact
    ? "calc(100vw - 20px)"
    : "unset";

  topbar.style.pointerEvents = "none";
}

// ======================================================
// КОНЕЦ СЕКЦИИ: TOPBAR VISIBILITY / STYLE SYNC
// ======================================================

// ======================================================
// СЕКЦИЯ: PANEL STYLE FACTORIES
// РОЛЬ: вернуть responsive style maps для UI panels без panel lifecycle ownership.
// ВКЛЮЧАЕТ: getBottomPanelStyle(), getSpeedPanelStyle(), getZoomPanelStyle(), getBuildPanelStyle(), getTowerActionPanelStyle(), getSidePanelStyle()
// ======================================================

// getBottomPanelStyle(): возвращает responsive style preset для bottom control panel.
function getBottomPanelStyle() {
  if (uiLayout.isLandscape && uiLayout.compact) {
    return {
      right: "10px",
      bottom: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      padding: "8px",
      borderRadius: "12px",
      background: "rgba(0,0,0,0.72)",
      zIndex: "20"
    };
  }

  return {
    left: "50%",
    bottom: "10px",
    transform: "translateX(-50%)",
    display: "flex",
    gap: uiLayout.compact ? "6px" : "8px",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: uiLayout.compact ? "8px" : "10px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.72)",
    zIndex: "20",
    maxWidth: "calc(100vw - 20px)"
  };
}

// getSpeedPanelStyle(): возвращает responsive style preset для speed panel.
function getSpeedPanelStyle() {
  if (uiLayout.isLandscape && uiLayout.compact) {
    return {
      right: "96px",
      bottom: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      padding: "6px",
      borderRadius: "10px",
      background: "rgba(0,0,0,0.72)",
      zIndex: "20"
    };
  }

  return {
    right: "10px",
    bottom: uiLayout.compact ? "86px" : "96px",
    display: "flex",
    gap: "6px",
    padding: "6px",
    borderRadius: "10px",
    background: "rgba(0,0,0,0.72)",
    zIndex: "20"
  };
}

// getZoomPanelStyle(): возвращает responsive style preset для zoom panel.
function getZoomPanelStyle() {
  if (uiLayout.isLandscape && uiLayout.compact) {
    return {
      right: "164px",
      bottom: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      padding: "6px",
      borderRadius: "10px",
      background: "rgba(0,0,0,0.72)",
      zIndex: "20"
    };
  }

  return {
    right: "10px",
    bottom: uiLayout.compact ? "38px" : "46px",
    display: "flex",
    gap: "6px",
    padding: "6px",
    borderRadius: "10px",
    background: "rgba(0,0,0,0.72)",
    zIndex: "20"
  };
}

// getBuildPanelStyle(): возвращает responsive style preset для build confirm panel.
function getBuildPanelStyle() {
  if (uiLayout.isLandscape && uiLayout.compact) {
    return {
      left: "10px",
      bottom: "10px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px",
      borderRadius: "12px",
      background: "rgba(0,0,0,0.82)",
      maxWidth: "48vw",
      zIndex: "22"
    };
  }

  return {
    left: "50%",
    bottom: uiLayout.compact ? "82px" : "92px",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: uiLayout.compact ? "8px" : "10px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.82)",
    width: uiLayout.compact
      ? "calc(100vw - 20px)"
      : "auto",
    maxWidth: uiLayout.compact
      ? "420px"
      : "unset",
    zIndex: "22"
  };
}

// getTowerActionPanelStyle(): возвращает responsive style preset для selected tower action panel.
function getTowerActionPanelStyle() {
  return {
    left: "10px",
    bottom: uiLayout.compact ? "10px" : "14px",
    display: "flex",
    gap: "6px",
    padding: uiLayout.compact ? "8px" : "10px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.72)",
    zIndex: "21"
  };
}

// getSidePanelStyle(): возвращает responsive style preset для side/menu/info panels.
function getSidePanelStyle() {
  return {
    left: uiLayout.compact ? "10px" : "20px",
    top: uiLayout.compact ? "64px" : "82px",
    width: uiLayout.compact
      ? "260px"
      : "320px",
    maxWidth: "calc(100vw - 20px)",
    maxHeight: uiLayout.compact
      ? "70vh"
      : "78vh",
    overflowY: "auto",
    padding: uiLayout.compact ? "12px" : "16px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.88)",
    color: "white",
    zIndex: "30"
  };
}

// ======================================================
// КОНЕЦ СЕКЦИИ: PANEL STYLE FACTORIES
// ======================================================
