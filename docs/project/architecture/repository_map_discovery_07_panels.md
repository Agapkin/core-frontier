# Repository Map Discovery 07 — UI Panels Semantic Layer

## 1. Назначение batch-файла

Этот файл является bounded extraction batch для repository cognition discovery.

Batch ownership:

- `js/ui/panels.js`

Batch 07 покрывает dedicated hidden-complexity UI semantic/orchestration layer после Batch 03 UI control/render boundaries and Batch 06 UI support verification.

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

Batch: 07 — UI panels semantic/orchestration layer.

Status:

- extracted from fresh source read;
- source-faithful markup preserved;
- verification block added;
- correction candidates classified;
- source JS not mutated.

Source file:

- `js/ui/panels.js`

Cross-verification sources:

- `js/ui/controls.js`;
- `js/ui/helpers.js`;
- `js/ui/layout.js`;
- `js/ui/notifications.js`;
- `js/state.js`;
- `js/game.js`;
- `docs/project/architecture/runtime_structure.md`;
- Batch 03 / 04 / 06 findings.

Mini-chain status:

- not needed for this pass;
- Batch 07 remained within safe bounded size.

---

## 3. `js/ui/panels.js`

File: `js/ui/panels.js`

source_read_status: fully read during Batch 07 panels extraction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — UI Panels
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/ui/panels.js
РОЛЬ: DOM panels, HUD text updates и canvas overlay panels.
СТАТУС: UI semantic layer; часть panels всё ещё tower-specific, generic object panel system НЕ реализован.
ВЛАДЕЕТ: createMenuPanel(), createGameOverPanel(), updateDomVisibility(), updateUI(), drawWaveStatus(), drawSelectedTowerPanel(), drawInfoPanel(), drawGameOver()
НЕ ВЛАДЕЕТ: gameplay logic, placement validation, tower combat, wave lifecycle, reward system, render world/entities.
ЧИТАЕТ: uiState, gameState, waveState, resources, base, power, camera, gameSpeed, difficultyProfiles, towerTypes, enemyTypes, enemies, uiLayout, canvas.
ИЗМЕНЯЕТ: DOM panel visibility/text, menu difficulty selection, canvas overlay drawing.
ИСПОЛЬЗУЕТСЯ В: createDynamicUI(), game render/update flow, runtime UI refresh.
RUNTIME-КОНТРАКТ: файл должен загружаться после ui helpers/layout/controls и после runtime systems files.
НЕЛЬЗЯ: менять UI lifecycle или gameplay callbacks без отдельного inspection pass.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: DOM PANEL CREATION / СОЗДАНИЕ DOM-ПАНЕЛЕЙ
РОЛЬ: создать persistent DOM panels и привязать UI callbacks.
ВКЛЮЧАЕТ: createMenuPanel(), createGameOverPanel()
```

Function-level comments:

```text
createMenuPanel(): создаёт menu panel и difficulty/new game controls.
ТОЧКА РОСТА: menu panel может позже стать entrypoint для nested menus/subpanels.
ВАЖНО: nested menu system пока НЕ реализована.
createGameOverPanel(): создаёт DOM panel для retry/new game после game over.
```

Internal markers preserved:

```text
PANEL ROOT CREATION
DIFFICULTY BUTTONS
NEW GAME CONTROL
DOM ATTACH
TITLE / ACTION BUTTONS
```

Observed callbacks / runtime bridge behavior:

```text
notify("Сложность можно менять только до первой волны", "warning")
gameState.difficulty = profile.id
updateUI()
createDynamicUI()
notify("Сложность: " + profile.name, "info")
restartGame()
uiState.menuOpen = false
retryLastWave()
```

Ownership interpretation:

- `panels.js` owns DOM panel creation for menu and game-over panels;
- callbacks bridge into gameplay/system commands but do not transfer gameplay ownership into `panels.js`;
- difficulty selection mutates `gameState.difficulty` from UI callback surface, but `panels.js` does not own full `gameState` foundation shape;
- `createMenuPanel()` / `createGameOverPanel()` are called externally by `controls.js` during dynamic UI rebuild, but ownership remains here.

---

```text
СЕКЦИЯ: DOM VISIBILITY / HUD TEXT UPDATE
РОЛЬ: синхронизировать DOM panels и HUD text с runtime state.
ВКЛЮЧАЕТ: updateDomVisibility(), updateUI()
```

Function-level comments:

```text
updateDomVisibility(): показывает/скрывает DOM panels на основе uiState/gameState.
ТОЧКА РОСТА: visibility может позже учитывать category/object-specific panels.
ВАЖНО: generic panel visibility system пока НЕ реализована.
updateUI(): обновляет HUD text values без изменения gameplay state.
```

Internal markers preserved:

```text
SELECTED OBJECT ACTION PANEL VISIBILITY
BUILD CONFIRM PANEL VISIBILITY
MENU / GAME OVER PANEL VISIBILITY
```

Observed DOM state reads / writes:

```text
document.getElementById("tower-action-panel")
document.getElementById("build-confirm-panel")
document.getElementById("build-confirm-text")
document.getElementById("menu-panel")
document.getElementById("game-over-panel")
towerPanel.style.display
buildPanel.style.display
buildText.innerText
menuPanel.style.display
gameOverPanel.style.display
setText("wood", Math.floor(resources.wood))
setText("stone", Math.floor(resources.stone))
setText("food", Math.floor(resources.food))
setText("hp", Math.max(0, Math.floor(base.hp)))
setText("wave", waveState.number)
setText("power", power.used + "/" + power.capacity)
setText("difficulty", difficultyProfiles[gameState.difficulty].name)
setText("zoom", Math.round(camera.zoom * 100) + "%")
```

Ownership interpretation:

- `panels.js` owns DOM panel visibility sync and HUD text update behavior;
- it reads many shared runtime states but does not own their foundation shapes;
- `updateUI()` is UI refresh behavior, not gameplay state mutation.

---

```text
СЕКЦИЯ: CANVAS HUD OVERLAYS / CANVAS-ПАНЕЛИ
РОЛЬ: рисовать runtime status, selected tower info, codex и game over overlay.
ВКЛЮЧАЕТ: drawWaveStatus(), drawSelectedTowerPanel(), drawInfoPanel(), drawGameOver()
```

Function-level comments:

```text
drawWaveStatus(): рисует canvas HUD со статусом волны и speed.
drawSelectedTowerPanel(): рисует canvas info panel для выбранной tower.
ТОЧКА РОСТА: current tower-specific UI; future selected object panel candidate.
ВАЖНО: generic object panel system пока НЕ реализован.
drawInfoPanel(): рисует canvas codex/info panel с tower/enemy справкой.
ТОЧКА РОСТА: codex может позже стать categorized encyclopedia для objects/enemies/resources.
ВАЖНО: categorized codex system пока НЕ реализована.
drawGameOver(): рисует затемнение canvas при game over.
```

Internal markers preserved:

```text
SELECTED TOWER DATA READ
PANEL GEOMETRY
PANEL BACKGROUND
PANEL TEXT
TOWER CODEX CONTENT
ENEMY CODEX CONTENT
MECHANICS HELP CONTENT
```

Observed render/canvas behavior:

```text
drawWaveStatus(): reads enemies.length, waveState.totalEnemies, waveState.number, waveState.active, gameSpeed, uiLayout.compact; draws status box via ctx.
drawSelectedTowerPanel(): reads uiState.selectedTower, towerTypes[tower.typeId], tower fields and uiLayout.compact; draws selected tower info via ctx.
drawInfoPanel(): reads uiState.infoPanelOpen, canvas dimensions, uiLayout.compact, towerTypes, enemyTypes; draws codex/info overlay via ctx.
drawGameOver(): reads gameState.gameOver and draws fullscreen dark overlay via ctx.
```

Ownership interpretation:

- `panels.js` owns canvas HUD/panel overlay drawing for wave status, selected tower panel, info/codex panel and game-over overlay;
- it does not own world/entity rendering handled by `canvas_world.js` / `canvas_entities.js`;
- it does not own wave lifecycle, combat, enemy update, reward or game-over state transition logic.

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

- file owns `createMenuPanel()`, `createGameOverPanel()`, `updateDomVisibility()`, `updateUI()`, `drawWaveStatus()`, `drawSelectedTowerPanel()`, `drawInfoPanel()` and `drawGameOver()`;
- file is both UI semantic layer and canvas overlay panel layer;
- file creates persistent DOM panels and binds UI callbacks;
- file synchronizes DOM visibility/text with runtime state;
- file draws canvas HUD overlays and semantic UI panels;
- file reads many shared runtime states but does not own their foundation shapes;
- file bridges callbacks to gameplay/system functions without owning those systems;
- generic object panel system, nested menu system, categorized codex system and generic panel visibility system are not implemented.

code_contradicts:

- none detected.

needs_review:

- UI lifecycle changes;
- panel creation/removal/rebuild semantics;
- callback/gameplay bridge changes;
- difficulty selection semantics;
- menu/new game/retry callback semantics;
- selected tower panel migration to selected-object panel;
- codex/category system migration;
- canvas HUD overlay ordering;
- DOM/canvas panel split refactor;
- generic panel visibility system migration.

confidence: high for current ownership; high for mixed semantic-layer classification; medium/high for future refactor pressure.

### Cognition notes

primary_archetype: mixed UI semantic/orchestration layer.

secondary_archetypes:

- DOM panel creation layer;
- DOM visibility/HUD text synchronization layer;
- gameplay callback bridge surface;
- canvas HUD overlay render layer;
- tower-specific semantic panel layer;
- codex/info presentation layer.

panel_lifecycle_ownership:

- owns creation of menu and game-over DOM panels;
- owns visibility synchronization for menu/game-over/build/tower action DOM panels;
- does not own creation of build/tower action panels, which are created by `controls.js`;
- does not own dynamic UI rebuild orchestration, which is owned by `controls.js` through `createDynamicUI()`.

runtime_coupling:

- called by `controls.js` during dynamic UI rebuild for menu/game-over panel creation;
- called by `gameLoop()` through update/render flow via `updateUI()`, `updateDomVisibility()` and draw overlay calls;
- uses helper functions from `helpers.js` and style factories from `layout.js`;
- calls gameplay/system functions such as `restartGame()` and `retryLastWave()` through callbacks;
- calls `notify()` for feedback but does not own notification lifecycle.

state_authority_distinction:

- reads and mutates selected UI/game fields such as `gameState.difficulty` and `uiState.menuOpen` through UI callbacks;
- reads `resources`, `base`, `power`, `waveState`, `camera`, `gameSpeed`, `enemies`, `towerTypes`, `enemyTypes`, `difficultyProfiles`;
- does not own foundation state shapes from `state.js` or foundation data definitions from `data.js`.

callback_bridge_behavior:

- difficulty buttons mutate `gameState.difficulty` and refresh UI;
- restart/retry buttons call systems-owned lifecycle functions;
- callback wiring does not transfer gameplay lifecycle ownership into `panels.js`.

hidden_complexity_zones:

- DOM panels and canvas panels coexist in one file;
- file mixes semantic UI presentation, DOM visibility sync, HUD text updates and canvas overlay drawing;
- selected tower panel remains tower-specific;
- codex/info panel embeds static presentation logic over tower/enemy definitions;
- menu panel bridges difficulty selection and restart behavior.

call_site_vs_ownership:

- `controls.js` calls `createMenuPanel()` and `createGameOverPanel()`, but ownership remains in `panels.js`;
- `panels.js` calls gameplay/system helpers through callbacks, but does not own gameplay systems;
- call-site does not imply ownership in either direction.

helper_visibility_significance:

- all top-listed functions are authority-significant for this file's semantic/panel layer;
- no section-scoped helper omission detected.

hallucination_risks:

- do not treat `panels.js` as pure DOM helper layer;
- do not treat `panels.js` as pure render layer;
- do not infer generic object panel system;
- do not infer nested menu system;
- do not infer categorized codex system;
- do not infer generic panel visibility system;
- do not assign gameplay lifecycle ownership to UI callbacks;
- do not assign foundation state/data ownership to panel reads/mutations;
- do not reinterpret duplicate `updateResponsiveLayout()` issue unless new evidence appears.

future_map_relevance: essential for UI semantic layer, mixed panel ownership and cross-file UI/runtime coupling cognition.

---

## 4. Cross-file relationship notes

### Relationship to `controls.js`

Verified relationship:

```text
controls.js / createDynamicUI()
→ createMenuPanel()
→ createGameOverPanel()
```

- `controls.js` orchestrates dynamic UI rebuild and removes/recreates panel DOM nodes;
- `panels.js` owns menu/game-over panel creation functions;
- external call from `controls.js` does not transfer ownership away from `panels.js`.

### Relationship to `helpers.js`

- `panels.js` uses helper functions such as `applyFixedStyle()`, `createPanelTitle()`, `createSmallText()`, `createUIButton()` and `setText()`;
- helper usage does not transfer panel lifecycle ownership into helpers;
- callback wiring through `createUIButton()` does not transfer callback semantics into helpers.

### Relationship to `layout.js`

- `panels.js` uses `getSidePanelStyle()` and `uiLayout.compact`-dependent layout behavior;
- `layout.js` owns style helper factories and responsive recalculation support;
- `panels.js` consumes style helpers but owns panel semantic composition.

### Relationship to `notifications.js`

- `panels.js` calls `notify()` from difficulty selection feedback flow;
- `notifications.js` owns notification queue/lifetime/render behavior;
- `panels.js` does not own notification lifecycle.

### Relationship to `state.js` / `data.js`

- `panels.js` reads foundation state/data broadly;
- it mutates selected fields through UI callbacks, such as `gameState.difficulty` and `uiState.menuOpen`;
- `state.js` remains foundation mutable state authority;
- `data.js` remains foundation data/config authority.

### Relationship to `game.js`

- `gameLoop()` uses panel overlay rendering and DOM visibility sync as part of render/update sequencing;
- `panels.js` does not own game loop, camera/input orchestration, world/entity rendering or update sequencing.

---

## 5. Correction candidates after Batch 07

### `js/ui/panels.js`

Correction candidate status:

- no direct contradiction;
- no missing top-level ownership detected;
- header is honest and source-faithful;
- mixed semantic/orchestration nature is accurately represented by role/status and section structure.

Correction class:

- none currently active.

Recommended source-markup correction:

- not needed now.

Important cognition clarification:

- file is a mixed UI semantic/orchestration layer;
- file owns panel creation/visibility/HUD overlay behavior;
- file bridges gameplay callbacks without owning gameplay systems;
- file remains a future refactor candidate due to DOM/canvas/tower-specific/codex/menu complexity clustering.

---

## 6. Batch 07 closure state

Completed extraction batch:

- Batch 07 — UI Panels semantic layer:
  - `js/ui/panels.js`

Extraction status:

- source-faithful extraction completed;
- verification block added;
- cross-file relationship notes added;
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
- section headers;
- section roles;
- included functions;
- function-level comments;
- growth points / important notes;
- internal markers;
- observed callbacks / runtime bridge behavior;
- observed DOM state reads/writes;
- observed render/canvas behavior;
- verification block;
- cognition notes;
- relationship notes;
- correction candidate classification;
- closure state.

Mini-chain result:

- not required;
- Batch 07 remained within safe bounded size.

UI semantic layer coverage status:

- complete for current panels layer:
  - `panels.js`.

Next safe direction:

- inspect remaining surface layer:
  - `index.html`;
  - `css/style.css`;
- or perform a lightweight discovery coverage/index audit before surface-layer extraction.

Do not repeat Batch 07 unless repository drift or visibility uncertainty appears.
