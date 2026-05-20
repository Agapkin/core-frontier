# Repository Map Discovery 08 — Surface / Runtime Entry Layer

## 1. Назначение batch-файла

Этот файл является bounded extraction batch для repository cognition discovery.

Batch ownership:

- `index.html`
- `css/style.css`

Batch 08 закрывает surface/runtime shell discovery после Batch 01–07 runtime JS coverage.

Repository truth remains:

- actual code;
- actual runtime behavior;
- actual browser loading semantics;
- actual active/inactive surface state.

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
- runtime authority beyond actual browser behavior.

If markup and code diverge:

- code wins;
- divergence must remain visible explicitly;
- source wording must not be silently normalized.

---

## 2. Batch status

Batch: 08 — surface/runtime entry layer.

Status:

- extracted from fresh source reads;
- source-faithful markup preserved;
- verification blocks added;
- correction candidates classified;
- source files not mutated.

Source files:

- `index.html`
- `css/style.css`

Cross-verification sources:

- `docs/project/architecture/runtime_structure.md`;
- Batch 01–07 findings where relevant.

Mini-chain status:

- not needed for this pass;
- Batch 08 remained within safe bounded size.

---

## 3. `index.html`

File: `index.html`

source_read_status: fully read during Batch 08 surface extraction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — HTML Shell
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: index.html
РОЛЬ: browser entrypoint, DOM/canvas root bootstrap и script loading assembly point.
СТАТУС: repository shell layer; gameplay runtime owner / module loader / app framework НЕ реализованы.
ВЛАДЕЕТ: document shell, viewport meta, active inline CSS shell styles, #topbar, #game canvas, browser-global script order.
НЕ ВЛАДЕЕТ: gameplay logic, runtime state, systems execution, rendering implementation, UI component lifecycle, module loading architecture.
ЧИТАЕТ: browser HTML/CSS/Script loading semantics.
ИЗМЕНЯЕТ: initial DOM structure parsed by browser only.
ИСПОЛЬЗУЕТСЯ В: browser startup and runtime script assembly.
RUNTIME-КОНТРАКТ: script order is dependency-sensitive for browser-global runtime.
НЕЛЬЗЯ: менять script order, DOM roots, inline CSS behavior или вводить modules/framework wording без отдельного inspection pass.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: HEAD / META
РОЛЬ: задать document metadata и viewport behavior для canvas runtime shell.
```

Extracted elements:

```text
<!DOCTYPE html>
<html lang="ru">
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<title>CORE FRONTIER</title>
```

---

```text
СЕКЦИЯ: INLINE CSS
РОЛЬ: задать active shell-level viewport/canvas/topbar styles внутри HTML.
ВАЖНО: css/style.css существует, но этот shell сейчас НЕ подключает его через link tag.
ВАЖНО: module/CSS framework architecture пока НЕ реализована.
```

Internal marker preserved:

```text
inline CSS: active shell-level styles for full-screen canvas and topbar HUD roots.
```

Active inline CSS owns runtime shell styling for:

- `html, body`;
- `body`;
- `canvas`;
- `.topbar`;
- `.resource`;
- `button`;
- mobile media rules;
- mobile landscape media rules.

Observed active inline CSS behavior:

- locks viewport/page overflow;
- sets full-screen canvas sizing;
- sets body fixed positioning;
- sets touch/overscroll behavior;
- styles topbar HUD root;
- styles legacy `.resource` chips;
- applies button font/user-select/tap-highlight behavior;
- applies small-screen responsive topbar/resource adjustments.

---

```text
СЕКЦИЯ: BODY ROOT
РОЛЬ: предоставить stable DOM roots для HUD и canvas runtime.
```

Extracted DOM roots:

```text
<div class="topbar" id="topbar"></div>
<canvas id="game"></canvas>
```

Internal marker preserved:

```text
canvas root: main drawing surface used by js/state.js and render layers.
```

---

```text
СЕКЦИЯ: SCRIPT LOADING ORDER
РОЛЬ: собрать browser-global runtime в dependency-sensitive порядке.
ВАЖНО: browser-global runtime зависит от порядка script tags.
ВАЖНО: module loader / framework architecture пока НЕ реализованы.
```

Script loading order — source-faithful:

```text
js/data.js
js/state.js
js/systems/systems_wave_manager.js
js/systems/systems_placement.js
js/systems/systems_selected_object_actions.js
js/systems/systems.js
js/ui/helpers.js
js/ui/layout.js
js/ui/controls.js
js/ui/panels.js
js/ui/canvas_world.js
js/ui/canvas_entities.js
js/ui/notifications.js
js/game.js
```

Script group comments preserved:

```text
FOUNDATION: static data before mutable state.
SYSTEMS: gameplay helpers before orchestration shell.
UI: helpers/layout/controls/panels/render layers before game loop.
RUNTIME START: game.js binds input and starts final gameLoop().
```

### Verification block

source_read_status: fully read.

header_matches_code: yes.

section_list_matches_code: yes.

script_order_matches_runtime_structure: yes.

missing_from_header:

- none detected.

header_claims_not_confirmed:

- none detected.

code_confirms:

- `index.html` is active runtime entrypoint;
- file owns document shell, viewport meta, DOM roots and script loading assembly;
- file contains active inline CSS;
- file does not link `css/style.css` through `<link>`;
- file defines `#topbar` and `#game` DOM roots;
- file assembles browser-global runtime through ordered script tags;
- `game.js` loads last;
- module loader / framework architecture is not implemented;
- runtime script order matches `runtime_structure.md`.

code_contradicts:

- none detected.

needs_review:

- script order changes;
- DOM root changes;
- inline CSS extraction/migration;
- activating external `css/style.css`;
- introducing modules/bundler/framework;
- changing viewport/touch behavior;
- topbar class/selector alignment.

confidence: high for runtime entrypoint authority; high for script order; high for active inline CSS authority.

### Cognition notes

primary_archetype: runtime entrypoint / HTML shell layer.

secondary_archetypes:

- DOM root bootstrap layer;
- active inline CSS shell layer;
- browser-global script loading assembly layer;
- surface/runtime boundary layer.

runtime_coupling:

- `state.js` reads `#game` canvas through `document.getElementById("game")`;
- UI layout/panel code uses `#topbar` root;
- script order determines browser-global availability;
- `layout.js` shadowing of `updateResponsiveLayout()` relies on script order after `state.js`;
- `game.js` starts after all data/state/systems/ui files are available.

css_authority:

- active runtime CSS authority currently lives inside `index.html` inline `<style>`;
- `css/style.css` exists but is not linked by this document;
- do not treat `css/style.css` as active runtime stylesheet until a `<link>` or equivalent loading mechanism exists.

hallucination_risks:

- do not infer modules;
- do not infer bundler;
- do not infer CSS framework;
- do not infer app framework;
- do not treat external CSS as active styling authority;
- do not treat HTML shell as gameplay/runtime logic owner.

future_map_relevance: essential surface/runtime entry authority.

---

## 4. `css/style.css`

File: `css/style.css`

source_read_status: fully read during Batch 08 surface extraction pass.

### Header extraction — source-faithful

```text
CORE FRONTIER — CSS Surface
КАРТА ФАЙЛА ДЛЯ AI
ФАЙЛ: css/style.css
РОЛЬ: stylesheet для page base, canvas root, topbar, buttons, panels и responsive rules.
СТАТУС: repository surface CSS layer; CSS framework / design system architecture НЕ реализованы.
ВЛАДЕЕТ: global box sizing, page/body/canvas base styles, .topbar, .cf-chip, button states, panel pointer behavior, menu scrollbar, responsive media rules.
НЕ ВЛАДЕЕТ: gameplay logic, runtime state, script loading, UI callback behavior, canvas drawing, layout calculations inside JS.
ЧИТАЕТ: browser CSS cascade, viewport size, orientation, safe-area env values.
ИЗМЕНЯЕТ: visual presentation/layout only through CSS rules.
ИСПОЛЬЗУЕТСЯ В: browser rendering surface for index.html DOM roots and JS-created UI elements.
RUNTIME-КОНТРАКТ: selectors/classes/ids must stay aligned with index.html and js/ui DOM creation.
НЕЛЬЗЯ: менять selectors, responsive breakpoints, pointer/touch behavior или layout values без отдельного inspection pass.
```

### Section extraction — source-faithful

```text
СЕКЦИЯ: GLOBAL / PAGE BASE
РОЛЬ: задать global sizing, viewport lock и base typography.
```

Selectors / behavior:

```text
*
html,
body
body
```

Responsibilities:

- global `box-sizing`;
- tap highlight suppression;
- page margin/padding reset;
- viewport overflow lock;
- full width/height;
- background/color/font;
- touch-action rules;
- body fixed positioning;
- overscroll behavior;
- safe-area padding.

---

```text
СЕКЦИЯ: CANVAS / ROOT LAYOUT
РОЛЬ: задать full-screen canvas surface styling.
```

Selectors:

```text
canvas
```

Responsibilities:

- block display;
- full viewport canvas sizing;
- canvas background.

---

```text
СЕКЦИЯ: TOPBAR / RESOURCE CHIPS
РОЛЬ: styling для topbar HUD root и resource chips.
```

Internal markers preserved:

```text
TOPBAR
```

Selectors:

```text
.topbar
.cf-chip
```

Responsibilities:

- fixed HUD root positioning;
- safe-area offsets;
- z-index;
- flex layout;
- chip visual styling;
- pointer-events behavior.

---

```text
СЕКЦИЯ: BUTTONS
РОЛЬ: базовые interaction styles для JS-created buttons.
```

Internal markers preserved:

```text
BUTTONS
```

Selectors:

```text
button
button:active
```

Responsibilities:

- button appearance reset;
- cursor;
- user-select suppression;
- touch manipulation;
- active transform feedback.

---

```text
СЕКЦИЯ: UI / PANEL SURFACE
РОЛЬ: pointer/scroll surface rules для DOM panels.
```

Internal markers preserved:

```text
PANELS
SCROLL
```

Selectors:

```text
#bottom-control-panel
#utility-control-panel
#tower-action-panel
#build-confirm-panel
#menu-panel
#game-over-panel
#menu-panel::-webkit-scrollbar
#menu-panel::-webkit-scrollbar-thumb
```

Responsibilities:

- pointer-events for JS-created panel roots;
- menu panel scrollbar styling.

---

```text
СЕКЦИЯ: RESPONSIVE / MOBILE RULES
РОЛЬ: viewport-dependent visual adjustments for mobile, tablet and desktop.
ВАЖНО: responsive framework НЕ реализован; это direct CSS media rules.
```

Internal markers preserved:

```text
MOBILE
MOBILE LANDSCAPE
TABLET
DESKTOP
```

Media rules:

```text
@media (max-width: 768px)
@media (max-width: 950px) and (orientation: landscape)
@media (min-width: 769px) and (max-width: 1180px)
@media (min-width: 1181px)
```

Responsibilities:

- responsive topbar gap adjustments;
- responsive `.cf-chip` sizing/font adjustments;
- responsive button font adjustment;
- mobile landscape topbar right offset;
- tablet/desktop chip font adjustments.

### Verification block

source_read_status: fully read.

header_matches_code: yes.

section_list_matches_code: yes.

selector_list_matches_code: yes.

runtime_active_stylesheet: no, not currently linked from `index.html`.

missing_from_header:

- none detected.

header_claims_not_confirmed:

- `ИСПОЛЬЗУЕТСЯ В: browser rendering surface for index.html DOM roots and JS-created UI elements` is structurally true as a surface CSS intent, but not currently active at runtime because `index.html` does not link this stylesheet.

code_confirms:

- file exists as repository surface CSS layer;
- file is source-marked as CSS surface layer;
- file contains selectors/classes/ids aligned with visible DOM/UI concepts;
- file does not own gameplay/runtime logic;
- CSS framework / design system architecture is not implemented;
- direct responsive media rules exist;
- `index.html` does not currently load this file.

code_contradicts:

- none as source intent;
- runtime activation is absent.

needs_review:

- whether `css/style.css` should remain inactive surface artifact;
- whether active inline CSS should migrate into external stylesheet;
- selector drift between `.resource` inline CSS and `.cf-chip` external CSS;
- panel selector alignment if DOM ids/classes change;
- responsive breakpoint alignment between inline CSS and external CSS;
- pointer/touch behavior if stylesheet becomes active;
- duplicate or competing style authority if linked without removing inline CSS.

confidence: high for repository surface CSS role; high for inactive runtime status; medium/high for future activation/migration pressure.

### Cognition notes

primary_archetype: inactive repository surface CSS layer.

secondary_archetypes:

- page/canvas base styling layer;
- topbar/chip styling layer;
- button interaction styling layer;
- DOM panel surface styling layer;
- responsive media rule layer.

runtime_authority_status:

- inactive for current runtime because `index.html` does not link it;
- not a dead file by default;
- should be treated as repository surface artifact / future activation or migration candidate until explicit cleanup decision.

css_authority_distinction:

- active shell-level styling authority is currently inline CSS inside `index.html`;
- `css/style.css` is a repository surface CSS layer but not current runtime styling authority;
- if activated later, inline/external CSS duplication and selector differences must be reviewed.

selector_alignment_notes:

- `index.html` inline CSS uses `.resource` for resource chips;
- `css/style.css` uses `.cf-chip`;
- JS topbar chips should be checked before external CSS activation;
- panel ids in stylesheet match known JS-created panel roots.

hallucination_risks:

- do not classify as active stylesheet without `<link>`;
- do not classify as dead file without cleanup decision;
- do not infer CSS framework/design system;
- do not assume inline CSS and external CSS are equivalent;
- do not activate or migrate CSS without bounded inspection pass.

future_map_relevance: important for surface authority, active/inactive styling boundary and future CSS migration decisions.

---

## 5. Surface/runtime relationship notes

Verified runtime entry relationship:

```text
index.html
→ data.js
→ state.js
→ systems helpers
→ systems.js
→ ui/*
→ game.js
```

Surface/runtime roots:

- `#game` canvas root is consumed by `state.js` and render/runtime layers;
- `#topbar` root is consumed by UI layout/panel/HUD flows;
- inline CSS defines active initial viewport/canvas/topbar/button shell behavior.

Relationship to Batch 04:

- `state.js` depends on `#game` existing in DOM;
- `state.js` foundation state initialization occurs after `index.html` DOM root parsing reaches script tags;
- browser-global load order from `index.html` enables `data.js → state.js` dependency.

Relationship to Batch 06:

- `layout.js` effective runtime responsive recalculation relies on being loaded after `state.js`;
- `helpers.js`, `layout.js`, `notifications.js` operate within DOM/canvas surface established by `index.html`;
- duplicate `updateResponsiveLayout()` context remains preserved and not reopened by Batch 08.

Relationship to Batch 07:

- `panels.js` uses DOM roots and canvas overlay surface indirectly through UI/runtime flows;
- panel styling may be affected if external CSS is activated later;
- `index.html` does not own panel lifecycle.

---

## 6. Correction candidates after Batch 08

### `index.html`

Correction candidate status:

- no direct contradiction;
- no missing top-level ownership detected;
- header is honest and source-faithful;
- active inline CSS and script order are represented clearly.

Correction class:

- none currently active.

Recommended source-markup correction:

- not needed now.

Important cognition clarification:

- `index.html` is runtime entrypoint authority and active CSS shell authority;
- it is not gameplay/runtime logic owner.

---

### `css/style.css`

Correction candidate status:

- no direct source-header contradiction;
- runtime activation is absent because file is not linked;
- preserve as inactive repository surface CSS artifact / future activation or migration candidate.

Correction class:

- no immediate correction;
- needs-review for active/inactive CSS authority and selector alignment.

Recommended source-markup correction:

- not in this pass.

Important cognition clarification:

- inactive does not automatically mean dead;
- linked/active does not currently exist;
- future CSS activation requires separate bounded inspection/migration pass.

---

## 7. Batch 08 closure state

Completed extraction batch:

- Batch 08 — Surface / Runtime Entry Layer:
  - `index.html`
  - `css/style.css`

Extraction status:

- source-faithful extraction completed;
- verification blocks added;
- surface/runtime relationship notes added;
- correction candidates classified;
- no source file mutation performed.

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
- internal markers;
- script order extraction;
- selector/media extraction;
- verification blocks;
- cognition notes;
- relationship notes;
- correction candidate classification;
- closure state.

Mini-chain result:

- not required;
- Batch 08 remained within safe bounded size.

Runtime/surface coverage status:

- active runtime JS coverage already complete through Batch 01–07;
- surface/runtime shell coverage now complete through Batch 08.

Next safe direction:

- synchronize root discovery navigation to include Batch 04–08 and final runtime/surface coverage status.

Do not repeat Batch 08 unless repository drift or visibility uncertainty appears.
