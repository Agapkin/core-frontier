# Stage 03.4A — Mutation Classes and Synchronization Radius Planning

## Назначение документа

Этот документ фиксирует planning/research artifact для Stage 03.4A.

Stage 03.4A продолжает Stage 03.4 planning/discovery phase и уточняет:

- mutation classes;
- synchronization radius;
- mandatory synchronization chains;
- optional synchronization;
- over-synchronization risk;
- structural mutation handling;
- stage/chronology mutation handling;
- runtime impact vs synchronization impact;
- runtime coupling vs synchronization coupling;
- safe local mutation vs architecture mutation.

Документ НЕ является:

- governance engine;
- final workflow law;
- automation layer;
- parser/scanner implementation;
- repository_map.yml implementation;
- runtime rewrite plan;
- gameplay stage.

Главная задача:

стабилизировать operational understanding перед постоянным изменением workflow governance или созданием repository_map.yml.

---

## 1. Статус Stage 03.4A

Текущий baseline:

Stage 03.3B = FROZEN / STABILIZED.

Stage 03.4 = planning/discovery phase active.

Stage 03.4 execution/runtime evolution phase:

NOT STARTED.

Stage 03.4A является:

- planning artifact;
- mutation-classification artifact;
- synchronization-radius research artifact;
- repository cognition preparation step.

Stage 03.4A НЕ является:

- runtime mutation pass;
- repository_map.yml creation pass;
- workflow.md rewrite pass;
- governance rollout;
- automation rollout;
- parser/scanner implementation.

---

## 2. Почему Stage 03.4A нужен

Stage 03.3B стабилизировал:

- runtime JS foundation;
- repository surface;
- AI YAML navigation;
- workflow governance;
- architecture package;
- roadmap package;
- frozen baseline.

После этого стала видна новая operational проблема:

repository coordination complexity.

Даже создание одного нового structural file может требовать проверки:

- AI YAML navigation;
- roadmap visibility;
- architecture visibility;
- docs structure;
- workflow assumptions;
- human-memory continuity.

Пример:

создание `docs/project/stage_03_4.md` не меняло runtime,
но создало synchronization pressure на interpretation layers.

Следовательно:

repository должен различать типы изменений и понимать, какой synchronization radius нужен каждому типу mutation.

---

## 3. Repository truth vs interpretation layers

Stage 03.4A сохраняет Stage 03.4 distinction.

Repository truth определяется:

- runtime code;
- actual file structure;
- live topology;
- actual script order;
- actual runtime behavior;
- actual repository state.

Repository truth является authoritative source.

Interpretation layers включают:

- file headers;
- semantic markers;
- AI YAML navigation;
- docs;
- architecture package;
- roadmap package;
- snapshots;
- future repository_map.yml;
- governance notes.

Interpretation layers помогают:

- navigation;
- synchronization;
- impact awareness;
- planning;
- verification.

Но interpretation layers НЕ являются runtime authority.

---

## 4. Runtime impact vs synchronization impact

Stage 03.4A фиксирует distinction:

Runtime impact = фактическое влияние на runtime behavior.

Включает:

- execution flow;
- state mutation;
- script order;
- gameplay logic;
- rendering order;
- input behavior;
- lifecycle behavior;
- runtime regression risk.

Synchronization impact = давление на interpretation layers.

Включает:

- YAML update pressure;
- docs visibility pressure;
- roadmap chronology pressure;
- architecture wording pressure;
- workflow visibility pressure;
- snapshot/update pressure;
- future repository_map.yml update pressure.

Главный вывод:

runtime impact и synchronization impact НЕ равны.

Файл может быть runtime-heavy, но не требовать docs update.

Документ может быть runtime-isolated, но требовать AI/navigation/roadmap visibility update.

---

## 5. Runtime coupling vs synchronization coupling

Runtime coupling = фактическая runtime-связность.

Примеры:

- function calls;
- shared mutable state;
- lifecycle sequencing;
- render/update order;
- input/camera dependency;
- gameplay mutation flow.

Synchronization coupling = связь interpretation layers.

Примеры:

- AI YAML должен увидеть новый file;
- docs_structure должен отразить новый stage file;
- roadmap должен отразить active/current state;
- architecture README должен не противоречить topology;
- workflow должен знать новый class mutation.

Главный принцип:

impact analysis должен учитывать оба типа coupling отдельно.

---

## 6. Mutation classes

Stage 03.4A вводит planning-level mutation classes.

Это НЕ governance law.

Это рабочая classification model для future bounded workflow.

---

### 6.1 Local runtime mutation

Local runtime mutation = изменение внутри runtime/code файла без topology shift.

Примеры:

- localized behavior fix;
- local UI behavior adjustment;
- small runtime bug fix;
- isolated value/logic correction.

Обычно требует:

- fresh read;
- localized inspection;
- runtime verification;
- no unrelated docs sync.

Обычно НЕ требует:

- roadmap update;
- architecture rewrite;
- workflow update;
- full AI YAML synchronization.

Если local runtime mutation меняет semantic ownership,
она может стать architecture mutation.

---

### 6.2 Runtime topology mutation

Runtime topology mutation = изменение runtime structure.

Примеры:

- file relocation;
- extraction;
- script order change;
- new runtime file;
- ownership transfer between runtime files;
- browser-global dependency chain change.

Обычно требует:

- runtime verification;
- script order verification;
- AI YAML topology update;
- architecture runtime structure update;
- docs visibility check;
- targeted synchronization pass.

Обычно НЕ требует:

- roadmap rewrite;
- governance rewrite;
- Stage chronology update,
если stage state не меняется.

---

### 6.3 Repository-visible structural mutation

Repository-visible structural mutation = новый или удалённый file/package, видимый как repository structure change, но не обязательно runtime change.

Примеры:

- new stage document;
- new architecture doc;
- new roadmap doc;
- new AI navigation file;
- future repository_map.yml;
- frozen snapshot document.

Обычно требует:

- AI navigation visibility check;
- docs_structure visibility check;
- relevant package README check;
- roadmap/active_plan check if current stage meaning changes;
- post-mutation verification.

Обычно НЕ требует:

- runtime verification;
- JS/CSS/HTML mutation;
- gameplay testing;
- architecture rewrite.

---

### 6.4 Architecture mutation

Architecture mutation = изменение conceptual boundaries или repository meaning.

Примеры:

- ownership model change;
- workflow discipline change;
- new architecture package rule;
- new navigation model;
- new repository cognition model;
- new mutation classification policy.

Обычно требует:

- architecture package update;
- AI YAML visibility check;
- roadmap/active_plan check;
- workflow impact check;
- verification pass.

Обычно НЕ требует:

- runtime/code changes,
если architecture mutation purely documentation/planning.

---

### 6.5 Stage/chronology mutation

Stage/chronology mutation = изменение stage history/current stage/frozen baseline.

Примеры:

- new Stage document;
- completed stage update;
- frozen snapshot;
- active plan state change;
- current_status stage transition.

Обычно требует:

- active_plan visibility;
- current_status visibility;
- docs_map active_stage_files update;
- docs_structure update;
- completed_stages update only when stage is completed;
- frozen snapshot only when closure/freeze happens.

Обычно НЕ требует:

- runtime/code changes;
- workflow rewrite;
- repository-wide documentation rewrite.

---

## 7. Synchronization radius

Synchronization radius = минимальный набор repository layers, которые должны быть проверены или обновлены после mutation.

Главный принцип:

synchronization radius должен быть bounded.

Не каждое изменение должно обновлять весь repository.

---

## 8. Mandatory synchronization

Mandatory synchronization требуется, когда mutation создаёт stale/contradictory repository interpretation.

Примеры mandatory sync:

- new stage file → AI docs_map visibility;
- new active stage → current_status visibility;
- runtime file relocation → runtime topology docs/YAML visibility;
- script order change → index/runtime docs/YAML visibility;
- new architecture doc → architecture README/docs_structure visibility;
- new roadmap doc → roadmap README/docs_structure visibility.

Mandatory sync должен быть:

- targeted;
- bounded;
- evidence-based;
- verified after mutation.

---

## 9. Optional synchronization

Optional synchronization допустим, когда mutation полезно отразить, но stale state не создаёт contradiction.

Примеры optional sync:

- minor wording improvements;
- future-oriented planning references;
- non-active deferred idea visibility;
- package README mention when no active state changes.

Optional sync НЕ должен превращаться в endless update chain.

---

## 10. No-sync cases

No-sync допустим, когда mutation:

- локальна;
- не меняет topology;
- не меняет ownership;
- не меняет stage state;
- не меняет current repository meaning;
- не создаёт stale interpretation layers.

Пример:

small runtime fix внутри уже описанного ownership boundary.

Такой change может требовать runtime verification,
но не documentation synchronization.

---

## 11. Over-synchronization risk

Over-synchronization = обновление слишком большого числа layers без необходимости.

Риски:

- documentation churn;
- semantic drift;
- duplicated repository reality;
- inconsistent wording;
- YAML maintenance overload;
- governance bureaucracy;
- hidden contradiction через excessive edits.

Главный принцип:

минимальный достаточный synchronization radius лучше, чем максимальный possible sync.

---

## 12. Mandatory synchronization chains by mutation class

### Local runtime mutation

Mandatory:

- affected runtime file;
- localized verification.

Optional:

- comments/header update if semantics changed.

Usually not required:

- roadmap;
- architecture package;
- AI YAML;
- docs_structure.

---

### Runtime topology mutation

Mandatory:

- runtime verification;
- script order/topology check;
- ai/docs_map.yml if topology changed;
- architecture/runtime_structure.md if topology changed;
- docs_structure.md if file/package visibility changed.

Optional:

- active_plan.md if stage direction changed.

Usually not required:

- completed_stages.md;
- frozen snapshot;
- workflow.md.

---

### Repository-visible structural mutation

Mandatory:

- existence verification;
- package visibility check;
- ai/docs_map.yml if navigation visibility is affected;
- docs_structure.md if human-memory visibility is affected;
- relevant package README if package tree changes.

Optional:

- active_plan.md if current workflow/state changes;
- ai/current_status.yml if stage/current state changes.

Usually not required:

- runtime/code verification;
- gameplay testing.

---

### Architecture mutation

Mandatory:

- affected architecture document;
- architecture README/docs_structure consistency check;
- workflow impact check;
- AI YAML visibility if active navigation changed;
- verification pass.

Optional:

- roadmap mention if active direction changes.

Usually not required:

- runtime/code changes.

---

### Stage/chronology mutation

Mandatory:

- stage file visibility;
- ai/current_status.yml if current stage changes;
- ai/docs_map.yml active stage visibility;
- docs_structure.md stage list visibility;
- active_plan.md current roadmap state.

Optional:

- completed_stages.md if stage is completed;
- frozen snapshot if stage is frozen.

Usually not required:

- runtime/code changes;
- workflow rewrite.

---

## 13. Structural mutation handling

Structural mutation handling should follow:

1. Fresh read relevant baseline.
2. Check whether target exists.
3. Create/update only target file.
4. Verify file exists after mutation.
5. Re-read created/updated file.
6. Verify commit exists.
7. Determine synchronization radius.
8. Run separate bounded sync passes only if required.

Important:

structural mutation itself should not automatically trigger broad sync.

Synchronization should be classified and bounded.

---

## 14. New stage file handling

New stage file is both:

- repository-visible structural mutation;
- stage/chronology mutation.

Mandatory follow-up checks:

- ai/docs_map.yml active stage files;
- ai/current_status.yml if current stage changes;
- docs_structure.md stage list;
- roadmap/active_plan.md current state;
- roadmap/completed_stages.md only if stage completed.

Not automatically required:

- workflow rewrite;
- runtime verification;
- architecture rewrite;
- frozen snapshot.

---

## 15. New YAML file handling

New YAML file is repository-visible structural mutation inside AI navigation layer.

Examples:

- future ai/repository_map.yml;
- future ai/runtime_map.yml;
- future ai/contracts.yml.

Mandatory checks:

- ai/docs_map.yml visibility;
- ai_navigation_plan.md role explanation;
- docs_structure.md if human-memory references AI layer;
- workflow.md only if operational discipline changes.

Not automatically required:

- runtime/code changes;
- roadmap rewrite;
- governance engine creation.

---

## 16. Future repository_map.yml handling

Future `ai/repository_map.yml` will be a repository-visible structural mutation.

It should be treated as:

- AI navigation layer expansion;
- repository cognition artifact;
- compressed operational interpretation layer.

It should NOT be treated as:

- runtime authority;
- governance engine;
- automation controller;
- parser/scanner system;
- contracts engine;
- second repository reality.

When created later, likely required sync:

- ai/docs_map.yml visibility;
- ai/current_status.yml if active workflow changes;
- ai_navigation_plan.md role update;
- docs_structure.md limited mention if needed;
- roadmap active_plan only if current operational direction changes.

repository_map.yml should NOT be created in this pass because:

- mutation classes are not yet stabilized;
- synchronization obligations are still planning-level;
- repository map schema is not yet verified;
- premature map creation risks fake authority layer;
- parser/scanner automation is not implemented;
- manual extraction philosophy must be clarified first.

---

## 17. Why workflow.md should NOT be rewritten yet

workflow.md is already the operational workflow authority document.

But Stage 03.4A is still planning/research.

Rewriting workflow.md now would be premature because:

- mutation classes are not yet verified through real repeated passes;
- synchronization radius model is not yet tested;
- repository_map.yml does not exist yet;
- policy should follow validated practice, not one-off theory;
- workflow.md must not become governance bureaucracy.

Correct order:

1. planning artifact;
2. verification through repeated bounded passes;
3. then limited workflow.md synchronization if rules prove stable.

---

## 18. Planning artifact, not governance law

This document is intentionally planning/research.

It is useful for:

- thinking about mutation impact;
- planning future repository_map.yml;
- avoiding over-synchronization;
- designing safer sync radius;
- preparing workflow evolution.

It is NOT:

- final workflow law;
- mandatory governance engine;
- automation instruction;
- replacement for verification;
- replacement for repository truth.

---

## 19. Governance-risk analysis

Main risk:

repository cognition can become overengineered.

Dangerous failure modes:

- governance explosion;
- synchronization bureaucracy;
- duplicated repository reality;
- endless YAML maintenance;
- fake authority layers;
- speculative architecture;
- automation before understanding.

Mitigation:

- keep documents bounded;
- require fresh reads;
- prefer minimal sync radius;
- separate planning from implementation;
- verify every mutation;
- preserve repository truth as authority.

---

## 20. Anti-overengineering guardrails

Stage 03.4A must preserve:

- human-readable docs;
- bounded evolution;
- repository-truth-first discipline;
- interpretation-layer humility;
- verification-first workflow;
- compatibility-safe runtime evolution.

Avoid:

- giant metadata systems;
- universal repository AI;
- fake workflow engine;
- untested automation;
- premature contracts explosion;
- parser/scanner speculation.

---

## 21. Current deferred/not-implemented areas

Still NOT implemented:

- repository_map.yml;
- runtime_map.yml;
- contracts.yml;
- governance engine;
- parser/scanner implementation;
- automation rollout;
- autonomous synchronization;
- ECS/entity framework;
- content pipeline;
- Stage 03.4 runtime execution.

Stage 03.4 remains planning/discovery.

---

## 22. Recommended next safe step

After this planning document is created and verified:

1. verify the document exists in live repository;
2. verify commit exists;
3. run no immediate repository_map.yml creation;
4. perform bounded planning review;
5. decide whether a Stage 03.4A verification pass is needed;
6. only then consider a separate repository_map extraction planning pass.

---

## 23. Final operational conclusion

Stage 03.4A formalizes the first layer of repository impact thinking.

Main conclusion:

not every mutation is equal.

Different mutation classes require different synchronization radius.

The repository should evolve toward:

- impact-aware mutation planning;
- bounded synchronization;
- minimal necessary propagation;
- structural mutation visibility;
- safe stage/chronology handling.

But it must NOT evolve into:

- governance bureaucracy;
- fake authority layers;
- second repository reality;
- automation before understanding.

Stage 03.4A is therefore a planning foundation,
not an implementation rollout.
