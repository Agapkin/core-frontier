# Workflow Architecture — CORE FRONTIER

## Назначение документа

Этот файл описывает operational workflow проекта CORE FRONTIER.

Он отвечает на вопрос:

как проект должен развиваться безопасно.

Roadmap-порядок действий здесь не описывается.

---

## Основной evolution workflow

Подтверждённый workflow:

    inspection
    → navigation
    → contracts
    → controlled modularization
    → safe runtime evolution

Этот порядок был подтверждён в Stage 03.1.

---

## Inspection-first principle

Перед runtime changes сначала должен происходить inspection pass.

Inspection pass нужен для:

- dependency visibility;
- ownership visibility;
- boundary detection;
- mutation analysis;
- lifecycle analysis;
- regression risk detection.

Без inspection visibility нельзя выполнять unsafe runtime rewrite.

---

## Discovery-first workflow

Новый subsystem сначала должен:

- быть найден;
- быть описан;
- получить boundaries;
- получить ownership visibility;
- получить dependency visibility.

Только после этого допустимы:

- refactor;
- extraction;
- modularization;
- architecture changes.

---

## Bounded pass principle

Изменения должны выполняться bounded passes.

Предпочтительно:

- small focused passes;
- isolated scope;
- one-goal modifications;
- compatibility-safe patches;
- inspection-first workflow.

Нежелательно:

- giant rewrites;
- repo-wide changes;
- uncontrolled refactor;
- multi-subsystem mutation passes.

---

## Visibility integrity principle

Visibility uncertainty является stop condition.

Если AI:

- не видит полный файл;
- получает truncation;
- не уверен в overwrite safety;
- не видит dependency chain;
- не может подтвердить bounded correctness;

AI обязан:

- остановить pass;
- перейти в inspection/report mode;
- сообщить limitation;
- предложить bounded workflow;
- избегать unsafe overwrite.

---

## Connector-safe workflow

GitHub connector workflow должен оставаться bounded.

Безопасные операции:

- targeted patches;
- small markdown updates;
- isolated file changes;
- comments-only passes;
- inspection-only passes;
- bounded architecture updates.

Опасные операции:

- giant overwrite;
- repo-wide rewrite;
- uncontrolled modularization;
- rewrite giant markdown files;
- multi-file blind patches.

---

## Giant-file handling

Giant markdown files создают:

- truncation risk;
- overwrite risk;
- retrieval instability;
- review complexity;
- navigation problems.

Следовательно:

- giant docs должны разделяться;
- architecture packages должны быть bounded;
- roadmap/history/navigation должны быть separated;
- giant passes должны избегаться.

---

## Compatibility-safe evolution

Изменения должны сохранять runtime compatibility.

Особенно:

- script order;
- global state shape;
- build flow;
- render order;
- restart/retry lifecycle;
- input/camera flow;
- UI contracts.

Compatibility-safe evolution предпочтительнее full rewrite.

---

## Controlled modularization

Modularization разрешена только staged extraction методом.

Запрещено:

- giant modular rewrite;
- instant subsystem split;
- uncontrolled extraction;
- repo-wide architecture rewrite.

Разрешено:

- cluster-by-cluster extraction;
- compatibility layer;
- staged migration;
- isolated subsystem evolution.

---

## Runtime-sensitive zones

Подтверждённые runtime-sensitive zones:

- systems.js mutation hub;
- build flow;
- input/camera flow;
- render/update order;
- uiState shared ownership;
- uiLayout shared ownership;
- panels.js hidden complexity layer.

Эти зоны требуют explicit boundary review перед изменениями.

---

## Dangerous combined-change zones

Подтверждённые dangerous combined-change zones:

- state.js + systems.js;
- systems.js + controls.js;
- systems.js + panels.js;
- systems.js + game.js;
- layout.js + controls.js + panels.js;
- game.js + render files;
- state.js + gameplay + UI combined changes.

Такие passes требуют staged decomposition.

---

## Documentation workflow

Documentation layer должна оставаться separated.

Architecture package:

- описывает устройство проекта;
- boundaries;
- layers;
- contracts;
- workflow rules.

Roadmap:

- описывает порядок действий;
- future stages;
- execution sequence.

Developer Reports:

- фиксируют execution history;
- фиксируют findings;
- фиксируют completed passes.

---

## AI navigation workflow

AI navigation layer не должен становиться giant archive.

Navigation layer должен быть:

- bounded;
- compressed;
- retrieval-friendly;
- navigation-oriented;
- index-oriented.

Полный reasoning/history должен оставаться в human memory layer.

---

## Safe future workflow

Рекомендуемый workflow:

1. inspection
2. bounded report
3. contract candidate review
4. isolated patch
5. compatibility verification
6. bounded commit
7. next isolated pass

Не рекомендуется:

- giant implementation jumps;
- blind refactor;
- architecture rewrite without visibility;
- combined gameplay/UI/layout/runtime rewrites.

---

## Общий вывод

CORE FRONTIER должен развиваться как:

- repository-aware project;
- inspection-driven project;
- compatibility-safe project;
- bounded-evolution project.

Главный принцип:

сначала visibility и boundaries,
потом runtime changes.
