# Repository Map Discovery 02 — Extracted Systems

## 1. Назначение batch-файла

Этот файл является bounded extraction batch для repository cognition discovery.

Batch ownership:

- `js/systems/systems_placement.js`
- `js/systems/systems_selected_object_actions.js`

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

Batch: 02 — extracted systems.

Status:

- extracted;
- source-faithful markup preserved;
- verification blocks added;
- correction candidates identified;
- source JS not mutated.

Source files:

- `js/systems/systems_placement.js`
- `js/systems/systems_selected_object_actions.js`

Cross-verification source:

- `docs/project/architecture/runtime_structure.md`

---

## 3. `js/systems/systems_placement.js`

File: `js/systems/systems_placement.js`

source_read_status: fully read for Batch 02 extraction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — Placement helpers
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/systems/systems_placement.js
РОЛЬ: выбор клетки, проверка placement, установка tower object.
СЕМАНТИКА: текущая реализация работает с tower placement, но boundary относится к placement lifecycle.
СТАТУС: placement является foundation для future placeable objects, но generic object system НЕ реализован.
ВЛАДЕЕТ: selectBuildTile(), getBuildPanelText(), placeTower(), validateBuildTile(), getTowerAtTile(), isRoadTile(), isBaseTile(), isTowerTile(), hasCost(), payCost()
НЕ ВЛАДЕЕТ: object registry, selected object actions, tower combat, UI panels, render overlay, update loop.
ЧИТАЕТ: uiState, towerTypes, resources, power, towers, map, roadTiles, base, TILE_SIZE
ИЗМЕНЯЕТ: uiState.pendingBuildTile, uiState.selectedTower, uiState.selectedMode, resources, power.used, towers
ИСПОЛЬЗУЕТСЯ В: js/systems/systems.js, panels.js, canvas_world.js, game.js
RUNTIME-КОНТРАКТ: файл должен загружаться после state.js и до js/systems/systems.js.
НЕЛЬЗЯ: менять порядок загрузки без проверки build flow.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: PLACEMENT / РАЗМЕЩЕНИЕ
РОЛЬ: выбрать клетку, проверить placement и создать текущий tower object.
ГРАНИЦА: placement lifecycle для текущих tower objects, без внедрения generic object system.
```

Function-level comments:

```text
selectBuildTile(): фиксирует pending placement candidate.
getBuildPanelText(): формирует текст build confirm panel.
confirmBuild(): подтверждает placement и вызывает placeTower().
placeTower(): создаёт tower и мутирует resources/power/towers/uiState.
validateBuildTile(): главный источник проверки placement.
getTowerAtTile(): текущий tower occupancy lookup.
isRoadTile(), isBaseTile(), isTowerTile(): tile restriction helpers.
hasCost(), payCost(): cost helpers для placement.
```

Internal markers preserved:

```text
PLACEMENT VALIDATION
COST / POWER MUTATION
TOWER OBJECT CREATION
UI SELECTION / BUILD MODE STATE
IMPORTANT:
Build mode intentionally stays active
for fast mobile building flow.
UI FEEDBACK
MAP BOUNDARY CHECK
TILE OCCUPANCY / RESTRICTION CHECKS
POWER / RESOURCE CHECKS
```

### Verification block

source_read_status: fully read.

header_matches_code: partial.

section_list_matches_code: yes.

function_list_matches_code: partial.

missing_from_header:

- `confirmBuild()` exists in code and section flow but is absent from top `ВЛАДЕЕТ` list.

header_claims_not_confirmed:

- none detected for listed ownership items;
- future placeable-object status remains explicitly non-implemented, which code confirms.

code_confirms:

- file owns tower placement lifecycle;
- file remains tower-specific while boundary language points toward future placeable objects;
- `validateBuildTile()` is the main placement validation source;
- `confirmBuild()` calls `placeTower()` and is operationally part of build/placement flow;
- build mode intentionally stays active after placement;
- `canvas_world.js` can read placement validation for overlay feedback, but render overlay is not owned here.

code_contradicts:

- no direct contradiction in behavior;
- ownership list is incomplete because `confirmBuild()` is omitted.

needs_review:

- source header correction for `confirmBuild()` ownership visibility;
- generic placeable-object migration;
- build-flow changes;
- validation semantics changes;
- render overlay / validation coupling changes;
- power/resource mutation changes;
- tower object creation changes.

confidence: high for source honesty; medium/high for current boundary; correction needed for ownership completeness.

### Cognition notes

mixed_responsibility: medium.

implicit_contracts:

- build flow depends on `uiState.selectedMode`, `uiState.pendingBuildTile`, `resources`, `power`, `towers`;
- `validateBuildTile()` is central placement authority;
- `confirmBuild()` is an important placement confirmation bridge;
- `canvas_world.js` reads placement validation result for overlay feedback;
- build mode intentionally remains active after placement for fast mobile building flow;
- current implementation creates tower objects, not generic placeable objects.

hallucination_risks:

- do not infer generic object system;
- do not treat placement lifecycle as already generic;
- do not assign render overlay ownership to placement file;
- do not hide `confirmBuild()` ownership omission.

future_map_relevance: essential for placement/build-flow cognition.

---

## 4. `js/systems/systems_selected_object_actions.js`

File: `js/systems/systems_selected_object_actions.js`

source_read_status: fully read for Batch 02 extraction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — Selected Object Actions
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/systems/systems_selected_object_actions.js
РОЛЬ: действия с выбранным размещённым объектом.
СЕМАНТИКА: текущая реализация tower-specific, но boundary относится к selected object actions.
СТАТУС: generic object system НЕ реализован.
ВЛАДЕЕТ: selectTower(), sellSelectedTower()
НЕ ВЛАДЕЕТ: object registry, placement lifecycle, tower combat, UI panels, render highlight, update loop.
ЧИТАЕТ: gameState, uiState, towerTypes, resources, power, towers
ИЗМЕНЯЕТ: uiState.selectedTower, uiState.selectedMode, uiState.pendingBuildTile, resources, power.used, towers
ИСПОЛЬЗУЕТСЯ В: game.js, controls.js
RUNTIME-КОНТРАКТ: файл должен загружаться после state.js и до js/systems/systems.js.
НЕЛЬЗЯ: переименовывать tower-specific функции без отдельного semantic migration pass.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: SELECTED OBJECT ACTIONS / ДЕЙСТВИЯ ВЫБРАННОГО ОБЪЕКТА
РОЛЬ: выбрать размещённый объект и выполнить действие продажи.
ГРАНИЦА: actions выбранного объекта без внедрения generic object system.
```

Function-level comments:

```text
selectTower(): выбирает текущий tower как selected object.
sellSelectedTower(): продаёт выбранный tower и обновляет resources/power/towers/uiState.
```

Internal markers preserved:

```text
No additional internal section markers beyond function-level comments detected.
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

- file owns tower selection and selected tower selling;
- file remains tower-specific while boundary language points toward selected object actions;
- generic object system is not implemented;
- selected state cleanup happens during `selectTower()`;
- selling mutates resources, power.used, towers and uiState;
- placement lifecycle and render highlight are not owned here.

code_contradicts:

- none detected.

needs_review:

- semantic migration from tower-specific functions to generic selected-object actions;
- selling/resource-return semantics changes;
- power mutation changes;
- selected-state cleanup changes;
- UI/game interaction changes.

confidence: high for header honesty; medium/high for future boundary stability.

### Cognition notes

mixed_responsibility: low/medium.

implicit_contracts:

- `selectTower()` clears build mode and pending build tile;
- `sellSelectedTower()` is guarded by `gameState.gameOver` and selected tower presence;
- selling returns resources based on tower type cost and sell return rate;
- selling reduces `power.used` and removes tower from `towers`;
- UI/game call this file but do not own selected-object mutation.

hallucination_risks:

- do not infer generic selected-object framework;
- do not rename tower-specific functions without semantic migration;
- do not assign render highlight ownership here;
- do not treat selected object actions as object registry.

future_map_relevance: important for selected-object action boundary and future generic migration pressure.

---

## 5. Correction candidates after Batch 02

### `js/systems/systems_placement.js`

Correction candidate status:

- direct behavior contradiction: no;
- ownership visibility incompleteness: yes;
- `confirmBuild()` exists in code but is missing from top `ВЛАДЕЕТ` list.

Correction class:

- incomplete ownership visibility.

Recommended source-markup correction:

- add `confirmBuild()` to top `ВЛАДЕЕТ` list.

Correction urgency:

- recommended before using this file as stable extraction source for future repository_map;
- does not require runtime logic mutation.

---

### `js/systems/systems_selected_object_actions.js`

Correction candidate status:

- no direct contradiction;
- no missing top-level ownership detected;
- header is honest and source-faithful.

Correction class:

- none currently active.

Recommended source-markup correction:

- not needed now.

---

## 6. Batch 02 closure state

Completed extraction batch:

- Batch 02 — extracted systems:
  - `js/systems/systems_placement.js`
  - `js/systems/systems_selected_object_actions.js`

Extraction status:

- source-faithful extraction completed;
- verification blocks added;
- mismatch/correction candidates recorded;
- source JS not mutated.

Integrated extraction types:

- top file header wording;
- ROLE / SEMANTICS / STATUS;
- OWNS / DOES NOT OWN;
- READS / MUTATES;
- USED BY;
- RUNTIME CONTRACT;
- FORBIDDEN CHANGES;
- section headers;
- section roles;
- boundary notes;
- function-level role comments;
- important notes;
- operationally meaningful internal markers;
- verification blocks with explicit mismatch fields;
- correction candidate classification.

Next safe direction:

- perform bounded source-markup correction for `js/systems/systems_placement.js` if explicitly requested;
- then re-check/update this Batch 02 discovery snapshot;
- only after that continue Batch 03 extraction.

Do not repeat Batch 02 unless repository drift or visibility uncertainty appears.
