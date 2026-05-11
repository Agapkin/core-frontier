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