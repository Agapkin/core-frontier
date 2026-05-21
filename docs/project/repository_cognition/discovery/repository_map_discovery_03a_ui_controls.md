# Repository Map Discovery 03a — UI Controls

## 1. Назначение sub-batch-файла

Sub-batch ownership:

- `js/ui/controls.js`

Этот файл является bounded extraction sub-batch для Batch 03 UI render/control discovery mini-chain.

Repository truth remains:

- actual code;
- actual runtime behavior.

Headers and comments remain interpretation layer and verification candidates.

This file is NOT `repository_map.yml`, parser/scanner output, automation layer or governance system.

---

## 2. Batch status

Status:

- extracted from fresh source read;
- cross-file ownership verified with `js/ui/panels.js` for `createMenuPanel()` / `createGameOverPanel()`;
- call-site vs ownership distinction preserved;
- source JS not mutated.

Source file:

- `js/ui/controls.js`

Cross-file verification source:

- `js/ui/panels.js`

---

## 3. `js/ui/controls.js`

File: `js/ui/controls.js`

source_read_status: fully read during Batch 03 restoration pass.

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

Observed calls:

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

Runtime callbacks:

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

Runtime callback behavior:

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

Runtime callbacks:

```text
zoomAt(canvas.width / 2, canvas.height / 2, camera.zoom - 0.12)
zoomAt(canvas.width / 2, canvas.height / 2, camera.zoom + 0.12)
resetZoom(true)
```

---

```text
СЕКЦИЯ: SELECTED OBJECT ACTION CONTROLS
РОЛЬ: создать action controls для выбранного placed object.
ВКЛЮЧАЕТ: createTowerActionPanel()
```

Function-level comments:

```text
createTowerActionPanel(): создаёт action panel для selected tower/object actions.
ТОЧКА РОСТА: current implementation tower-specific; future selected object actions pressure.
ВАЖНО: generic object action system пока НЕ реализован.
```

Internal markers preserved:

```text
PANEL ROOT CREATION
OBJECT ACTION BUTTONS
DOM ATTACH
```

Runtime callbacks:

```text
sellSelectedTower()
notify("Улучшение недоступно: нужна технология", "warning")
```

---

```text
СЕКЦИЯ: BUILD CONFIRM CONTROLS / КОНТРОЛЫ ПОДТВЕРЖДЕНИЯ СТРОИТЕЛЬСТВА
РОЛЬ: создать confirm/cancel controls для placement flow.
ВКЛЮЧАЕТ: createBuildConfirmPanel()
```

Function-level comments:

```text
createBuildConfirmPanel(): создаёт build confirm panel и dispatch placement commands.
```

Internal markers preserved:

```text
PANEL ROOT CREATION
BUILD STATUS TEXT
BUILD ACTION BUTTONS
DOM ATTACH
```

Runtime callbacks:

```text
confirmBuild()
cancelBuildMode()
```

### Verification block

source_read_status: fully read.

header_matches_code: yes.

section_list_matches_code: yes for controls-owned sections.

function_list_matches_code: yes for controls-owned functions.

missing_from_header:

- none detected after cross-file ownership verification.

header_claims_not_confirmed:

- none detected for listed ownership items;
- command routing architecture remains explicitly non-implemented, which code confirms.

code_confirms:

- file is DOM controls layer and runtime command bridge, not pure UI rendering;
- `createDynamicUI()` rebuilds runtime DOM controls and active panels;
- callbacks dispatch directly into gameplay/runtime functions: `buildTower()`, `startWave()`, `sellSelectedTower()`, `confirmBuild()`, `cancelBuildMode()`, `zoomAt()`, `resetZoom()`;
- `createMenuPanel()` and `createGameOverPanel()` are external panel creation calls owned by `js/ui/panels.js`, not by `controls.js`;
- not every function call implies ownership;
- generic input abstraction and command routing architecture are not implemented.

code_contradicts:

- none detected.

needs_review:

- cross-file runtime coupling between `controls.js` and `panels.js`;
- command routing changes;
- callback semantics changes;
- dynamic UI rebuild lifecycle changes;
- selected object action UI changes;
- build confirm UI changes;
- generic command routing migration.

confidence: high for role honesty; medium/high for ownership boundary after cross-file verification.

### Cognition notes

mixed_responsibility: high.

implicit_contracts:

- controls create DOM but dispatch runtime/gameplay callbacks directly;
- `createDynamicUI()` removes/recreates fixed DOM panel ids;
- `createDynamicUI()` calls external panel creation functions owned by `panels.js`;
- speed controls mutate global `gameSpeed` and recursively rebuild UI;
- zoom controls call camera helpers owned by `game.js`;
- selected object action panel dispatches to selected object system;
- build confirm panel dispatches to placement system.

cross_file_runtime_coupling:

- `controls.js` orchestrates dynamic UI rebuild;
- `panels.js` owns `createMenuPanel()` and `createGameOverPanel()`;
- `controls.js` depends on those external panel creation functions being available at runtime;
- this may represent future refactor pressure but not current ownership contradiction.

hallucination_risks:

- do not treat `controls.js` as pure presentation/rendering;
- do not infer generic command router;
- do not infer generic object action framework;
- do not treat calls to `createMenuPanel()` / `createGameOverPanel()` as controls.js ownership;
- do not assign gameplay logic ownership to controls despite direct callbacks.

future_map_relevance: essential for UI/runtime command bridge and cross-file runtime coupling cognition.

---

## 4. Correction candidates after 03a

Correction candidate status:

- no active source-header correction required.

Resolved interpretation:

- `createMenuPanel()` and `createGameOverPanel()` are not controls.js ownership omissions;
- they are external panel creation dependencies;
- actual ownership remains in `js/ui/panels.js`;
- controls.js orchestrates dynamic UI rebuild and calls these external functions at runtime.

Correction class:

- previously suspected incomplete ownership visibility;
- reclassified as verified cross-file runtime coupling.

Recommended source-markup correction:

- not needed now.

---

## 5. 03a closure state

Completed sub-batch:

- 03a — UI controls:
  - `js/ui/controls.js`

Extraction status:

- source-faithful extraction completed;
- verification block added;
- controls.js ownership interpretation corrected after cross-file verification;
- no active source-header correction candidates remain;
- source JS not mutated.

Do not repeat 03a unless repository drift or visibility uncertainty appears.
