Runtime Structure — CORE FRONTIER

Назначение документа

Этот файл описывает runtime-устройство проекта CORE FRONTIER.

Он отвечает на вопрос:

как устроен код проекта.

Roadmap-задачи и порядок дальнейших действий здесь не описываются.

⸻

Runtime entrypoint

Главная точка входа:

index.html

index.html:

* создаёт HTML shell;
* подключает CSS;
* содержит часть inline styles;
* подключает runtime scripts;
* задаёт порядок загрузки JavaScript.

⸻

Critical script order

Текущий порядок загрузки:

js/data.js
js/state.js
js/systems.js
js/ui/helpers.js
js/ui/layout.js
js/ui/controls.js
js/ui/panels.js
js/ui/canvas_world.js
js/ui/canvas_entities.js
js/ui/notifications.js
js/game.js

Критическая цепочка:

data.js
→ state.js
→ systems.js
→ ui/*
→ game.js

Проект использует глобальные переменные и функции.

Следовательно:

* data.js должен загружаться до state.js;
* state.js должен загружаться до systems.js;
* systems.js должен загружаться до UI files;
* UI files должны загружаться до game.js;
* game.js должен загружаться последним.

⸻

Runtime layers

Data layer

Файл:

js/data.js

Роль:

* хранит игровые данные;
* хранит map;
* хранит gameBalance;
* хранит towerTypes;
* хранит enemyTypes;
* хранит enemyPath / roadTiles.

data.js не должен владеть runtime state.

⸻

Global state layer

Файл:

js/state.js

Роль:

* создаёт canvas/context;
* создаёт camera;
* создаёт uiLayout;
* создаёт uiState;
* создаёт resources;
* создаёт base;
* создаёт power;
* создаёт waveState;
* создаёт gameState;
* создаёт towers/enemies.

state.js является central shared state layer.

⸻

Gameplay systems layer

Файл:

js/systems.js

Роль:

* build logic;
* tower placement;
* validation;
* waves;
* enemy lifecycle;
* tower attacks;
* rewards;
* power updates;
* checkpoint;
* retry/restart;
* game over.

systems.js является central gameplay mutation hub.

⸻

UI/HUD layer

Файлы:

js/ui/helpers.js
js/ui/layout.js
js/ui/controls.js
js/ui/panels.js
js/ui/notifications.js

Роль:

* DOM helpers;
* responsive layout;
* controls;
* HUD;
* panels;
* notifications;
* UI visibility.

⸻

Render layer

Файлы:

js/ui/canvas_world.js
js/ui/canvas_entities.js
js/ui/panels.js
js/ui/notifications.js

Роль:

* world rendering;
* map rendering;
* road/path/base rendering;
* towers/enemies rendering;
* overlays;
* panels;
* notifications.

⸻

Runtime orchestration layer

Файл:

js/game.js

Роль:

* input;
* camera;
* zoom;
* coordinate transforms;
* canvas resize;
* game loop;
* update/draw orchestration;
* requestAnimationFrame loop.

game.js связывает runtime systems, render и UI.

⸻

Shared runtime structures

Stage 03.1 подтвердил, что следующие структуры являются shared runtime contracts:

* uiState;
* uiLayout;
* resources;
* power;
* waveState;
* towers;
* enemies;
* camera;
* gameState.

Эти структуры читаются и/или мутируются несколькими файлами.

Изменение их shape или meaning требует compatibility review.

⸻

systems.js как mutation hub

systems.js является самым опасным mutation hub.

Он одновременно связан с:

* build flow;
* waves;
* enemies;
* towers;
* rewards;
* restart/retry;
* game over;
* resources;
* power;
* uiState;
* gameState;
* notifications;
* UI updates.

systems.js нельзя refactor giant-pass методом.

⸻

Build flow

Build flow является наиболее sensitive interaction zone.

Участвующие файлы:

controls.js
→ game.js
→ systems.js
→ canvas_world.js
→ panels.js

Build flow зависит от:

* input;
* camera;
* screen/world/tile coordinate mapping;
* uiState.selectedMode;
* uiState.pendingBuildTile;
* uiState.hoveredTile;
* resources;
* power;
* towers;
* validation;
* DOM confirm UI;
* canvas overlay.

Build flow должен изменяться только bounded patch методом.

⸻

Render/update loop

game.js владеет update/draw orchestration.

Текущий порядок:

update systems
→ draw world
→ draw entities
→ draw overlays/HUD
→ DOM visibility updates
→ requestAnimationFrame loop

Render order является implicit runtime contract.

Изменение draw/update sequence требует render review.

⸻

panels.js как hidden complexity layer

panels.js является hidden complexity layer.

Он одновременно:

* обновляет HUD;
* управляет DOM visibility;
* рисует canvas overlays;
* отображает selected tower panel;
* отображает info panels;
* отображает game over overlay;
* связан с Codex/panel layer.

panels.js нельзя одновременно менять как HUD, Codex, canvas overlay и DOM visibility layer.

⸻

Dangerous combined-change zones

Опасные combined-change zones:

* state.js + layout.js;
* systems.js + controls.js;
* systems.js + panels.js;
* systems.js + game.js;
* game.js + canvas_world.js;
* layout.js + controls.js + panels.js;
* state.js + systems.js + game.js.

Наиболее опасная зона:

state.js
+ systems.js
+ layout.js
+ controls.js
+ panels.js

Причина:

одновременно затрагиваются state shape, gameplay mutations, UI creation, HUD refresh, responsive layout и overlays.

⸻

Preliminary runtime contract candidates

Кандидаты runtime contracts:

* script order contract;
* uiState contract;
* uiLayout contract;
* resources/power contract;
* waveState lifecycle contract;
* towers/enemies entity shape contract;
* camera coordinate transform contract;
* build flow contract;
* restart/retry lifecycle contract;
* render/update loop contract;
* UI/HUD contract;
* input/camera contract.

Важно:

это preliminary candidates, а не formal contracts.

⸻

Safe runtime rules

Подтверждённые правила:

* script order не менять без migration plan;
* uiLayout менять isolated pass;
* build flow менять bounded patch;
* systems.js не refactor giant-pass методом;
* render order не менять без render review;
* game.js + systems.js не менять вместе без explicit boundary review;
* global runtime renames требуют compatibility/alias layer;
* future modularization должна идти staged extraction методом.
