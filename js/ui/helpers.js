// CORE FRONTIER — UI Helpers
// КАРТА ФАЙЛА ДЛЯ AI
// ФАЙЛ: js/ui/helpers.js
// РОЛЬ: compact DOM/UI helper layer для shared UI element operations.
// СТАТУС: lightweight helper file; UI framework / design system / component architecture НЕ реализованы.
// ВЛАДЕЕТ: removeElement(), applyFixedStyle(), createUIButton(), createPanelTitle(), createSmallText(), setText()
// НЕ ВЛАДЕЕТ: panel lifecycle, UI layout calculation, gameplay callbacks, runtime command dispatch, render/canvas drawing, input handling, game state mutation.
// ЧИТАЕТ: document, uiLayout.compact, function arguments.
// ИЗМЕНЯЕТ: DOM elements, element styles, button.onclick, element.innerText.
// ИСПОЛЬЗУЕТСЯ В: ui controls/panels creation, HUD text updates, dynamic UI rebuild flow.
// RUNTIME-КОНТРАКТ: файл должен загружаться до UI files that call shared helper functions.
// НЕЛЬЗЯ: менять DOM behavior, callback wiring или style values без отдельного inspection pass.

// ======================================================
// СЕКЦИЯ: DOM / UI HELPERS
// РОЛЬ: предоставить компактные DOM helpers без ownership над gameplay/UI lifecycle.
// ВКЛЮЧАЕТ: removeElement(), applyFixedStyle(), createUIButton(), createPanelTitle(), createSmallText(), setText()
// ======================================================

// removeElement(): безопасно удаляет DOM element по id.
function removeElement(id) {
  const element = document.getElementById(id);
  if (element) element.remove();
}

// applyFixedStyle(): применяет fixed positioning и styleMap к DOM element.
function applyFixedStyle(element, styleMap) {
  element.style.position = "fixed";

  Object.entries(styleMap).forEach(([key, value]) => {
    element.style[key] = value;
  });
}

// createUIButton(): создаёт standard UI button и привязывает callback без ownership над callback logic.
// ТОЧКА РОСТА: shared UI helpers могут позже усилить consistency кнопок.
// ВАЖНО: generic UI framework пока НЕ реализован.
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

// createPanelTitle(): создаёт standard panel title element.
function createPanelTitle(text) {
  const title = document.createElement("div");

  title.innerText = text;
  title.style.fontWeight = "bold";
  title.style.fontSize = uiLayout.compact ? "16px" : "18px";
  title.style.marginBottom = "8px";

  return title;
}

// createSmallText(): создаёт compact secondary text element.
function createSmallText(text) {
  const element = document.createElement("div");

  element.innerText = text;
  element.style.fontSize = "13px";
  element.style.opacity = "0.85";
  element.style.marginBottom = "6px";

  return element;
}

// setText(): безопасно обновляет innerText DOM element по id.
function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.innerText = value;
  }
}

// ======================================================
// КОНЕЦ СЕКЦИИ: DOM / UI HELPERS
// ======================================================
