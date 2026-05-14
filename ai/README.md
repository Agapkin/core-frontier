# AI Navigation — CORE FRONTIER

## Назначение

`ai/` является минимальным navigation layer для GPT/Codex workflow.

Его задача:

- дать быстрый вход в проект;
- показать актуальный статус;
- указать primary documentation entrypoints;
- сократить retrieval overhead;
- не дублировать human memory layer.

---

## Human memory vs AI navigation

### Human memory layer

Основной long-form context хранится в:

- `docs/project/`
- `docs/design/`

Там находятся:

- stages;
- developer reports;
- architecture package;
- roadmap package;
- design/mechanics notes;
- historical reasoning.

### AI navigation layer

`ai/` содержит только compressed navigation files.

`ai/` НЕ является:

- reasoning archive;
- developer report layer;
- replacement for docs/project;
- runtime source of truth;
- giant AI metadata database.

---

## Reading order

Recommended first-read order:

1. `ai/current_status.yml`
2. `ai/docs_map.yml`
3. `docs/project/roadmap/active_plan.md`
4. `docs/project/architecture/README.md`
5. `docs/project/stage_03_2.md`
6. `docs/project/stage_03_2_pass_01.md`

---

## Current minimal files

Current deployed minimal AI navigation layer:

- `ai/README.md`
- `ai/current_status.yml`
- `ai/docs_map.yml`

Deferred intentionally:

- `ai/runtime_map.yml`
- `ai/contracts.yml`
- logs layer
- comments-only markup
- automation rollout

---

## Source-of-truth rules

Runtime source of truth:

- `index.html`
- `js/`
- `css/`

Architecture source of truth:

- `docs/project/architecture/`

Roadmap source of truth:

- `docs/project/roadmap/`

AI navigation source:

- `ai/`

Important:

`ai/` is authoritative only for navigation hints, not for runtime behavior.

---

## Navigation workflow

Use `ai/` to locate the right source.
Then use primary docs/runtime files for actual decisions.

Do not treat summarized AI navigation files as replacement for bounded inspection.

Visibility uncertainty remains a stop condition.
