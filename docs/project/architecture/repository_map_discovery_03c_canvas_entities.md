# Repository Map Discovery 03c — Canvas Entity Rendering

## 1. Назначение sub-batch-файла

Sub-batch ownership:

- `js/ui/canvas_entities.js`

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
- render-only boundary verified;
- source JS not mutated.

Source file:

- `js/ui/canvas_entities.js`

---

## 3. `js/ui/canvas_entities.js`

File: `js/ui/canvas_entities.js`

source_read_status: fully read during Batch 03 restoration pass.

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

- file remains render-only visualization layer;
- target lines visualize `tower.target` without owning targeting logic;
- HP bars visualize enemy state without owning damage/death flow;
- file depends on helpers from `canvas_world.js` and camera helpers from `game.js`;
- generic entity render system / ECS pipeline are not implemented;
- projectile/status-effect render system is not implemented.

code_contradicts:

- none detected.

needs_review:

- draw order changes;
- combat semantics changes;
- targeting ownership changes;
- projectile visualization additions;
- generic entity render migration;
- ECS/render-pipeline migration.

confidence: high for render-only boundary honesty.

### Cognition notes

mixed_responsibility: low/medium.

implicit_contracts:

- rendering assumes gameplay systems already updated enemy/tower state;
- selected tower highlighting depends on `uiState.selectedTower` identity stability;
- render layer reads targeting state but does not own target selection;
- enemy render assumes enemy shape/type semantics are externally stable.

hallucination_risks:

- do not assign combat ownership to visualization layer;
- do not infer ECS pipeline;
- do not infer projectile render system;
- do not treat target-line visualization as targeting ownership.

future_map_relevance: essential for render-only visualization boundary cognition.

---

## 4. Correction candidates after 03c

Correction candidate status:

- no active source-header correction required.

Correction class:

- none currently active.

Recommended source-markup correction:

- not needed now.

---

## 5. 03c closure state

Completed sub-batch:

- 03c — Canvas entity rendering:
  - `js/ui/canvas_entities.js`

Extraction status:

- source-faithful extraction completed;
- verification block added;
- render-only visualization boundary preserved;
- no active source-header correction candidates remain;
- source JS not mutated.

Do not repeat 03c unless repository drift or visibility uncertainty appears.
