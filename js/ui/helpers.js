// CORE FRONTIER — Stage 02.4.5
// ui/helpers.js — shared UI helper functions

function removeElement(id) {
  const element = document.getElementById(id);
  if (element) element.remove();
}

function applyFixedStyle(element, styleMap) {
  element.style.position = "fixed";

  Object.entries(styleMap).forEach(([key, value]) => {
    element.style[key] = value;
  });
}

function createUIButton(text, background, onClick) {
  const button = document.createElement("button");

  button.innerText = text;
  button.style.background = background;
  button.style.border = "none";
  button.style.color = "white";
  button.style.padding = uiLayout.compact ? "8px 10px" : "10px 12px";
  button.style.borderRadius = "10px";
  button.style.fontSize = uiLayout.compact ? "14px" : "15px";
  button.style.fontWeight = "bold";
  button.style.minWidth = uiLayout.compact ? "40px" : "auto";
  button.style.touchAction = "manipulation";
  button.style.pointerEvents = "auto";

  button.onclick = onClick;

  return button;
}

function createPanelTitle(text) {
  const title = document.createElement("div");

  title.innerText = text;
  title.style.fontWeight = "bold";
  title.style.fontSize = uiLayout.compact ? "16px" : "18px";
  title.style.marginBottom = "8px";

  return title;
}

function createSmallText(text) {
  const element = document.createElement("div");

  element.innerText = text;
  element.style.fontSize = "13px";
  element.style.opacity = "0.85";
  element.style.marginBottom = "6px";

  return element;
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.innerText = value;
  }
}