# Repository Map Discovery 06 — UI Support Layer

## 1. Назначение batch-файла

Этот файл является bounded extraction batch для repository cognition discovery.

Batch ownership:

- `js/ui/helpers.js`
- `js/ui/layout.js`
- `js/ui/notifications.js`

Batch 06 покрывает lower-risk UI support layer перед dedicated hidden-complexity pass для `js/ui/panels.js`.

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

Batch: 06 — UI support layer.

Status:

- extracted from fresh source reads;
- source-faithful markup preserved;
- verification blocks added;
- correction candidates classified;
- source JS not mutated.

Source files:

- `js/ui/helpers.js`
- `js/ui/layout.js`
- `js/ui/notifications.js`

Cross-verification sources:

- `js/state.js`;
- `js/ui/controls.js`;
- `js/ui/panels.js`;
- `js/game.js`;
- `docs/project/architecture/runtime_structure.md`;
- Batch 03 / 04 findings.

Mini-chain status:

- not needed for this pass;
- Batch 06 remained small enough for one bounded file.

---

## 3. `js/ui/helpers.js`

File: `js/ui/helpers.js`

source_read_status: fully read during Batch 06 UI support extraction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — UI Helpers
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/ui/helpers.js
РОЛЬ: compact DOM/UI helper layer для shared UI element operations.
СТАТУС: lightweight helper file; UI framework / design system / component architecture НЕ реализованы.
ВЛАДЕЕТ: removeElement(), applyFixedStyle(), createUIButton(), createPanelTitle(), createSmallText(), setText()
НЕ ВЛАДЕЕТ: panel lifecycle, UI layout calculation, gameplay callbacks, runtime command dispatch, render/canvas drawing, input handling, game state mutation.
ЧИТАЕТ: document, uiLayout.compact, function arguments.
ИЗМЕНЯЕТ: DOM elements, element styles, button.onclick, element.innerText.
ИСПОЛЬЗУЕТСЯ В: ui controls/panels creation, HUD text updates, dynamic UI rebuild flow.
RUNTIME-КОНТРАКТ: файл должен загружаться до UI files that call shared helper functions.
НЕЛЬЗЯ: менять DOM behavior, callback wiring или style values без отдельного inspection pass.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: DOM / UI HELPERS
РОЛЬ: предоставить компактные DOM helpers без ownership над gameplay/UI lifecycle.
ВКЛЮЧАЕТ: removeElement(), applyFixedStyle(), createUIButton(), createPanelTitle(), createSmallText(), setText()
```

Function-level comments:

```text
removeElement(): безопасно удаляет DOM element по id.
applyFixedStyle(): применяет fixed positioning и styleMap к DOM element.
createUIButton(): создаёт standard UI button и привязывает callback без ownership над callback logic.
ТОЧКА РОСТА: shared UI helpers могут позже усилить consistency кнопок.
ВАЖНО: generic UI framework пока НЕ реализован.
createPanelTitle(): создаёт standard panel title element.
createSmallText(): создаёт compact secondary text element.
setText(): безопасно обновляет innerText DOM element по id.
```

Internal markers preserved:

```text
No additional internal marker blocks beyond function-level comments detected.
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

- file owns compact DOM/UI helper utilities;
- file mutates DOM elements, element style fields, `button.onclick`, and `innerText`;
- `createUIButton()` wires callbacks but does not own callback logic;
- file reads `uiLayout.compact` for responsive sizing;
- file does not own panel lifecycle, runtime command dispatch, rendering, input handling or game state mutation;
- generic UI framework / design system / component architecture is not implemented.

code_contradicts:

- none detected.

needs_review:

- DOM behavior changes;
- callback wiring changes;
- shared button styling changes;
- helper abstraction expansion;
- generic UI/component framework migration.

confidence: high for helper boundary; high for header honesty.

### Cognition notes

primary_archetype: UI DOM helper support layer.

secondary_archetypes:

- shared element creation helper;
- style application helper;
- text update helper;
- callback wiring surface without callback ownership.

runtime_coupling:

- used by `controls.js` and `panels.js` during DOM creation/update;
- reads `uiLayout.compact` from runtime state/layout context;
- callback functions passed into `createUIButton()` may trigger gameplay/runtime behavior, but ownership remains with caller/callback target.

helper_visibility_significance:

- all helpers are top-visible and match source ownership;
- helpers are support-significant because other UI files call them directly.

hallucination_risks:

- do not treat helper callbacks as helper-owned gameplay logic;
- do not infer UI framework;
- do not infer design system;
- do not infer component architecture;
- do not assign panel lifecycle ownership to helpers.

future_map_relevance: important support/helper layer for UI DOM creation and update flows.

---

## 4. `js/ui/layout.js`

File: `js/ui/layout.js`

source_read_status: fully read during Batch 06 UI support extraction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — UI Layout
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/ui/layout.js
РОЛЬ: responsive layout state, topbar DOM setup, topbar style sync и panel style factories.
СТАТУС: layout helper layer; layout engine / responsive framework / UI framework НЕ реализованы.
ВЛАДЕЕТ: updateResponsiveLayout(), updateUILayout(), setupInitialDom(), createTopbarChip(), updateTopbarVisibility(), getBottomPanelStyle(), getSpeedPanelStyle(), getZoomPanelStyle(), getBuildPanelStyle(), getTowerActionPanelStyle(), getSidePanelStyle()
НЕ ВЛАДЕЕТ: gameplay logic, runtime commands, render/canvas drawing, panel lifecycle, button callbacks, entity rendering, game state mutation.
ЧИТАЕТ: window.innerWidth, window.innerHeight, document, uiLayout.
ИЗМЕНЯЕТ: uiLayout responsive flags, topbar DOM content, topbar style fields.
ИСПОЛЬЗУЕТСЯ В: dynamic UI rebuild flow, topbar setup, UI controls/panels style calculation.
RUNTIME-КОНТРАКТ: файл должен загружаться до UI files that call layout/style helpers.
НЕЛЬЗЯ: менять breakpoints, style values, DOM structure или compact logic без отдельного inspection pass.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: RESPONSIVE LAYOUT STATE
РОЛЬ: обновить viewport-dependent uiLayout flags.
ВКЛЮЧАЕТ: updateResponsiveLayout(), updateUILayout()
```

Function-level comments:

```text
updateResponsiveLayout(): обновляет responsive flags и viewport-dependent uiLayout state.
ТОЧКА РОСТА: compact/mobile layout может позже потребовать broader layout coordination.
ВАЖНО: generalized layout engine / responsive framework пока НЕ реализованы.
updateUILayout(): обновляет layout state через responsive recalculation.
```

Internal markers preserved:

```text
VIEWPORT SIZE READ
RESPONSIVE FLAG UPDATE
```

---

```text
СЕКЦИЯ: TOPBAR DOM SETUP
РОЛЬ: создать initial topbar DOM structure и HUD chips.
ВКЛЮЧАЕТ: setupInitialDom(), createTopbarChip()
```

Function-level comments:

```text
setupInitialDom(): создаёт initial topbar DOM structure и HUD chips.
createTopbarChip(): создаёт один topbar chip с value span id для HUD updates.
```

Internal markers preserved:

```text
TOPBAR ROOT READ / RESET
CHIP CREATION
TOPBAR STYLE SYNC
```

---

```text
СЕКЦИЯ: TOPBAR VISIBILITY / STYLE SYNC
РОЛЬ: синхронизировать topbar DOM style с responsive layout state.
ВКЛЮЧАЕТ: updateTopbarVisibility()
```

Function-level comments:

```text
updateTopbarVisibility(): применяет responsive fixed style к topbar.
```

---

```text
СЕКЦИЯ: PANEL STYLE FACTORIES
РОЛЬ: вернуть responsive style maps для UI panels без panel lifecycle ownership.
ВКЛЮЧАЕТ: getBottomPanelStyle(), getSpeedPanelStyle(), getZoomPanelStyle(), getBuildPanelStyle(), getTowerActionPanelStyle(), getSidePanelStyle()
```

Function-level comments:

```text
getBottomPanelStyle(): возвращает responsive style preset для bottom control panel.
getSpeedPanelStyle(): возвращает responsive style preset для speed panel.
getZoomPanelStyle(): возвращает responsive style preset для zoom panel.
getBuildPanelStyle(): возвращает responsive style preset для build confirm panel.
getTowerActionPanelStyle(): возвращает responsive style preset для selected tower action panel.
getSidePanelStyle(): возвращает responsive style preset для side/menu/info panels.
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

- file owns responsive layout state recalculation and UI layout helper functions;
- `updateResponsiveLayout()` reads `window.innerWidth`, `window.innerHeight` and mutates `uiLayout` flags;
- `updateUILayout()` delegates to `updateResponsiveLayout()`;
- `setupInitialDom()` creates/reset topbar DOM chips;
- style factory functions return responsive style maps and do not own panel lifecycle;
- file reads/mutates `uiLayout` but does not own foundation state shape;
- after `layout.js` load, later runtime calls resolve to the layout.js browser-global `updateResponsiveLayout()` version rather than the earlier state.js version;
- Batch 06 qualifies Batch 04 interpretation by describing effective runtime responsive recalculation after UI layer load;
- layout engine / responsive framework / UI framework are not implemented.

code_contradicts:

- none detected.

needs_review:

- duplicate-name / authority ambiguity with `updateResponsiveLayout()` in `js/state.js`;
- extraction/split residue candidate around responsive recalculation ownership;
- browser-global shadowing/load-order semantics;
- possible runtime bug risk from duplicate recalculation path;
- breakpoint changes;
- `uiLayout` shape changes;
- compact/mobile logic changes;
- topbar DOM structure changes;
- style map changes;
- broader layout coordination migration.

confidence: high for layout helper role; medium/high for authority clarity due to duplicate helper name with `state.js`.

### Cognition notes

primary_archetype: responsive UI layout helper layer.

secondary_archetypes:

- responsive state recalculation helper;
- topbar DOM setup helper;
- topbar style sync helper;
- panel style factory helper.

runtime_coupling:

- mutates `uiLayout` fields from shared runtime state;
- called by `controls.js` through `updateUILayout()` during dynamic UI rebuild;
- used by `panels.js` / `controls.js` via style factory functions;
- depends on topbar DOM existence for topbar setup/visibility.

state_authority_distinction:

- `state.js` remains foundation authority for `uiLayout` state shape and bootstrap/init ownership;
- `layout.js` captures effective runtime responsive recalculation ownership after UI layer load;
- `layout.js` mutates responsive/layout fields as UI support behavior;
- mutation of `uiLayout` does not make `layout.js` owner of foundation state shape.

needs_review_zone:

- both `state.js` and `layout.js` declare `updateResponsiveLayout()`;
- current runtime load order means later declaration shadows earlier browser-global function name;
- `game.js` resize flow calls `updateResponsiveLayout()` and then `updateUILayout()`, while `updateUILayout()` also delegates to `updateResponsiveLayout()`;
- preserve as extraction/split residue candidate, runtime authority ambiguity, future refactor candidate, possible runtime bug risk and needs further review;
- Batch 04 remains accurate for foundation/init ownership;
- no immediate source-header correction is required.

helper_visibility_significance:

- layout helper functions are top-visible and match source ownership;
- duplicate helper name is significance-relevant because it touches shared layout state and browser-global function identity.

hallucination_risks:

- do not infer generalized layout engine;
- do not infer responsive framework;
- do not treat style factories as panel lifecycle ownership;
- do not treat `uiLayout` mutation as ownership of foundation state shape;
- do not silently normalize duplicate `updateResponsiveLayout()` function name;
- do not interpret Batch 06 as full ownership transfer of `uiLayout` foundation authority away from `state.js`.

future_map_relevance: important support layer with state-coupled layout behavior and explicit needs-review zone.

---

## 5. `js/ui/notifications.js`

File: `js/ui/notifications.js`

source_read_status: fully read during Batch 06 UI support extraction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — UI Notifications
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: js/ui/notifications.js
РОЛЬ: compact canvas notification lifecycle layer.
СТАТУС: notification UI state/render layer; notification framework / priority system / animation system НЕ реализованы.
ВЛАДЕЕТ: notify(), updateNotifications(), drawNotifications()
НЕ ВЛАДЕЕТ: gameplay decisions that trigger notifications, wave lifecycle, placement lifecycle, game over logic, UI panel lifecycle, DOM control creation, gameplay state mutation.
ЧИТАЕТ: uiState.notifications, uiState.infoPanelOpen, uiState.menuOpen, uiLayout, canvas.width, ctx, notification fields.
ИЗМЕНЯЕТ: uiState.notifications queue/lifetime, canvas drawing state во время notification render pass.
ИСПОЛЬЗУЕТСЯ В: runtime feedback flow, game update loop, canvas UI render pass.
RUNTIME-КОНТРАКТ: notify() принимает message intent от других systems, но не владеет причиной gameplay event.
НЕЛЬЗЯ: менять queue size, lifetime, colors, positioning или notification timing без отдельного inspection pass.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: NOTIFICATION QUEUE / CREATION
РОЛЬ: создать notification entry и ограничить размер queue.
ВКЛЮЧАЕТ: notify()
```

Function-level comments:

```text
notify(): создаёт notification entry и добавляет её в runtime queue.
ТОЧКА РОСТА: notification categories/timing may later need priority or animation rules.
ВАЖНО: notification framework / priority / animation system пока НЕ реализованы.
```

---

```text
СЕКЦИЯ: NOTIFICATION LIFETIME UPDATE
РОЛЬ: обновить lifetime active notifications и удалить expired entries.
ВКЛЮЧАЕТ: updateNotifications()
```

Function-level comments:

```text
updateNotifications(): обновляет notification lifetime и удаляет expired entries.
```

Internal markers preserved:

```text
LIFETIME DECREMENT
EXPIRED ENTRY CLEANUP
```

---

```text
СЕКЦИЯ: NOTIFICATION CANVAS RENDER
РОЛЬ: визуализировать active notifications через canvas overlay rendering.
ВКЛЮЧАЕТ: drawNotifications()
```

Function-level comments:

```text
drawNotifications(): визуализирует active notifications через canvas overlay rendering.
```

Internal markers preserved:

```text
POSITION / WIDTH CALCULATION
TYPE COLOR SELECTION
NOTIFICATION BOX RENDER
NOTIFICATION TEXT RENDER
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

- file owns notification queue creation, lifetime update, and canvas notification rendering;
- `notify()` mutates `uiState.notifications` queue and caps queue length at 4;
- `updateNotifications()` decrements notification lifetime and removes expired entries;
- `drawNotifications()` reads UI/layout/canvas state and mutates canvas drawing state during render pass;
- file accepts message intent from other systems but does not own causes of gameplay events;
- notification framework / priority system / animation system are not implemented.

code_contradicts:

- none detected.

needs_review:

- notification queue size changes;
- lifetime/timing changes;
- type/color changes;
- positioning changes;
- notification priority/category system migration;
- animation system migration;
- UI overlay/render ordering changes.

confidence: high for notification boundary; high for header honesty.

### Cognition notes

primary_archetype: notification UI state/render support layer.

secondary_archetypes:

- notification queue helper;
- notification lifetime update helper;
- canvas overlay render helper.

runtime_coupling:

- `notify()` is called by gameplay/system/UI flows but does not own event causes;
- `updateNotifications()` belongs in update loop timing;
- `drawNotifications()` belongs in canvas UI render pass;
- reads `uiState.infoPanelOpen` and `uiState.menuOpen` for positioning offset;
- mutates `uiState.notifications` but does not own `uiState` foundation shape.

state_authority_distinction:

- `state.js` owns `uiState` shape;
- notifications owns queue/lifetime behavior over `uiState.notifications`;
- downstream mutation of `uiState.notifications` does not imply ownership of all UI state.

helper_visibility_significance:

- all notification functions are authority-significant within notification lifecycle and correctly top-visible.

hallucination_risks:

- do not infer full notification framework;
- do not infer priority/animation system;
- do not assign gameplay event ownership to notification messages;
- do not treat canvas notification rendering as general render layer ownership;
- do not treat `uiState.notifications` mutation as ownership of foundation UI state shape.

future_map_relevance: important support layer for runtime feedback and notification lifecycle cognition.

---

## 6. Cross-file UI support relationship notes

Verified support relationships:

```text
helpers.js → controls.js / panels.js DOM helper usage
layout.js → controls.js / panels.js layout and style support
notifications.js → systems/game/UI runtime feedback and canvas overlay render pass
```

Relationship to `state.js`:

- `helpers.js` reads `uiLayout.compact`;
- `layout.js` mutates `uiLayout` fields;
- `notifications.js` mutates `uiState.notifications` and reads UI panel state flags;
- `state.js` remains foundation authority for `uiLayout` and `uiState` shapes.

Relationship to `controls.js`:

- `controls.js` uses helper/layout functions during dynamic UI rebuild;
- `controls.js` dispatches runtime callbacks through buttons created by helpers;
- helper callback wiring does not transfer callback ownership into helpers.

Relationship to `panels.js`:

- `panels.js` uses helper/layout functions for panel DOM creation and style application;
- `panels.js` remains hidden-complexity UI semantic layer and should be inspected separately.

Relationship to `game.js`:

- notifications participate in update/render feedback flow;
- layout and helpers support UI bootstrap/rebuild paths;
- `game.js` resize flow currently exposes duplicate `updateResponsiveLayout()` call path through `updateUILayout()` delegation;
- no Batch 06 file owns game loop or input/camera orchestration.

---

## 7. Correction candidates after Batch 06

### `js/ui/helpers.js`

Correction candidate status:

- no direct contradiction;
- no missing top-level ownership detected;
- header is honest and source-faithful.

Correction class:

- none currently active.

Recommended source-markup correction:

- not needed now.

---

### `js/ui/layout.js`

Correction candidate status:

- no direct header/code contradiction detected;
- no missing top-level ownership detected;
- header is source-faithful;
- duplicate `updateResponsiveLayout()` name with `js/state.js` creates needs-review zone, not immediate correction candidate.

Correction class:

- none currently active;
- extraction/split residue candidate;
- runtime authority ambiguity;
- future refactor candidate;
- possible runtime bug risk;
- needs-review for duplicate browser-global helper name / shadowing-load-order semantics.

Recommended source-markup correction:

- not in this pass.

---

### `js/ui/notifications.js`

Correction candidate status:

- no direct contradiction;
- no missing top-level ownership detected;
- header is honest and source-faithful.

Correction class:

- none currently active.

Recommended source-markup correction:

- not needed now.

---

## 8. Batch 06 closure state

Completed extraction batch:

- Batch 06 — UI support layer:
  - `js/ui/helpers.js`
  - `js/ui/layout.js`
  - `js/ui/notifications.js`

Extraction status:

- source-faithful extraction completed;
- verification blocks added;
- UI support relationship notes added;
- correction candidates classified;
- duplicate `updateResponsiveLayout()` interpretation synchronized with Batch 04 audit clarification;
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
- verification blocks;
- cognition notes;
- relationship notes;
- correction candidate classification;
- closure state.

Mini-chain result:

- not required;
- Batch 06 remained within safe bounded size.

UI support coverage status:

- complete for current UI support layer:
  - `helpers.js`;
  - `layout.js`;
  - `notifications.js`.

Next safe direction:

- inspect hidden-complexity `js/ui/panels.js` as dedicated Batch 07.

Do not repeat Batch 06 unless repository drift or visibility uncertainty appears.
