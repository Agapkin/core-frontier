# Repository Map Discovery 03 — UI Render / Control

## 1. Назначение batch-файла

Этот файл является bounded extraction batch для repository cognition discovery.

Batch ownership:

- `js/ui/controls.js`
- `js/ui/canvas_world.js`
- `js/ui/canvas_entities.js`

Этот файл предназначен для:

- source-faithful AI-readable markup extraction;
- verification blocks;
- mismatch visibility;
- correction candidate tracking;
- cognition-maintenance continuation.

Repository truth remains:

- actual code;
- actual runtime behavior.

Headers remain:

- interpretation layer;
- AI-readable markup;
- verification candidates.

This file is NOT:

- `repository_map.yml`;
- parser/scanner output;
- automation layer;
- governance system.

If markup and code diverge:

- code wins;
- divergence must remain visible explicitly;
- source wording must not be silently normalized.

---

## 2. Batch status

Batch: 03 — UI render/control.

Status:

- extracted;
- source-faithful markup preserved;
- verification blocks added;
- controls.js ownership interpretation corrected after cross-file verification;
- call-site vs ownership distinction explicitly preserved;
- no active source-header correction candidates remain;
- source JS not mutated.

Source files:

- `js/ui/controls.js`
- `js/ui/canvas_world.js`
- `js/ui/canvas_entities.js`

Cross-verification source:

- `docs/project/architecture/runtime_structure.md`

---

## 3. `js/ui/controls.js`

File: `js/ui/controls.js`

source_read_status: fully read for Batch 03 extraction pass; ownership interpretation corrected after cross-file verification.

### Header extraction — source-faithful

```text
CORE FRONTIER — UI Controls
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/ui/controls.js
РОЛЬ: DOM controls layer, runtime command bridge и callback wiring layer.
СТАТУС: UI command/control layer; generic input abstraction и command routing architecture НЕ реализованы.
ВЛАДЕЕТ: createDynamicUI(), createBottomControlPanel(), createUtilityControls(), createSpeedControls(), createZoomControls(), createTowerActionPanel(), createBuildConfirmPanel()
НЕ ВЛАДЕЕТ: gameplay logic, placement validation, tower combat, enemy update, wave lifecycle, camera state ownership, hotkey system, generic object action framework.
ЧИТАЕТ: uiState, gameState, waveState, gameSpeed, camera, canvas, uiLayout.
ИЗМЕНЯЕТ: DOM controls/panels, local UI visibility state, runtime command callbacks.
ИСПОЛЬЗУЕТСЯ В: runtime UI rebuild flow, gameplay command dispatch, panels.js visibility/update flow.
RUNTIME-КОНТРАКТ: файл должен загружаться после runtime systems files и before panels.js/game.js.
НЕЛЬЗЯ: менять runtime callbacks или gameplay dispatch semantics без отдельного inspection pass.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: DYNAMIC UI REBUILD / ПЕРЕСБОРКА UI
РОЛЬ: пересобрать runtime UI controls и синхронизировать active panels.
ВКЛЮЧАЕТ: createDynamicUI()
```

Function-level comments:

```text
createDynamicUI(): пересобирает runtime DOM controls и синхронизирует visibility panels.
```

Internal markers preserved:

```text
UI LAYOUT REFRESH
OLD PANEL CLEANUP
CONTROL PANEL REBUILD
TOPBAR VISIBILITY SYNC
```

Observed calls inside section:

```text
updateUILayout()
removeElement("bottom-control-panel")
removeElement("speed-panel")
removeElement("zoom-panel")
removeElement("tower-action-panel")
removeElement("build-confirm-panel")
removeElement("menu-panel")
removeElement("game-over-panel")
createBottomControlPanel()
createUtilityControls()
createTowerActionPanel()
createBuildConfirmPanel()
createMenuPanel()
createGameOverPanel()
updateTopbarVisibility()
```

Ownership interpretation:

```text
createMenuPanel() and createGameOverPanel() are external panel creation functions called by controls.js during dynamic UI rebuild.
They are not declared by controls.js and are not owned by controls.js.
Actual ownership is confirmed in js/ui/panels.js.
This is verified cross-file runtime coupling, not controls.js header omission.

IMPORTANT:
call-site does NOT imply ownership.
Cross-file runtime calls must not automatically become ownership correction candidates.
```

---

```text
СЕКЦИЯ: BOTTOM COMMAND PANEL / НИЖНЯЯ ПАНЕЛЬ КОМАНД
РОЛЬ: создать основные gameplay command buttons.
ВКЛЮЧАЕТ: createBottomControlPanel()
```

Function-level comments:

```text
createBottomControlPanel(): создаёт bottom command panel для build/wave/menu/codex actions.
ТОЧКА РОСТА: build controls могут позже перейти к category/nested build menus.
ВАЖНО: generic build-category system пока НЕ реализована.
```

Internal markers preserved:

```text
PANEL ROOT CREATION
PRIMARY COMMAND BUTTONS
DOM ATTACH
```

Runtime command callbacks observed:

```text
buildTower()
startWave()
uiState.infoPanelOpen toggle
uiState.menuOpen toggle
```

---

```text
СЕКЦИЯ: UTILITY CONTROLS / ВСПОМОГАТЕЛЬНЫЕ КОНТРОЛЫ
РОЛЬ: собрать speed/zoom utility controls.
ВКЛЮЧАЕТ: createUtilityControls()
```

Function-level comments:

```text
createUtilityControls(): создаёт utility control panels для speed и zoom.
```

Observed calls:

```text
createSpeedControls()
createZoomControls()
```

---

```text
СЕКЦИЯ: SPEED CONTROLS / КОНТРОЛЫ СКОРОСТИ
РОЛЬ: создать runtime speed control buttons.
ВКЛЮЧАЕТ: createSpeedControls()
```

Function-level comments:

```text
createSpeedControls(): создаёт speed buttons и dispatch gameSpeed changes.
```

Internal markers preserved:

```text
PANEL ROOT CREATION
SPEED BUTTON CREATION
DOM ATTACH
```

Runtime callback behavior observed:

```text
gameState.gameOver guard
gameSpeed = speed
createDynamicUI()
notify("Скорость игры: x" + speed, "info")
```

---

```text
СЕКЦИЯ: ZOOM CONTROLS / КОНТРОЛЫ ZOOM
РОЛЬ: создать zoom buttons для camera-aware world navigation.
ВКЛЮЧАЕТ: createZoomControls()
```

Function-level comments:

```text
createZoomControls(): создаёт zoom buttons и dispatch camera zoom helpers.
```

Internal markers preserved:

```text
PANEL ROOT CREATION
ZOOM ACTION BUTTONS
DOM ATTACH
```

Runtime callback behavior observed:

```text
zoomAt(canvas.width / 2, canvas.height / 2, camera.zoom - 0.12)
zoomAt(canvas.width / 2, canvas.height / 2, camera.zoom + 0.12)
resetZoom(true)
```