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

Текущие key documents после architecture split:

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
    docs/project/stage_03_developer_report_01.md
    docs/project/stage_03_1_developer_report_01.md
    docs/project/stage_03_1_final_snapshot.md

---

## Stage 03.2 document

stage_03_2.md — Stage 03.2 definition for AI Navigation & Repository Operating System.

Stage 03.2 является planning stage для repository operating system, AI navigation planning, bounded workflow planning и retrieval-safe repository planning.

stage_03_2_pass_01.md — Minimal Repository OS structure planning pass.

stage_03_2_pass_b.md — Governance workflow formalization and synchronization discipline planning pass.

stage_03_2_runtime_findings_01.md — Stabilized runtime findings artifact for bounded runtime evolution and future runtime mapping preparation.

---

## Stage 03.3 document

stage_03_3.md — Runtime readability and AI-readable comments-only marking preparation stage.

Stage 03.3 подготавливает topology-aware runtime marking workflow,
cluster-based runtime readability stabilization
и future safe comments-only marking preparation
без runtime refactor и modularization.

Stage 03.3 milestones:

    js/systems_wave_manager.js
    js/systems_placement.js

Wave Manager helper extraction verified through real gameplay testing.
This is the first successful bounded extraction artifact from js/systems.js.

Placement lifecycle extraction verified through real gameplay testing.
This is the second successful bounded extraction artifact from js/systems.js.

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

README.md является entrypoint.

После architecture split architecture.md больше не является отдельным root-файлом в docs/project/.
Его роль перенесена в docs/project/architecture/README.md.

---

## Runtime extraction visibility

Verified bounded extraction artifacts:

    js/systems_wave_manager.js
    js/systems_placement.js

Статус Wave Manager:

- extracted from js/systems.js;
- loaded between js/state.js and js/systems.js;
- runtime verified manually;
- no visible regression detected;
- topology-preserving extraction confirmed;
- rollback-safe extraction boundary preserved.

Статус Placement:

- extracted from js/systems.js;
- loaded between js/systems_wave_manager.js and js/systems.js;
- confirmBuild bridge cleanup completed;
- runtime verified manually;
- no visible regression detected;
- placement lifecycle ownership moved to js/systems_placement.js;
- topology-preserving extraction confirmed;
- browser-global extraction preserved;
- rollback-safe extraction boundary preserved.

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

Для AI navigation нужен отдельный compressed layer.
