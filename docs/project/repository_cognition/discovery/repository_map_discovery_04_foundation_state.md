# Repository Map Discovery 04 — Foundation / Runtime State

## 1. Назначение batch-файла

Этот файл является bounded extraction batch для repository cognition discovery.

Batch ownership:

- `js/data.js`
- `js/state.js`

Batch 04 покрывает foundation/runtime state layer перед дальнейшим расширением discovery на downstream systems/helper/UI files.

Repository truth remains:

- actual code;
- actual runtime behavior.

Headers and comments remain:

- interpretation layer;
- AI-readable markup;
- verification candidates.

This file is NOT:

- `repository_map.yml`;
- parser/scanner output;
- automation layer;
- governance system;
- source authority;
- runtime authority.

If markup and code diverge:

- code wins;
- divergence must remain visible explicitly;
- source wording must not be silently normalized.

---

## 2. Batch status

Batch: 04 — foundation/runtime state.

Status:

- extracted from fresh source reads;
- source-faithful markup preserved;
- verification blocks added;
- correction candidates classified;
- source JS not mutated.

Source files:

- `js/data.js`
- `js/state.js`

Cross-verification source:

- `docs/project/architecture/runtime_structure.md`

Mini-chain status:

- not needed for this pass;
- Batch 04 remained small enough for one bounded file.

---

## 3. `js/data.js`

File: `js/data.js`

source_read_status: fully read during Batch 04 foundation extraction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — Stage 03.3
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/data.js
РОЛЬ: static gameplay configuration, balance definitions, enemy/tower data и world/path definitions.
СТАТУС: Stage 03.3 strongly marked runtime foundation data layer.
ВЛАДЕЕТ: TILE_SIZE, map, difficultyProfiles, gameBalance, towerTypes, enemyTypes, enemyPath, roadTiles, tileKey(), buildRoadTiles().
НЕ ВЛАДЕЕТ: mutable runtime state, gameplay loops, placement validation, combat execution, rendering, UI lifecycle.
ЧИТАЕТ: internal balance references между gameBalance и towerTypes.
ИЗМЕНЯЕТ: roadTiles during initial buildRoadTiles() generation only.
ИСПОЛЬЗУЕТСЯ В: js/state.js, js/systems/*, js/ui/*, js/game.js.
RUNTIME-КОНТРАКТ: browser-global data layer; должен загружаться до state.js, systems/*, ui/* и game.js.
НЕЛЬЗЯ: трактовать файл как generic registry framework, ECS/entity system или content pipeline.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: CORE CONSTANTS / TILE CONFIG
РОЛЬ: базовые tile/world constants для map, rendering и coordinate math.
```

Function-level / declaration comments:

```text
TILE_SIZE: базовый размер world tile для map/grid/runtime coordinate calculations.
```

---

```text
СЕКЦИЯ: MAP / WORLD DIMENSIONS
РОЛЬ: static world dimensions и playable map boundaries.
```

Function-level / declaration comments:

```text
map: static world geometry definition для runtime coordinate и camera systems.
```

---

```text
СЕКЦИЯ: DIFFICULTY PROFILES
РОЛЬ: difficulty modifiers для enemy stats, rewards и gameplay pressure.
```

Function-level / declaration comments:

```text
difficultyProfiles: structured gameplay difficulty definitions для runtime scaling.
```

---

```text
СЕКЦИЯ: GAME BALANCE CONFIG
РОЛЬ: compact gameplay balance и starting economy configuration.
```

Function-level / declaration comments:

```text
gameBalance: current wave-defense balance config without production/economy framework.
ТОЧКА РОСТА: economy/progression pressure существует.
ВАЖНО: production-chain system и economy engine пока НЕ реализованы.
```

---

```text
СЕКЦИЯ: TOWER DEFINITIONS
РОЛЬ: structured combat tower gameplay definitions и tower metadata.
```

Function-level / declaration comments:

```text
towerTypes: structured current combat tower definitions with future placeable-data pressure.
ТОЧКА РОСТА: proto-registry pressure существует.
ВАЖНО: generic placeable registry и entity framework пока НЕ реализованы.
```

Nested source comments preserved:

```text
upgrades: current upgrade descriptors data only.
ВАЖНО: upgrade runtime framework пока НЕ реализован.
```

---

```text
СЕКЦИЯ: ENEMY DEFINITIONS
РОЛЬ: structured enemy gameplay definitions и combat metadata.
```

Function-level / declaration comments:

```text
enemyTypes: structured current enemy definitions with scaling/registry pressure.
ТОЧКА РОСТА: proto-registry pressure существует.
ВАЖНО: generic entity registry пока НЕ реализован.
```

---

```text
СЕКЦИЯ: PATH / ROAD DATA
РОЛЬ: enemy movement path и derived road-tile geometry.
```

Function-level / declaration comments:

```text
enemyPath: ordered world-space path points для enemy movement routing.
```

---

```text
СЕКЦИЯ: DATA HELPERS
РОЛЬ: lightweight geometry/data helper utilities.
```

Function-level comments:

```text
tileKey(): создаёт stable string key для tile coordinate addressing.
buildRoadTiles(): строит runtime road tile set на основе enemyPath.
roadTiles: prebuilt runtime road occupancy set derived from enemyPath.
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

- file owns static gameplay configuration and foundation data;
- file owns `TILE_SIZE`, `map`, `difficultyProfiles`, `gameBalance`, `towerTypes`, `enemyTypes`, `enemyPath`, `roadTiles`, `tileKey()`, `buildRoadTiles()`;
- file is loaded before state/systems/ui/game according to runtime structure;
- `towerTypes` reads `gameBalance` values internally;
- `roadTiles` is derived/generated once from `enemyPath` through `buildRoadTiles()`;
- file contains lightweight helper logic, but not gameplay runtime loops or mutable runtime state;
- generic registry, ECS/entity framework and content pipeline are not implemented.

code_contradicts:

- none detected.

needs_review:

- balance changes;
- map geometry changes;
- path/road generation changes;
- tower/enemy data schema changes;
- generic registry migration;
- content pipeline migration;
- ECS/entity framework migration.

confidence: high for foundation data authority; high for header honesty; medium/high for future abstraction pressure.

### Cognition notes

primary_archetype: foundation data/config layer.

secondary_archetypes:

- static world/map data;
- balance definitions;
- tower/enemy definitions;
- lightweight derived data helper layer.

static_config:

- `TILE_SIZE`;
- `map`;
- `difficultyProfiles`;
- `gameBalance`;
- `towerTypes`;
- `enemyTypes`;
- `enemyPath`.

derived_data:

- `roadTiles` derived from `enemyPath`.

helper_logic:

- `tileKey()`;
- `buildRoadTiles()`.

mutable_runtime_state:

- none owned here beyond initial derived `roadTiles` creation.

implicit_contracts:

- `data.js` must load before `state.js`;
- `towerTypes.basic.cost` depends on `gameBalance.towerCostWood`;
- placement/render/path systems depend on `TILE_SIZE`, `map`, `roadTiles`, `enemyPath`;
- wave systems depend on `difficultyProfiles`, `gameBalance`, `enemyTypes`, `enemyPath`;
- `roadTiles` occupancy semantics depend on `tileKey()` stability.

hallucination_risks:

- do not treat as generic registry framework;
- do not infer ECS/entity system;
- do not infer content pipeline;
- do not treat lightweight derived data helpers as gameplay loop ownership;
- do not classify `roadTiles` as mutable gameplay state owned by systems.

future_map_relevance: essential foundation authority layer.

---

## 4. `js/state.js`

File: `js/state.js`

source_read_status: fully read during Batch 04 foundation extraction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — Runtime State
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/state.js
РОЛЬ: mutable browser-global runtime state container и initial runtime state definition layer.
СТАТУС: shared state foundation; current naming остаётся tower-specific там, где runtime ещё tower-specific.
ВЛАДЕЕТ: canvas, ctx, camera, uiLayout, uiState, resources, base, power, waveState, gameState, checkpoint, gameSpeed, towers, enemies, clone(), updatePower().
НЕ ВЛАДЕЕТ: gameplay rules, placement validation, tower combat execution, enemy movement, wave generation, rendering implementation, UI panel creation.
ЧИТАЕТ: document, window, gameBalance, towerTypes.
ИЗМЕНЯЕТ: uiLayout through updateResponsiveLayout(), power.used through updatePower().
ИСПОЛЬЗУЕТСЯ В: js/game.js, js/systems/*, js/ui/* runtime and rendering flows.
RUNTIME-КОНТРАКТ: файл должен загружаться после js/data.js and before systems/ui/game runtime files.
НЕЛЬЗЯ: менять state shape, declaration order, initial values или tower-specific identifiers без отдельного semantic migration pass.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: CANVAS CONTEXT / CANVAS RUNTIME ROOT
РОЛЬ: получить shared canvas и drawing context для runtime/render layers.
ВКЛЮЧАЕТ: canvas, ctx
```

Function-level / declaration comments:

```text
canvas: DOM canvas root used by game.js and render/UI layers.
ctx: shared 2D drawing context used by canvas render files.
```

---

```text
СЕКЦИЯ: CAMERA / VIEWPORT STATE
РОЛЬ: хранить runtime viewport/pan/zoom state shared между input и rendering.
ВКЛЮЧАЕТ: camera
```

Function-level / declaration comments:

```text
camera: mutable viewport state for pan, zoom, drag and pinch interactions.
```

---

```text
СЕКЦИЯ: RESPONSIVE UI STATE
РОЛЬ: хранить responsive layout mode и обновлять device/orientation flags.
ВКЛЮЧАЕТ: uiLayout, updateResponsiveLayout()
```

Function-level comments:

```text
uiLayout: current responsive UI/device mode flags used by UI and rendering.
updateResponsiveLayout(): recalculates uiLayout flags from window size.
```

Observed runtime call:

```text
updateResponsiveLayout();
```

---

```text
СЕКЦИЯ: UI INTERACTION STATE
РОЛЬ: хранить current UI interaction/runtime context.
ВКЛЮЧАЕТ: uiState
```

Function-level / declaration comments:

```text
uiState: mutable UI interaction state for build mode, hover, selection, panels and notifications.
ТОЧКА РОСТА: selectedTower/selectedTowerType are current tower-specific names with future selected-object pressure.
ВАЖНО: selectedObject architecture и generic object system пока НЕ реализованы.
```

---

```text
СЕКЦИЯ: ECONOMY / BASE / POWER STATE
РОЛЬ: хранить mutable resources, base HP/position и power usage/capacity.
ВКЛЮЧАЕТ: resources, base, power
```

Function-level / declaration comments:

```text
resources: mutable economy resource pool used by placement/rewards/UI.
base: mutable base state for HP and tile position.
power: mutable power budget state used by placement and tower selling.
```

---

```text
СЕКЦИЯ: WAVE / GAMEPLAY RUNTIME STATE
РОЛЬ: хранить current wave progression и core gameplay flags.
ВКЛЮЧАЕТ: waveState, gameState
```

Function-level / declaration comments:

```text
waveState: mutable wave lifecycle counters and active state.
gameState: core gameplay progression flags.
```

---

```text
СЕКЦИЯ: CHECKPOINT / SPEED STATE
РОЛЬ: хранить retry checkpoint и runtime game speed.
ВКЛЮЧАЕТ: checkpoint, gameSpeed
```

Function-level / declaration comments:

```text
checkpoint: rollback snapshot used by retryLastWave().
ТОЧКА РОСТА: checkpoint shape follows current runtime globals; generic state store пока НЕ реализован.
gameSpeed: runtime speed multiplier used by update loop and UI controls.
```

---

```text
СЕКЦИЯ: ENTITY COLLECTIONS
РОЛЬ: хранить mutable runtime collections for towers and enemies.
ВКЛЮЧАЕТ: towers, enemies
```

Function-level / declaration comments:

```text
towers: mutable runtime collection текущих combat towers.
ТОЧКА РОСТА: towers may later face placed-object pressure, but placedObjects system НЕ реализован.
enemies: mutable runtime collection текущих spawned enemies.
```

---

```text
СЕКЦИЯ: STATE HELPERS
РОЛЬ: предоставить small helpers for cloning and derived power state.
ВКЛЮЧАЕТ: clone(), updatePower()
```

Function-level comments:

```text
clone(): creates JSON-safe deep copy for checkpoint/state restore flows.
updatePower(): recalculates power.used from current towers collection.
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

- file owns shared mutable browser-global runtime state shape;
- file owns canvas/context runtime root;
- file owns camera, uiLayout, uiState, resources, base, power, waveState, gameState, checkpoint, gameSpeed, towers, enemies;
- file owns `clone()` and `updatePower()` helpers;
- file reads `gameBalance` and `towerTypes` from `data.js`;
- `updateResponsiveLayout()` mutates `uiLayout` and is invoked during initialization;
- after `js/ui/layout.js` loads, the effective browser-global `updateResponsiveLayout()` used by later runtime calls is shadowed by the layout.js version;
- Batch 04 describes state.js foundation/init ownership and must not be read as sole effective runtime ownership of responsive recalculation after UI layer load;
- `updatePower()` mutates `power.used` from `towers` collection;
- tower-specific identifiers remain current runtime truth;
- generic selected-object, placed-object and state-store systems are not implemented.

code_contradicts:

- none detected.

needs_review:

- duplicate browser-global `updateResponsiveLayout()` helper name with `js/ui/layout.js`;
- post-layout-load responsive recalculation authority;
- state shape changes;
- declaration order changes;
- initial value changes;
- tower-specific naming migration;
- selected-object architecture migration;
- placed-object architecture migration;
- generic state-store migration;
- checkpoint shape changes;
- power/economy semantics changes.

confidence: high for shared state foundation authority; high for header honesty; medium/high for effective responsive recalculation authority after UI layer load.

### Cognition notes

primary_archetype: shared mutable runtime state foundation.

secondary_archetypes:

- canvas/context runtime root;
- camera/viewport state;
- responsive UI state;
- UI interaction state;
- economy/base/power state;
- wave/gameplay runtime state;
- checkpoint/speed state;
- entity collections;
- lightweight state helper layer.

mutable_runtime_state_owned:

- `camera`;
- `uiLayout`;
- `uiState`;
- `resources`;
- `base`;
- `power`;
- `waveState`;
- `gameState`;
- `checkpoint`;
- `gameSpeed`;
- `towers`;
- `enemies`.

runtime_roots_owned:

- `canvas`;
- `ctx`.

helper_logic:

- `clone()`;
- `updatePower()`;
- `updateResponsiveLayout()` as bootstrap-time responsive initialization helper before UI layout layer load.

responsive_authority_clarification:

- `state.js` owns initial `uiLayout` state shape and invokes bootstrap-time `updateResponsiveLayout()` during initial load;
- `js/ui/layout.js` later declares another browser-global `updateResponsiveLayout()`;
- because `layout.js` loads after `state.js`, later runtime calls resolve to the layout.js version;
- this is classified as duplicate browser-global helper name / shadowing-load-order ambiguity;
- preserve as extraction/split residue candidate, runtime authority ambiguity, future refactor candidate, possible runtime bug risk and needs further review;
- no immediate source-header correction is implied by this clarification.

implicit_contracts:

- `state.js` must load after `data.js`;
- `state.js` must load before systems/ui/game runtime files;
- many runtime files share and mutate state objects directly through browser globals;
- `uiState` remains tower-specific where runtime is tower-specific;
- `towers` remains current placed combat object collection;
- `checkpoint` shape follows current runtime globals;
- changing state shape or declaration order requires compatibility review.

hallucination_risks:

- do not infer generic state store;
- do not infer ECS;
- do not infer selectedObject architecture;
- do not infer placedObjects collection;
- do not treat tower-specific identifiers as already migrated;
- do not treat helper functions as gameplay rule ownership;
- do not treat Batch 04 as sole effective runtime ownership of responsive recalculation after `layout.js` load.

future_map_relevance: essential foundation authority layer.

---

## 5. Foundation cross-file relationship notes

Verified relationship:

```text
data.js → state.js → systems/* → ui/* → game.js
```

`data.js` provides:

- static config;
- balance definitions;
- world/path definitions;
- tower/enemy definitions;
- derived road tile occupancy.

`state.js` provides:

- shared mutable runtime state;
- canvas/context root;
- camera/UI/game/economy/wave/entity state;
- runtime collections;
- checkpoint/speed/helper state.

Important distinction:

- `data.js` is foundation data/config authority;
- `state.js` is foundation mutable state authority;
- `state.js` owns initial `uiLayout` state shape and bootstrap-time responsive initialization;
- effective runtime responsive recalculation after UI layer load is qualified by `js/ui/layout.js` shadowing behavior;
- downstream systems read/mutate state but do not own foundation state shape unless explicitly stated.

---

## 6. Correction candidates after Batch 04

### `js/data.js`

Correction candidate status:

- no direct contradiction;
- no missing top-level ownership detected;
- header is honest and source-faithful.

Correction class:

- none currently active.

Recommended source-markup correction:

- not needed now.

Important cognition clarification:

- file is not purely inert static JSON-like data;
- it includes lightweight helper logic and derived `roadTiles` generation;
- this is already represented by ownership of `tileKey()`, `buildRoadTiles()` and `roadTiles`.

---

### `js/state.js`

Correction candidate status:

- no direct contradiction;
- no missing top-level ownership detected;
- header is honest and source-faithful;
- duplicate `updateResponsiveLayout()` with `js/ui/layout.js` qualifies effective runtime interpretation but is not immediate source-header correction.

Correction class:

- none currently active;
- needs-review for duplicate browser-global helper name / shadowing-load-order semantics.

Recommended source-markup correction:

- not needed in this synchronization pass.

Important cognition clarification:

- file is shared mutable state foundation;
- helper functions mutate specific state zones (`uiLayout`, `power.used`) but do not own gameplay rules;
- `updateResponsiveLayout()` in this file is bootstrap-time state/layout initialization before `layout.js` later shadows the global helper name.

---

## 7. Batch 04 closure state

Completed extraction batch:

- Batch 04 — foundation/runtime state:
  - `js/data.js`
  - `js/state.js`

Extraction status:

- source-faithful extraction completed;
- verification blocks added;
- foundation relationship notes added;
- correction candidates classified;
- duplicate `updateResponsiveLayout()` interpretation synchronized with Batch 06 audit finding;
- no source JS mutation performed.

Integrated extraction types:

- source_read_status;
- top file header wording;
- ROLE / STATUS;
- OWNS / DOES NOT OWN;
- READS / MUTATES;
- USED BY;
- RUNTIME CONTRACT;
- FORBIDDEN CHANGES;
- section headers;
- section roles;
- included functions/declarations;
- function-level comments;
- growth points / important notes;
- verification blocks;
- cognition notes;
- correction candidate classification;
- closure state.

Mini-chain result:

- not required;
- Batch 04 remained within safe bounded size.

Next safe direction:

- Batch 05 should inspect `js/systems/systems_wave_manager.js` to complete extracted systems coverage after foundation verification.

Do not repeat Batch 04 unless repository drift or visibility uncertainty appears.
