# Архитектура проекта CORE FRONTIER

## Текущее состояние

Проект CORE FRONTIER перешёл от монолитного canvas-прототипа к модульной RTS / Tower Defense архитектуре.

На текущем этапе завершены две ключевые архитектурные разрезки:

1. Stage 02.4.3 — разделение монолитного `game.js`;
2. Stage 02.4.5 — разделение монолитного `ui.js`.

Теперь проект имеет отдельные слои:

- данные;
- состояние;
- игровая логика;
- UI helpers;
- responsive layout;
- controls;
- panels;
- canvas world rendering;
- canvas entity rendering;
- notifications;
- game loop / input / camera.

Главная цель текущей архитектуры:
сделать проект устойчивым для дальнейшего роста, мобильной адаптации и добавления новых игровых систем.

---

# Структура репозитория

~~~text
core-frontier/

README.md
index.html

css/
└── style.css

js/
├── data.js
├── state.js
├── systems.js
├── game.js
└── ui/
    ├── helpers.js
    ├── layout.js
    ├── controls.js
    ├── panels.js
    ├── canvas_world.js
    ├── canvas_entities.js
    └── notifications.js

docs/
├── design/
│   └── mechanics.md
│
└── project/
    ├── architecture.md
    ├── roadmap.md
    ├── stage_01.md
    ├── stage_02.md
    ├── stage_02_1.md
    ├── stage_02_2.md
    ├── stage_02_3.md
    ├── stage_02_4.md
    ├── stage_02_4_1.md
    ├── stage_02_4_2.md
    ├── stage_02_4_3.md
    ├── stage_02_4_4.md
    └── stage_02_4_5.md
~~~

---

# Главный принцип архитектуры

## Данные живут в одном месте

`data.js` — источник истины для:

- башен;
- врагов;
- экономики;
- сложности;
- карты;
- пути врагов;
- базового баланса.

Другие файлы не должны вручную дублировать эти значения.

Примеры:

- Codex читает `towerTypes` и `enemyTypes`;
- строительство читает стоимость из `towerTypes`;
- волны читают баланс из `gameBalance`;
- сложность берётся из `difficultyProfiles`;
- UI отображает текущее состояние из `state.js`.

---

# Основные файлы

## README.md

Главное описание проекта.

Содержит:

- общую концепцию;
- идею игрового ядра;
- основные направления развития;
- технологии проекта;
- статус разработки.

---

## index.html

Главная HTML-точка входа.

Отвечает за:

- HTML-каркас страницы;
- верхний HUD ресурсов;
- canvas игрового поля;
- базовые inline-стили для мобильной совместимости;
- подключение JS-модулей в правильном порядке.

Текущий порядок подключения:

~~~html
<script src="js/data.js"></script>
<script src="js/state.js"></script>
<script src="js/systems.js"></script>

<script src="js/ui/helpers.js"></script>
<script src="js/ui/layout.js"></script>
<script src="js/ui/controls.js"></script>
<script src="js/ui/panels.js"></script>
<script src="js/ui/canvas_world.js"></script>
<script src="js/ui/canvas_entities.js"></script>
<script src="js/ui/notifications.js"></script>

<script src="js/game.js"></script>
~~~

Порядок важен:

1. `data.js` создаёт игровые данные.
2. `state.js` создаёт состояние игры.
3. `systems.js` добавляет игровую логику.
4. UI-модули создают helpers, layout, controls, panels, rendering и notifications.
5. `game.js` запускает игру.

---

## css/style.css

Основной файл визуального оформления.

Сейчас часть критичных мобильных стилей находится прямо в `index.html`, чтобы игра стабильно запускалась на iPad / Safari.

`style.css` остаётся местом для дальнейшего выноса и систематизации визуального оформления.

---

# JS-архитектура

## js/data.js

Единый источник игровых данных.

Содержит:

- `TILE_SIZE`;
- `map`;
- `difficultyProfiles`;
- `gameBalance`;
- `towerTypes`;
- `enemyTypes`;
- `enemyPath`;
- `roadTiles`;
- `tileKey`;
- `buildRoadTiles`.

Назначение:

- хранить параметры карты;
- хранить баланс;
- хранить характеристики башен;
- хранить характеристики врагов;
- хранить профили сложности;
- хранить путь врагов.

Правило:

Если нужно изменить башню — меняется `towerTypes` в `data.js`.

Если нужно изменить врага — меняется `enemyTypes` в `data.js`.

Если нужно изменить экономику — меняется `gameBalance` в `data.js`.

---

## js/state.js

Состояние текущей игровой сессии.

Содержит:

- `canvas`;
- `ctx`;
- `camera`;
- `uiLayout`;
- `uiState`;
- `resources`;
- `base`;
- `power`;
- `waveState`;
- `gameState`;
- `checkpoint`;
- `gameSpeed`;
- `towers`;
- `enemies`;
- `clone`;
- `updatePower`.

Назначение:

- хранить всё, что меняется во время игры;
- хранить состояние камеры;
- хранить состояние UI;
- хранить responsive/mobile состояние;
- хранить ресурсы;
- хранить башни и врагов;
- хранить checkpoint для Retry Wave.

Важно:

`uiLayout` объявляется в `state.js`.

UI-модули используют этот объект, но не создают его повторно.

---

## js/systems.js

Игровая логика.

Содержит:

- строительство башен;
- отмену строительства;
- подтверждение строительства;
- выбор башни;
- продажу башни;
- проверку доступности клетки;
- запуск волн;
- генерацию волн;
- spawn врагов;
- награды за убийство;
- движение врагов;
- атаку башен;
- Retry Wave;
- Full Restart;
- Game Over.

Назначение:

- менять состояние игры;
- обрабатывать правила gameplay;
- связывать данные из `data.js` с состоянием из `state.js`.

---

## js/game.js

Главная точка запуска.

Содержит:

- `resizeCanvas`;
- `initGame`;
- подключение input handlers;
- pointer input;
- touch / pinch zoom;
- wheel zoom;
- camera helpers;
- tile helpers;
- главный `gameLoop`.

Назначение:

- запускать игру;
- связывать canvas, input, update и draw;
- вызывать игровые системы;
- поддерживать главный цикл.

---

# UI-архитектура

После Stage 02.4.5 старый файл `js/ui.js` удалён.

UI-слой перенесён в папку:

~~~text
js/ui/
~~~

---

## js/ui/helpers.js

Общие UI helper-функции.

Содержит:

- `removeElement`;
- `applyFixedStyle`;
- `createUIButton`;
- `createPanelTitle`;
- `createSmallText`;
- `setText`.

Назначение:

- не дублировать мелкие UI-функции;
- создавать кнопки и текстовые элементы;
- применять inline-positioning к DOM-панелям;
- обновлять текстовые значения HUD.

---

## js/ui/layout.js

Responsive layout system.

Содержит:

- `updateUILayout`;
- `setupInitialDom`;
- `ensureTopbarChip`;
- `updateTopbarVisibility`;
- `getBottomPanelStyle`;
- `getUtilityPanelStyle`;
- `getBuildPanelStyle`;
- `getSidePanelStyle`.

Назначение:

- определять compact / landscape режимы;
- управлять topbar;
- задавать стили позиционирования панелей;
- учитывать mobile/tablet поведение;
- подготавливать основу для mobile-first UI.

Важно:

`layout.js` не создаёт `uiLayout`.

Он использует `uiLayout` из `state.js`.

---

## js/ui/controls.js

Игровые controls.

Содержит:

- `createDynamicUI`;
- `createBottomControlPanel`;
- `createUtilityControls`;
- `createSpeedControls`;
- `createZoomControls`;
- `createTowerActionPanel`;
- `createBuildConfirmPanel`.

Назначение:

- создавать основные игровые кнопки;
- создавать панель скорости;
- создавать панель zoom;
- создавать панель строительства;
- создавать действия для выбранной башни;
- пересоздавать UI при изменении состояния.

---

## js/ui/panels.js

Информационные панели и HUD logic.

Содержит:

- `createMenuPanel`;
- `createGameOverPanel`;
- `updateDomVisibility`;
- `updateUI`;
- `drawWaveStatus`;
- `drawSelectedTowerPanel`;
- `drawInfoPanel`;
- `drawGameOver`.

Назначение:

- управлять меню;
- управлять Game Over overlay;
- обновлять HUD;
- показывать статус волны;
- показывать информацию о выбранной башне;
- показывать Codex / справку.

---

## js/ui/canvas_world.js

Canvas-отрисовка мира.

Содержит:

- `drawRectWorld`;
- `drawTextWorld`;
- `drawMap`;
- `drawRoadTiles`;
- `drawPathLine`;
- `drawBase`;
- `drawTowerRange`;
- `drawBuildTile`;
- `drawBuildOverlay`.

Назначение:

- рисовать карту;
- рисовать сетку;
- рисовать дорогу;
- рисовать базу;
- рисовать радиусы;
- рисовать preview строительства;
- рисовать build overlay.

---

## js/ui/canvas_entities.js

Canvas-отрисовка игровых сущностей.

Содержит:

- `drawTowers`;
- `drawEnemies`.

Назначение:

- рисовать башни;
- рисовать врагов;
- рисовать HP bars;
- рисовать линии атаки башен.

В будущем сюда могут быть добавлены:

- projectiles;
- effects;
- death animations;
- damage numbers.

---

## js/ui/notifications.js

Система уведомлений.

Содержит:

- `notify`;
- `updateNotifications`;
- `drawNotifications`.

Назначение:

- создавать уведомления;
- обновлять срок жизни уведомлений;
- отрисовывать notification layer.

---

# UI Layer Separation

После Stage 02.4.5 UI больше не считается одним файлом.

Он разделён на слои:

## Helper Layer

Файл:

- `helpers.js`

Отвечает за общие вспомогательные функции.

---

## Layout Layer

Файл:

- `layout.js`

Отвечает за responsive/mobile layout.

---

## Interaction Layer

Файл:

- `controls.js`

Отвечает за игровые кнопки и action controls.

---

## Panel Layer

Файл:

- `panels.js`

Отвечает за меню, Codex, Game Over, HUD и информационные панели.

---

## World Rendering Layer

Файл:

- `canvas_world.js`

Отвечает за отрисовку мира.

---

## Entity Rendering Layer

Файл:

- `canvas_entities.js`

Отвечает за отрисовку игровых сущностей.

---

## Notification Layer

Файл:

- `notifications.js`

Отвечает за уведомления.

---

# Текущий игровой функционал

На текущем этапе реализовано:

- canvas-карта;
- сетка;
- дорога;
- база;
- drag камеры;
- zoom кнопками;
- pinch zoom;
- башни;
- выбор башни;
- радиус башни;
- строительство через выбор клетки и подтверждение;
- отмена строительства;
- запрет строительства на дороге;
- запрет строительства на базе;
- запрет строительства на занятой клетке;
- продажа башни;
- энергия;
- ресурсы;
- волны;
- враги разных типов;
- HP bar врагов;
- атака башен;
- награда за убийство врагов;
- урон базе;
- Game Over;
- Retry Wave;
- Full Restart;
- выбор сложности;
- скорость x1 / x2 / x3;
- Codex / справка;
- notification layer;
- responsive topbar;
- compact mode;
- landscape mode.

---

# Известный технический долг

После Stage 02.4.5 выявлены проблемы, которые должны быть исправлены в ближайшем Fix Pack.

## Build Confirm Bug

Симптом:

- клетка визуально выбрана;
- build overlay отображается;
- при нажатии “Построить” появляется сообщение “Сначала выбери клетку”;
- башня не строится.

Предполагаемые причины:

- `pendingBuildTile` сбрасывается;
- canvas tap и DOM button click конфликтуют;
- build panel перекрывает состояние выбора;
- coordinate mapping даёт нестабильный результат.

---

## Coordinate Mapping Instability

Симптом:

- выбранная клетка ощущается смещённой относительно пальца;
- особенно заметно на mobile / tablet.

Предполагаемые причины:

- пересчёт screen → world → tile;
- zoom;
- mobile browser offsets;
- Safari viewport / safe-area.

---

## Mobile Zoom Instability

Симптом:

- zoom работает;
- но на телефоне можно увести масштаб в неудобное состояние;
- нижний zoom label показывает `100%`, даже когда фактический zoom изменился.

---

## Oversized Codex Panel

Симптом:

- на телефоне Codex закрывает почти весь экран;
- панель мешает gameplay.

---

## Landscape Layout Overlap

Симптом:

- в горизонтальном режиме кнопки и панели перекрывают игровую карту;
- bottom controls, wave panel и utility controls занимают слишком много места.

---

## Control Placement Problem

Симптом:

- на телефоне основные action buttons расположены неудобно;
- требуется перераспределить:
  - `Башня`;
  - `Волна`;
  - `Codex`;
  - `Меню`;
  - speed controls;
  - zoom controls.

Предварительное направление:

- `Башня` и `Волна` ближе к правому пальцу;
- `Codex` и `Меню` отдельно, компактнее;
- landscape layout должен иметь отдельную схему.

---

# Методика разработки после Stage 02.4.5

Проект перешёл к multi-file workflow.

Теперь запрещено:

- частично патчить файл кусками;
- просить пользователя “найти строку”;
- вставлять фрагменты в середину файла без полной замены.

Новый workflow:

1. GPT читает актуальный ZIP репозитория.
2. GPT определяет затрагиваемые файлы.
3. GPT перечисляет список файлов.
4. GPT определяет порядок выдачи.
5. GPT выдаёт каждый файл целиком.
6. Пользователь полностью очищает старое содержимое файла.
7. Пользователь вставляет новый код.
8. Пользователь делает commit.
9. После всех изменений пользователь загружает свежий ZIP.
10. GPT проверяет целостность.

---

# Dependency-aware Modular Architecture

После ошибок первой попытки UI split принято правило:

Перед разделением любого крупного файла нужно:

1. Выполнить dependency mapping;
2. Найти hidden dependencies;
3. Найти shared state;
4. Найти helper chains;
5. Определить безопасные границы split;
6. Только после этого выполнять modular split.

Это правило обязательно для будущих крупных файлов.

---

# Stage-документация

## stage_01.md

Первый рабочий прототип.

Реализовано:

- GitHub Pages;
- canvas;
- ресурсы;
- башни;
- враги;
- волны;
- HP базы.

Главный вывод:

нужна карта, камера и маршрут врагов.

---

## stage_02.md

Карта, камера и строительство по клеткам.

Реализовано:

- большая карта;
- сетка;
- движение камеры;
- маршрут врагов;
- база в конце пути;
- ограничение запуска новой волны.

Главный вывод:

нужен нормальный UX строительства.

---

## stage_02_1.md

UX строительства и управление клетками.

Реализовано:

- разделение tap / drag;
- preview башни;
- подсветка клеток;
- попытка запрета строительства на дороге;
- feedback для игрока.

Главный вывод:

нужно исправить проверку дороги и подготовить типы врагов / башен.

---

## stage_02_2.md

Stabilization и подготовка к расширению.

Реализовано:

- корректный запрет строительства на дороге;
- типы врагов;
- типы башен как структура;
- wave manager;
- базовая подготовка к data-driven логике.

Главный вывод:

нужны баланс, скорость игры и отображение статуса волны.

---

## stage_02_3.md

Баланс, скорость игры и статус волны.

Реализовано:

- скорость x1 / x2 / x3;
- номер волны;
- статус волны;
- количество оставшихся врагов;
- более плотный spawn;
- первые попытки баланса экономики.

Главный вывод:

нужны Game Over, Restart, радиус башни, продажа и более понятный UI.

---

## stage_02_4.md

Core Gameplay Stabilization.

Реализовано:

- Game Over;
- Full Restart;
- выбор башни;
- отображение радиуса;
- продажа башни;
- базовая Info-панель;
- улучшенный баланс.

Главный вывод:

Full Restart опасен, UI конфликтует, нужен Retry Wave, энергия и дальнейшая UX-стабилизация.

---

## stage_02_4_1.md

Fix Core Gameplay Stabilization.

Реализовано:

- переработка HUD;
- нижняя панель управления;
- Retry Wave;
- checkpoint перед волной;
- безопасный Full Restart через меню;
- выбор сложности;
- ограничение строительства через энергию;
- расширенный Codex;
- меню башни с продажей и заготовкой под улучшения.

Главный вывод:

нужны полноценный Build Mode, notification layer, zoom, улучшенная камера и переработка интерфейса.

---

## stage_02_4_2.md

UX / UI Overhaul & Gameplay Readability.

Реализовано:

- build mode с выбором клетки;
- подтверждение строительства;
- notification layer;
- zoom camera;
- cleaner HUD;
- Energy UX;
- locked upgrades;
- улучшенная читаемость интерфейса.

Главный вывод:

игра стала удобнее, но монолитный `game.js` стал техническим ограничением.

---

## stage_02_4_3.md

Modularization / Разделение `game.js` на модули.

Реализовано:

- создан `data.js`;
- создан `state.js`;
- создан `systems.js`;
- создан `ui.js`;
- `game.js` сокращён до точки запуска;
- `index.html` обновлён под подключение модулей.

Главный вывод:

проект перешёл к первой модульной архитектуре без добавления новых игровых механик.

---

## stage_02_4_4.md

Mobile UX preparation / Responsive UI pressure test.

Реализовано:

- первичная mobile/tablet адаптация;
- compact HUD;
- проверка portrait / landscape;
- выявление перегрузки `ui.js`;
- фиксация необходимости UI split;
- выявление mobile UX bottlenecks.

Главный вывод:

следующим узким местом стал UI-слой.

---

## stage_02_4_5.md

UI Architecture & Mobile Input Stabilization.

Реализовано:

- удалён старый `js/ui.js`;
- создана папка `js/ui/`;
- UI разделён на:
  - `helpers.js`;
  - `layout.js`;
  - `controls.js`;
  - `panels.js`;
  - `canvas_world.js`;
  - `canvas_entities.js`;
  - `notifications.js`;
- обновлён `index.html`;
- зафиксирован dependency-aware workflow;
- проведён тест на iPad и iPhone.

Главный вывод:

UI split выполнен успешно как архитектурный этап, но mobile input и mobile layout требуют отдельного Fix Pack.

---

# Текущая цепочка ближайших этапов

## Stage 02.4.5-A — Mobile Fix Pack

Цель:

- исправить Build Confirm bug;
- стабилизировать выбор клетки;
- стабилизировать coordinate mapping;
- исправить нижний zoom label;
- ограничить неудобные zoom-состояния;
- уменьшить Codex на телефоне;
- переразместить controls;
- улучшить landscape layout.

---

## Stage 02.5 и дальше

После стабилизации UI можно переходить к развитию gameplay:

- генераторы энергии;
- гражданская инфраструктура;
- обломки;
- переработка;
- харвестеры;
- ресурсы на карте;
- технологии;
- новые типы башен;
- новые типы врагов;
- развитие базы;
- расширение карты;
- fog of war.

---

# Принципы архитектуры

## 1. Минимальный корень проекта

В корне находятся только:

- README.md;
- index.html;
- основные папки проекта.

---

## 2. Разделение по смыслу

Текущая структура:

- `css/` — визуальное оформление;
- `js/` — игровой код;
- `docs/` — документация.

---

## 3. Документирование этапов

Каждый значимый этап фиксируется отдельным stage-файлом.

Формат:

- цель этапа;
- что планировалось;
- что реализовано;
- что протестировано;
- какие проблемы выявлены;
- какой задел уходит в следующий этап.

---

## 4. История через GitHub

Старые версии не сохраняются отдельными файлами.

История хранится через:

- commits;
- GitHub history;
- stage-документацию.

---

## 5. Модульность без возврата к монолиту

После Stage 02.4.5 запрещён возврат к `js/ui.js`.

UI должен развиваться через:

- helpers;
- layout;
- controls;
- panels;
- canvas world rendering;
- canvas entity rendering;
- notifications.

---

## 6. Mobile-first развитие

Дальнейшая UI-архитектура должна учитывать:

- iPhone Safari;
- iPad Safari;
- portrait mode;
- landscape mode;
- safe-area;
- browser bars;
- thumb zones;
- компактность интерфейса;
- отсутствие перекрытия gameplay area.

---

# Общий вывод

CORE FRONTIER перешёл от монолитного canvas-прототипа к многоуровневой модульной архитектуре.

Теперь проект имеет:

- отдельный слой данных;
- отдельный слой состояния;
- отдельный слой игровой логики;
- отдельный слой UI helpers;
- отдельный layout layer;
- отдельный controls layer;
- отдельный panels layer;
- отдельный canvas world rendering layer;
- отдельный canvas entities rendering layer;
- отдельный notifications layer;
- отдельную точку запуска.

Это снижает риск ошибок, упрощает дальнейшее развитие и позволяет продолжать проект как более серьёзную игровую систему.

Следующая задача — не расширение gameplay, а стабилизация mobile input и mobile layout через Stage 02.4.5-A.