# Repository Map Discovery 05 — Wave Manager Helper Layer

## 1. Назначение batch-файла

Этот файл является bounded extraction batch для repository cognition discovery.

Batch ownership:

- `js/systems/systems_wave_manager.js`

Batch 05 покрывает extracted Wave Manager helper layer после Batch 04 foundation/runtime state verification.

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

Batch: 05 — extracted Wave Manager helper layer.

Status:

- extracted from fresh source read;
- source-faithful markup preserved;
- verification block added;
- correction candidates classified;
- source JS not mutated.

Source file:

- `js/systems/systems_wave_manager.js`

Cross-verification sources:

- `js/data.js`;
- `js/state.js`;
- `js/systems/systems.js`;
- `docs/project/architecture/runtime_structure.md`;
- Batch 01 / 02 / 04 findings.

Mini-chain status:

- not needed for this pass;
- Batch 05 remained small enough for one bounded file.

---

## 3. `js/systems/systems_wave_manager.js`

File: `js/systems/systems_wave_manager.js`

source_read_status: fully read during Batch 05 wave manager extraction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — Wave Manager helpers
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/systems/systems_wave_manager.js
РОЛЬ: генерация состава волны и создание врагов.
СТАТУС: extracted Wave Manager helper layer; управляет generation/spawn helpers, но НЕ wave lifecycle.
ВЛАДЕЕТ: createWave(), shuffleWave(), spawnEnemy()
НЕ ВЛАДЕЕТ: startWave(), updateEnemies(), reward/death flow, game over flow.
ЧИТАЕТ: difficultyProfiles, gameState, gameBalance, enemyTypes, waveState, enemyPath, TILE_SIZE
ИЗМЕНЯЕТ: enemies, waveState.spawnedEnemies
ИСПОЛЬЗУЕТСЯ В: startWave() из js/systems/systems.js
RUNTIME-КОНТРАКТ: файл должен загружаться после state.js и до js/systems/systems.js.
НЕЛЬЗЯ: менять порядок загрузки без проверки startWave().
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: WAVE MANAGER / УПРАВЛЕНИЕ ВОЛНАМИ
РОЛЬ: создать состав волны, перемешать врагов и добавить их в enemies.
ГРАНИЦА: helper-layer для wave generation / spawn, без управления lifecycle волны.
```

Function-level comments:

```text
createWave(): формирует список врагов для текущей волны.
shuffleWave(): перемешивает локальную копию wave без изменения исходного массива.
spawnEnemy(): создаёт enemy object и добавляет его в enemies.
```

Internal markers preserved:

```text
No additional internal marker blocks beyond function-level comments detected.
```

### Function / behavior extraction

#### `createWave(number)`

Observed responsibilities:

- reads `difficultyProfiles[gameState.difficulty]`;
- creates local `wave` array;
- calculates `runnerCount` from `gameBalance.firstWaveEnemyCount`, `number`, `gameBalance.waveGrowth` and `profile.enemyCount`;
- calculates `scoutCount` when `number >= 2`;
- calculates `tankCount` when `number >= 3`;
- pushes enemy config objects into local wave array;
- returns `shuffleWave(wave)`.

Ownership interpretation:

- owns wave composition generation helper behavior;
- does not own wave lifecycle activation;
- does not own `waveState.totalEnemies` assignment;
- does not own UI feedback.

#### `shuffleWave(wave)`

Observed responsibilities:

- creates local copy with `[...wave]`;
- applies Fisher-Yates-style shuffle;
- returns shuffled local copy;
- does not mutate input wave array directly.

Ownership interpretation:

- local generation helper;
- helper is included in top ownership because it is part of wave generation helper authority.

#### `spawnEnemy(typeId, index)`

Observed responsibilities:

- reads `enemyTypes[typeId]`;
- reads `difficultyProfiles[gameState.difficulty]`;
- reads `waveState.number`;
- derives `waveHpBonus`, `spawnSpacing`, `hp`, `speed`;
- reads `enemyPath[0]` and `TILE_SIZE` for spawn position;
- pushes enemy object into `enemies`;
- increments `waveState.spawnedEnemies`.

Ownership interpretation:

- owns enemy spawn object creation helper behavior;
- mutates downstream runtime collections/counters;
- does not own enemy update/movement/death/reward flow.

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

- file owns `createWave()`, `shuffleWave()` and `spawnEnemy()`;
- file is extracted Wave Manager helper layer;
- file owns wave generation/spawn helper behavior but not wave lifecycle;
- `createWave()` generates local wave composition and delegates shuffle to `shuffleWave()`;
- `spawnEnemy()` creates enemy objects, pushes them into `enemies`, and increments `waveState.spawnedEnemies`;
- file reads verified Batch 04 foundation globals from `data.js` and `state.js`;
- file is used by `startWave()` in `js/systems/systems.js`;
- load-order contract matches runtime structure: after `state.js`, before `systems.js`.

code_contradicts:

- none detected.

needs_review:

- wave generation formula changes;
- enemy type composition changes;
- spawn position logic changes;
- `waveState.spawnedEnemies` semantics changes;
- `startWave()` / helper boundary changes;
- enemy object shape changes;
- difficulty scaling changes.

confidence: high for helper ownership; high for lifecycle boundary; high for header honesty.

### Cognition notes

primary_archetype: extracted wave generation/spawn helper layer.

secondary_archetypes:

- wave composition helper;
- enemy spawn object creation helper;
- foundation-data consumer;
- mutable runtime collection/counter mutator.

foundation_dependencies:

- `difficultyProfiles` from `data.js`;
- `gameBalance` from `data.js`;
- `enemyTypes` from `data.js`;
- `enemyPath` from `data.js`;
- `TILE_SIZE` from `data.js`;
- `gameState` from `state.js`;
- `waveState` from `state.js`;
- `enemies` from `state.js`.

mutations_performed:

- pushes enemy objects into `enemies`;
- increments `waveState.spawnedEnemies`.

lifecycle_boundary:

- `systems_wave_manager.js` owns generation/spawn helpers;
- `systems.js` owns `startWave()` lifecycle activation;
- `startWave()` owns checkpoint save, UI selection reset, waveState activation, wave number increment, total enemy assignment, spawn iteration, UI update and notification;
- call-site use by `startWave()` does not give Wave Manager ownership over the full wave lifecycle.

implicit_contracts:

- `data.js` and `state.js` must load before wave manager;
- wave manager must load before `systems.js` so `startWave()` can call `createWave()` and `spawnEnemy()`;
- enemy object shape produced by `spawnEnemy()` must remain compatible with enemy update/render flows;
- `waveState.number` must be updated by lifecycle owner before spawn scaling uses it;
- `enemyPath[0]` must exist and use tile coordinates compatible with `TILE_SIZE`;
- `waveState.spawnedEnemies` counts spawn calls, not kills/reached-base outcomes.

helper_visibility_significance:

- `createWave()` and `spawnEnemy()` are authority/lifecycle-adjacent helper functions and correctly appear in top ownership visibility;
- `shuffleWave()` is local to generation behavior but still top-visible because it is explicitly owned as part of wave generation helper authority and declared in source header.

hallucination_risks:

- do not treat wave manager as full wave lifecycle owner;
- do not assign `startWave()` ownership to this file;
- do not infer enemy update ownership;
- do not infer reward/death flow ownership;
- do not treat mutations to `enemies` / `waveState.spawnedEnemies` as ownership of foundation state shape;
- do not infer generic spawn system or wave framework beyond current helper layer.

future_map_relevance: essential for completing extracted systems helper coverage and wave lifecycle boundary cognition.

---

## 4. Relationship to Batch 04 foundation authority

Batch 05 depends on Batch 04 foundation findings.

`systems_wave_manager.js` consumes foundation data/state from:

- `js/data.js`;
- `js/state.js`.

It reads foundation data/config:

- `difficultyProfiles`;
- `gameBalance`;
- `enemyTypes`;
- `enemyPath`;
- `TILE_SIZE`.

It reads/mutates foundation runtime state:

- `gameState`;
- `waveState`;
- `enemies`.

Important distinction:

- downstream mutation of `enemies` and `waveState.spawnedEnemies` does NOT imply ownership of foundation state shape;
- `state.js` remains foundation mutable state authority;
- wave manager owns helper-level mutation behavior only.

---

## 5. Relationship to `systems.js` / `startWave()`

Verified relationship:

```text
systems.js / startWave()
→ createWave(waveState.number)
→ spawnEnemy(enemyConfig.type, index)
```

`startWave()` owns:

- game-over / active-wave guards;
- checkpoint save;
- UI selection reset;
- wave lifecycle activation;
- wave number increment;
- spawned/killed/reachedBase counter reset;
- total enemy assignment;
- spawn iteration;
- UI update;
- notification.

`systems_wave_manager.js` owns:

- wave composition generation;
- wave shuffle helper;
- enemy object creation/spawn helper;
- spawn counter increment.

Call-site distinction:

- `startWave()` calling wave manager helpers does not transfer lifecycle ownership into wave manager;
- wave manager mutating `enemies` and `waveState.spawnedEnemies` does not make it owner of all waveState semantics.

---

## 6. Correction candidates after Batch 05

### `js/systems/systems_wave_manager.js`

Correction candidate status:

- no direct contradiction;
- no missing top-level ownership detected;
- header is honest and source-faithful;
- helper/lifecycle boundary is correctly represented.

Correction class:

- none currently active.

Recommended source-markup correction:

- not needed now.

Important cognition clarification:

- file is helper authority for wave generation/spawn;
- file is not wave lifecycle authority;
- mutations to shared state counters/collections are helper-level runtime mutations, not ownership of foundation state shape.

---

## 7. Batch 05 closure state

Completed extraction batch:

- Batch 05 — Wave Manager helper layer:
  - `js/systems/systems_wave_manager.js`

Extraction status:

- source-faithful extraction completed;
- verification block added;
- relationship to Batch 04 foundation authority added;
- relationship to `systems.js` / `startWave()` added;
- correction candidates classified;
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
- section header;
- section role;
- boundary note;
- function-level comments;
- function behavior extraction;
- verification block;
- cognition notes;
- correction candidate classification;
- closure state.

Mini-chain result:

- not required;
- Batch 05 remained within safe bounded size.

Extracted systems coverage status:

- complete for current extracted systems helper layer:
  - `systems_wave_manager.js`;
  - `systems_placement.js`;
  - `systems_selected_object_actions.js`.

Next safe direction:

- move to UI support layer discovery:
  - `js/ui/helpers.js`;
  - `js/ui/layout.js`;
  - `js/ui/notifications.js`;
- or inspect hidden-complexity `js/ui/panels.js` as a dedicated batch.

Do not repeat Batch 05 unless repository drift or visibility uncertainty appears.
