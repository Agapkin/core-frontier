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

- HTML entrypoint;
- CSS layer;
- JavaScript runtime через глобальные переменные и функции;
- отдельные runtime-файлы для data, state, systems, UI, rendering и game loop;
- documentation layer в docs/project/;
- design layer в docs/design/.

После Stage 03 и Stage 03.1 проект дополнительно получил:

- repository-aware workflow;
- bounded documentation strategy;
- inspection-first evolution model;
- visibility stop condition;
- preliminary runtime contract candidates.

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

Текущая структура проекта после architecture split:

    core-frontier/
    ├── README.md
    ├── index.html
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── data.js
    │   ├── state.js
    │   ├── systems.js
    │   ├── game.js
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
            ├── roadmap.md
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
    → systems.js
    → ui/*
    → game.js

index.html является runtime dependency root.

Изменение порядка scripts без migration plan может сломать:

- global dependencies;
- runtime initialization;
- gameplay flow;
- UI flow;
- render/update flow.

---

## Главные runtime findings Stage 03.1

Stage 03.1 подтвердил:

- systems.js является central gameplay mutation hub;
- state.js содержит shared global runtime state;
- game.js является input/camera/game loop orchestration layer;
- ui/* содержит DOM/UI/HUD/rendering support layers;
- panels.js является hidden complexity layer;
- build flow является наиболее sensitive interaction zone;
- render/update order является implicit runtime contract.

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

Будущий ai/ должен быть отдельным compressed navigation layer.

Его задача:

- быстрый вход для GPT/Codex;
- compressed project map;
- runtime navigation;
- docs navigation;
- contract/index layer;
- retrieval shortcuts.

ai/ не должен дублировать giant reasoning archive из docs/project/.

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

После Stage 03.1:

1. architecture.md был разделён на bounded architecture package;
2. roadmap.md должен быть targeted updated отдельно;
3. затем должен быть спланирован future AI navigation layer;
4. затем возможен comments-only AI-readable markup pass;
5. только после этого безопасно возвращаться к runtime evolution / Stage 02.4.6.

---

## Общий вывод

CORE FRONTIER теперь развивается не только как gameplay/runtime project, но и как repository-aware, retrieval-aware и AI-navigation-aware codebase.

Главный архитектурный принцип:

сначала visibility,
потом navigation,
потом contracts,
потом controlled modularization,
и только затем runtime evolution.
