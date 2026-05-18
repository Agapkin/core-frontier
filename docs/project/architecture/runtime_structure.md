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
* содержит active inline CSS;
* НЕ подключает css/style.css через link tag;
* подключает runtime scripts;
* задаёт порядок загрузки JavaScript.

Дополнительный surface-файл:

css/style.css

css/style.css:

* существует в репозитории;
* размечен как Stage 03.3B CSS surface file;
* сейчас НЕ является active stylesheet для index.html;
* не означает внедрение CSS framework или design system.

⸻

Critical script order

Текущий порядок загрузки:

js/data.js
js/state.js
js/systems/systems_wave_manager.js
js/systems/systems_placement.js
js/systems/systems_selected_object_actions.js
js/systems/systems.js
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
→ systems helpers
→ systems.js
→ ui/*
→ game.js

Проект использует browser-global переменные и функции.

Следовательно:

* data.js должен загружаться до state.js;
* state.js должен загружаться до systems/*;
* extracted systems helpers должны загружаться до js/systems/systems.js;
* js/systems/systems.js должен загружаться до UI files;
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

Файлы:

js/systems/systems_wave_manager.js
js/systems/systems_placement.js
js/systems/systems_selected_object_actions.js
js/systems/systems.js

Роль:

* wave generation / spawn helpers;
* placement lifecycle;
* selected object actions;
* button/runtime commands;
* checkpoint/retry/restart/game over;
* enemy update;
* reward flow;
* tower combat.

js/systems/systems.js больше не является единым gameplay monolith.

Текущая роль systems.js:

mixed orchestration + lifecycle-heavy runtime systems file.

Он остаётся важным mutation/runtime lifecycle file, но часть responsibilities уже вынесена bounded extraction passes.

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

systems.js after Stage 03.3 extractions

До Stage 03.3 systems.js был главным mutation hub.

После bounded extractions часть responsibilities вынесена:

* js/systems/systems_wave_manager.js — createWave(), shuffleWave(), spawnEnemy();
* js/systems/systems_placement.js — placement/build tile helpers and tower placement lifecycle;
* js/systems/systems_selected_object_actions.js — selectTower(), sellSelectedTower();
* js/systems/systems.js — remaining orchestration/lifecycle/update/combat flows.

systems.js всё ещё нельзя refactor giant-pass методом.

Особенно sensitive остаются:

* startWave();
* checkpoint/retry/restart/game over;
* updateEnemies();
* applyReward();
* updateTowers();
* shared mutations resources/power/waveState/towers/enemies/uiState/gameState.

⸻

Build / placement flow

Build / placement flow является sensitive interaction zone.

Участвующие файлы:

controls.js
→ game.js
→ js/systems/systems_placement.js
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

Repository surface state

Stage 03.3B подтвердил surface reality:

* index.html является marked shell runtime entrypoint;
* active CSS сейчас находится inline внутри index.html;
* css/style.css существует и размечен;
* css/style.css сейчас НЕ подключён index.html;
* CSS framework / design system architecture не реализованы;
* module loader / framework architecture не реализованы.

CSS extraction/linking должен быть отдельным bounded pass, если будет нужен.

⸻

Dangerous combined-change zones

Опасные combined-change zones:

* state.js + layout.js;
* systems/* + controls.js;
* systems/* + panels.js;
* systems/* + game.js;
* game.js + canvas_world.js;
* layout.js + controls.js + panels.js;
* state.js + systems/* + game.js.

Наиболее опасная зона:

state.js
+ systems/*
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
* build/placement flow contract;
* restart/retry lifecycle contract;
* render/update loop contract;
* UI/HUD contract;
* input/camera contract;
* repository surface CSS relationship contract.

Важно:

это preliminary candidates, а не formal contracts.

Stage 03.4 не начат.

⸻

Safe runtime rules

Подтверждённые правила:

* script order не менять без migration plan;
* uiLayout менять isolated pass;
* build/placement flow менять bounded patch;
* systems/* не refactor giant-pass методом;
* render order не менять без render review;
* game.js + systems/* не менять вместе без explicit boundary review;
* global runtime renames требуют compatibility/alias layer;
* future modularization должна идти staged extraction методом;
* CSS linking/extraction не смешивать с runtime/script-order changes.
