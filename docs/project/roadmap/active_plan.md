# Active Plan — CORE FRONTIER

## Назначение документа

Этот файл фиксирует текущий operational roadmap проекта CORE FRONTIER.

Документ отвечает на вопрос:

что делать дальше.

Документ НЕ является:

- architecture document;
- giant future vision;
- detailed developer report;
- gameplay design archive.

Главная задача:

зафиксировать текущий safe evolution workflow.

---

## Текущий статус проекта

Текущий статус после Stage 03.4 / 03.4A visibility synchronization:

- Stage 03.1 completed and closed;
- Stage 03.2 governance/navigation stabilization completed as operational foundation;
- Stage 03.3 runtime readability stabilization completed;
- Stage 03.3B code/surface/docs/navigation stabilization completed;
- Stage 03.3B remains FROZEN / STABILIZED baseline;
- current active planning stage = Stage 03.4;
- current phase = planning/discovery: repository impact awareness and mutation-class planning;
- Stage 03.4 planning/discovery phase is ACTIVE;
- Stage 03.4 execution/runtime evolution phase is NOT STARTED;
- Stage 03.4A mutation classes and synchronization radius planning artifact exists;
- architecture package split completed;
- roadmap package split completed;
- legacy architecture.md removed;
- legacy roadmap.md removed;
- AI YAML navigation baseline synchronized;
- runtime JS foundation stabilized;
- repository surface synchronized;
- runtime evolution remains bounded and compatibility-safe.

---

## Что уже стабилизировано

Подтверждено:

- comments-only runtime marking deployed across runtime foundation;
- js/systems/* extraction topology verified;
- Wave Manager extraction verified;
- Placement extraction verified;
- Selected Object Actions extraction verified;
- systems folder relocation verified;
- systems.js reduced to mixed orchestration + lifecycle-heavy runtime systems file;
- index.html marked as shell runtime entrypoint;
- css/style.css exists and is marked;
- active CSS currently remains inline inside index.html;
- css/style.css is not linked by index.html;
- browser-global script order preserved;
- Stage 03.3B frozen baseline preserved.

---

## Текущая Stage 03.4 planning direction

Stage 03.4 сейчас активен только как planning/discovery phase.

Текущий focus:

- repository impact awareness;
- synchronization radius;
- mutation classes;
- repository-visible structural mutations;
- runtime impact vs synchronization impact;
- runtime coupling vs synchronization coupling;
- safe local mutation vs architecture mutation;
- future repository_map.yml planning.

Stage 03.4 НЕ запускает:

- runtime rewrite;
- gameplay changes;
- automation rollout;
- parser/scanner implementation;
- governance engine;
- ECS/entity framework;
- repository_map.yml implementation.

---

## Stage 03.4A visibility

Stage 03.4A mutation classes planning artifact существует:

    docs/project/stage_03_4A_mutation_classes.md

Назначение Stage 03.4A:

- formalize mutation classes;
- clarify synchronization radius;
- define mandatory synchronization chains;
- distinguish optional synchronization from mandatory synchronization;
- document over-synchronization risks;
- clarify structural mutation handling;
- preserve anti-overengineering discipline.

Stage 03.4A является planning/research artifact.

Stage 03.4A НЕ является:

- workflow law;
- governance engine;
- automation layer;
- parser/scanner implementation;
- repository_map.yml rollout;
- runtime execution pass.

---

## Почему runtime development был paused

Runtime development был временно остановлен не из-за gameplay failure.

Причины:

- architecture visibility limitations;
- giant markdown growth;
- connector truncation;
- retrieval instability;
- dangerous runtime coupling;
- mutation hub growth;
- unsafe giant-pass workflow.

Подтверждено:

дальнейшее runtime expansion без inspection/navigation workflow стало unsafe.

Stage 03.3 / 03.3B снизили этот риск через runtime readability stabilization, bounded extraction workflow и synchronized navigation baseline.

Stage 03.4 / 03.4A добавляют следующий planning layer:

repository impact awareness и synchronization radius discipline.

---

## Что уже выполнено

Подтверждено выполнение:

### Stage 03

- architecture stabilization foundation;
- repository-aware workflow;
- bounded documentation direction;
- visibility-safe evolution model.

---

### Stage 03.1

Завершены:

- Pass 01 — Repository Structure Inspection;
- Pass 02 — Runtime Dependency Mapping;
- Pass 03 — Dangerous Runtime Boundaries;
- Pass 04 — Preliminary Runtime Contract Candidates;
- Stage 03.1 Developer Report;
- Stage 03.1 Final Snapshot;
- architecture package split;
- roadmap package split;
- architecture verification workflow;
- roadmap verification workflow.

---

### Stage 03.2

Завершена operational foundation для governance/navigation stabilization:

- Repository Operating System planning;
- minimal AI navigation layer deployment;
- bounded workflow planning;
- retrieval-safe repository planning;
- governance lifecycle integration;
- verification/correction lifecycle stabilization.

Runtime implementation layers Stage 03.2 не внедрялись.

---

### Stage 03.3

Завершена runtime readability stabilization:

- systems folder relocation;
- systems folder marking stabilization;
- runtime JS foundation marking;
- UI marking stabilization;
- game.js marking stabilization;
- state.js/data.js marking stabilization;
- runtime topology verification;
- bounded extraction workflow confirmation.

---

### Stage 03.3B

Stage 03.3B завершил code/surface/docs/navigation synchronization после runtime stabilization.

Подтверждено:

- index.html shell marking;
- css/style.css surface marking;
- index.html/css relationship correction;
- AI YAML navigation synchronization;
- architecture docs synchronization;
- docs_structure.md synchronization;
- roadmap package synchronization;
- final documentation-layer verification completed;
- frozen snapshot created.

---

### Stage 03.4 / 03.4A

Stage 03.4 planning/discovery phase active.

Подтверждено:

- docs/project/stage_03_4.md exists;
- docs/project/stage_03_4A_mutation_classes.md exists;
- AI YAML navigation reflects Stage 03.4 planning visibility;
- roadmap README reflects Stage 03.4 / 03.4A visibility;
- docs_structure reflects Stage 03.4 / 03.4A visibility;
- repository_map.yml remains deferred/not implemented;
- automation/parser/governance rollout not started;
- Stage 03.4 execution/runtime evolution not started.

---

## Что подтвердил discovery-cycle

Подтверждено:

- runtime имеет implicit contracts;
- script order является runtime-sensitive contract;
- systems.js больше не является единым gameplay monolith;
- current systems topology lives under js/systems/*;
- build flow remains highest interaction risk zone;
- render/update order является runtime contract;
- visibility uncertainty должна быть stop condition;
- giant markdown workflow больше unsafe;
- structural documentation mutations create synchronization pressure;
- not every mutation should update every repository layer.

---

## Текущий active workflow

Текущий workflow:

1. сохранить Stage 03.3B frozen baseline;
2. вести Stage 03.4 как planning/discovery phase;
3. использовать Stage 03.4A для mutation classes и synchronization radius planning;
4. проверять structural mutations перед synchronization;
5. применять только mandatory bounded synchronization radius;
6. не начинать Stage 03.4 execution/runtime evolution без отдельного explicit pass;
7. не создавать repository_map.yml без отдельного bounded planning/extraction pass;
8. сохранить runtime/code topology без изменений.

---

## AI navigation direction

Подтверждено:

active AI YAML navigation layer deployed:

- ai/current_status.yml;
- ai/docs_map.yml.

AI navigation layer должен оставаться:

- bounded;
- retrieval-oriented;
- navigation-oriented;
- connector-safe;
- compressed.

Deferred intentionally:

- ai/repository_map.yml;
- ai/runtime_map.yml;
- ai/contracts.yml;
- logs layer;
- automation rollout;
- Stage 03.4 execution/runtime evolution;
- runtime_map/contracts rollout.

---

## Comments-only AI-readable direction

Подтверждено:

comments-only AI-readable marking уже deployed для runtime/code/surface foundation.

Текущее состояние:

- runtime files размечены;
- systems files размечены;
- UI files размечены;
- game/state/data размечены;
- index.html и css/style.css размечены как repository surface;
- marking остается bounded и factual.

Дальнейшая разметка должна выполняться только через отдельные bounded passes.

---

## Runtime return strategy

Возврат к runtime development разрешён только после:

- сохранённой Stage 03.3B frozen baseline;
- explicit next-stage decision;
- bounded runtime reentry planning;
- separate Stage 03.4 execution/runtime pass.

Runtime evolution больше не должен происходить через:

- giant refactor;
- repo-wide rewrites;
- uncontrolled passes;
- giant connector operations.

---

## Safe runtime evolution model

Будущие runtime passes должны быть:

- bounded;
- isolated;
- compatibility-safe;
- inspection-driven;
- dependency-aware;
- impact-aware.

Особенно осторожно:

- build flow;
- js/systems/*;
- game.js;
- input/camera logic;
- restart/retry lifecycle;
- render/update order;
- mobile interaction zones;
- CSS extraction/linking, если она будет выделена в отдельный pass.

---

## Главный operational goal

Главная задача текущего active plan:

сохранить Stage 03.3B frozen baseline
и вести Stage 03.4 как planning/discovery phase для repository impact awareness.

Подтверждено:

- runtime/code/surface/docs/navigation/workflow layers synchronized;
- runtime/code/surface foundation стабилизирован;
- Stage 03.4 planning/discovery phase active;
- Stage 03.4 execution/runtime evolution not started;
- Stage 03.4A mutation classes planning artifact exists;
- repository_map.yml remains deferred/not implemented.

Текущий приоритет:

- сохранять repository truth без fake architecture claims;
- сохранять bounded synchronization discipline;
- clarify synchronization radius before creating repository_map.yml;
- defer future runtime implementation work до explicit future execution decision.

---

## После roadmap split

После roadmap split текущий focus:

- удержать roadmap package bounded;
- не смешивать roadmap с architecture package;
- не расширять governance без необходимости;
- сохранять synchronized roadmap state;
- сохранить historical stage files без переписывания;
- использовать roadmap только как operational planning layer, а не governance engine.

Deferred intentionally:

- logs layer;
- ai/repository_map.yml;
- ai/runtime_map.yml;
- ai/contracts.yml;
- automation rollout;
- runtime modularization governance;
- CSS extraction/linking pass;
- Stage 03.4 execution/runtime evolution.

---

## Общий вывод

CORE FRONTIER перешёл:

от:

- prototype growth;
- giant runtime expansion;
- chaotic repository evolution;

к:

- staged evolution;
- bounded workflow;
- visibility-safe architecture;
- inspection-first development;
- compatibility-safe runtime evolution;
- synchronized runtime/code/surface/navigation baseline;
- impact-aware planning discipline.

Current active planning stage:

Stage 03.4 — Repository Impact Awareness Planning.

Current planning artifact:

Stage 03.4A — Mutation Classes and Synchronization Radius Planning.

Current phase:

planning/discovery only.

Текущий active plan направлен на сохранение stabilized Stage 03.3B baseline и развитие Stage 03.4 planning/discovery без запуска runtime execution, repository_map rollout или governance automation.
