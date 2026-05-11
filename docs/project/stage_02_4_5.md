# Stage 02.4.5 — UI Architecture & Mobile Input Stabilization

## Цель этапа

Stage 02.4.4 успешно показал, что:
- gameplay ядро стабильно;
- modular structure работает;
- игра запускается на телефонах и планшетах;
- zoom и camera работают;
- Retry Wave работает;
- Game Over работает;
- responsive layout начал формироваться.

Но именно на мобильных устройствах проявились новые ограничения архитектуры.

Главный вывод:

следующим узким местом становится UI-слой.

---

# Главная проблема этапа

После успешного разделения `game.js` файл `ui.js` начал быстро превращаться в новый монолит.

Сейчас в `ui.js` одновременно находятся:

- DOM-кнопки;
- HUD;
- панели;
- Game Over panel;
- build confirm panel;
- Codex;
- Menu;
- notification layer;
- responsive layout;
- mobile layout;
- canvas drawing;
- overlays;
- карта;
- башни;
- враги;
- wave panel;
- tower panel;
- zoom UI.

Это создаёт те же проблемы, которые ранее были у монолитного `game.js`:
- GPT начинает хуже удерживать файл;
- растёт риск случайных поломок;
- становится сложнее искать нужную логику;
- mobile UX начинает конфликтовать с canvas rendering;
- input bugs сложнее локализовать.

---

# Главная задача Stage 02.4.5

Разделить UI-слой на отдельные модули и стабилизировать mobile input architecture.

---

# Планируемая структура UI

Создать папку:

~~~text
js/ui/
~~~

---

## Планируемые файлы

### js/ui/dom.js

HTML/UI слой.

Содержит:
- кнопки;
- панели;
- HUD;
- меню;
- Game Over panel;
- build confirm panel;
- tower action panel;
- responsive DOM layout;
- mobile controls.

---

### js/ui/canvas.js

Canvas rendering слой.

Содержит:
- drawMap;
- drawRoadTiles;
- drawPathLine;
- drawBase;
- drawTowers;
- drawEnemies;
- drawTowerRange;
- drawWaveStatus;
- drawSelectedTowerPanel;
- overlays;
- игровую canvas-отрисовку.

---

### js/ui/notifications.js

Notification system.

Содержит:
- notify();
- updateNotifications();
- drawNotifications().

---

# Изменения index.html

После разделения UI потребуется обновить:

~~~html
<script src="js/ui/notifications.js"></script>
<script src="js/ui/dom.js"></script>
<script src="js/ui/canvas.js"></script>
~~~

Порядок подключения критически важен.

---

# Mobile Input Stabilization

Stage 02.4.5 должен стабилизировать mobile interaction layer.

---

## 1. Build Confirm Bug

Текущее состояние:
- кнопка “Отмена” работает;
- кнопка “Построить” на mobile работает нестабильно.

Нужно проверить:
- z-index;
- pointer events;
- overlay conflicts;
- pendingBuildTile lifecycle;
- touch propagation;
- mobile Safari behavior.

---

## 2. Codex Bug

Codex может не открываться на мобильных устройствах.

Нужно проверить:
- invisible overlays;
- pointer-events;
- DOM overlap;
- hidden panels;
- responsive positioning.

---

## 3. Sticky Build Mode

Текущий build flow неудобен.

Сейчас:
- игрок строит одну башню;
- режим строительства завершается;
- нужно заново нажимать кнопку башни.

Нужно реализовать:

persistent build mode.

---

# Новый flow

~~~text
Нажал башню
↓
режим строительства остаётся активным
↓
игрок ставит несколько башен подряд
↓
отдельная кнопка выхода из build mode
~~~

---

# Landscape Layout Stabilization

На телефоне landscape режим сейчас:
- перекрывает карту;
- создаёт визуальный шум;
- уменьшает gameplay space.

---

## Нужно реализовать

### Portrait layout
Приоритет:
- вертикальное пространство;
- компактность;
- thumb controls.

### Landscape layout
Приоритет:
- RTS-like layout;
- освобождение центра карты;
- перенос controls в края экрана.

---

# HUD Stabilization

Продолжить уменьшение визуального шума.

---

## Нужно проверить

- HUD не дублирует данные;
- zoom показывается в одном месте;
- wave info компактна;
- кнопки не перекрывают gameplay;
- уведомления не мешают карте.

---

# Safe Area System

Добавить полноценную safe-area поддержку:

- top inset;
- bottom inset;
- left inset;
- right inset.

---

## Учитывать

- Safari;
- iPhone;
- Android gesture zones;
- landscape browser UI;
- mobile browser bars.

---

# Что НЕ делаем в Stage 02.4.5

Не добавляем:
- новые башни;
- новые враги;
- генераторы;
- salvage;
- обломки;
- технологии;
- fog of war;
- расширение карты;
- экономику;
- инфраструктуру.

Stage 02.4.5 — это UI / UX / architecture stabilization stage.

---

# Новая методика работы с файлами

После UI modularization проект окончательно переходит к multi-file workflow.

---

## Новый процесс

Перед любым изменением GPT должен:

1. прочитать ZIP репозитория;
2. определить список изменяемых файлов;
3. перечислить файлы;
4. определить порядок выдачи;
5. выдавать файлы отдельно;
6. выдавать полный код каждого файла;
7. давать commit title;
8. давать commit description.

---

# Пример workflow

1. Файл 1 из 4 — `js/ui/dom.js`
2. Файл 2 из 4 — `js/ui/canvas.js`
3. Файл 3 из 4 — `js/ui/notifications.js`
4. Файл 4 из 4 — `index.html`

После каждого файла:
- пользователь полностью заменяет содержимое;
- выполняет commit;
- переходит к следующему файлу.

---

# Почему это важно

Проект больше не может безопасно развиваться через один огромный JS-файл.

Модульность теперь является частью архитектуры проекта.

---

# Ожидаемый результат Stage 02.4.5

После завершения этапа проект должен получить:

- modular UI architecture;
- стабильный mobile input;
- стабильный Build Confirm;
- стабильный Codex;
- responsive portrait layout;
- responsive landscape layout;
- persistent build mode;
- cleaner mobile RTS interface;
- меньший visual noise;
- более удобный gameplay flow;
- более безопасную архитектуру для дальнейшего роста.

---

# Пост-этапные действия после Stage 02.4.5

После завершения Stage 02.4.5 необходимо выполнить отдельный цикл актуализации документации проекта.

Причина:
на этапе Stage 02.4.5 архитектура проекта снова изменится.

Появятся:
- новые JS-файлы;
- новая папка `js/ui/`;
- новая структура UI-слоя;
- новые связи между модулями;
- новый workflow работы с файлами.

---

# Обязательные действия после завершения Stage 02.4.5

## 1. Актуализация architecture.md

После завершения Stage 02.4.5 необходимо:
- заново прочитать репозиторий;
- проверить фактическую структуру файлов;
- обновить `architecture.md`;
- зафиксировать новую UI-архитектуру;
- описать связи между:
  - dom.js
  - canvas.js
  - notifications.js
  - systems.js
  - state.js
  - data.js
  - game.js

Также необходимо:
- зафиксировать новый порядок загрузки файлов;
- описать роль папки `js/ui/`;
- обновить описание modular workflow.

---

## 2. Актуализация roadmap.md

После завершения Stage 02.4.5 необходимо:
- обновить дорожную карту;
- отметить завершённые задачи;
- отметить новые архитектурные этапы;
- обновить последовательность будущих этапов.

Особенно важно:
- зафиксировать переход от monolithic architecture к modular architecture;
- отразить переход к mobile-first UX;
- показать, что проект готовится к infrastructure systems и economy systems.

---

## 3. Проверка stage-файлов

После завершения Stage 02.4.5 необходимо провести ревизию stage-документов.

Проверить:
- какие stage-файлы уже отражены в architecture.md;
- какие stage-файлы ещё не зафиксированы;
- какие отчёты не были перенесены в документацию;
- какие архитектурные решения ещё не отражены.

---

# Цель ревизии документации

Не допустить расхождения между:
- фактическим кодом;
- архитектурой;
- дорожной картой;
- stage-документацией.

Документация должна отражать реальное состояние проекта после каждого крупного архитектурного этапа.

---

# Новый принцип проекта

После Stage 02.4.5:
- документация становится частью архитектуры;
- stage-файлы становятся историей эволюции системы;
- architecture.md становится актуальным снимком текущей структуры;
- roadmap.md становится отражением реального направления развития проекта.

Все изменения должны фиксироваться последовательно и синхронно.

---

# Переход после Stage 02.4.5

После успешной стабилизации UI и mobile input проект сможет перейти к:

- generators;
- salvage system;
- infrastructure;
- recovery economy;
- repair systems;
- harvesters;
- expansion systems;
- new tower types;
- new enemy types.

---

# Дополнение к Stage 02.4.5 — Ошибки первой попытки UI Split и новые архитектурные правила

Во время выполнения Stage 02.4.5 были проведены первые попытки разделения `ui.js` на отдельные модули.

В процессе стало понятно, что текущий `ui.js` уже перестал быть обычным UI-файлом и фактически превратился в отдельную UI-подсистему проекта.

Из-за этого механическая разрезка файла оказалась недостаточной и привела к потере скрытых зависимостей.

---

# Что произошло

Во время первой попытки split:

- часть функций была перенесена;
- часть helper-функций осталась внутри старого `ui.js`;
- часть responsive layout логики потерялась;
- часть panel factory функций не была перенесена;
- часть canvas rendering зависимостей оказалась скрытой;
- часть UI state зависимостей не была учтена.

В результате:

- новый split оказался неполным;
- удаление старого `ui.js` приводило к поломке интерфейса;
- gameplay loop терял UI-функции;
- часть панелей переставала работать;
- mobile layout ломался.

---

# Главная причина ошибки

Главная проблема заключалась не в разрезке файла как таковой, а в отсутствии dependency mapping.

Ранее предполагалось, что UI можно разделить по визуальным блокам.

Но фактически:

- функции внутри `ui.js` имеют скрытые cross-dependencies;
- многие функции используют shared state;
- многие helper-функции используются в нескольких подсистемах одновременно;
- responsive layout распределён между разными участками кода;
- canvas rendering частично зависит от DOM layout;
- panel logic зависит от gameplay state;
- UI использует shared `uiLayout` state.

---

# Вывод после неудачной попытки split

Stage 02.4.5 показал, что проект достиг уровня, где:

- большие файлы становятся подсистемами;
- подсистемы имеют скрытые зависимости;
- GPT не может безопасно выполнять split без предварительного dependency analysis.

Это нормальный этап роста архитектуры проекта.

---

# Новое обязательное правило проекта

Теперь перед разделением любого крупного файла необходимо:

1. Выполнить dependency mapping;
2. Построить dependency graph;
3. Определить hidden dependencies;
4. Определить shared state;
5. Определить helper chains;
6. Определить безопасные границы split;
7. Только после этого выполнять modular split.

---

# Новая предварительная структура UI

После дополнительного анализа стало понятно, что деление UI всего на 3 файла создаёт риск появления новых монолитов.

Поэтому предварительно принята следующая UI-структура:

~~~text
js/ui/
├── helpers.js
├── layout.js
├── controls.js
├── panels.js
├── canvas_world.js
├── canvas_entities.js
└── notifications.js
~~~

---

# Назначение будущих UI-модулей

## helpers.js

Общие helper-функции:

- createUIButton
- applyFixedStyle
- createPanelTitle
- createSmallText
- removeElement
- setText

## layout.js

Responsive layout:

- uiLayout
- compact mode
- landscape mode
- safe-area
- topbar
- adaptive positioning

## controls.js

Игровые controls:

- speed controls
- zoom controls
- build controls
- bottom controls
- tower controls

## panels.js

Информационные панели:

- menu panel
- Codex
- Game Over
- wave status
- selected tower panel
- updateUI
- updateDomVisibility

## canvas_world.js

Отрисовка мира:

- карта
- сетка
- дорога
- база
- радиусы
- build overlay

## canvas_entities.js

Игровые сущности:

- башни
- враги
- HP bars
- attack lines
- future effects / projectiles

## notifications.js

Система уведомлений:

- notify
- notification lifecycle
- drawNotifications

---

# Новый принцип UI split

Теперь split выполняется не механически, а dependency-aware способом.

Главная цель:
не просто уменьшить размер `ui.js`,
а построить устойчивую UI-архитектуру, которую GPT сможет безопасно поддерживать и масштабировать дальше.

---

# Новый workflow Stage 02.4.5

Теперь выполнение Stage 02.4.5 делится на этапы:

## Этап A — Dependency Mapping

- анализ полного `ui.js`;
- построение dependency graph;
- поиск hidden dependencies;
- поиск shared state;
- определение helper chains;
- определение безопасных границ split.

## Этап B — Safe Modular Split

- создание новых UI-модулей;
- перенос функций;
- проверка runtime связей;
- проверка mobile layout;
- проверка gameplay loop;
- обновление `index.html`;
- удаление старого `ui.js` только после полной проверки.

---

# Новый инженерный принцип проекта

После Stage 02.4.5 проект официально переходит от simple file splitting к dependency-aware modular architecture.

Это становится обязательным правилом для всех будущих крупных файлов проекта.

# REPORT — DEVELOPER LOG
## Stage 02.4.5 — UI Split & Responsive Refactor

### Цель стадии
На этапе 02.4.5 выполнен переход от монолитного UI-файла к модульной структуре интерфейса.

Основная задача:
- уменьшить размер ui.js;
- разделить интерфейс на независимые подсистемы;
- подготовить архитектуру под дальнейший рост мобильного UX;
- снизить риск потери логики при последующих изменениях;
- упростить сопровождение проекта.

---

# Выполненные изменения

## 1. Полностью удалён монолитный ui.js

Старый файл:
- js/ui.js

Был удалён из системы.

---

## 2. Создана новая структура UI-модулей

Создан каталог:

js/ui/

Внутри него выделены отдельные подсистемы:

- helpers.js
- layout.js
- controls.js
- panels.js
- canvas_world.js
- canvas_entities.js
- notifications.js

---

# Назначение файлов

## helpers.js
Содержит:
- UI helper-функции;
- createUIButton;
- applyFixedStyle;
- createPanelTitle;
- createSmallText;
- draw helpers.

---

## layout.js
Содержит:
- responsive layout system;
- portrait / landscape rules;
- compact mode;
- mobile safe-area handling;
- topbar layout;
- panel positioning logic.

---

## controls.js
Содержит:
- нижние панели управления;
- speed controls;
- zoom controls;
- build confirm panel;
- mobile interaction buttons.

---

## panels.js
Содержит:
- menu panel;
- codex panel;
- selected tower panel;
- game over panel;
- wave status rendering.

---

## canvas_world.js
Содержит:
- drawMap;
- drawRoadTiles;
- drawBase;
- drawBuildOverlay;
- drawTowerRange;
- world rendering helpers.

---

## canvas_entities.js
Содержит:
- drawTowers;
- drawEnemies;
- HP bars;
- attack beams.

---

## notifications.js
Содержит:
- notification system;
- updateNotifications;
- drawNotifications;
- UI alert lifecycle.

---

# Обновлён index.html

Из index.html:
- удалён ui.js;
- подключены новые UI-модули;
- сохранён корректный порядок загрузки JS.

---

# Выполнена адаптация под mobile/tablet

Добавлены:
- compact mode;
- landscape rules;
- responsive topbar;
- mobile spacing;
- adaptive control placement.

---

# Архитектурные выводы

Stage 02.4.5 подтвердил:
- монолитный UI больше невозможно безопасно поддерживать;
- модульная архитектура обязательна для дальнейшего роста проекта;
- mobile UX требует отдельного этапа стабилизации;
- UI split успешно подготовил систему к дальнейшему расширению.

---

# Обнаруженные проблемы после split

Во время тестов выявлены:
- build confirm bug;
- coordinate mapping issues;
- unstable mobile zoom behavior;
- oversized codex panel on phones;
- landscape overlap problems;
- non-dynamic lower zoom label.

---

# Принятые решения

Следующий этап:
- выполнить Fix Pack внутри новой архитектуры;
- не возвращаться к монолитному UI;
- все будущие изменения выполнять только через отдельные UI-модули.

---

# Новые правила разработки

После Stage 02.4.5 введены обязательные правила:

1. Перед изменением логики определяется конкретный файл-модуль.
2. Изменения вносятся только в соответствующий файл.
3. Полное содержимое файлов выдаётся в чат.
4. Замена файлов выполняется вручную полной вставкой.
5. Каждый файл сопровождается отдельным commit message.
6. Ведётся учёт:
   - количества файлов;
   - порядка выдачи;
   - завершённых замен.
7. После завершения этапа обязательно выполняется ZIP-проверка репозитория.
8. После каждой стадии обновляются:
   - architecture.md
   - roadmap.md
   - mechanics.md
   - stage documentation.

---

# Статус стадии

Stage 02.4.5:
- UI split выполнен;
- архитектура стабилизирована;
- проект готов к Fix Pack стадии.

# REPORT — QA TEST LOG
## Stage 02.4.5 — UI Split Validation

### Цель тестирования
Проверить:
- работоспособность игры после UI split;
- корректность модульной структуры;
- mobile/tablet responsiveness;
- стабильность UI после удаления монолитного ui.js.

---

# Проверенные устройства

## Планшет
- iPad
- Safari
- portrait / landscape

## Телефон
- iPhone
- Safari
- portrait / landscape

---

# Проверенные механики

## Общий запуск
Проверено:
- игра запускается;
- canvas отображается;
- карта загружается;
- UI отображается.

Результат:
PASS

---

## Волны
Проверено:
- запуск волн;
- движение врагов;
- завершение волны;
- damage базы.

Результат:
PASS

---

## HP базы
Проверено:
- враги доходят до базы;
- HP уменьшается;
- Game Over срабатывает.

Результат:
PASS

---

## Меню
Проверено:
- открытие меню;
- переключение сложности;
- новая игра.

Результат:
PASS

---

## Codex
Проверено:
- открытие codex panel;
- отображение справки.

Результат:
PARTIAL PASS

Проблема:
- на телефоне codex перекрывает почти весь экран.

---

## Zoom
Проверено:
- кнопки +/-;
- изменение масштаба;
- верхний zoom indicator.

Результат:
PARTIAL PASS

Проблемы:
- нижний label zoom не обновляется;
- zoom можно увести в неудобное состояние на телефоне.

---

## Build Mode
Проверено:
- выбор башни;
- выбор клетки;
- build overlay;
- confirm build.

Результат:
FAIL

Проблемы:
- выбранная клетка визуально отображается;
- confirmBuild сообщает:
  "Сначала выбери клетку";
- башня не строится.

Дополнительно:
- выбор клетки ощущается смещённым относительно пальца.

---

# Mobile UX Test

## Portrait Mode
Результат:
PARTIAL PASS

Проблемы:
- панели занимают слишком много места;
- overlay перекрывает карту;
- build panel неудобен.

---

## Landscape Mode
Результат:
PARTIAL PASS

Проблемы:
- нижние панели перекрывают карту;
- controls занимают слишком много пространства;
- кнопки требуют перераспределения.

---

# UX observations

Предложения тестирования:

## Перенести:
- Башня
- Волна

Ближе к правому пальцу рядом со speed controls.

---

## Перенести отдельно:
- Codex
- Menu

Сделать компактнее и отделить от основных action buttons.

---

# Главный вывод

Stage 02.4.5:
- успешно завершил UI split;
- подтвердил работоспособность модульной архитектуры;
- выявил mobile UX bottlenecks;
- подготовил систему к отдельному Fix Pack этапу.

---

# Рекомендованный следующий этап

Fix Pack:
- confirmBuild fix;
- coordinate mapping fix;
- zoom stabilization;
- mobile layout rebalance;
- codex resizing;
- dynamic zoom label.