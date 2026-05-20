# Repository Map Discovery 01 — Runtime Orchestration

## 1. Назначение batch-файла

Этот файл является bounded extraction batch для repository cognition discovery.

Batch ownership:

- `js/systems/systems.js`
- `js/game.js`

Этот файл хранит source-faithful AI-readable markup extraction для runtime orchestration pressure layer.

Он НЕ является:

- `repository_map.yml`;
- final repository map;
- parser/scanner output;
- automation layer;
- runtime authority;
- governance system.

Repository truth remains:

- actual code;
- actual runtime behavior.

Headers and comments remain:

- interpretation layer;
- AI-readable markup;
- verification candidates.

If markup and code diverge:

- code wins;
- mismatch must be preserved explicitly;
- source wording must not be silently normalized.

---

## 2. Batch status

Batch: 01 — runtime orchestration.

Status:

- extracted;
- corrected toward source-faithful markup;
- verification blocks added;
- correction candidates identified;
- source JS not mutated.

Source files:

- `js/systems/systems.js`
- `js/game.js`

---

## 3. `js/systems/systems.js`

File: `js/systems/systems.js`

source_read_status: fully re-read for correction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — Stage 02.4.5-A
systems.js — remaining runtime orchestration and lifecycle-heavy systems
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/systems/systems.js
РОЛЬ: orchestration/lifecycle file для button commands, wave start, checkpoint/restart/game over, enemy update, reward flow и tower combat.
СТАТУС: файл разгружен после Stage 03.3 extractions, но НЕ является чистым orchestration shell.
ВЫНЕСЕНО: js/systems/systems_wave_manager.js, js/systems/systems_placement.js, js/systems/systems_selected_object_actions.js
ВЛАДЕЕТ: buildTower(), cancelBuildMode(), startWave(), saveCheckpoint(), retryLastWave(), restartGame(), triggerGameOver(), updateEnemies(), applyReward(), updateTowers()
НЕ ВЛАДЕЕТ: wave generation helpers, placement lifecycle, selected object actions, UI panels, render layer, data/state definitions.
ЧИТАЕТ: gameState, uiState, waveState, checkpoint, resources, base, power, towers, enemies, enemyPath, difficultyProfiles, gameBalance, camera, gameSpeed.
ИЗМЕНЯЕТ: gameState, uiState, waveState, checkpoint, resources, base, power, towers, enemies, camera, gameSpeed.
ИСПОЛЬЗУЕТСЯ В: controls.js, game.js, runtime button flow, update loop.
RUNTIME-КОНТРАКТ: файл должен загружаться после extracted systems files и до ui/* + game.js.
НЕЛЬЗЯ: делать extraction/refactor без отдельного inspection pass.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: BUTTON ACTIONS / UI COMMANDS
РОЛЬ: пользовательские команды запускают build mode, отмену build mode и wave start.
ВКЛЮЧАЕТ: buildTower(), cancelBuildMode(), startWave()
```

Function-level comments:

```text
buildTower(): включает режим строительства tower и сбрасывает selectedTower.
cancelBuildMode(): отключает build mode и очищает pendingBuildTile.
startWave(): запускает новую волну и связывает checkpoint, waveState и spawn flow.
```

Internal markers preserved:

```text
BUTTON ACTIONS
WAVE START GUARDS
CHECKPOINT SAVE
UI SELECTION RESET
WAVE STATE ACTIVATION
WAVE CREATION / SPAWN FLOW
UI FEEDBACK
```

---

```text
СЕКЦИЯ: CHECKPOINT / RESTART / GAME OVER
РОЛЬ: сохранить состояние, восстановить волну, начать новую игру и завершить игру.
ВКЛЮЧАЕТ: saveCheckpoint(), retryLastWave(), restartGame(), triggerGameOver()
```

Function-level comments:

```text
saveCheckpoint(): сохраняет rollback-состояние перед запуском волны.
retryLastWave(): восстанавливает checkpoint и возвращает игру к подготовке перед волной.
restartGame(): полностью сбрасывает runtime state в состояние новой игры.
triggerGameOver(): переводит runtime в game over state и очищает активные enemies/UI selection.
```

Internal markers preserved:

```text
CHECKPOINT / RESTART
CHECKPOINT SNAPSHOT
CHECKPOINT GUARD
CORE STATE RESTORE
CAMERA RESTORE
ENTITY RESTORE
UI STATE RESET
UI REBUILD / FEEDBACK
CORE STATE RESET
CAMERA RESET
ENTITY RESET
```

---

```text
СЕКЦИЯ: UPDATE / ENEMY FLOW
РОЛЬ: обновить enemies, применить base damage и завершить волну.
ВКЛЮЧАЕТ: updateEnemies()
```

Function-level comments:

```text
UPDATE
updateEnemies(): двигает enemies, применяет damage к базе и обрабатывает death/reward flow.
```

Internal markers preserved:

```text
ENEMY MOVEMENT / BASE HIT
ENEMY CLEANUP / DEATH FLOW
WAVE COMPLETION CHECK
```

---

```text
СЕКЦИЯ: RESOURCE / REWARD FLOW
РОЛЬ: начислить reward за уничтоженных enemies.
ВКЛЮЧАЕТ: applyReward()
```

Function-level comments:

```text
applyReward(): начисляет resources с учётом difficulty reward multiplier.
```

---

```text
СЕКЦИЯ: TOWER COMBAT FLOW
РОЛЬ: обновить tower targeting и нанести damage enemies.
ВКЛЮЧАЕТ: updateTowers()
```

Function-level comments:

```text
updateTowers(): ищет цели в range и применяет tower damage.
```

Internal markers preserved:

```text
TARGET ACQUISITION
DAMAGE APPLICATION
```

### Verification block

source_read_status: fully re-read.

header_matches_code: yes.

section_list_matches_code: yes.

function_list_matches_code: yes.

missing_from_header:

- none detected for top-level owned functions;
- source section/internal markers expose more lifecycle detail than header field alone.

header_claims_not_confirmed:

- none detected.

code_confirms:

- file is still lifecycle-heavy;
- file owns button commands, checkpoint/restart/game-over, enemy flow, reward flow and tower combat;
- extracted files reduce scope but do not make `systems.js` clean orchestration shell;
- load-order contract remains important.

code_contradicts:

- none detected.

needs_review:

- extraction/refactor;
- wave lifecycle changes;
- checkpoint shape changes;
- retry/restart lifecycle changes;
- enemy update changes;
- reward flow changes;
- tower combat changes;
- game-over flow changes.

confidence: high for header honesty; medium for future boundary stability.

### Cognition notes

mixed_responsibility: very high.

implicit_contracts:

- `startWave()` connects checkpoint, waveState and spawn flow;
- `retryLastWave()` and `restartGame()` rebuild UI after state mutation;
- `updateEnemies()` handles movement, base damage, cleanup and wave completion;
- `updateTowers()` owns current tower targeting/damage flow;
- `gameLoop()` in `game.js` calls `updateEnemies()` and `updateTowers()`.

hallucination_risks:

- do not label as clean orchestration shell;
- do not assume combat or enemy update are extracted;
- do not treat checkpoint as independent state system;
- do not understate shared mutation pressure.

future_map_relevance: essential.

---

## 4. `js/game.js`

File: `js/game.js`

source_read_status: fully re-read for correction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — Game Runtime Orchestration
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/game.js
РОЛЬ: runtime bootstrap, canvas/input routing, camera helpers, coordinate mapping и main loop sequencing.
СТАТУС: sensitive runtime orchestration file; game engine architecture/input framework/scene manager/ECS НЕ реализованы.
ВЛАДЕЕТ: resizeCanvas(), input event binding, pointer/touch/wheel routing, camera pan/zoom helpers, coordinate helpers, handleTap(), gameLoop().
НЕ ВЛАДЕЕТ: placement validation, tower placement logic, selected object actions, enemy movement internals, tower combat internals, wave generation internals, UI panel rendering internals, entity/world drawing internals.
ЧИТАЕТ: canvas, window, camera, uiState, uiLayout, gameState, gameSpeed, map, TILE_SIZE.
ИЗМЕНЯЕТ: canvas size, camera drag/pinch/zoom/x/y state, uiState.hoveredTile, uiState.selectedTower.
ИСПОЛЬЗУЕТСЯ В: browser runtime startup, canvas event loop, requestAnimationFrame loop.
RUNTIME-КОНТРАКТ: файл должен загружаться после data/state/systems/ui layers and starts final gameLoop().
НЕЛЬЗЯ: менять event binding order, input behavior, camera math, tap routing, update/render order или gameLoop sequence без отдельного inspection pass.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: BOOTSTRAP / RESIZE
РОЛЬ: синхронизировать canvas size, responsive layout, camera bounds и UI refresh.
ВКЛЮЧАЕТ: resizeCanvas(), resize/orientation listeners
```

Function-level comments:

```text
resizeCanvas(): обновляет canvas size и синхронизирует layout/camera/UI после resize.
```

Internal markers preserved:

```text
CANVAS SIZE UPDATE
RESPONSIVE LAYOUT SYNC
CAMERA/UI REFRESH
```

---

```text
СЕКЦИЯ: RUNTIME INIT
РОЛЬ: выполнить initial DOM/UI/power/bootstrap calls перед запуском input и loop.
```

Observed initialization calls:

```text
setupInitialDom()
createDynamicUI()
updatePower()
updateUI()
notify("Stage 02.4.5-A: mobile fix pack активен", "info")
```

---

```text
СЕКЦИЯ: INPUT EVENT BINDING
РОЛЬ: привязать canvas pointer/wheel/touch events к routing helpers.
```

Observed event bindings:

```text
pointerdown → pointerStart
pointermove → pointerMove
pointerup → pointerEnd
pointercancel → pointerEnd
wheel → wheelZoom
touchstart → touchStart
touchmove → touchMove
touchend → touchEnd
```

---

```text
СЕКЦИЯ: POINTER INPUT
РОЛЬ: обработать pointer tap/drag routing и camera pan state.
ВКЛЮЧАЕТ: getCanvasPoint(), getPointer(), getTapThreshold(), pointerStart(), pointerMove(), pointerEnd()
```

Function-level comments:

```text
getCanvasPoint(): переводит client coordinates в canvas-local point.
getPointer(): извлекает canvas-local point из pointer event.
getTapThreshold(): возвращает movement threshold для tap/drag distinction.
pointerStart(): начинает pointer drag/tap tracking и обновляет hovered tile.
pointerMove(): обновляет hover, определяет drag и двигает camera при pan.
ТОЧКА РОСТА: input routing может позже получить отдельную abstraction layer.
ВАЖНО: input framework пока НЕ реализован.
pointerEnd(): завершает pointer routing и dispatch tap если movement threshold не превышен.
```

Internal markers preserved:

```text
HOVER UPDATE
DRAG THRESHOLD CHECK
CAMERA PAN
```

---

```text
СЕКЦИЯ: TOUCH / PINCH INPUT
РОЛЬ: обработать two-finger pinch gesture и передать zoom в camera helper.
ВКЛЮЧАЕТ: touchStart(), touchMove(), touchEnd(), touchDistance(), touchCenter()
```

Function-level comments:

```text
touchStart(): активирует pinch mode при two-finger touch.
ТОЧКА РОСТА: mobile gestures могут позже расшириться за пределы pinch zoom.
ВАЖНО: gesture framework пока НЕ реализован.
touchMove(): рассчитывает pinch ratio и dispatch zoomAt().
touchEnd(): отключает pinch mode когда two-finger touch завершён.
touchDistance(): рассчитывает distance между двумя touch points.
touchCenter(): рассчитывает canvas-local center между двумя touch points.
```

---

```text
СЕКЦИЯ: CAMERA / ZOOM
РОЛЬ: изменить camera zoom/x/y state и удерживать camera внутри map bounds.
ВКЛЮЧАЕТ: wheelZoom(), zoomAt(), resetZoom(), clampCamera()
```

Function-level comments:

```text
wheelZoom(): routes wheel delta into zoomAt() вокруг pointer position.
zoomAt(): меняет camera.zoom и сохраняет world point под screen position.
ТОЧКА РОСТА: camera controls могут позже потребовать отдельной stabilization layer.
ВАЖНО: camera subsystem пока НЕ реализован.
resetZoom(): сбрасывает camera zoom/position и опционально показывает notification.
clampCamera(): ограничивает camera.x/y текущими map bounds.
```

---

```text
СЕКЦИЯ: COORDINATE MAPPING
РОЛЬ: переводить coordinates между screen, world и tile spaces для input/render routing.
ВКЛЮЧАЕТ: updateHoveredTile(), screenToWorld(), screenToTile(), worldToScreen(), scaled()
```

Function-level comments:

```text
updateHoveredTile(): сохраняет hovered tile на основе screen coordinates.
screenToWorld(): переводит screen coordinates в world coordinates с учётом camera.
screenToTile(): переводит screen coordinates в tile coordinates через world coordinates.
worldToScreen(): переводит world coordinates в screen coordinates с учётом camera.
scaled(): масштабирует value через current camera.zoom.
```

---

```text
СЕКЦИЯ: TAP ROUTING
РОЛЬ: маршрутизировать tap в placement или selected object flow без ownership над этими systems.
ВКЛЮЧАЕТ: handleTap()
```

Function-level comments:

```text
handleTap(): routes tap to placement selection, tower selection, or selection clear.
ТОЧКА РОСТА: tap routing может позже получить mode/state routing rules.
ВАЖНО: command router/scene manager пока НЕ реализованы.
```

Internal markers preserved:

```text
TILE RESOLUTION
BUILD MODE ROUTING
TOWER SELECTION ROUTING
```

---

```text
СЕКЦИЯ: MAIN LOOP / UPDATE-RENDER SEQUENCING
РОЛЬ: orchestrate update phase, render phase, UI overlays and next animation frame.
ВКЛЮЧАЕТ: gameLoop()
```

Function-level comments:

```text
gameLoop(): выполняет fixed order update/render orchestration и запрашивает следующий frame.
ТОЧКА РОСТА: loop orchestration может позже учитывать pause/state modes.
ВАЖНО: game engine/scene manager/ECS пока НЕ реализованы.
```

Internal markers preserved:

```text
UPDATE PHASE
WORLD RENDER PHASE
ENTITY RENDER PHASE
UI/HUD RENDER PHASE
DOM VISIBILITY SYNC
NEXT FRAME REQUEST
```

### Verification block

source_read_status: fully re-read.

header_matches_code: yes.

section_list_matches_code: yes.

function_list_matches_code: yes.

missing_from_header:

- `RUNTIME INIT` section has no named function ownership but is real runtime startup sequence;
- event listener bindings are correctly declared as owned, not individual function-only ownership.

header_claims_not_confirmed:

- none detected.

code_confirms:

- file owns runtime bootstrap, input routing, camera helpers, coordinate mapping and `gameLoop()` sequencing;
- no input framework, scene manager, game engine or ECS is implemented;
- placement validation, selected object actions, enemy movement internals, tower combat internals and render internals are external to this file;
- update/render order is fixed inside `gameLoop()`.

code_contradicts:

- none detected.

needs_review:

- event binding order changes;
- input behavior changes;
- camera math changes;
- tap routing changes;
- update/render order changes;
- `gameLoop()` sequence changes;
- extraction of input/camera/loop subsystems.

confidence: high for header honesty; medium/high for boundary understanding; verification still required before runtime changes.

### Cognition notes

mixed_responsibility: high, but intentionally centralized around runtime orchestration.

implicit_contracts:

- file loads after data/state/systems/ui layers;
- `resizeCanvas()` can rebuild UI;
- pointer/touch/wheel bindings route into camera and tap systems;
- coordinate helpers are shared by input and rendering;
- `handleTap()` bridges into placement and selected object actions without owning them;
- `gameLoop()` fixed order controls update/render/UI overlay/DOM visibility sequence.

hallucination_risks:

- do not infer input framework;
- do not infer camera subsystem;
- do not infer scene manager/game engine;
- do not infer ECS;
- do not conceptually split input/camera/loop before actual code extraction exists.

future_map_relevance: essential.

---

## 5. Correction candidates after Batch 01

### `js/systems/systems.js`

Correction candidate status:

- no direct contradiction;
- header is honest but compact;
- source section/internal markers expose more lifecycle density than top header fields.

Possible future source-markup correction:

- optional, not urgent;
- could expand header visibility around lifecycle density if repeated drift appears.

Correction class:

- honest-but-compact header;
- implicit runtime contract visibility.

---

### `js/game.js`

Correction candidate status:

- no direct contradiction;
- header is honest;
- `RUNTIME INIT` is operationally real but not represented as named ownership function.

Possible future source-markup correction:

- optional/low urgency;
- could clarify bootstrap/init responsibility if future extraction depends on it.

Correction class:

- honest-but-compact header;
- implicit runtime contract visibility.

---

## 6. Batch 01 closure state

Completed corrected extraction batch:

- Batch 01 / Batch A — runtime orchestration:
  - `js/systems/systems.js`
  - `js/game.js`

Correction status:

- Batch A wording corrected from normalized/paraphrased extraction toward source-faithful markup extraction.

Integrated extraction types:

- top file header wording;
- ROLE / STATUS / EXTRACTED OUT where present;
- OWNS / DOES NOT OWN;
- READS / MUTATES;
- USED BY;
- RUNTIME CONTRACT;
- FORBIDDEN CHANGES;
- section headers exactly;
- section roles exactly;
- INCLUDED functions exactly;
- function-level role comments as close to source wording as possible;
- GROWTH POINTS / IMPORTANT notes where present;
- operationally meaningful internal section markers;
- verification blocks with explicit mismatch fields.

Next extraction batch:

- `docs/project/architecture/repository_map_discovery_02_extracted_systems.md`

Do not repeat Batch 01 unless repository drift or visibility uncertainty appears.
