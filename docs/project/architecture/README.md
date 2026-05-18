# Архитектура проекта CORE FRONTIER

## Назначение документа

Этот файл является главным входом в архитектуру проекта CORE FRONTIER.

Важно разделять роли документов:

- architecture описывает, как устроен проект;
- roadmap описывает, что делать дальше и в каком порядке.

Architecture-документация не должна превращаться в roadmap, stage archive или giant reasoning dump.

После architecture split этот файл является entrypoint для архитектурного пакета:

docs/project/architecture/

---

## Текущее состояние

CORE FRONTIER перешёл от монолитного canvas-прототипа к многоуровневой browser-based RTS / Tower Defense архитектуре.

Проект использует:

- HTML shell/runtime entrypoint;
- active inline CSS inside index.html;
- browser-global JavaScript runtime через глобальные переменные и функции;
- extracted systems topology внутри js/systems/*;
- отдельные runtime-файлы для data, state, systems, UI, rendering и game loop;
- documentation layer в docs/project/;
- design layer в docs/design/.

Дополнительно:

- css/style.css существует как Stage 03.3B CSS surface file;
- css/style.css сейчас НЕ подключён index.html;
- CSS framework / module loader architecture НЕ реализованы.

После Stage 03.3 / 03.3B проект дополнительно получил:

- stabilized runtime readability marking;
- repository surface synchronization;
- bounded extraction verification workflow;
- topology-preserving runtime evolution model;
- synchronized AI YAML navigation baseline.

Stage 03.4 НЕ начат.

---

## Карта архитектурных документов

Детали архитектуры вынесены в отдельные bounded documents:

- docs/project/architecture/README.md  
  Главный вход в architecture package.

- docs/project/architecture/runtime_structure.md  
  Runtime-код, script order, state, systems, UI, rendering, mutation hubs, dangerous runtime boundaries.

- docs/project/architecture/docs_structure.md  
  Документация проекта, stage-файлы, developer reports, human memory layer, giant docs risks.

- docs/project/architecture/workflow.md  
  GitHub Runtime Layer, ZIP-based analysis, attachment workflow, visibility stop condition, source-of-truth rules.

- docs/project/architecture/ai_navigation_plan.md  
  План будущего слоя AI-навигации, отличие docs/ от ai/, preliminary navigation artifacts.

---

## Структура верхнего уровня

Текущая структура проекта после Stage 03.3B synchronization:

    core-frontier/
    ├── README.md
    ├── index.html
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── data.js
    │   ├── state.js
    │   ├── game.js
    │   ├── systems/
    │   │   ├── systems_wave_manager.js
    │   │   ├── systems_placement.js
    │   │   ├── systems_selected_object_actions.js
    │   │   └── systems.js
    │   └── ui/
    │       ├── helpers.js
    │       ├── layout.js
    │       ├── controls.js
    │       ├── panels.js
    │       ├── canvas_world.js
    │       ├── canvas_entities.js
    │       └── notifications.js
    └── docs/
        ├── design/
        │   └── mechanics.md
        └── project/
            ├── roadmap/
            │   ├── README.md
            │   ├── active_plan.md
            │   ├── completed_stages.md
            │   ├── future_gameplay.md
            │   └── publishing_plan.md
            ├── architecture/
            │   ├── README.md
            │   ├── runtime_structure.md
            │   ├── docs_structure.md
            │   ├── workflow.md
            │   └── ai_navigation_plan.md
            ├── stage_01.md
            ├── stage_02.md
            ├── stage_02_1.md
            ├── stage_02_2.md
            ├── stage_02_3.md
            ├── stage_02_4.md
            ├── stage_02_4_1.md
            ├── stage_02_4_2.md
            ├── stage_02_4_3.md
            ├── stage_02_4_4.md
            ├── stage_02_4_5.md
            ├── stage_02_4_5_A.md
            ├── stage_02_4_6.md
            ├── stage_03.md
            ├── stage_03_1.md
            ├── stage_03_developer_report_01.md
            └── stage_03_1_developer_report_01.md

---

## Главный runtime принцип

Проект использует browser runtime без ES modules.

Критический script order:

    data.js
    → state.js
    → systems helpers
    → systems.js
    → ui/*
    → game.js

Текущий systems topology:

    js/systems/systems_wave_manager.js
    js/systems/systems_placement.js
    js/systems/systems_selected_object_actions.js
    js/systems/systems.js

index.html является runtime dependency root.

Изменение порядка scripts без migration plan может сломать:

- global dependencies;
- runtime initialization;
- gameplay flow;
- UI flow;
- render/update flow.

---

## Главные runtime findings Stage 03.3 / 03.3B

Stage 03.3 / 03.3B подтвердили:

- systems.js больше не является единым gameplay monolith;
- systems.js сейчас является mixed orchestration + lifecycle-heavy runtime systems file;
- systems extraction survived runtime verification;
- state.js содержит shared global runtime state;
- game.js является input/camera/game loop orchestration layer;
- ui/* содержит DOM/UI/HUD/rendering support layers;
- panels.js является hidden complexity layer;
- build/placement flow является наиболее sensitive interaction zone;
- render/update order является implicit runtime contract;
- browser-global runtime topology preserved after bounded extractions;
- repository surface synchronized without runtime rewrite.

Ключевые shared runtime structures:

- uiState;
- uiLayout;
- resources;
- power;
- waveState;
- towers;
- enemies;
- camera;
- gameState.

Эти структуры нельзя менять без compatibility review.

---

## Human memory layer

docs/project/ является human memory layer проекта.

Он хранит:

- stage-документацию;
- developer reports;
- architecture;
- roadmap;
- reasoning snapshots;
- operational history.

docs/project/ не должен превращаться в единственный AI navigation layer.

---

## Future AI navigation layer

ai/ является bounded compressed navigation layer.

Его задача:

- быстрый вход для GPT/Codex;
- compressed project map;
- runtime navigation;
- docs navigation;
- retrieval shortcuts.

ai/ не должен дублировать giant reasoning archive из docs/project/.

Важно:

runtime_map.yml, contracts.yml и automation tooling пока НЕ реализованы.

---

## Safe evolution order

Подтверждённый порядок дальнейшей эволюции:

1. inspection
2. navigation
3. contracts
4. controlled modularization
5. safe runtime evolution

Runtime refactor, file splitting и AI-readable markup должны выполняться только отдельными bounded passes.

---

## Ближайшая логика развития

После Stage 03.3B:

1. runtime JS foundation стабилизирован;
2. repository surface synchronization завершён;
3. architecture/docs synchronization завершён bounded passes;
4. roadmap package synchronization завершён;
5. Stage 03.4 пока НЕ начат;
6. future runtime evolution должна сохранять topology-preserving discipline.

---

## Общий вывод

CORE FRONTIER теперь развивается как:

- gameplay/runtime project;
- repository-aware codebase;
- retrieval-aware codebase;
- AI-navigation-aware codebase.

Главный архитектурный принцип:

сначала visibility,
потом navigation,
потом contracts,
потом controlled modularization,
и только затем runtime evolution.
