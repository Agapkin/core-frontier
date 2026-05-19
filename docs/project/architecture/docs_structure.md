# Documentation Structure — CORE FRONTIER

## Назначение документа

Этот файл описывает документационную структуру проекта CORE FRONTIER.

Он отвечает на вопрос:

как устроена human memory проекта.

Roadmap-порядок действий здесь не описывается.

---

## Human memory layer

docs/project/ является human memory layer проекта.

Он хранит:

- architecture;
- roadmap;
- stage history;
- developer reports;
- reasoning snapshots;
- operational decisions;
- project evolution history.

docs/project/ не является AI navigation layer.

---

## Design layer

docs/design/ содержит design/mechanics документацию.

Текущий файл:

    docs/design/mechanics.md

Назначение:

- игровые механики;
- design notes;
- future gameplay ideas;
- механическое описание систем.

---

## Актуальные project documents

Текущие key documents после Stage 03.4 planning visibility synchronization:

    ai/current_status.yml
    ai/docs_map.yml
    docs/project/roadmap/README.md
    docs/project/roadmap/completed_stages.md
    docs/project/roadmap/active_plan.md
    docs/project/roadmap/future_gameplay.md
    docs/project/roadmap/publishing_plan.md
    docs/project/architecture/README.md
    docs/project/architecture/runtime_structure.md
    docs/project/architecture/docs_structure.md
    docs/project/architecture/workflow.md
    docs/project/architecture/ai_navigation_plan.md
    docs/project/architecture/synchronization_protocols.md
    docs/project/stage_01.md
    docs/project/stage_02.md
    docs/project/stage_02_1.md
    docs/project/stage_02_2.md
    docs/project/stage_02_3.md
    docs/project/stage_02_4.md
    docs/project/stage_02_4_1.md
    docs/project/stage_02_4_2.md
    docs/project/stage_02_4_3.md
    docs/project/stage_02_4_4.md
    docs/project/stage_02_4_5.md
    docs/project/stage_02_4_5_A.md
    docs/project/stage_02_4_6.md
    docs/project/stage_03.md
    docs/project/stage_03_1.md
    docs/project/stage_03_2.md
    docs/project/stage_03_2_pass_01.md
    docs/project/stage_03_2_pass_b.md
    docs/project/stage_03_2_runtime_findings_01.md
    docs/project/stage_03_3.md
    docs/project/stage_03_4.md
    docs/project/stage_03_4A_mutation_classes.md
    docs/project/stage_03_developer_report_01.md
    docs/project/stage_03_1_developer_report_01.md
    docs/project/stage_03_1_final_snapshot.md
    docs/project/stage_03_3B_frozen_snapshot.md

---

## Stage 03.2 document

stage_03_2.md — Stage 03.2 definition for AI Navigation & Repository Operating System.

Stage 03.2 является planning stage для repository operating system, AI navigation planning, bounded workflow planning и retrieval-safe repository planning.

stage_03_2_pass_01.md — Minimal Repository OS structure planning pass.

stage_03_2_pass_b.md — Governance workflow formalization and synchronization discipline planning pass.

stage_03_2_runtime_findings_01.md — Stabilized runtime findings artifact for bounded runtime evolution and future runtime mapping preparation.

---

## Stage 03.3 / 03.3B documents

stage_03_3.md — Runtime readability and AI-readable comments-only marking preparation stage.

Stage 03.3 подготавливает topology-aware runtime marking workflow,
cluster-based runtime readability stabilization
и future safe comments-only marking preparation
без runtime refactor и modularization.

Stage 03.3 milestones:

    js/systems/systems_wave_manager.js
    js/systems/systems_placement.js
    js/systems/systems_selected_object_actions.js
    js/systems/systems.js

Wave Manager helper extraction verified through real gameplay testing.
This is the first successful bounded extraction artifact from js/systems.js.

Placement lifecycle extraction verified through real gameplay testing.
This is the second successful bounded extraction artifact from js/systems.js.

Selected object actions extraction verified through real gameplay testing.
This is the third successful bounded extraction artifact from js/systems.js.

Runtime systems relocation verified through manual runtime testing.
The active systems topology now lives under js/systems/.

Stage 03.3B дополнительно подтвердил:

- runtime JS foundation stabilized;
- repository surface synchronized;
- index.html marked as shell runtime entrypoint;
- active CSS currently remains inline inside index.html;
- css/style.css exists and is marked, but is not linked by index.html;
- synchronized AI YAML navigation baseline established;
- Stage 03.3B frozen snapshot created.

---

## Stage 03.4 / 03.4A documents

stage_03_4.md — Stage 03.4 planning/discovery document for repository impact awareness and repository impact mapping foundation.

Stage 03.4 planning/discovery phase is active.

Stage 03.4 execution/runtime evolution phase is NOT started.

stage_03_4A_mutation_classes.md — Stage 03.4A planning/research artifact for mutation classes, synchronization radius and mandatory visibility chains.

Stage 03.4A НЕ является:

- repository_map.yml implementation;
- workflow.md rewrite;
- automation rollout;
- parser/scanner implementation;
- governance engine.

---

## Architecture package

Architecture documentation now lives in:

    docs/project/architecture/

Architecture package:

    docs/project/architecture/README.md
    docs/project/architecture/runtime_structure.md
    docs/project/architecture/docs_structure.md
    docs/project/architecture/workflow.md
    docs/project/architecture/ai_navigation_plan.md
    docs/project/architecture/synchronization_protocols.md

synchronization_protocols.md хранит reusable synchronization protocols и mutation archetype playbooks.

README.md является entrypoint.

После architecture split architecture.md больше не является отдельным root-файлом в docs/project/.
Его роль перенесена в docs/project/architecture/README.md.

---

## AI navigation layer

ai/ является bounded compressed navigation layer.

Current active navigation files:

    ai/current_status.yml
    ai/docs_map.yml

Роль ai/:

- compressed repository navigation;
- runtime topology visibility;
- architecture entrypoint mapping;
- retrieval-safe repository orientation.

ai/ не должен дублировать giant reasoning archive из docs/project/.

runtime_map.yml, contracts.yml, repository_map.yml и automation tooling пока НЕ реализованы.

---

## Current runtime topology

Confirmed runtime topology after Stage 03.3B synchronization:

    index.html
    css/style.css
    js/
      data.js
      state.js
      game.js
      systems/
        systems.js
        systems_wave_manager.js
        systems_placement.js
        systems_selected_object_actions.js
      ui/
        helpers.js
        layout.js
        controls.js
        panels.js
        canvas_world.js
        canvas_entities.js
        notifications.js

Runtime contract:

- browser-global script order is preserved;
- systems files are grouped under js/systems/;
- active CSS remains inline inside index.html;
- css/style.css currently exists as repository surface file only;
- filenames were not renamed;
- runtime code was not changed during relocation;
- old root-level systems files were removed after index.html switched to relocated paths.

---

## Runtime extraction visibility

Verified bounded extraction artifacts:

    js/systems/systems_wave_manager.js
    js/systems/systems_placement.js
    js/systems/systems_selected_object_actions.js

Статус systems.js:

- relocated to js/systems/systems.js;
- reduced and comments-marked;
- currently acts as mixed orchestration + lifecycle-heavy runtime shell;
- not yet a pure orchestration shell.

---

## Runtime evolution methodology

Current iterative runtime evolution model:

growth
→ semantic marking
→ dependency inspection
→ bounded extraction
→ runtime verification
→ bridge cleanup
→ topology synchronization
→ next growth cycle

Stage 03.4 adds planning/discovery focus:

structural mutation detection
→ mutation classification
→ synchronization radius analysis
→ bounded mandatory sync
→ post-sync verification

Project intentionally avoids:

- fake modularization;
- premature abstraction;
- aggressive generic architecture;
- imports/exports migration hysteria;
- fake repository_map authority;
- fake governance engine.

Deferred areas:

- Stage 03.4 execution/runtime evolution;
- ai/repository_map.yml;
- generic object system;
- occupancy rewrite;
- object framework abstraction;
- runtime contracts layer;
- runtime_map.yml;
- contracts.yml;
- imports/exports migration;
- aggressive extraction;
- CSS extraction/linking pass.

---

## Stage files

Stage files фиксируют:

- цели этапа;
- constraints;
- reasoning;
- expected outputs;
- operational decisions;
- переходы между этапами.

Stage files не должны превращаться в бесконечный archive dump.

---

## Developer reports

Developer reports фиксируют:

- что было сделано;
- что подтвердилось;
- какие ограничения найдены;
- какие commits выполнены;
- какие pass завершены;
- какие следующие шаги допустимы.

Developer Report отличается от stage-файла:

- stage = intent / задача / rules;
- developer report = execution history / результат.

---

## Giant docs risks

Подтверждённые giant/high-risk docs:

- docs/project/stage_03.md;
- old docs/project/architecture.md before split;
- old docs/project/roadmap.md before split;
- docs/design/mechanics.md;
- крупные Stage 02.4.x документы.

Риски:

- connector truncation;
- incomplete visibility;
- unsafe overwrite;
- poor retrieval;
- difficult review;
- markdown render drift.

---

## Bounded documentation strategy

Новый принцип:

documentation artifacts должны быть bounded.

Предпочтительно:

- короткие focused files;
- clear purpose;
- section isolation;
- links between docs;
- no giant archive files;
- no duplication of Developer Reports inside architecture package;
- no roadmap logic inside architecture package.

---

## docs/project/ и roadmap package

roadmap package должен описывать:

- порядок действий;
- staged plan;
- future passes;
- next steps.

architecture package должен описывать:

- устройство проекта;
- layers;
- structures;
- boundaries;
- contracts;
- safe architecture rules.

Не смешивать roadmap и architecture.

---

## Общий вывод

Human memory layer должен оставаться читаемым для человека и полезным для AI retrieval.

Но giant markdown docs не должны использоваться как единственный navigation mechanism.

Stage 03.4 / 03.4A visibility synchronization подтвердил разделение ролей:

- docs/project/ хранит human-readable history и architecture narrative;
- ai/*.yml хранит compressed repository navigation layer;
- runtime files остаются source of truth для runtime topology;
- repository_map.yml пока не реализован и должен оставаться future compressed operational interpretation layer.
