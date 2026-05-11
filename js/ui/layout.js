// CORE FRONTIER — Stage 02.4.5
// ui/layout.js — responsive UI layout system

function updateUILayout() {
  const compact = window.innerWidth < 760;
  const landscape = window.innerWidth > window.innerHeight;

  uiLayout.compact = compact;
  uiLayout.landscape = landscape;

  uiLayout.safeTop = 10;
  uiLayout.safeBottom = 10;

  uiLayout.hudHeight = compact ? 48 : 64;
  uiLayout.bottomHeight = compact ? 58 : 72;
}

function setupInitialDom() {
  const oldButtons = document.querySelector(".buttons");

  if (oldButtons) {
    oldButtons.style.display = "none";
  }

  const topbar = document.querySelector(".topbar");

  if (!topbar) return;

  topbar.innerHTML = "";

  ensureTopbarChip("wood-chip", "🌲 <span id='wood'>0</span>");
  ensureTopbarChip("stone-chip", "🪨 <span id='stone'>0</span>");
  ensureTopbarChip("food-chip", "🍖 <span id='food'>0</span>");
  ensureTopbarChip("hp-chip", "❤️ <span id='hp'>100</span>");

  ensureTopbarChip("wave-chip", "🌊 <span id='wave'>0</span>");
  ensureTopbarChip("power-chip", "⚡ <span id='power'>0/10</span>");
  ensureTopbarChip("difficulty-chip", "🎚 <span id='difficulty'>Нормальная</span>");
  ensureTopbarChip("zoom-chip", "🔍 <span id='zoom'>100%</span>");
}

function ensureTopbarChip(id, html) {
  const topbar = document.querySelector(".topbar");

  if (!topbar || document.getElementById(id)) return;

  const chip = document.createElement("div");

  chip.className = "resource";
  chip.id = id;
  chip.innerHTML = html;

  topbar.appendChild(chip);
}

function updateTopbarVisibility() {
  const topbar = document.querySelector(".topbar");

  if (!topbar) return;

  if (uiLayout.compact && uiLayout.landscape) {
    topbar.style.maxWidth = "calc(100vw - 160px)";
  } else {
    topbar.style.maxWidth = "100vw";
  }
}

function getBottomPanelStyle() {
  const compactLandscape = uiLayout.compact && uiLayout.landscape;

  return {
    left: compactLandscape ? "8px" : "8px",
    right: compactLandscape ? "auto" : "8px",
    bottom: "8px",
    display: "flex",
    flexDirection: compactLandscape ? "column" : "row",
    gap: "6px",
    zIndex: "20"
  };
}

function getUtilityPanelStyle(bottomOffset) {
  const compactLandscape = uiLayout.compact && uiLayout.landscape;

  return {
    right: "8px",
    bottom: bottomOffset + "px",
    display: "flex",
    flexDirection: compactLandscape ? "column" : "row",
    gap: "6px",
    zIndex: "20"
  };
}

function getBuildPanelStyle() {
  const compactLandscape = uiLayout.compact && uiLayout.landscape;

  return {
    left: compactLandscape ? "58px" : "8px",
    right: compactLandscape ? "108px" : "8px",
    bottom: "8px",
    display: "none",
    gap: "8px",
    zIndex: "24",
    padding: "8px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.76)"
  };
}

function getSidePanelStyle() {
  return {
    right: "8px",
    top: uiLayout.hudHeight + "px",
    width: uiLayout.compact ? "240px" : "270px",
    display: "none",
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.84)",
    color: "white",
    zIndex: "25"
  };
}