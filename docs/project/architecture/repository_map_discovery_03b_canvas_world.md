# Repository Map Discovery 03b — Canvas World Rendering

## 1. Назначение sub-batch-файла

Sub-batch ownership:

- `js/ui/canvas_world.js`

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
- render/placement-overlay boundary verified;
- source JS not mutated.

Source file:

- `js/ui/canvas_world.js`

---

## 3. `js/ui/canvas_world.js`

File: `js/ui/canvas_world.js`

source_read_status: fully read during Batch 03 restoration pass.

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

## 4. Correction candidates after 03b

Correction candidate status:

- no active source-header correction required.

Correction class:

- none currently active.

Recommended source-markup correction:

- not needed now.

---

## 5. 03b closure state

Completed sub-batch:

- 03b — Canvas world rendering:
  - `js/ui/canvas_world.js`

Extraction status:

- source-faithful extraction completed;
- verification block added;
- render/placement-overlay boundary preserved;
- no active source-header correction candidates remain;
- source JS not mutated.

Do not repeat 03b unless repository drift or visibility uncertainty appears.
