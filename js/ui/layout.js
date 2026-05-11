// CORE FRONTIER — Stage 02.4.6-A
// ui/layout.js — HUD zones, responsive layout and topbar system

function updateResponsiveLayout() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  uiLayout.width = width;
  uiLayout.height = height;

  uiLayout.isMobile = width <= 768;
  uiLayout.isTablet = width > 768 && width <= 1200;
  uiLayout.isLandscape = width > height;

  uiLayout.compact =
    uiLayout.isMobile ||
    (uiLayout.isTablet && uiLayout.isLandscape);
}

function updateUILayout() {
  updateResponsiveLayout();
}

function setupInitialDom() {
  const topbar = document.getElementById("topbar");

  if (!topbar) return;

  topbar.innerHTML = "";

  createTopbarChip(topbar, "wood-chip", "🌲", "wood", "0");
  createTopbarChip(topbar, "stone-chip", "🪨", "stone", "0");
  createTopbarChip(topbar, "food-chip", "🍖", "food", "0");
  createTopbarChip(topbar, "power-chip", "⚡", "power", "0/10");
  createTopbarChip(topbar, "hp-chip", "❤️", "hp", "100");
  createTopbarChip(topbar, "wave-chip", "🌊", "wave", "0");
  createTopbarChip(topbar, "difficulty-chip", "🎚", "difficulty", "Нормальная");
  createTopbarChip(topbar, "zoom-chip", "🔍", "zoom", "100%");

  updateTopbarVisibility();
}

function createTopbarChip(parent, chipId, icon, valueId, defaultValue) {
  const chip = document.createElement("div");

  chip.className = "resource";
  chip.id = chipId;
  chip.innerHTML = icon + ' <span id="' + valueId + '">' + defaultValue + "</span>";

  parent.appendChild(chip);
}

function updateTopbarVisibility() {
  const topbar = document.getElementById("topbar");

  if (!topbar) return;

  topbar.style.display = "flex";
  topbar.style.flexWrap = "wrap";
  topbar.style.gap = uiLayout.compact ? "4px" : "6px";

  topbar.style.position = "fixed";
  topbar.style.left = "10px";
  topbar.style.top = "10px";

  topbar.style.right = uiLayout.compact ? "10px" : "auto";
  topbar.style.maxWidth = uiLayout.compact ? "calc(100vw - 20px)" : "unset";

  if (uiLayout.isLandscape && uiLayout.compact) {
    topbar.style.maxWidth = "calc(100vw - 190px)";
  }

  topbar.style.zIndex = "20";
  topbar.style.pointerEvents = "none";
}

// ---------- HUD ZONES ----------

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
      background: "rgba(0,0,0,0.68)",
      zIndex: "22"
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
    background: "rgba(0,0,0,0.68)",
    zIndex: "22",
    maxWidth: "calc(100vw - 20px)"
  };
}

function getSpeedPanelStyle() {
  if (uiLayout.isLandscape && uiLayout.compact) {
    return {
      right: "10px",
      top: "70px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      padding: "6px",
      borderRadius: "10px",
      background: "rgba(0,0,0,0.68)",
      zIndex: "21"
    };
  }

  return {
    right: "10px",
    bottom: uiLayout.compact ? "88px" : "104px",
    display: "flex",
    gap: "6px",
    padding: "6px",
    borderRadius: "10px",
    background: "rgba(0,0,0,0.68)",
    zIndex: "21"
  };
}

function getZoomPanelStyle() {
  if (uiLayout.isLandscape && uiLayout.compact) {
    return {
      right: "58px",
      top: "70px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      padding: "6px",
      borderRadius: "10px",
      background: "rgba(0,0,0,0.68)",
      zIndex: "21"
    };
  }

  return {
    right: "10px",
    bottom: uiLayout.compact ? "40px" : "54px",
    display: "flex",
    gap: "6px",
    padding: "6px",
    borderRadius: "10px",
    background: "rgba(0,0,0,0.68)",
    zIndex: "21"
  };
}

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
      background: "rgba(0,0,0,0.78)",
      maxWidth: "48vw",
      zIndex: "24"
    };
  }

  return {
    left: "50%",
    bottom: uiLayout.compact ? "84px" : "96px",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: uiLayout.compact ? "8px" : "10px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.78)",
    width: uiLayout.compact ? "calc(100vw - 20px)" : "auto",
    maxWidth: uiLayout.compact ? "420px" : "unset",
    zIndex: "24"
  };
}

function getTowerActionPanelStyle() {
  return {
    left: "10px",
    bottom: uiLayout.compact ? "10px" : "14px",
    display: "flex",
    gap: "6px",
    padding: uiLayout.compact ? "8px" : "10px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.68)",
    zIndex: "23"
  };
}

function getSidePanelStyle() {
  return {
    left: uiLayout.compact ? "10px" : "20px",
    top: uiLayout.compact ? "64px" : "82px",
    width: uiLayout.compact ? "260px" : "320px",
    maxWidth: "calc(100vw - 20px)",
    maxHeight: uiLayout.compact ? "70vh" : "78vh",
    overflowY: "auto",
    padding: uiLayout.compact ? "12px" : "16px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.88)",
    color: "white",
    zIndex: "30"
  };
}

function getCompactWavePanelStyle() {
  if (uiLayout.isLandscape && uiLayout.compact) {
    return {
      left: "10px",
      top: "58px",
      display: "flex",
      gap: "6px",
      padding: "6px 8px",
      borderRadius: "999px",
      background: "rgba(0,0,0,0.62)",
      zIndex: "21"
    };
  }

  return {
    left: "10px",
    top: uiLayout.compact ? "58px" : "64px",
    display: "flex",
    gap: "6px",
    padding: "6px 8px",
    borderRadius: "999px",
    background: "rgba(0,0,0,0.62)",
    zIndex: "21"
  };
}