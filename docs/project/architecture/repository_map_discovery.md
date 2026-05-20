# Repository Map Discovery — Overview / Workflow / Batch Navigation

## 1. Назначение документа

Этот файл является lightweight root overview для experimental repository cognition discovery chain.

Он больше НЕ хранит giant extraction blocks directly.

Detailed source-faithful extraction content now lives in bounded batch files:

- `docs/project/architecture/repository_map_discovery_01_runtime_orchestration.md`
- `docs/project/architecture/repository_map_discovery_02_extracted_systems.md`
- `docs/project/architecture/repository_map_discovery_03_ui_render_control.md`

Root discovery file exists to preserve:

- discovery purpose;
- cognition-maintenance workflow;
- extraction/correction/re-check discipline;
- drift-detection philosophy;
- batch-chain navigation;
- continuation status;
- operational constraints;
- deferred areas.

This file is intentionally:

- lightweight;
- retrieval-safe;
- continuation-friendly;
- index-oriented;
- experimental;
- non-authoritative.

---

## 2. Runtime truth supremacy

Repository truth remains:

- actual code;
- actual runtime behavior;
- actual file structure;
- actual script order;
- verified repository state.

AI-readable headers, comments, discovery files and future maps are interpretation layers.

They are useful for repository cognition, but they are not runtime authority.

If code and markup diverge:

- code wins;
- divergence must remain explicitly visible;
- discovery must not silently normalize the mismatch;
- source files must not be rewritten without a separate bounded correction pass.

---

## 3. Experimental cognition-maintenance workflow

The repository has operationally discovered an experimental cognition-maintenance cycle:

```text
code
↕
AI-readable markup
↕
discovery extraction
↕
future repository cognition
```

Current experimental cycle:

1. source file read;
2. source-faithful markup extraction;
3. code/runtime verification;
4. drift or incompleteness detection;
5. correction candidate classification;
6. separate bounded correction pass if needed;
7. re-check / re-verification pass;
8. continuation state update.

This cycle is still experimental.

It must remain inside the discovery layer for now.

Do NOT move this workflow into `workflow.md` yet.

---

## 4. Drift-detection philosophy

Discovery should preserve:

- source snapshot;
- extracted markup;
- verification state;
- drift visibility;
- correction candidates;
- mismatch history;
- uncertainty markers.

Discovery must NOT silently normalize:

- incomplete headers;
- stale ownership;
- implicit runtime contracts;
- missing section semantics;
- future-generic pressure;
- mixed responsibility.

Not all findings require source correction.

Correction candidate classes:

1. honest-but-compact header;
2. incomplete ownership visibility;
3. stale markup;
4. implicit runtime contract;
5. actual contradiction.

Only real incompleteness/drift should become correction candidates.

---

## 5. Oversized / truncation-prone batch handling rule

Discovery batches are themselves synchronization-sensitive repository cognition entities.

If a discovery batch becomes:

- too large;
- truncation-prone;
- synchronization-sensitive;
- unsafe for bounded full-file mutation;

then:

- do NOT repeatedly restore it as one giant extraction file;
- convert it into mini-chain structure instead.

Mini-chain structure:

### Root batch file

Root batch file should contain only:

- index;
- navigation;
- status;
- continuation;
- integrity warnings.

### Sub-batch files

Sub-batch files should contain:

- detailed extraction;
- verification;
- cognition notes;
- correction lifecycle.

Operational lessons verified by Batch 03:

- bounded sub-batches reduce connector/write pressure;
- post-write integrity verification is mandatory for large cognition files;
- discovery files themselves are synchronization-sensitive entities;
- extraction integrity drift can occur without runtime drift;
- restoration must use fresh source reads instead of overwrite-from-memory reconstruction.

This is discovery-local mutation-safety guidance.

It is NOT:

- `workflow.md` canonization;
- governance redesign;
- `repository_map.yml` generation;
- parser/scanner rollout;
- architecture redesign.

---

## 6. Call-site vs ownership verification rule

Discovery must preserve the distinction:

```text
function call does NOT imply ownership
```

Ownership should be verified through:

- declaration / definition location;
- explicit source-header ownership;
- actual code/runtime behavior;
- confirmed file responsibility.

Cross-file calls should be classified as one of:

- runtime coupling;
- orchestration dependency;
- callback bridge;
- external dependency.

They should NOT automatically become:

- missing ownership;
- source-header omission;
- correction candidate.

Verified examples:

- `controls.js` calls `createMenuPanel()` / `createGameOverPanel()`, but ownership remains in `panels.js`;
- `game.js` bridges into placement / selected object systems without owning them;
- `systems.js` calls extracted wave helpers without owning wave generation helpers.

This rule is discovery-local and experimental.

Do NOT move it into `workflow.md` yet.

---

## 7. Helper visibility significance rule

Discovery must preserve the distinction:

```text
helper existence does NOT automatically require top-header ownership visibility
```

But helper omission must NOT be silently ignored either.

If a helper/function exists in code but is absent from top ownership visibility, discovery must run helper significance verification before classifying it.

Possible helper significance outcomes:

### 1. Authority / lifecycle / contract-significant helper

Examples:

- `confirmBuild()`;
- `buildRoadTiles()`.

Possible result:

- ownership visibility correction candidate.

### 2. Local / section-scoped maintenance helper

Example:

- `updateResponsiveLayout()`.

Possible result:

- section extraction and cognition notes are sufficient;
- no top-header correction required.

### 3. Uncertain helper significance

Possible result:

- preserve explicit uncertainty;
- mark as `needs_review`;
- avoid premature source-header mutation.

This rule exists to prevent:

- automatic header inflation;
- automatic helper propagation into top ownership surfaces;
- fake architecture normalization.

It also exists to prevent:

- silent omission acceptance;
- skipped runtime-significant ownership drift.

Therefore this rule is:

- significance verification discipline;
- anti-overcorrection safeguard;
- mismatch-detection safeguard.

It is NOT:

- an auto-ignore rule;
- source-header rewrite policy;
- schema canonization;
- mass header correction trigger.

---

## 8. Correction workflow discipline

Source-header / markup correction passes must:

- follow discovery verification;
- preserve source-truth history;
- avoid silent normalization;
- avoid fake architecture claims;
- avoid overstating ownership;
- preserve uncertainty where needed;
- remain bounded;
- mutate only AI-readable markup/header/comment surfaces when explicitly requested.

Correction passes must NOT:

- mutate runtime logic;
- rewrite gameplay behavior;
- refactor systems;
- create dependency graphs;
- implement repository_map.yml;
- create parser/scanner tooling;
- canonize the experimental workflow into workflow.md.

---

## 9. Batch-chain navigation

Current bounded discovery chain:

### Batch 01 — Runtime orchestration

File:

- `docs/project/architecture/repository_map_discovery_01_runtime_orchestration.md`

Owned source files:

- `js/systems/systems.js`
- `js/game.js`

Status:

- extracted;
- source-faithful extraction preserved;
- verification blocks present;
- `js/game.js` source-header correction applied;
- discovery re-check/update completed;
- no active Batch 01 source-header correction candidates remain except optional future review for `systems.js` lifecycle density.

---

### Batch 02 — Extracted systems

File:

- `docs/project/architecture/repository_map_discovery_02_extracted_systems.md`

Owned source files:

- `js/systems/systems_placement.js`
- `js/systems/systems_selected_object_actions.js`

Status:

- extracted;
- source-faithful extraction preserved;
- verification blocks present;
- `js/systems/systems_placement.js` source-header correction applied for `confirmBuild()` ownership visibility;
- discovery re-check/update completed;
- no active Batch 02 source-header correction candidates remain.

---

### Batch 03 — UI render/control

File:

- `docs/project/architecture/repository_map_discovery_03_ui_render_control.md`

Owned source files:

- `js/ui/controls.js`
- `js/ui/canvas_world.js`
- `js/ui/canvas_entities.js`

Status:

- extracted;
- source-faithful extraction preserved;
- verification blocks present;
- controls.js ownership interpretation corrected as cross-file runtime coupling;
- call-site vs ownership distinction explicitly preserved;
- no active Batch 03 source-header correction candidates remain.

---

## 10. Continuation status

Current completed restructuring:

- root discovery file reduced to overview/workflow/navigation layer;
- Batch 01 file created, populated, corrected and re-checked;
- Batch 02 file created, populated, corrected and re-checked;
- Batch 03 file created, populated and interpretation-corrected.

Current next safe direction:

1. Do not restart discovery.
2. Do not reintroduce giant extraction blocks into this root file.
3. Before expanding into new runtime areas, prefer a bounded template-stabilization or next-sample decision pass.
4. If continuing discovery, use the same bounded batch-file pattern.
5. If a batch becomes oversized/truncation-prone, split it into a mini-chain instead of repeatedly restoring it as one giant file.

---

## 11. Discovery-chain integrity audit snapshot

Current audit finding:

- Batch 01 / 02 / 03 use compatible high-level structure;
- source-faithful extraction remains the dominant pattern;
- verification blocks remain present;
- correction/re-check logic is now repeatable;
- call-site vs ownership distinction is explicitly preserved;
- root file remains lightweight and retrieval-safe.

Known operational risk:

- batch files can still become synchronization-sensitive if updated with partial full-file replacements;
- future updates should preserve full section integrity and avoid truncation;
- oversized extraction batches should become mini-chains before repeated restoration attempts.

Template stabilization status:

- useful soon;
- not mandatory before one more bounded discovery area if the current pattern is followed carefully.

---

## 12. Operational constraints

Do NOT:

- create `repository_map.yml`;
- create parser/scanner systems;
- create automation systems;
- create dependency graph;
- mutate runtime logic;
- mutate gameplay behavior;
- move files into a new folder yet;
- canonize this experimental workflow into `workflow.md`;
- turn discovery into governance engine.

This chain remains:

- experimental;
- discovery-local;
- bounded;
- connector-safe;
- non-authoritative.

---

## 13. Deferred/not-yet-implemented areas

Still deferred / not implemented:

- `repository_map.yml`;
- parser/scanner implementation;
- automation rollout;
- synchronization engine;
- governance engine;
- dependency graph generation;
- runtime_map.yml;
- contracts.yml;
- generated repository cognition;
- folder migration to `docs/project/architecture/repository_map_discovery/`.

---

## 14. Operational conclusion

Repository cognition discovery has been restructured from one oversized evolving extraction document into a bounded discovery chain.

The root file now acts as:

- overview layer;
- workflow layer;
- navigation layer;
- continuation-status layer;
- audit snapshot layer.

Detailed source-faithful extraction belongs in bounded batch files.

If an extraction batch itself becomes oversized or truncation-prone, it should be split into mini-chain structure.

This reduces connector/write pressure and makes future extraction/correction/re-check passes safer.
