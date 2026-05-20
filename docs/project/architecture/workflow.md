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

Stage 03.4 implementation пока НЕ начат.

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
- inspection-first workflow;
- one-file/two-file synchronization passes.

Нежелательно:

- giant rewrites;
- repo-wide changes;
- uncontrolled refactor;
- multi-subsystem mutation passes;
- giant multi-file synchronization.

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
- избегать unsafe overwrite;
- не выполнять overwrite from memory.

Полная visibility файла обязательна перед mutation pass.

---

## Connector-safe workflow

GitHub connector workflow должен оставаться bounded.

Подтверждено:

- connector может временно терять repository access;
- read access и write/update access могут отличаться;
- repository reads могут работать при failed writes.

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

Historical stage docs не должны переписываться как current-state operational docs.

Repository-visible structural mutations и stage-file mutations должны consult synchronization_protocols.md для mutation-specific synchronization scope.

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

## Pass separation discipline

Repository workflow разделяет:

- audit passes;
- synchronization passes;
- verification passes.

Audit pass:

- ищет drift;
- проверяет repository reality;
- не выполняет mutation.

Synchronization pass:

- выполняет bounded update;
- ограничен explicit scope;
- не должен становиться giant rewrite.

Verification pass:

- подтверждает applied synchronization;
- проверяет отсутствие stale state;
- не должен опираться только на memory.

---

## Bounded continuation discipline

Если bounded synchronization или mutation chain не может безопасно завершиться в одном execution из-за connector pressure, tool limitation, visibility limit, large-file pressure, cumulative mutation pressure, safety interruption или bounded execution constraint, pass может продолжаться через bounded continuation phases.

Continuation phase НЕ является restart.

Continuation phase должна:

- продолжать только remaining scope;
- не повторять уже закрытые phases или anchors;
- сохранять исходный bounded scope;
- сохранять repository truth;
- сохранять verification discipline;
- не превращаться в broad cleanup или governance expansion.

В каждом continuation report нужно clearly фиксировать:

- что уже completed;
- что осталось mandatory или in-scope;
- какие files changed;
- какие files inspected but unchanged;
- какие commits относятся к текущей chain;
- есть ли remaining stale anchors или deferred areas;
- текущий synchronization/mutation closure status.

Короткие continuation commands допустимы и предпочтительны после того, как pass context already established:

- CONTINUE CURRENT PASS;
- CONTINUE SYNCHRONIZATION;
- CONTINUE CURRENT PROTOCOL.

User should not need to resend the full original operational prompt for every continuation phase.

GPT branch must use the previous pass report as continuation state, unless repository drift or visibility uncertainty requires re-inspection.

Final closure report must summarize:

- all continuation phases;
- all commits;
- final closure state;
- remaining deferred areas, if any;
- unrelated mutation check.

Bounded continuation is:

- execution discipline;
- connector-safe workflow behavior;
- verification-preserving continuation.

Bounded continuation is NOT:

- autonomous continuation;
- queue system;
- retry engine;
- orchestration daemon;
- governance expansion;
- background execution promise.

---

## Safe future workflow

Рекомендуемый workflow:

1. inspection
2. bounded report
3. contract candidate review
4. isolated patch
5. compatibility verification
6. bounded commit
7. post-mutation verification pass
8. next isolated pass

Не рекомендуется:

- giant implementation jumps;
- blind refactor;
- architecture rewrite without visibility;
- combined gameplay/UI/layout/runtime rewrites.

---

## Repository Governance Lifecycle

Repository governance formalizes already-confirmed workflow discipline.

Governance lifecycle:

    deployment
    → Documentation Impact Check
    → AI Navigation Impact Check
    → verification pass
    → correction pass if needed
    → synchronization confirmation
    → stabilization confirmation

Главный принцип:

deployment ≠ stabilization.

Deployment начинает integration, но layer считается stabilized только после verification, correction if needed и synchronization confirmation.

---

### Documentation Impact Workflow

После repository changes необходимо compactly проверить:

- требуется ли architecture update;
- требуется ли roadmap update;
- требуется ли workflow update;
- требуется ли logs update;
- требуется ли developer report/snapshot;
- есть ли deferred updates, если affected layer не входит в scope текущего pass.

Impact workflow должен ограничивать propagation scope и предотвращать giant synchronization.

---

### AI Navigation Impact Workflow

После repository/navigation changes необходимо compactly проверить:

- требуется ли `ai/current_status.yml` update;
- требуется ли `ai/docs_map.yml` update;
- требуется ли `ai/runtime_map.yml` update;
- требуется ли `ai/contracts.yml` update;
- затронуты ли navigation anchors;
- есть ли deferred updates, если affected layer не входит в scope текущего pass.

AI Navigation Impact Workflow НЕ должен дублировать YAML contents внутри workflow.md.

Важно:

`ai/runtime_map.yml` и `ai/contracts.yml` пока НЕ реализованы.

---

### Verification & Correction Workflow

Verification mandatory after:

- navigation deployment;
- docs structure changes;
- architecture structure changes;
- roadmap structure changes;
- bounded synchronization passes.

Navigation drift и governance drift считаются естественными repository phenomena.

Correction must be:

- bounded;
- targeted;
- synchronization-oriented;
- propagation-safe.

Запрещено:

- giant correction rewrites;
- uncontrolled propagation;
- unrelated synchronization changes;
- speculative sync outside verification scope.

---

### Deferred Update Rules

Deferred updates must be explicit.

Deferred update allowed when:

- affected layer is outside current scope;
- update requires separate bounded pass;
- current pass does not permit propagation.

Deferred does not mean forgotten.

Every deferred update should be visible in Impact Check output or pass report.

---

### Synchronization Discipline

Synchronization must remain bounded.

Stabilization requires synchronization confirmation.

Propagation must not become:

- repo-wide rewrite;
- giant sync pass;
- unrelated layer update;
- speculative governance expansion.

Navigation layer must remain retrieval-safe.

---

### Bounded Propagation Rules

Propagation scope must be limited to affected layers.

Rules:

- update only affected layers;
- do not update unrelated files;
- do not perform speculative sync;
- do not perform automatic giant propagation;
- keep governance short-form and protocol-oriented.

---

### Deferred governance areas

Do not formalize yet:

- runtime_map governance;
- contracts governance;
- logs workflow;
- automation governance;
- comments-only rollout discipline;
- runtime extraction governance;
- modularization governance.

These remain deferred until dedicated bounded planning/implementation passes.

---

### Commit language discipline

По умолчанию:

- commit titles должны быть на русском;
- extended commit bodies должны быть на русском.

Исключение:

- explicit alternative language request.

---

### Anti-overgrowth rule

workflow.md must remain:

- bounded;
- protocol-oriented;
- retrieval-safe;
- operational.

workflow.md must NOT become:

- governance archive;
- reasoning archive;
- incident history;
- giant synchronization log;
- duplicate of stage files;
- duplicate of reports/snapshots.

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
