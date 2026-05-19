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

Stage 03.4 planning/discovery phase активен.

Stage 03.4 execution/runtime evolution phase ещё НЕ начат.

Stage 03.4A mutation classes planning document created:

- docs/project/stage_03_4A_mutation_classes.md

---

## Карта архитектурных документов

Детали архитектуры вынесены в отдельные bounded documents:

- docs/project/architecture/README.md

- docs/project/architecture/runtime_structure.md

- docs/project/architecture/docs_structure.md

- docs/project/architecture/workflow.md

- docs/project/architecture/ai_navigation_plan.md

- docs/project/architecture/synchronization_protocols.md

synchronization_protocols.md хранит reusable synchronization playbooks.

Protocol 01 formalizes confirmed new_stage_file synchronization behavior.

---

## Общий вывод

CORE FRONTIER развивается как:

- gameplay/runtime project;
- repository-aware codebase;
- retrieval-aware codebase;
- AI-navigation-aware codebase;
- impact-awareness planning codebase.

Главный архитектурный принцип:

сначала visibility,
потом navigation,
потом impact awareness,
потом contracts,
потом controlled modularization,
и только затем runtime evolution.
