# Stage 03.2 — AI Navigation & Repository Operating System
## 1. Статус Stage 03.2
Stage 03.2 является conceptual planning stage после завершения Stage 03.1.
Stage 03.2 НЕ является:
- runtime stage;
- gameplay stage;
- refactor stage;
- modularization execution stage;
- repo-wide AI markup stage;
- automation rollout stage.
Stage 03.2 является:
- repository operating system planning stage;
- AI navigation planning stage;
- bounded workflow planning stage;
- retrieval-safe repository planning stage.
Главная цель:
подготовить repository operating system для дальнейшего безопасного развития CORE FRONTIER.
---
## 2. Главный architectural shift
Stage 03.1 подтвердил:
giant flat repository workflow плохо масштабируется для:
- GPT;
- Codex;
- connector workflow;
- retrieval;
- bounded repository evolution.
Stage 03.2 должен определить:
как проект будет развиваться дальше без:
- giant markdown chaos;
- retrieval collapse;
- uncontrolled refactor;
- hidden architecture drift.
---
## 3. Repository Operating System
Stage 03.2 должен определить repository operating system проекта.
Repository OS должен:
- разделять repository layers;
- определять source-of-truth rules;
- определять navigation workflow;
- определять update propagation workflow;
- определять bounded documentation workflow;
- определять automation boundaries;
- поддерживать retrieval-safe repository evolution.
Главный принцип:
repository должен оставаться:
- human-readable;
- AI-navigable;
- bounded;
- repository-safe.
---
## 4. Repository Layer Model
Предварительная layered model:
### Runtime layer
Назначение:
runtime/gameplay/UI/render logic.
Предварительная структура:
- js/
- css/
- index.html
Главный принцип:
runtime layer остаётся human-readable runtime system.
---
### Human memory layer
Назначение:
- reasoning;
- stages;
- reports;
- incidents;
- workflow history;
- architectural decisions.
Предварительная структура:
- docs/project/
- docs/design/
Главный принцип:
docs/project не превращается в navigation index layer.
---
### AI navigation layer
Предварительный кандидат:
- ai/
Назначение:
- navigation entrypoint;
- compressed repository maps;
- retrieval-safe indexes;
- short-form contracts;
- bounded navigation metadata.
Главный принцип:
ai/ НЕ является giant memory archive.
---
### Logs layer
Предварительный кандидат:
- docs/project/logs/
Назначение:
- short-form operational history;
- compact change tracking;
- bounded repository events;
- workflow incidents.
Главный принцип:
logs не заменяют stages/reports.
---
## 5. Human Memory vs AI Navigation
Stage 03.2 должен жёстко разделить:
### docs/project/
Назначение:
- historical memory;
- reasoning;
- reports;
- stages;
- incidents;
- operational context.
Характер:
- long-form;
- human-readable;
- historical;
- narrative-capable.
---
### ai/
Назначение:
- navigation;
- retrieval shortcuts;
- compressed indexes;
- repository maps;
- short-form contracts.
Характер:
- short-form;
- retrieval-safe;
- bounded;
- machine-friendly;
- navigation-oriented.
---
## 6. AI Navigation Layer
Stage 03.2 должен определить минимальный AI navigation layer.
Важно:
НЕ создавать giant AI operating framework.
Предварительная структура:
- ai/README.md
- ai/current_status.yml
- ai/runtime_map.yml
- ai/docs_map.yml
- ai/contracts.yml
---
### Назначение navigation files
#### current_status.yml
Назначение:
- active stage;
- active workflow;
- current runtime status;
- known blockers;
- current safe direction.
---
#### runtime_map.yml
Назначение:
- runtime clusters;
- runtime ownership;
- dangerous zones;
- high-risk files.
---
#### docs_map.yml
Назначение:
- docs structure;
- active documents;
- deprecated layers;
- primary entrypoints.
---
#### contracts.yml
Назначение:
- short-form runtime contracts;
- dangerous combined-change zones;
- critical script order;
- lifecycle boundaries.
---
## 7. YAML / Index Layer Rules
YAML/index layer должен:
- быть bounded;
- быть short-form;
- быть retrieval-safe;
- быть machine-friendly;
- не дублировать giant reasoning.
Запрещено:
- giant YAML databases;
- giant AI metadata systems;
- nested overengineered schemas;
- replacing human documentation.
Главный принцип:
YAML layer = compressed navigation layer.
---
## 8. Comments-Only Navigation Strategy
Stage 03.2 должен определить:
как runtime files могут получать navigation anchors без AI-comment spam.
---
### Разрешённые navigation comments
Допустимы:
- section headers;
- ownership notes;
- mutation notes;
- dangerous-zone markers;
- lifecycle markers.
---
### Запрещённые navigation comments
Запрещено:
- giant AI explanations;
- duplicated reasoning;
- stage history inside code;
- verbose architecture essays;
- inline giant documentation.
---
### Главный принцип
Runtime files должны:
- оставаться human-readable;
- не превращаться в AI archive;
- сохранять compact runtime structure.
---
## 9. Documentation Impact System
Stage 03.2 должен определить:
какие layers обновляются после каких изменений.
---
### Runtime changes
После runtime changes могут требоваться:
- developer report;
- architecture update;
- ai/contracts update;
- logs update.
---
### Workflow changes
После workflow changes могут требоваться:
- workflow docs update;
- ai/current_status update;
- logs update.
---
### Architecture changes
После architecture changes могут требоваться:
- architecture package update;
- ai/runtime_map update;
- contracts update;
- roadmap alignment review.
---
### Roadmap changes
После roadmap changes могут требоваться:
- roadmap package update;
- current_status update.
---
### Navigation changes
После navigation changes могут требоваться:
- ai/ update;
- docs_map update;
- logs update.
---
## 10. Source-of-Truth Rules
Stage 03.2 должен определить authoritative layers.
---
### Runtime source of truth
Authoritative:
- runtime code;
- index.html;
- js/;
- css/.
---
### Architecture source of truth
Authoritative:
- docs/project/architecture/
---
### Workflow source of truth
Authoritative:
- active stage;
- workflow docs;
- Stage operational rules.
---
### AI navigation source
Authoritative only for navigation:
- ai/
Важно:
ai/ НЕ является authoritative runtime source.
---
### Historical source
Authoritative for historical reasoning:
- stages;
- reports;
- logs;
- snapshots.
---
## 11. Logs Layer
Stage 03.2 должен определить:
нужен ли отдельный logs layer.
---
### Предварительное назначение logs
Логи должны хранить:
- short-form repository history;
- operational events;
- workflow incidents;
- repository shifts;
- bounded change summaries.
---
### Что logs НЕ должны делать
Logs НЕ должны:
- заменять stages;
- заменять developer reports;
- хранить giant reasoning;
- становиться giant changelog.
---
## 12. Update Propagation Rules
Stage 03.2 должен определить propagation workflow.
---
### Если меняется runtime
Могут обновляться:
- architecture runtime structure;
- contracts;
- logs;
- developer reports.
---
### Если меняется workflow
Могут обновляться:
- workflow docs;
- current_status;
- logs.
---
### Если меняется architecture
Могут обновляться:
- runtime maps;
- docs maps;
- contracts;
- roadmap alignment.
---
### Если меняется navigation layer
Могут обновляться:
- ai/indexes;
- docs maps;
- logs.
---
## 13. Automation Boundaries
Stage 03.2 должен определить:
что допустимо автоматизировать.
---
### Допустимая automation
Разрешено:
- index regeneration;
- docs maps updates;
- short-form YAML regeneration;
- logs append operations;
- bounded navigation updates.
---
### Запрещённая automation
Запрещено:
- uncontrolled runtime rewrite;
- autonomous refactor;
- giant AI comment insertion;
- repo-wide rewrite automation;
- automatic architecture rewrite;
- automatic contracts rewrite.
---
## 14. Retrieval-Safe Repository Workflow
Подтверждён новый repository principle:
repository evolution должна учитывать:
- connector limits;
- retrieval limits;
- visibility limits;
- overwrite risks.
Следовательно:
bounded workflow становится обязательным architectural rule.
---
## 15. Navigation-Aware Runtime Evolution
Stage 03.2 должен определить:
как runtime evolution будет происходить через:
- inspection;
- navigation;
- contracts;
- bounded extraction;
- staged modularization.
Главный принцип:
runtime evolution больше не должна происходить giant-pass методом.
---
## 16. Bounded Automation Workflow
Stage 03.2 должен определить bounded automation workflow.
Главный принцип:
automation помогает navigation и indexing,
но НЕ заменяет:
- architectural review;
- runtime review;
- compatibility review;
- manual repository governance.
---
## 17. Visibility Integrity Principle
Visibility uncertainty остаётся stop condition.
Если:
- retrieval incomplete;
- connector visibility unstable;
- overwrite unsafe;
- runtime visibility partial;
то:
- execution останавливается;
- workflow переходит в inspection/report mode;
- giant rewrite запрещается.
---
## 18. Planned Future Workflow
Предварительный будущий workflow:
inspection
→ mapping
→ contracts
→ bounded planning
→ bounded execution
→ verification
→ logs/update propagation
→ cleanup later
---
## 19. Что разрешено в рамках Stage 03.2
Разрешено:
- planning repository workflow;
- planning AI navigation layer;
- planning logs layer;
- planning YAML/index layer;
- planning update propagation workflow;
- planning bounded documentation workflow;
- planning comments-only navigation strategy;
- planning repository governance rules;
- planning automation boundaries;
- planning retrieval-safe workflow;
- documentation-only operational drafts;
- preparation future navigation structure;
- preparation future contracts workflow.
---
## 20. Что запрещено в рамках Stage 03.2
Запрещено:
- runtime refactor;
- gameplay changes;
- HUD/UI changes;
- uncontrolled modularization;
- repo-wide rewrite;
- giant AI markup rollout;
- giant YAML systems;
- replacing docs/project memory layer;
- autonomous runtime automation;
- giant connector overwrite workflow;
- replacing human-readable repository with machine-oriented structure;
- uncontrolled AI comment insertion;
- execution of planned architecture before approval.
---
## 21. Expected Outputs Stage 03.2
Stage 03.2 должен подготовить следующие operational artifacts.
---
### AI navigation planning artifacts
Stage 03.2 должен подготовить:
- AI navigation layer proposal;
- preliminary ai/ structure;
- compressed navigation strategy;
- retrieval-safe index planning;
- contracts/index planning.
---
### Logs layer planning artifacts
Stage 03.2 должен подготовить:
- logs layer proposal;
- short-form logging strategy;
- bounded repository history strategy;
- operational logs workflow.
---
### Documentation impact workflow artifacts
Stage 03.2 должен подготовить:
- documentation impact rules;
- update propagation rules;
- bounded update workflow;
- architecture/roadmap update rules.
---
### YAML / Index layer artifacts
Stage 03.2 должен подготовить:
- YAML/index layer proposal;
- current_status planning;
- runtime_map planning;
- docs_map planning;
- contracts index planning.
---
### Comments-only navigation artifacts
Stage 03.2 должен подготовить:
- comments-only navigation strategy;
- navigation anchor planning;
- runtime-safe comment rules;
- AI-readable boundary rules.
---
### Repository operating system artifacts
Stage 03.2 должен подготовить:
- repository operating system foundation;
- layered repository model;
- source-of-truth rules;
- automation boundaries;
- retrieval-safe repository workflow.
---
Главная задача Stage 03.2:
подготовить repository operating system foundation для:
- bounded repository evolution;
- AI-safe workflow;
- retrieval-safe navigation;
- compatibility-safe runtime evolution;
- layered project architecture.
---
## 22. Следующий безопасный шаг после Stage 03.2
Следующий безопасный шаг после завершения Stage 03.2:
inspection + planning implementation pass.
Без:
- runtime refactor;
- gameplay changes;
- uncontrolled automation;
- repo-wide rewrite.
Цель:
- определить минимально необходимый ai/ layer;
- определить bounded YAML/index structure;
- определить navigation-safe comments strategy;
- определить initial logs workflow;
- подготовить repository-safe implementation plan;
- подготовить comments-only AI-readable rollout strategy.
---
## 23. Главный operational вывод
Stage 03.2 должен подготовить:
repository operating system,
который позволит:
- безопасно масштабировать CORE FRONTIER;
- безопасно работать через GPT/Codex;
- избегать giant markdown chaos;
- избегать retrieval collapse;
- поддерживать bounded repository evolution;
- сохранить human-readable repository;
- поддерживать compatibility-safe runtime evolution;
- развивать проект через layered bounded architecture.

Короткий commit:

Добавить Stage 03.2 AI navigation и repository workflow

Расширенный commit:

Добавить Stage 03.2 AI Navigation & Repository Operating System.
Зафиксировать:
- repository operating system planning;
- layered repository model;
- AI navigation layer planning;
- human memory vs AI navigation separation;
- logs layer planning;
- YAML/index layer planning;
- documentation impact workflow;
- source-of-truth rules;
- update propagation rules;
- comments-only navigation strategy;
- retrieval-safe repository workflow;
- navigation-aware runtime evolution;
- bounded automation workflow;
- visibility integrity principles;
- repository-safe evolution model.
Подготовить foundation для:
- AI-safe repository navigation;
- bounded documentation evolution;
- compatibility-safe runtime workflow;
- future comments-only AI-readable rollout;
- layered repository architecture без giant flat workflow.