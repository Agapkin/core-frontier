# AI Navigation — CORE FRONTIER

## Назначение

`ai/` является minimal semantic/navigation layer для GPT/Codex workflow.

Его задача:

- дать быстрый вход в проект;
- показать актуальный статус;
- указать primary documentation entrypoints;
- сократить retrieval overhead;
- не дублировать human memory layer.

---

## Layer boundaries

### repository_manifest.yml

`repository_manifest.yml`
является:

- canonical physical filesystem tree;
- deterministic filesystem visibility layer;
- tree-only repository structure manifest.

Manifest НЕ является:

- semantic cognition layer;
- topology layer;
- Repository Map;
- Discovery;
- AI navigation.

### ai/

`ai/`
является:

- compressed navigation layer;
- semantic navigation layer;
- quick entrypoint for GPT/Codex workflow.

`ai/` НЕ является:

- runtime source of truth;
- reasoning archive;
- replacement for docs/project;
- giant metadata database.

### docs/project/

`docs/project/`
является:

- human memory layer;
- long-form reasoning layer;
- historical workflow layer;
- architectural discussion layer.

### docs/project/repository_cognition/

`repository_cognition`
является:

- repository cognition package;
- bounded repository topology/cognition layer;
- operational repository visibility package.

---

## Reading order

Recommended first-read order:

1. `README.md`
2. `repository_manifest.yml`
3. `ai/current_status.yml`
4. `ai/docs_map.yml`
5. `docs/project/repository_cognition/repository_map/repository_map_index.yml`

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

Old deferred automation rollout wording is no longer fully accurate.

Filesystem truth automation is now operational through:

- `repository_manifest.yml`
- `scripts/generate_repository_manifest.py`
- `.github/workflows/update-repository-manifest.yml`

---

## Source-of-truth rules

Runtime source of truth:

- `index.html`
- `js/`
- `css/`

Filesystem structure source of truth:

- `repository_manifest.yml`

Architecture source of truth:

- `docs/project/architecture/`

Roadmap source of truth:

- `docs/project/roadmap/`

Repository cognition source:

- `docs/project/repository_cognition/`

AI navigation source:

- `ai/`

Important:

`ai/` is authoritative only for navigation hints, not for runtime behavior.

---

## Navigation workflow

Use:

1. `repository_manifest.yml`
→ for filesystem visibility

2. `ai/`
→ for compressed semantic navigation

3. `docs/project/`
→ for long-form reasoning and historical context

4. runtime/source files
→ for actual execution truth

Do not treat summarized AI navigation files as replacement for bounded inspection.

Visibility uncertainty remains a stop condition.
