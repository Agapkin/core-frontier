# Stage 03.1 — Inspection-First Architecture Foundation
## 1. Статус стадии
Stage 03.1 является operational stabilization stage внутри Stage 03.
Stage 03.1 НЕ является:
- runtime refactor stage;
- gameplay stage;
- HUD/UI redesign stage;
- modularization stage;
- AI-readable rollout stage;
- file splitting stage.
Главная задача Stage 03.1:
подготовить основу для:
- inspection-first workflow;
- слоя навигации AI;
- visibility зависимостей;
- bounded documentation strategy;
- controlled modularization;
- retrieval-безопасного развития проекта.
---
## 2. Главные цели Stage 03.1
Stage 03.1 должен:
- подготовить inspection workflow;
- определить основу навигации;
- определить безопасные boundaries документации;
- определить безопасный workflow развития проекта;
- подготовить основу для будущего слоя навигации AI.
Stage 03.1 НЕ должен:
- менять runtime behavior;
- выполнять gameplay changes;
- менять HUD/UI;
- выполнять giant AI-readable rollout;
- делать repo-wide rewrite;
- выполнять uncontrolled refactor.
Главный принцип:
сначала visibility и navigation,
потом изменения runtime.
---
## 3. Inspection-only architecture pass
Следующий практический pass должен быть inspection-only.
Главная цель:
анализ существующей структуры проекта без изменения runtime.
Следующий pass должен:
- анализировать;
- картографировать;
- определять зависимости;
- определять subsystem boundaries;
- определять ownership;
- выявлять bottlenecks;
- выявлять giant-file risks.
Следующий pass НЕ должен:
- менять runtime;
- менять gameplay;
- менять script order;
- переименовывать runtime entities;
- выполнять modularization;
- вставлять AI-readable markup;
- делать file splitting.
---
## 4. Что должен определить inspection pass
Inspection pass должен определить:
### Script load order
Определить:
- реальный script dependency chain;
- runtime initialization order;
- hidden load dependencies.
---
### Subsystem ownership
Определить:
- какие subsystem существуют;
- какие файлы владеют состоянием;
- какие файлы являются orchestration layer;
- какие файлы являются rendering layer;
- какие subsystem имеют shared ownership risk.
---
### Dependency chains
Определить:
- глобальные runtime dependencies;
- UI/runtime coupling;
- state mutation dependencies;
- dangerous cross-subsystem interactions.
---
### High-risk files
Определить:
- giant files;
- high-coupling files;
- unsafe rewrite candidates;
- files with broad dependency surface.
---
### Future split candidates
Определить:
- subsystem clusters;
- потенциальные bounded modules;
- будущие safe split zones.
Важно:
Stage 03.1 не разрешает physical file splitting.
---
### Giant-file bottlenecks
Определить:
- giant markdown bottlenecks;
- giant runtime bottlenecks;
- retrieval bottlenecks;
- navigation bottlenecks;
- AI visibility bottlenecks.
---
## 5. AI navigation foundation
Stage 03.1 должен подготовить основу для слоя навигации AI.
Важно:
слой навигации AI НЕ является:
- giant reasoning archive;
- replacement для docs/project/;
- полной memory system.
Главная задача:
создать компактный слой навигации AI для AI workflow.
---
## 6. Разделение Human Memory и AI Navigation
Подтверждённое разделение:
### Human memory layer
docs/project/
Содержит:
- stages;
- reports;
- reasoning;
- incidents;
- snapshots;
- historical context.
Назначение:
долговременная память проекта.
---
### AI navigation layer
Предварительный кандидат:
ai/
Назначение:
- navigation entrypoint;
- компактная карта проекта;
- retrieval shortcuts;
- contracts/index layer;
- навигация по subsystem.
Главный принцип:
слой навигации AI не должен дублировать giant reasoning archive.
---
## 7. Предварительная структура AI navigation layer
Stage 03.1 не утверждает финальную структуру ai/.
Но предварительно рассматриваются:
- ai/README.md
- ai/runtime_map.md
- ai/docs_map.md
- ai/contracts.md
- ai/current_status.md
Предварительная цель:
создать минимальный слой навигации AI без overengineering.
---
## 8. Compressed navigation principle
Подтверждён новый navigation principle:
Документация ≠ navigation.
Архив ≠ слой retrieval/navigation.
Следовательно:
AI navigation artifacts должны быть:
- короткими;
- bounded;
- удобными для retrieval;
- index-oriented;
- удобными для navigation.
Запрещено:
- превращать слой навигации AI в giant archive;
- дублировать stage reasoning;
- создавать giant AI mega-documents.
---
## 9. Bounded documentation strategy
Практически подтверждено:
giant stage files и giant markdown documents становятся unsafe для:
- AI retrieval;
- connector visibility;
- full overwrite workflow;
- navigation;
- repository-aware reasoning.
Следовательно:
проект должен постепенно переходить к bounded documentation strategy.
---
## 10. Принципы bounded artifacts
Будущие documentation artifacts должны быть:
- bounded;
- isolated;
- cluster-oriented;
- retrieval-friendly;
- navigation-safe.
Подтверждённые направления:
- bounded reports;
- bounded snapshots;
- bounded developer artifacts;
- section isolation;
- cluster-based documentation.
---
## 11. Section isolation principle
Подтверждён новый documentation principle:
Один artifact не должен:
- хранить весь reasoning проекта;
- хранить всю memory chain;
- хранить весь operational context.
Следовательно:
необходимо:
- разделение по subsystem;
- разделение по purpose;
- bounded operational documents;
- retrieval-safe structure.
---
## 12. Safe GitHub connector workflow
Stage 03.1 фиксирует safe connector workflow.
---
### Безопасные операции
Подтверждено как безопасное:
- targeted patches;
- small documentation passes;
- section-only updates;
- inspection-only passes;
- comments-only changes;
- bounded markdown updates.
---
### Опасные операции
Подтверждено как рискованное:
- giant rewrites;
- full overwrite длинных файлов;
- uncontrolled refactor;
- repo-wide modifications;
- giant connector passes;
- rewrite without full visibility.
---
## 13. AI limitation reporting rules
Подтверждено:
AI обязан сообщать ограничения visibility и retrieval.
Если AI сталкивается с:
- truncation;
- incomplete visibility;
- unsafe overwrite risk;
- partial file read;
- retrieval instability;
- connector visibility loss;
AI обязан:
- остановить pass;
- сообщить limitation;
- не выполнять unsafe rewrite;
- предложить safer workflow;
- предложить bounded patch strategy.
Главный принцип:
visibility uncertainty = stop condition.
---
### Visibility Integrity Rule
Если AI:
- не видит полный файл;
- получает truncated context;
- не уверен в dependency visibility;
- не может безопасно подтвердить overwrite;
- сталкивается с incomplete retrieval visibility;
- не может гарантировать bounded patch correctness;
AI обязан:
- остановить execution;
- перейти в inspection/report mode;
- сообщить limitation;
- предложить bounded workflow;
- избегать unsafe rewrite;
- избегать giant overwrite;
- избегать uncontrolled refactor.
Главный принцип:
visibility uncertainty = stop condition
---
## 14. Новый operational evolution order
Подтверждён новый evolution order проекта:
1. inspection
2. navigation
3. contracts
4. controlled modularization
5. safe runtime evolution
Следствие:
runtime evolution больше не должна происходить через:
- giant passes;
- flat reasoning;
- uncontrolled repository interaction;
- giant runtime rewrites.
---
## 15. Controlled modularization principle
Подтверждено:
modularization необходима.
Но:
запрещён giant refactor.
Разрешён только:
- cluster-by-cluster evolution;
- staged extraction;
- compatibility-safe modularization;
- contract-preserving changes.
---
## 16. Retrieval-aware architecture principle
Подтверждён новый architectural principle:
CORE FRONTIER теперь должен проектироваться:
- не только как runtime architecture;
- но и как retrieval-aware architecture;
- архитектура, удобная для AI-навигации;
- архитектура с учётом navigation/retrieval ограничений;
- repository-aware architecture.
Главный вывод:
AI visibility становится частью engineering constraints проекта.
---
## 17. Обновление architecture.md и roadmap.md
После inspection pass потребуется:
- targeted update architecture.md;
- targeted update roadmap.md.
Обновления должны учитывать:
- repository-aware workflow;
- layered architecture;
- retrieval-слой;
- bounded documentation strategy;
- inspection-first workflow.
Важно:
НЕ выполнять giant rewrite этих документов.
Разрешены только:
- targeted updates;
- bounded additions;
- navigation-safe modifications.
---
## 18. Что запрещено в рамках Stage 03.1
Запрещено:
- runtime refactor;
- gameplay changes;
- HUD/UI rewrite;
- giant AI-readable rollout;
- repo-wide rewrite;
- uncontrolled modularization;
- giant connector overwrite;
- full rewrite giant markdown files;
- file splitting;
- runtime architecture rewrite.
---
## 19. Что разрешено в рамках Stage 03.1
Разрешено:
- inspection-only passes;
- dependency mapping;
- subsystem analysis;
- navigation planning;
- contracts planning;
- bounded documentation planning;
- retrieval analysis;
- giant-file risk analysis;
- стабилизация наблюдаемости архитектуры;
- documentation-only operational reports.
---
## 20. Следующий безопасный шаг
Следующий безопасный шаг после Stage 03.1:
inspection-only architecture pass.
Без:
- runtime changes;
- AI markup insertion;
- modularization;
- file splitting;
- gameplay changes.
Цель:
- определить реальные cluster boundaries;
- определить dependency chains;
- определить основу навигации;
- определить retrieval bottlenecks;
- определить bounded architecture strategy;
- подготовить основу для дальнейших Stage 03 passes.
---
## 21. Главный operational вывод Stage 03.1
Stage 03.1 фиксирует:
проекту необходима не только runtime stabilization,
но и стабилизация наблюдаемости архитектуры.
CORE FRONTIER постепенно переходит:
от:
- giant flat reasoning;
- ZIP-only workflow;
- giant runtime files;
- unstable retrieval;
- chaotic repository interaction;
к:
- repository-aware workflow;
- bounded documentation;
- layered memory;
- слою навигации AI;
- controlled modularization;
- retrieval-aware evolution;
- compatibility-safe runtime development.
---
## 22. Expected Outputs Stage 03.1
Stage 03.1 должен подготовить конкретные operational artifacts.
Stage 03.1 НЕ требует:
- runtime modifications;
- physical modularization;
- file movement;
- file splitting;
- AI markup insertion.
---
### Inspection artifacts
Stage 03.1 должен подготовить:
- preliminary subsystem map;
- runtime dependency notes;
- script load order notes;
- giant/high-risk file list;
- future split candidate list.
---
### Navigation artifacts
Stage 03.1 должен подготовить:
- AI navigation layer proposal;
- compressed retrieval/index strategy;
- bounded documentation strategy notes.
---
### Workflow artifacts
Stage 03.1 должен подготовить:
- safe connector workflow rules;
- inspection-only workflow rules;
- AI limitation reporting rules;
- bounded operational pass rules.
---
### Architecture artifacts
Stage 03.1 должен подготовить:
- preliminary cluster structure;
- subsystem boundary notes;
- retrieval bottleneck notes;
- giant-file risk notes.
---
Главная задача Stage 03.1:
создать основу для:
- inspection-first workflow;
- retrieval-слоя;
- слоя навигации AI;
- controlled modularization;
- bounded repository evolution.

Короткий commit:

Финализировать Stage 03.1 inspection-first stabilization

Расширенный commit:

Финализировать Stage 03.1 как inspection-first stabilization stage.
Зафиксировать:
- inspection-only workflow;
- visibility integrity rules;
- AI limitation stop conditions;
- bounded documentation strategy;
- safe GitHub connector workflow;
- retrieval/navigation separation;
- layered project structure;
- inspection-first evolution order;
- controlled modularization principles;
- giant-file risk handling;
- основа навигации для AI workflow;
- подготовка foundation для будущего inspection pass;
- repository-safe operational model без runtime refactor.