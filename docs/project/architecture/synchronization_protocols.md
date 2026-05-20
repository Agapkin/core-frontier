# Synchronization Protocols — CORE FRONTIER

## Назначение документа

Этот документ является passive protocol library для повторяющихся synchronization scenarios внутри CORE FRONTIER.

Он фиксирует reusable playbooks для mutation archetypes, которые уже были подтверждены реальными Stage 03.4 / Stage 03.4A passes.

Документ нужен для того, чтобы future structural mutations не запускали каждый раз ad-hoc multi-hour relay между:

- AI navigation;
- architecture visibility;
- docs structure;
- roadmap visibility;
- active planning state;
- historical visibility layers.

Этот файл НЕ является:

- automation engine;
- governance engine;
- orchestration daemon;
- runtime authority layer;
- workflow.md replacement;
- parser/scanner implementation;
- repository_map.yml implementation.

Главный принцип:

synchronization protocols describe what to check and where to sync.

They do not execute synchronization automatically.

---

## 1. Почему synchronization protocols нужны

Во время Stage 03.4 / Stage 03.4A был подтверждён реальный operational problem:

new Stage-files created propagation pressure across multiple interpretation layers.

Пример:

- `docs/project/stage_03_4.md`
- `docs/project/stage_03_4A_mutation_classes.md`

Эти файлы не меняли runtime, но создали обязательное visibility pressure на:

- `ai/current_status.yml`;
- `ai/docs_map.yml`;
- `docs/project/architecture/README.md`;
- `docs/project/architecture/docs_structure.md`;
- `docs/project/roadmap/README.md`;
- `docs/project/roadmap/active_plan.md`.

Без reusable protocol repository был вынужден вручную проходить repeated audit → sync → verification cycles.

Цель этого файла:

сократить будущий coordination chaos через documented, bounded, reusable synchronization playbooks.

---

## 2. Workflow.md vs synchronization_protocols.md

### workflow.md

`workflow.md` описывает общий operational workflow проекта:

- inspection-first discipline;
- bounded pass discipline;
- visibility integrity rules;
- connector-safe workflow;
- audit/sync/verification separation;
- post-mutation verification discipline;
- commit language discipline.

`workflow.md` отвечает на вопрос:

как проект должен развиваться безопасно.

---

### synchronization_protocols.md

`synchronization_protocols.md` описывает reusable synchronization playbooks для конкретных mutation archetypes.

Он отвечает на вопрос:

если произошёл определённый тип mutation, какие interpretation layers нужно проверить или синхронизировать?

Этот файл не заменяет `workflow.md`.

Он является passive protocol library рядом с workflow.md.

---

## 3. Repository truth vs interpretation layers

Synchronization protocols сохраняют Stage 03.4 distinction.

Repository truth определяется:

- actual files;
- runtime code;
- live topology;
- actual script/runtime order;
- actual repository state;
- actual runtime behavior.

Repository truth является authoritative source.

Interpretation layers включают:

- AI YAML navigation;
- architecture docs;
- roadmap package;
- docs structure;
- frozen snapshots;
- future repository_map.yml;
- governance/workflow notes.

Interpretation layers помогают:

- navigation;
- synchronization;
- impact awareness;
- planning;
- verification.

Но interpretation layers НЕ являются runtime authority.

---

## 4. Runtime impact vs synchronization impact

Synchronization protocols работают прежде всего с synchronization impact.

Runtime impact = фактическое влияние на runtime behavior.

Synchronization impact = давление на interpretation layers.

New Stage-file может иметь:

- low runtime impact;
- high synchronization impact.

Именно поэтому Stage-file mutations требуют отдельного synchronization protocol.

---

## 5. Mutation archetypes

Mutation archetype = повторяющийся тип repository mutation, который создаёт predictable synchronization pressure.

Примеры mutation archetypes:

- new_stage_file;
- stage_snapshot / frozen_snapshot;
- new_architecture_doc;
- new_ai_navigation_file;
- repository_map_creation;
- runtime_file_extraction;
- script_order_change;
- ownership_mutation_change.

Каждый archetype должен иметь:

- trigger;
- mandatory synchronization chain;
- conditional synchronization chain;
- no-sync zone;
- verification scope;
- closure criteria;
- over-synchronization guardrails.

---

# Protocol 01 — new_stage_file

## 6. Trigger

Protocol applies when a new Stage-related file is created, for example:

- `docs/project/stage_03_4.md`;
- `docs/project/stage_03_4A_mutation_classes.md`;
- future Stage planning documents;
- future Stage execution documents;
- future Stage closure documents.

A new Stage-file is usually both:

- repository-visible structural mutation;
- stage/chronology mutation.

It may not affect runtime directly, but it affects repository visibility.

---

## 7. Why new_stage_file creates synchronization pressure

A new Stage-file changes the human and AI interpretation of repository state.

It may change:

- current stage visibility;
- active planning state;
- docs structure;
- roadmap direction;
- architecture package visibility;
- AI navigation entrypoints;
- historical continuity;
- frozen baseline relationship.

If interpretation layers are not synchronized, repository gets drift:

- file exists but is not discoverable;
- current_status says old stage;
- docs_map misses active stage file;
- roadmap says Stage not started;
- docs_structure omits new file;
- completed_stages may contain stale wording.

---

## 8. Mandatory synchronization chain

For confirmed `new_stage_file` mutations, mandatory synchronization chain includes:

1. `ai/current_status.yml`

Check/update when:

- current stage changes;
- planning/discovery phase becomes active;
- execution/runtime phase status needs distinction;
- frozen baseline relationship needs visibility.

2. `ai/docs_map.yml`

Check/update when:

- new Stage file must be discoverable;
- active_stage_files list changes;
- current stage entrypoint changes;
- navigation visibility changes.

3. `docs/project/architecture/README.md`

Check/update when:

- architecture package describes current project state;
- Stage visibility affects architecture context;
- new Stage planning document changes architecture-facing direction.

4. `docs/project/architecture/docs_structure.md`

Check/update when:

- human-memory structure must expose new Stage file;
- active project documents list becomes stale;
- Stage section list requires new entry.

5. `docs/project/roadmap/README.md`

Check/update when:

- roadmap package entrypoint describes current active stage;
- roadmap status would otherwise contradict Stage reality;
- Stage visibility affects active roadmap direction.

6. `docs/project/roadmap/active_plan.md`

Check/update when:

- active operational plan needs new current stage state;
- planning/discovery phase becomes active;
- execution/runtime phase remains not started;
- Stage file changes current operational focus.

Mandatory sync must remain bounded.

Do not update unrelated files simply because a Stage file was created.

---

## 9. Conditional synchronization chain

Conditional synchronization depends on what the new Stage-file means.

### `docs/project/architecture/ai_navigation_plan.md`

Update only if:

- AI navigation model wording becomes stale;
- new Stage affects navigation-layer meaning;
- old wording falsely says Stage not started;
- new AI navigation artifact is introduced.

Do not update if:

- the file remains historically and conceptually correct;
- no AI navigation semantics changed.

---

### `docs/project/roadmap/completed_stages.md`

Update only if:

- stale wording contradicts current stage status;
- completed-stage historical context needs clarification;
- a stage is actually completed;
- a frozen baseline relationship must be recorded.

Do not update if:

- the new Stage is only active/planning;
- no completed-stage claim changes;
- historical chronology remains accurate.

Important:

Do NOT make Stage appear completed if it is only planning-active.

---

### `docs/project/architecture/workflow.md`

Update only if:

- a stable workflow rule changed;
- a reusable protocol needs a short pointer;
- workflow discipline itself changed after repeated validation.

Do not update if:

- the new Stage file only changes roadmap/navigation visibility;
- no workflow rule changed;
- update would become governance expansion.

---

### Frozen snapshots

Update or create only if:

- a closure/freeze happened;
- baseline state must be preserved;
- Stage completion requires frozen-state record.

Do not update if:

- new Stage file only opens planning/discovery;
- no closure/freeze occurred.

---

## 10. No-sync zone by default

For `new_stage_file`, default no-sync zone includes:

- runtime JS;
- gameplay files;
- CSS/HTML;
- `workflow.md` if no stable workflow rule changed;
- `completed_stages.md` if stage is not completed and no stale wording exists;
- frozen snapshots if no closure/freeze happened.

No-sync does not mean ignored.

It means checked and intentionally left untouched.

---

## 11. Verification scope

After `new_stage_file` synchronization, verification must check:

- new file exists;
- new file can be fully re-read;
- commit exists;
- AI navigation exposes new Stage file if required;
- architecture README/docs_structure expose new Stage file if required;
- roadmap README/active_plan reflect correct current status;
- execution/runtime phase is not falsely started;
- completed_stages does not falsely mark stage completed;
- no runtime/code files changed;
- no fake implementation claims appeared.

---

## 12. Closure criteria

`new_stage_file` synchronization can be considered closed when:

- mandatory chain is checked and updated where needed;
- conditional chain is checked and either updated or explicitly no-sync;
- no stale wording remains in active visibility layers;
- no false completion or execution claim exists;
- no runtime/code mutation occurred;
- no repository_map.yml was created accidentally;
- no governance/automation claims were introduced;
- final verification pass returns PASS.

---

## 13. Over-synchronization guardrails

Do NOT automatically update every interpretation layer.

Do NOT rewrite:

- roadmap package broadly;
- workflow.md broadly;
- completed_stages.md unless required;
- frozen snapshots unless closure/freeze happened;
- runtime/code files;
- CSS/HTML.

Do NOT introduce:

- governance engine;
- parser/scanner implementation;
- automation rollout;
- repository_map.yml creation;
- workflow law expansion;
- second repository reality.

Minimal sufficient synchronization is preferred over maximal propagation.

---

## 14. Batch execution rule

For a `new_stage_file` pass, mandatory anchor updates should usually be executed inside the same bounded Protocol 01 synchronization execution.

If a single multi-file write attempt creates excessive connector/tool write pressure, mandatory synchronization may be executed through sequential bounded sub-phases inside the same protocol execution.

Recommended segmented order:

1. AI navigation layer:

- `ai/current_status.yml`;
- `ai/docs_map.yml`.

2. Roadmap layer:

- `docs/project/roadmap/README.md`;
- `docs/project/roadmap/active_plan.md`.

3. Architecture visibility layer:

- `docs/project/architecture/README.md`;
- `docs/project/architecture/docs_structure.md`.

Each sub-phase must:

- remain bounded;
- preserve repository truth;
- include verification before continuing;
- avoid giant multi-file write pressure;
- report partial completion honestly if interruption occurs.

Segmented synchronization is:

- execution discipline;
- connector-safe operational behavior;
- phased verification inside one protocol execution.

Segmented synchronization is NOT:

- protocol fragmentation;
- governance expansion;
- asynchronous relay synchronization;
- automation rollout;
- synchronization daemon behavior.

Do NOT split mandatory anchor synchronization into separate follow-up tasks unless:

- file visibility is incomplete;
- connector write access fails;
- target file is too large/truncated;
- SHA/update conflict occurs;
- hard safety stop is triggered;
- segmented execution cannot safely continue inside the same protocol execution.

If split occurs, the pass report must explicitly state:

- what was completed;
- what remains mandatory;
- why split was required;
- whether the interruption happened before or after repository mutation;
- what verification state was reached.

---

## 15. Future protocol candidates

The following protocol candidates should be documented later only after real repeated cases or confirmed need:

- stage_snapshot / frozen_snapshot;
- new_architecture_doc;
- new_ai_navigation_file;
- repository_map_creation;
- runtime_file_extraction;
- script_order_change;
- ownership_mutation_change.

These are candidates, not implemented systems.

---

## 16. Current deferred/not-implemented areas

Still not implemented:

- repository_map.yml;
- runtime_map.yml;
- contracts.yml;
- governance engine;
- parser/scanner implementation;
- automation rollout;
- autonomous synchronization;
- workflow orchestration daemon.

Synchronization protocols remain passive documentation.

---

## Final conclusion

`synchronization_protocols.md` exists to reduce repeated manual synchronization chaos.

It formalizes verified synchronization behavior without turning repository cognition into governance bureaucracy.

Protocol 01 — `new_stage_file` captures the Stage 03.4 / Stage 03.4A synchronization experience as a reusable bounded playbook.

Repository truth remains authoritative.

Interpretation layers remain supportive and non-authoritative.
