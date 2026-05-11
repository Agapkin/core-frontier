function createDynamicUI() {
  removeElement(
    "bottom-controls"
  );

  removeElement(
    "speed-controls"
  );

  removeElement(
    "zoom-controls"
  );

  removeElement(
    "build-panel"
  );

  createBottomControls();

  createSpeedControls();

  createZoomControls();

  createBuildPanel();
}

// ---------- MAIN CONTROLS ----------

function createBottomControls() {
  const panel =
    document.createElement(
      "div"
    );

  panel.id =
    "bottom-controls";

  applyFixedStyle(panel, {
    left: "50%",

    bottom:
      getBottomOffset(),

    transform:
      "translateX(-50%)",

    display: "flex",

    gap:
      uiLayout.compact
        ? "6px"
        : "8px",

    padding:
      uiLayout.compact
        ? "8px"
        : "10px",

    borderRadius: "14px",

    background:
      "rgba(0,0,0,0.72)",

    zIndex: "30",

    maxWidth:
      "calc(100vw - 20px)"
  });

  // ---------- BUILD ----------

  const buildButton =
    createUIButton(
      uiLayout.compact
        ? "🏹"
        : "🏹 Башня",

      uiState.mode ===
      UI_MODES.BUILD
        ? "#d9a441"
        : "#2f6b3c",

      () => {
        // Если открыто меню/codex —
        // сначала закрываем.
        uiState.menuOpen =
          false;

        uiState.infoPanelOpen =
          false;

        if (
          uiState.mode ===
          UI_MODES.BUILD
        ) {
          resetUIMode();

          uiState.selectedMode =
            null;

          uiState.pendingBuildTile =
            null;
        } else {
          setUIMode(
            UI_MODES.BUILD
          );

          uiState.selectedMode =
            "build";
        }

        createDynamicUI();
      }
    );

  // ---------- WAVE ----------

  const waveButton =
    createUIButton(
      uiLayout.compact
        ? "⚔️"
        : "⚔️ Бой",

      "#8a5a2b",

      () => {
        // Во время menu/codex
        // бой не стартует.
        if (
          uiState.menuOpen ||
          uiState.infoPanelOpen
        ) {
          return;
        }

        startWave();
      }
    );

  // ---------- CODEX ----------

  const codexButton =
    createUIButton(
      uiLayout.compact
        ? "📘"
        : "📘 Codex",

      uiState.infoPanelOpen
        ? "#d9a441"
        : "#33445f",

      () => {
        uiState.menuOpen =
          false;

        if (
          uiState.infoPanelOpen
        ) {
          uiState.infoPanelOpen =
            false;

          resetUIMode();
        } else {
          uiState.infoPanelOpen =
            true;

          setUIMode(
            UI_MODES.CODEX
          );
        }

        createDynamicUI();
      }
    );

  // ---------- MENU ----------

  const menuButton =
    createUIButton(
      uiLayout.compact
        ? "☰"
        : "☰ Меню",

      uiState.menuOpen
        ? "#d9a441"
        : "#444444",

      () => {
        uiState.infoPanelOpen =
          false;

        if (
          uiState.menuOpen
        ) {
          uiState.menuOpen =
            false;

          resetUIMode();
        } else {
          uiState.menuOpen =
            true;

          setUIMode(
            UI_MODES.MENU
          );
        }

        createDynamicUI();
      }
    );

  panel.appendChild(
    buildButton
  );

  panel.appendChild(
    waveButton
  );

  panel.appendChild(
    codexButton
  );

  panel.appendChild(
    menuButton
  );

  document.body.appendChild(
    panel
  );
}

// ---------- SPEED ----------

function createSpeedControls() {
  const panel =
    document.createElement(
      "div"
    );

  panel.id =
    "speed-controls";

  applyFixedStyle(panel, {
    right:
      getRightOffset(),

    top:
      getTopOffset(),

    display: "flex",

    flexDirection:
      uiLayout.isLandscape
        ? "column"
        : "row",

    gap: "6px",

    padding: "6px",

    borderRadius: "12px",

    background:
      "rgba(0,0,0,0.72)",

    zIndex: "25"
  });

  [1, 2, 3].forEach(
    speed => {
      const button =
        createUIButton(
          "x" + speed,

          gameSpeed ===
          speed
            ? "#d9a441"
            : "#2f6b3c",

          () => {
            gameSpeed =
              speed;

            updateTopbar();

            notify(
              "Скорость x" +
                speed,
              "info"
            );

            createDynamicUI();
          }
        );

      panel.appendChild(
        button
      );
    }
  );

  document.body.appendChild(
    panel
  );
}

// ---------- ZOOM ----------

function createZoomControls() {
  const panel =
    document.createElement(
      "div"
    );

  panel.id =
    "zoom-controls";

  applyFixedStyle(panel, {
    right:
      getRightOffset(),

    top:
      getZoomTopOffset(),

    display: "flex",

    flexDirection:
      uiLayout.isLandscape
        ? "column"
        : "row",

    gap: "6px",

    padding: "6px",

    borderRadius: "12px",

    background:
      "rgba(0,0,0,0.72)",

    zIndex: "25"
  });

  const minus =
    createUIButton(
      "−",
      "#33445f",

      () => {
        zoomAt(
          canvas.width / 2,
          canvas.height / 2,
          camera.zoom - 0.1
        );
      }
    );

  const plus =
    createUIButton(
      "+",
      "#33445f",

      () => {
        zoomAt(
          canvas.width / 2,
          canvas.height / 2,
          camera.zoom + 0.1
        );
      }
    );

  const reset =
    createUIButton(
      "⟲",
      "#444444",

      () => {
        resetZoom(true);
      }
    );

  panel.appendChild(minus);
  panel.appendChild(plus);
  panel.appendChild(reset);

  document.body.appendChild(
    panel
  );
}

// ---------- BUILD PANEL ----------

function createBuildPanel() {
  const oldPanel =
    document.getElementById(
      "build-panel"
    );

  if (oldPanel) {
    oldPanel.remove();
  }

  // Важно:
  // panel создается
  // только в BUILD mode.
  if (
    uiState.mode !==
    UI_MODES.BUILD
  ) {
    return;
  }

  const panel =
    document.createElement(
      "div"
    );

  panel.id =
    "build-panel";

  applyFixedStyle(panel, {
    left: "50%",

    bottom:
      uiLayout.compact
        ? "78px"
        : "92px",

    transform:
      "translateX(-50%)",

    display: "flex",

    alignItems:
      "center",

    gap: "6px",

    padding:
      uiLayout.compact
        ? "8px"
        : "10px",

    borderRadius: "12px",

    background:
      "rgba(0,0,0,0.82)",

    zIndex: "35",

    maxWidth:
      "calc(100vw - 20px)"
  });

  const text =
    document.createElement(
      "div"
    );

  text.style.color =
    "white";

  text.style.fontSize =
    uiLayout.compact
      ? "11px"
      : "13px";

  text.style.minWidth =
    "120px";

  if (
    !uiState.pendingBuildTile
  ) {
    text.innerText =
      "Выбери клетку";
  } else {
    text.innerText =
      "Построить башню";
  }

  const confirm =
    createUIButton(
      uiLayout.compact
        ? "✔"
        : "Построить",

      "#2f6b3c",

      () => {
        confirmBuild();
      }
    );

  const cancel =
    createUIButton(
      uiLayout.compact
        ? "✖"
        : "Отмена",

      "#8a2d2d",

      () => {
        uiState.pendingBuildTile =
          null;

        uiState.selectedMode =
          null;

        resetUIMode();

        createDynamicUI();
      }
    );

  panel.appendChild(text);

  panel.appendChild(confirm);

  panel.appendChild(cancel);

  document.body.appendChild(
    panel
  );
}