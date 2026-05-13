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

CORE FRONTIER прошёл несколько этапов runtime development и затем временно перешёл в architecture stabilization workflow.

На текущем этапе:

- Stage 02.4.6 не удалена и не считается failure stage;
- runtime development временно приостановлен из-за architectural blocker;
- Stage 03 создал architecture / memory / repository-aware stabilization layer;
- Stage 03.1 завершил inspection-first runtime discovery-cycle;
- architecture.md был разделён на bounded architecture package;
- roadmap.md должен быть разделён на bounded roadmap package.

---

## Карта roadmap-документов

Roadmap package должен быть разделён на bounded documents:

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
эти файлы должны быть созданы отдельными bounded passes.

---

## Целевая структура roadmap package

Целевая структура roadmap layer:

    docs/project/roadmap/
    ├── README.md
    ├── completed_stages.md
    ├── active_plan.md
    ├── future_gameplay.md
    └── publishing_plan.md

Старый docs/project/roadmap.md временно остаётся legacy roadmap artifact до завершения roadmap split verification.

После verification roadmap package legacy roadmap.md должен быть удалён отдельным cleanup pass.

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

Подтверждённый порядок развития проекта после Stage 03.1:

1. architecture package split;
2. roadmap package split;
3. AI navigation layer planning;
4. comments-only AI-readable markup planning;
5. targeted AI navigation artifacts;
6. controlled runtime evolution;
7. возврат к Stage 02.4.6 / runtime gameplay work через compatibility-safe passes.

---

## Важный конфликт старой roadmap-нумерации

В старом roadmap существовал раздел:

Stage 03 — Combat Expansion.

После появления фактической Stage 03:

Stage 03 — Архитектура разработки и память проекта

старый Combat Expansion больше не должен называться Stage 03.

Он должен быть перенесён в future gameplay roadmap как будущий gameplay/combat expansion stage без конфликта с уже существующей Stage 03.

---

## Связь с architecture package

Architecture package уже разделён на bounded files:

    docs/project/architecture/README.md
    docs/project/architecture/runtime_structure.md
    docs/project/architecture/docs_structure.md
    docs/project/architecture/workflow.md
    docs/project/architecture/ai_navigation_plan.md

Roadmap package должен ссылаться на architecture package, но не дублировать его.

---

## Ближайший roadmap workflow

Следующие bounded passes:

1. создать completed_stages.md;
2. создать active_plan.md;
3. создать future_gameplay.md;
4. создать publishing_plan.md;
5. выполнить roadmap package verification pass;
6. только после verification решать вопрос удаления legacy docs/project/roadmap.md.

---

## Общий вывод

Roadmap CORE FRONTIER должен стать bounded operational plan layer.

Он должен помогать двигаться по этапам, не смешиваясь с architecture, developer reports и AI navigation.

Главный принцип:

architecture = устройство проекта;
roadmap = порядок действий.
