# Roadmap — CORE FRONTIER

## Назначение документа

Этот файл является главным входом в roadmap проекта CORE FRONTIER.

Важно разделять роли документов:

- architecture описывает, как устроен проект;
- roadmap описывает, что делать дальше и в каком порядке.

Roadmap-документация не должна превращаться в architecture document, giant reasoning archive или developer report.

После roadmap split этот файл является entrypoint для roadmap package:

docs/project/roadmap/

---

## Текущее состояние

CORE FRONTIER прошёл несколько этапов runtime development, затем перешёл в architecture / navigation stabilization workflow.

Текущий verified status после Stage 03.3B:

- Stage 03.1 completed and closed;
- Stage 03.2 completed as governance/navigation operational foundation;
- Stage 03.3 completed as runtime readability stabilization;
- Stage 03.3B completed/closing as code/surface/docs synchronization stage;
- current active stage = Stage 03.3B;
- Stage 03.4 НЕ начат;
- architecture package split completed;
- roadmap package split completed;
- legacy architecture.md removed;
- legacy roadmap.md removed;
- AI YAML navigation baseline synchronized;
- runtime JS foundation stabilized;
- repository surface synchronized.

Stage 03.3 / 03.3B подтвердили:

- comments-only runtime marking deployed;
- js/systems/* extraction topology verified;
- systems.js reduced to mixed orchestration + lifecycle-heavy runtime systems file;
- index.html marked as shell runtime entrypoint;
- css/style.css exists and is marked;
- active CSS remains inline inside index.html;
- css/style.css is not linked by index.html.

---

## Карта roadmap-документов

Roadmap package уже разделён на bounded documents:

- docs/project/roadmap/README.md  
  Главный вход в roadmap package.

- docs/project/roadmap/completed_stages.md  
  Завершённые и зафиксированные этапы проекта.

- docs/project/roadmap/active_plan.md  
  Текущий operational plan и ближайшие действия.

- docs/project/roadmap/future_gameplay.md  
  Будущие gameplay/runtime этапы после возвращения к runtime evolution.

- docs/project/roadmap/publishing_plan.md  
  Публикация, платформы, marketplace и внешнее развитие проекта.

Важно:

roadmap package является текущей bounded roadmap structure,
а не будущим планом создания.

---

## Текущая структура roadmap package

Текущая структура roadmap layer:

    docs/project/roadmap/
    ├── README.md
    ├── completed_stages.md
    ├── active_plan.md
    ├── future_gameplay.md
    └── publishing_plan.md

Legacy docs/project/roadmap.md удалён.

---

## Главный roadmap principle

Roadmap отвечает на вопрос:

что делать дальше и в каком порядке.

Roadmap НЕ должен:

- описывать всё устройство runtime;
- дублировать architecture package;
- дублировать developer reports;
- хранить giant reasoning history;
- становиться AI navigation layer.

---

## Текущий safe evolution order

Подтверждённый порядок развития проекта после Stage 03.3B:

1. завершить bounded roadmap/documentation synchronization;
2. выполнить final docs-layer verification;
3. сохранить Stage 03.4 как not started до explicit next-stage decision;
4. не менять runtime/code topology в documentation passes;
5. продолжать только bounded compatibility-safe workflow;
6. возвращаться к runtime evolution только через отдельный explicit runtime reentry plan.

---

## Важный конфликт старой roadmap-нумерации

В старом roadmap существовал раздел:

Stage 03 — Combat Expansion.

После появления фактической Stage 03:

Stage 03 — Архитектура разработки и память проекта

старый Combat Expansion больше не должен называться Stage 03.

Он должен оставаться в future gameplay roadmap как будущий gameplay/combat expansion direction без конфликта с уже существующей Stage 03.

---

## Связь с architecture package

Architecture package разделён на bounded files:

    docs/project/architecture/README.md
    docs/project/architecture/runtime_structure.md
    docs/project/architecture/docs_structure.md
    docs/project/architecture/workflow.md
    docs/project/architecture/ai_navigation_plan.md

Roadmap package должен ссылаться на architecture package, но не дублировать его.

Architecture package после Stage 03.3B synchronized with current runtime/surface truth.

---

## Связь с AI navigation layer

AI navigation layer active files:

    ai/current_status.yml
    ai/docs_map.yml

Roadmap package не должен дублировать ai/*.yml.

Роль roadmap:

- порядок действий;
- staged evolution;
- completed/current/future roadmap context.

Роль ai/*.yml:

- compressed navigation;
- repository orientation;
- retrieval-safe entrypoints.

Deferred intentionally:

- ai/runtime_map.yml;
- ai/contracts.yml;
- automation tooling;
- Stage 03.4 implementation.

---

## Ближайший roadmap workflow

Текущий bounded roadmap workflow:

1. active_plan.md synchronized and verified;
2. completed_stages.md synchronized;
3. roadmap/README.md synchronized;
4. perform roadmap package verification pass;
5. optionally perform light ai_navigation_plan.md wording sync;
6. only after final docs-layer verification decide next safe stage.

Важно:

Stage 03.4 не начинается автоматически после roadmap synchronization.

---

## Общий вывод

Roadmap CORE FRONTIER является bounded operational plan layer.

Он помогает двигаться по этапам, не смешиваясь с architecture, developer reports и AI navigation.

Главный принцип:

architecture = устройство проекта;
roadmap = порядок действий;
ai/*.yml = compressed navigation;
runtime files = source of truth.
