# Repository Map Discovery 03 — UI Render / Control Index

## 1. Назначение Batch 03 root-файла

Этот файл является lightweight index/status/navigation layer для Batch 03 UI render/control discovery mini-chain.

Он больше НЕ хранит detailed extraction blocks напрямую.

Detailed source-faithful extraction теперь находится только в bounded sub-batch files:

- `docs/project/repository_cognition/discovery/repository_map_discovery_03a_ui_controls.md`
- `docs/project/repository_cognition/discovery/repository_map_discovery_03b_canvas_world.md`
- `docs/project/repository_cognition/discovery/repository_map_discovery_03c_canvas_entities.md`

Назначение этого root-файла:

- Batch 03 purpose;
- mini-chain navigation;
- sub-batch ownership map;
- integrity/status overview;
- continuation state;
- operational constraints;
- deferred/not-done areas.

This file is NOT:

- `repository_map.yml`;
- parser/scanner output;
- automation layer;
- governance system;
- source authority;
- runtime authority.

Repository truth remains:

- actual code;
- actual runtime behavior.

Discovery files remain interpretation/cognition layer only.

---

## 2. Batch 03 purpose

Batch 03 covers UI render/control repository cognition for:

- UI command/control bridge;
- world/canvas rendering;
- entity/canvas rendering;
- render-only boundary verification;
- cross-file runtime coupling detection;
- call-site vs ownership distinction.

Batch 03 was split into mini-chain files because the previous single Batch 03 extraction file became synchronization-sensitive and was partially truncated during a large full-file replacement.

The split exists to reduce:

- connector/write pressure;
- partial truncation risk;
- overwrite-from-memory risk;
- extraction drift risk;
- continuation ambiguity.

---

## 3. Mini-chain navigation

### 03a — UI Controls

File:

- `docs/project/repository_cognition/discovery/repository_map_discovery_03a_ui_controls.md`

Owned source file:

- `js/ui/controls.js`

Cross-file verification source:

- `js/ui/panels.js`

Status:

- created;
- source-faithful extraction completed;
- verification block present;
- closure state present;
- cross-file ownership clarified;
- no active source-header correction candidate.

Key preserved finding:

- `controls.js` calls `createMenuPanel()` / `createGameOverPanel()` during dynamic UI rebuild;
- ownership remains in `panels.js`;
- call-site does NOT imply ownership;
- this is runtime coupling, not source-header omission.

---

### 03b — Canvas World Rendering

File:

- `docs/project/repository_cognition/discovery/repository_map_discovery_03b_canvas_world.md`

Owned source file:

- `js/ui/canvas_world.js`

Status:

- created;
- source-faithful extraction completed;
- verification block present;
- closure state present;
- no active source-header correction candidate.

Key preserved finding:

- `canvas_world.js` owns world-space rendering helpers and placement overlay visualization;
- it reads placement validation result for visualization;
- it does NOT own placement lifecycle or placement validation;
- generic render engine / layer manager is not implemented.

---

### 03c — Canvas Entity Rendering

File:

- `docs/project/repository_cognition/discovery/repository_map_discovery_03c_canvas_entities.md`

Owned source file:

- `js/ui/canvas_entities.js`

Status:

- created;
- source-faithful extraction completed;
- verification block present;
- closure state present;
- no active source-header correction candidate.

Key preserved finding:

- `canvas_entities.js` is render-only visualization layer;
- target lines visualize `tower.target` but do not own targeting;
- HP bars visualize enemy state but do not own damage/death flow;
- generic entity render system / ECS pipeline is not implemented.

---

## 4. Sub-batch ownership map

```text
03a → js/ui/controls.js
03b → js/ui/canvas_world.js
03c → js/ui/canvas_entities.js
```

Detailed extraction ownership:

```text
repository_map_discovery_03a_ui_controls.md
→ controls.js extraction, verification, cross-file coupling notes

repository_map_discovery_03b_canvas_world.md
→ canvas_world.js extraction, verification, render/placement overlay boundary notes

repository_map_discovery_03c_canvas_entities.md
→ canvas_entities.js extraction, verification, render-only boundary notes
```

The Batch 03 root file must remain lightweight.

Do NOT reinsert detailed extraction blocks into this file.

---

## 5. Integrity status

Current mini-chain integrity status:

- 03a exists and contains closure state;
- 03b exists and contains closure state;
- 03c exists and contains closure state;
- Batch 03 root now contains only index/status/navigation;
- source JS files were not mutated during mini-chain restructuring;
- runtime behavior was not changed.

Post-split expected invariant:

Detailed extraction lives only in:

- 03a;
- 03b;
- 03c.

Root Batch 03 file lives only as:

- index;
- status;
- navigation;
- continuation state.

---

## 6. Continuation state

Batch 03 mini-chain restructuring status:

- 03a created;
- 03b created;
- 03c created;
- Batch 03 root reduced to lightweight index/status/navigation.

Current Batch 03 status:

- stable after mini-chain split;
- detailed extraction preserved in bounded files;
- root no longer oversized;
- connector/write pressure reduced.

Next safe directions:

1. Run a bounded post-split integrity verification if needed.
2. Consider template stabilization only after confirming Batch 03 mini-chain remains stable.
3. Continue future discovery with bounded files earlier if a batch begins to exceed safe mutation size.

Do not repeat 03a/03b/03c unless repository drift or visibility uncertainty appears.

---

## 7. Operational constraints

Do NOT:

- mutate runtime JS;
- mutate source headers;
- create `repository_map.yml`;
- create parser/scanner systems;
- create dependency graph;
- move files into folders yet;
- move discovery rules into `workflow.md`;
- alter Batch 01 / Batch 02 from this Batch 03 root file.

This mini-chain remains:

- experimental;
- discovery-local;
- bounded;
- connector-safe;
- non-authoritative.

---

## 8. Deferred / not-done areas

Deferred / not done in this pass:

- `repository_map.yml` implementation;
- parser/scanner implementation;
- automation rollout;
- folder migration to `docs/project/architecture/repository_map_discovery/`;
- template canonization;
- workflow.md canonization;
- runtime/source header mutation;
- Batch 01/02 redesign.

---

## 9. Operational conclusion

Batch 03 has been converted from one synchronization-sensitive extraction file into a bounded mini-chain.

The root Batch 03 file now provides navigation and status only.

This preserves extraction integrity while reducing connector/write pressure for future repository cognition maintenance.
