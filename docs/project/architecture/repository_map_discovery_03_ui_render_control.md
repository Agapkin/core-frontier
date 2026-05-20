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

Runtime callback behavior observed:

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

Runtime callback behavior observed:

```text
confirmBuild()
cancelBuildMode()
```

### Verification block

source_read_status: fully read; cross-file ownership interpretation corrected after panels.js verification.

header_matches_code: yes.

section_list_matches_code: yes for controls-owned sections.

function_list_matches_code: yes for controls-owned functions.

missing_from_header:

- none detected after cross-file ownership correction.

header_claims_not_confirmed:

- none detected for listed ownership items;
- command routing architecture remains explicitly non-implemented, which code confirms.

code_confirms:

- file is DOM controls layer and runtime command bridge, not pure UI rendering;
- `createDynamicUI()` rebuilds runtime DOM controls and active panels;
- callbacks dispatch directly into gameplay/runtime functions: `buildTower()`, `startWave()`, `sellSelectedTower()`, `confirmBuild()`, `cancelBuildMode()`, `zoomAt()`, `resetZoom()`;
- `createMenuPanel()` and `createGameOverPanel()` are external panel creation calls owned by `js/ui/panels.js`, not by `controls.js`;
- not every function call implies ownership;
- generic input abstraction and command routing architecture are not implemented;
- selected object action controls remain tower-specific in behavior.

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
- build confirm panel dispatches to placement system;
- UI naming can hide runtime command bridge responsibility.

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

## 4. `js/ui/canvas_world.js`

File: `js/ui/canvas_world.js`

source_read_status: fully read for Batch 03 extraction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — Canvas World Rendering
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/ui/canvas_world.js
РОЛЬ: world-space rendering, terrain/tile rendering и placement overlay visualization.
СТАТУС: render helper layer; generic render engine / layer manager НЕ реализован.
ВЛАДЕЕТ: drawRectWorld(), drawTextWorld(), drawMap(), drawRoadTiles(), drawPathLine(), drawBase(), drawTowerRange(), drawBuildTile(), drawBuildOverlay()
НЕ ВЛАДЕЕТ: gameplay simulation, placement lifecycle, placement validation, enemy update, tower combat, pathfinding, occupancy rules, camera state ownership.
ЧИТАЕТ: ctx, canvas, camera, map, TILE_SIZE, roadTiles, enemyPath, base, towerTypes, uiState.
ИЗМЕНЯЕТ: canvas drawing state только во время render pass.
ИСПОЛЬЗУЕТСЯ В: game render flow, world rendering pass, placement overlay rendering.
RUNTIME-КОНТРАКТ: файл должен загружаться после ui helpers/layout и после runtime state/functions, до game render usage.
НЕЛЬЗЯ: менять draw order, camera math или placement validation semantics без отдельного inspection pass.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: CAMERA-AWARE WORLD RENDER HELPERS
РОЛЬ: рисовать primitives в world coordinates через worldToScreen()/scaled().
ВКЛЮЧАЕТ: drawRectWorld(), drawTextWorld()
```

Function-level comments:

```text
drawRectWorld(): рисует world-space rectangle через camera-aware transform helpers.
drawTextWorld(): рисует text в world coordinates через camera-aware transform helpers.
```

---

```text
СЕКЦИЯ: WORLD / TERRAIN RENDER
РОЛЬ: рисовать базовый фон мира и visible map grid.
ВКЛЮЧАЕТ: drawMap()
```

Function-level comments:

```text
drawMap(): рисует background и grid только для visible camera area.
```

Internal markers preserved:

```text
BACKGROUND FILL
VISIBLE TILE RANGE CALCULATION
VISIBLE GRID DRAW
```

---

```text
СЕКЦИЯ: ROAD / PATH / BASE RENDER
РОЛЬ: рисовать road tiles, enemy path line и base marker.
ВКЛЮЧАЕТ: drawRoadTiles(), drawPathLine(), drawBase()
```

Function-level comments:

```text
drawRoadTiles(): визуализирует roadTiles occupancy set как world-space tiles.
drawPathLine(): рисует enemyPath как camera-aware route line.
drawBase(): рисует base marker без владения base gameplay state.
```

---

```text
СЕКЦИЯ: HIGHLIGHT / SELECTION OVERLAYS
РОЛЬ: рисовать tower range/highlight overlays.
ВКЛЮЧАЕТ: drawTowerRange()
```

Function-level comments:

```text
drawTowerRange(): визуализирует tower range overlay без tower combat ownership.
```

---

```text
СЕКЦИЯ: PLACEMENT PREVIEW / BUILD OVERLAY
РОЛЬ: визуализировать hovered/pending build tiles и placement validity.
ВКЛЮЧАЕТ: drawBuildTile(), drawBuildOverlay()
ВАЖНО: визуализирует placement state, но НЕ владеет placement validation.
```

Function-level comments:

```text
drawBuildTile(): визуализирует candidate build tile, validation result и tower preview.
ТОЧКА РОСТА: placement overlays могут позже поддержать non-tower placeable objects.
ВАЖНО: generic placeable visualization system пока НЕ реализован.
drawBuildOverlay(): рисует hovered и pending placement overlays для build mode.
ТОЧКА РОСТА: overlay ordering may later need explicit render-layer discipline.
ВАЖНО: render engine / layer manager пока НЕ реализован.
```

Internal markers preserved:

```text
PLACEMENT STATE READ
VALIDITY TILE OVERLAY
RANGE PREVIEW
TOWER BODY PREVIEW
```

### Verification block

source_read_status: fully read.

header_matches_code: yes.

section_list_matches_code: yes.

function_list_matches_code: yes.

missing_from_header:

- none detected.

header_claims_not_confirmed:

- none detected.

code_confirms:

- file is render helper layer and does not own placement lifecycle;
- placement preview reads `validateBuildTile()` result for visualization but does not own validation;
- camera transforms are provided externally by `game.js` helpers;
- generic render engine / layer manager is not implemented;
- generic placeable visualization system is not implemented;
- render pass mutates canvas drawing state only.

code_contradicts:

- none detected.

needs_review:

- draw order changes;
- camera transform changes;
- placement validation semantics changes;
- build overlay ordering changes;
- generic placeable visualization migration;
- render-layer discipline changes.

confidence: high for header honesty; medium/high for boundary stability.

### Cognition notes

mixed_responsibility: medium.

implicit_contracts:

- render helpers depend on `worldToScreen()` and `scaled()` from `game.js`;
- placement overlay reads placement validation result but does not own rules;
- draw order is controlled by `gameLoop()`;
- world render helpers are reused by entity render file;
- preview rendering remains tower-specific while future non-tower placeable pressure exists.

hallucination_risks:

- do not assign placement ownership to render overlay;
- do not infer generic render engine;
- do not infer generic placeable visualization system;
- do not hide camera transform dependency.

future_map_relevance: essential for render/placement-overlay boundary cognition.

---

## 5. `js/ui/canvas_entities.js`

File: `js/ui/canvas_entities.js`

source_read_status: fully read for Batch 03 extraction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — Canvas Entity Rendering
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/ui/canvas_entities.js
РОЛЬ: entity render layer для towers, enemies, selected tower highlight, target lines и HP bars.
СТАТУС: render-only visualization layer; generic entity render system / ECS pipeline НЕ реализованы.
ВЛАДЕЕТ: drawTowers(), drawEnemies()
НЕ ВЛАДЕЕТ: enemy movement/update, tower targeting logic, damage calculation, combat rules, selected object actions, placement lifecycle, tower creation, enemy spawning, gameplay mutations.
ЧИТАЕТ: towers, towerTypes, uiState.selectedTower, enemies, enemyTypes, TILE_SIZE, ctx, worldToScreen(), scaled(), drawRectWorld(), drawTextWorld().
ИЗМЕНЯЕТ: canvas drawing state только во время render pass.
ИСПОЛЬЗУЕТСЯ В: game render flow, entity rendering pass.
RUNTIME-КОНТРАКТ: файл должен загружаться после canvas_world helpers и runtime state, до game render usage.
НЕЛЬЗЯ: менять draw order, combat semantics или targeting ownership без отдельного inspection pass.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: TOWER ENTITY RENDER / РЕНДЕР БАШЕН
РОЛЬ: визуализировать towers, selected tower highlight и target lines.
ВКЛЮЧАЕТ: drawTowers()
ВАЖНО: target lines визуализируют tower.target, но НЕ выбирают цель.
```

Function-level comments:

```text
drawTowers(): визуализирует towers, selected tower highlight и target lines без combat ownership.
ТОЧКА РОСТА: selected highlight может позже поддержать non-tower placeable objects.
ВАЖНО: generic entity render system пока НЕ реализован.
```

Internal markers preserved:

```text
SELECTED TOWER HIGHLIGHT
TOWER BODY / ICON
TARGET LINE VISUALIZATION
```

---

```text
СЕКЦИЯ: ENEMY ENTITY RENDER / РЕНДЕР ВРАГОВ
РОЛЬ: визуализировать enemies, body shapes и HP bars.
ВКЛЮЧАЕТ: drawEnemies()
ВАЖНО: HP bars визуализируют enemy.hp, но НЕ владеют damage/death flow.
```

Function-level comments:

```text
drawEnemies(): визуализирует enemy shapes и HP bars без enemy update ownership.
ТОЧКА РОСТА: enemy rendering may later show status effects/projectile impact visuals.
ВАЖНО: projectile/status-effect render system пока НЕ реализован.
```

Internal markers preserved:

```text
ENEMY BODY SHAPE
ENEMY HEALTH BAR
```

### Verification block

source_read_status: fully read.

header_matches_code: yes.

section_list_matches_code: yes.

function_list_matches_code: yes.

missing_from_header:

- none detected.

header_claims_not_confirmed:

- none detected.

code_confirms:

- file is render-only visualization layer;
- file does not own enemy movement/update, tower targeting, damage calculation, combat rules or gameplay mutations;
- target lines visualize `tower.target` but do not choose target;
- HP bars visualize `enemy.hp` but do not own damage/death flow;
- generic entity render system / ECS pipeline is not implemented;
- canvas drawing state is mutated only during render pass.

code_contradicts:

- none detected.

needs_review:

- draw order changes;
- combat visual semantics changes;
- targeting ownership changes;
- generic entity render migration;
- ECS/render pipeline migration;
- projectile/status-effect render additions.

confidence: high for header honesty; high for current render-only boundary.

### Cognition notes

mixed_responsibility: low/medium.

implicit_contracts:

- depends on `drawRectWorld()`, `drawTextWorld()`, `worldToScreen()`, `scaled()`;
- reads tower/enemy state but does not mutate gameplay;
- selected highlight remains tower-specific;
- target line visualization depends on `tower.target` assigned elsewhere;
- HP bar visualization depends on enemy hp/maxHp state assigned elsewhere.

hallucination_risks:

- do not infer ECS/entity render pipeline;
- do not infer tower targeting ownership;
- do not infer damage/death flow ownership;
- do not infer generic entity renderer.

future_map_relevance: important for render-only boundary confirmation.

---

## 6. Correction candidates after Batch 03

### `js/ui/controls.js`

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

Future review class:

- ownership-boundary review zone / possible refactor pressure;
- not current source-header correction.

Recommended source-markup correction:

- not needed now.

---

### `js/ui/canvas_world.js`

Correction candidate status:

- no direct contradiction;
- no missing top-level ownership detected;
- header is honest and source-faithful.

Correction class:

- none currently active.

Recommended source-markup correction:

- not needed now.

---

### `js/ui/canvas_entities.js`

Correction candidate status:

- no direct contradiction;
- no missing top-level ownership detected;
- header is honest and source-faithful.

Correction class:

- none currently active.

Recommended source-markup correction:

- not needed now.

---

## 7. Batch 03 closure state

Completed extraction batch:

- Batch 03 — UI render/control:
  - `js/ui/controls.js`
  - `js/ui/canvas_world.js`
  - `js/ui/canvas_entities.js`

Extraction status:

- source-faithful extraction completed;
- verification blocks added;
- controls.js ownership interpretation corrected after cross-file verification;
- no active source-header correction candidates remain;
- source JS not mutated.

Integrated extraction types:

- top file header wording;
- ROLE / STATUS;
- OWNS / DOES NOT OWN;
- READS / MUTATES;
- USED BY;
- RUNTIME CONTRACT;
- FORBIDDEN CHANGES;
- section headers;
- section roles;
- boundary notes;
- function-level role comments;
- growth points;
- important notes;
- operationally meaningful internal markers;
- verification blocks with explicit mismatch fields;
- correction candidate classification;
- cross-file runtime coupling classification.

Batch structural compatibility:

- compatible with Batch 01 and Batch 02 extraction style;
- new observed pattern: UI command bridge callbacks and cross-file panel creation dependencies require runtime coupling classification, not automatic ownership correction.

Next safe direction:

- no Batch 03 source-header correction is currently required;
- after explicit instruction, consider template stabilization pass for cross-file runtime coupling notation.

Do not repeat Batch 03 unless repository drift or visibility uncertainty appears.
