# STAGE 02.4.6
# HUD / CAMERA / FTUE REFACTOR

## Цель стадии

Перевести проект из состояния:

“playable prototype”

в состояние:

“понятная и читаемая mobile tower defense игра”.

Stage 02.4.6 НЕ направлен на добавление новых механик.

Главная задача:
перестроить визуальную коммуникацию игры.

---

# Основные проблемы, выявленные в 02.4.5-A

## Technical

- zoom architecture ещё нестабильна;
- circles/range искажаются при scaling;
- min/max zoom требуют переработки;
- camera scaling ощущается непредсказуемо.

## HUD

- интерфейс перекрывает gameplay;
- wave panel слишком большая;
- controls конкурируют друг с другом;
- speed panel занимает gameplay-space;
- build confirm panel неудобна;
- Codex слишком тяжёлый для mobile;
- landscape и portrait используют неидеальные схемы.

## UX

- игроки не понимают как начать игру;
- не понимают кнопку запуска волны;
- не понимают gameplay loop;
- не понимают ресурсы;
- не понимают дорогу;
- не понимают цель игры;
- не понимают speed controls;
- не понимают что означают башни;
- не понимают progression.

## FTUE

Blind playtest показал:
новый игрок не понимает игру без объяснений.

---

# Главная цель Stage 02.4.6

Создать:

- читаемый gameplay;
- понятный HUD;
- стабильную camera system;
- понятный onboarding flow;
- визуальную иерархию действий;
- mobile-first interaction architecture.

---

# STAGE 02.4.6 TASKS

---

# 02.4.6.1 — Compact Wave HUD

## Проблема

Текущий wave panel:
- слишком большой;
- перекрывает карту;
- мешает gameplay.

## Задача

Заменить большой wave block компактными inline indicators.

## Цель

Вместо:

- Волна: 5
- Статус: идёт
- Враги: 3/19
- x3

Сделать компактно:

- 🌊 5
- 👾 3/19
- ⏩ x3

## Требования

- минимальная высота;
- mobile friendly;
- не перекрывает gameplay;
- landscape compatible;
- portrait compatible.

---

# 02.4.6.2 — HUD Layer Refactor

## Проблема

HUD сейчас состоит из независимых панелей, которые конфликтуют между собой.

## Задача

Создать unified HUD layout system.

## Требования

### Portrait

- компактный bottom HUD;
- speed controls не перекрывают build controls;
- gameplay space максимально свободен.

### Landscape

- action controls справа;
- speed controls сверху справа;
- zoom controls отдельно;
- минимальное перекрытие карты.

---

# 02.4.6.3 — Contextual Build UX

## Проблема

Build confirm panel находится отдельно от выбранной клетки.

## Задача

Начать переход к contextual build interaction.

## Исследуемые варианты

### Variant A

double tap confirm.

### Variant B

floating build button рядом с клеткой.

### Variant C

context radial popup.

## Важно

НЕ ломать уже рабочую механику строительства.

---

# 02.4.6.4 — Camera & Zoom Refactor

## Проблема

- zoom недостаточен;
- circles становятся oval;
- scaling нестабилен.

## Задача

Перестроить camera scaling architecture.

## Проверить

- worldToScreen;
- screenToWorld;
- canvas size;
- CSS scaling;
- DPR;
- scaled();
- camera bounds;
- minZoom;
- maxZoom;
- reset zoom.

## Цель

- одинаковое поведение на iPad/iPhone;
- стабильные круги;
- predictable zoom;
- больше gameplay visibility.

---

# 02.4.6.5 — Gameplay Readability

## Проблема

Игроки не понимают:
- дорогу;
- цель игры;
- направление врагов;
- где база;
- что делают башни.

## Задача

Усилить gameplay readability.

## Возможные улучшения

- clearer base;
- enemy spawn marker;
- path direction hints;
- stronger projectile feedback;
- impact feedback;
- target feedback;
- hit flashes;
- enemy death feedback.

---

# 02.4.6.6 — FTUE / Onboarding Foundation

## Проблема

Новый игрок не понимает:
- как начать игру;
- что делать;
- куда нажимать.

## Задача

Создать foundation для onboarding/tutorial system.

## Минимальный onboarding flow

1. Подсветить кнопку “Башня”.
2. Показать:
   “Построй защитную башню”.
3. Подсветить клетку.
4. Подсветить кнопку “Построить”.
5. Подсветить кнопку “Волна”.
6. Показать:
   “Не дай врагам дойти до базы”.

## Дополнительно

Подготовить:
- replay tutorial architecture;
- contextual hints;
- tutorial overlay layer.

---

# 02.4.6.7 — Resource Readability

## Проблема

Игроки не понимают:
- дерево;
- камень;
- энергия;
- волны;
- HP.

## Задача

Сделать HUD более читаемым.

## Возможные решения

- tooltip;
- labels;
- onboarding explanation;
- better icons;
- resource grouping;
- hover/help hints.

---

# 02.4.6.8 — Codex Compact Mode

## Проблема

Codex тяжёлый для mobile.

## Задача

Создать compact/mobile-friendly codex.

## Возможные решения

- drawer;
- tab system;
- compact sections;
- fullscreen overlay;
- scrollable panel.

---

# 02.4.6.9 — Feedback & Notifications

## Проблема

Некоторые игровые ограничения недостаточно очевидны.

## Задача

Усилить игровые уведомления.

## Примеры

- “Сложность можно менять только до первой волны”;
- “Недостаточно энергии”;
- “Нельзя строить на дороге”;
- “Башня уже стоит”.

---

# Что НЕ входит в Stage 02.4.6

НЕ добавлять:

- новые башни;
- генераторы;
- технологии;
- новые ресурсы;
- новые карты;
- новые враги;
- новые механики экономики.

---

# Причина

Сейчас главный bottleneck проекта —
не количество механик,
а понятность происходящего игроку.

---

# Ожидаемый результат Stage 02.4.6

Игрок должен:

- понимать как начать игру;
- понимать gameplay loop;
- понимать что делают кнопки;
- понимать где враги;
- понимать где база;
- понимать куда идут враги;
- понимать зачем строятся башни;
- комфортно играть на iPad/iPhone;
- не бороться с интерфейсом.

---

# Новый уровень проекта после 02.4.6

После успешного завершения Stage 02.4.6 проект сможет перейти к:

- tower upgrades;
- generators;
- tech tree;
- enemy variety;
- economy expansion;
- progression systems.

Потому что foundation gameplay и UX будут уже стабильны.

---

# Обязательный workflow Stage 02.4.6

Stage 02.4.6 должен выполняться не сразу через выдачу кода, а через предварительную техническую разметку актуального ZIP.

Причина:
на Stage 02.4.5-A было выявлено, что концептуального stage-ТЗ недостаточно для безопасной кодовой выдачи.

Теперь порядок такой:

1. Создаётся stage-файл с общей задачей.
2. Пользователь загружает актуальный ZIP репозитория.
3. GPT читает фактические файлы проекта.
4. GPT не выдаёт код сразу.
5. GPT сначала формирует Technical Implementation Map:
   - список затрагиваемых файлов;
   - текущие функции в каждом файле;
   - зависимости между файлами;
   - DOM id и HTML-элементы;
   - state-поля;
   - helper-функции;
   - возможные риски регрессии;
   - варианты реализации;
   - выбранный безопасный вариант.
6. Только после этого GPT формирует финальный список файлов для замены.
7. Каждый файл выдаётся целиком.
8. Пользователь заменяет содержимое файла полностью.
9. После внесения изменений пользователь загружает свежий ZIP.
10. GPT проверяет целостность.
11. Только после проверки начинается тестирование.

---

# Важное правило

Запрещено переходить от stage-ТЗ сразу к коду.

Между stage-файлом и кодом обязательно должен быть этап:

Technical Implementation Map.

---

# Почему это важно

Stage 02.4.6 затрагивает:

- HUD;
- camera;
- zoom;
- layout;
- onboarding;
- controls;
- panels;
- rendering;
- resource readability.

Эти части связаны между собой.

Без анализа актуального ZIP есть риск:
- сломать layout;
- потерять DOM id;
- вызвать конфликт функций;
- забыть зависимость;
- выдать файл не под текущую структуру проекта;
- снова переписывать файлы повторно.

---

# Цель workflow

Снизить количество повторных выдач кода и сделать работу с модульным проектом управляемой.

Теперь каждый крупный этап должен идти по схеме:

stage document
→ актуальный ZIP
→ technical implementation map
→ full-file code output
→ ZIP validation
→ QA test
→ documentation update

---

# TECHNICAL IMPLEMENTATION MAP
## Stage 02.4.6 — HUD / Camera / FTUE Refactor

Актуальный ZIP репозитория был загружен и проанализирован перед началом выполнения Stage 02.4.6.

Данный блок фиксирует:
- текущее техническое состояние проекта;
- связи между файлами;
- проблемные зоны;
- список затрагиваемых файлов;
- риски;
- выбранную стратегию исполнения;
- порядок выполнения Stage 02.4.6.

Этот блок создаётся ДО выдачи кода.

---

# Текущее состояние проекта

Проект уже находится в рабочем playable-состоянии.

После Stage 02.4.5-A:
- строительство работает;
- выбор клетки работает;
- build confirm работает;
- продажа башни работает;
- волны работают;
- retry wave работает;
- mobile input стабилизирован;
- responsive foundation существует;
- UI уже разделён на модули.

Проект больше не находится в стадии:
“сломанный prototype”.

Теперь основные проблемы проекта:
- HUD;
- camera;
- onboarding;
- gameplay readability;
- mobile UX;
- FTUE;
- visual communication.

---

# Главный bottleneck проекта

Текущий bottleneck:
не core gameplay logic,
а UX architecture.

Игроки:
- не понимают как начать игру;
- не понимают gameplay loop;
- не понимают ресурсы;
- не понимают дорогу;
- не понимают что означают панели;
- не понимают что нужно делать первым.

Это означает, что проекту теперь нужна:
- gameplay communication layer;
- onboarding architecture;
- unified HUD system;
- readability architecture.

---

# Текущая UI архитектура

Проект уже использует модульную UI-структуру:

- js/ui/helpers.js
- js/ui/layout.js
- js/ui/controls.js
- js/ui/panels.js
- js/ui/canvas_world.js
- js/ui/canvas_entities.js
- js/ui/notifications.js

Старый ui.js уже удалён.

---

# Основные проблемные зоны

---

# A — HUD Fragmentation

Сейчас HUD состоит из независимых панелей:

- topbar;
- wave panel;
- speed panel;
- zoom panel;
- build panel;
- tower panel;
- codex;
- menu;
- notifications.

Эти панели проектировались поэтапно и теперь конфликтуют spatially.

Проблемы:
- перекрытие gameplay-space;
- competition за место;
- перегруженный экран;
- неудобство на mobile.

---

# B — Camera & Zoom Scaling

Текущее scaling поведение зависит от:

- camera.zoom;
- canvas.width;
- canvas.height;
- CSS scaling;
- scaled();
- worldToScreen();
- screenToWorld().

Проблемы:
- circles/range становятся oval;
- zoom ощущается нестабильным;
- min/max zoom недостаточны;
- scaling непредсказуем на разных устройствах.

---

# C — Mobile Gameplay Space

На телефоне и планшете HUD перекрывает gameplay-area.

Особенно:
- wave panel;
- speed controls;
- build confirm panel.

---

# D — FTUE отсутствует

В проекте пока отсутствуют:

- tutorial layer;
- onboarding system;
- contextual hints;
- CTA hierarchy;
- guided interaction;
- gameplay explanation.

Blind playtests показали, что новый игрок не понимает:
- как начать игру;
- как запускать волну;
- что означает дорога;
- зачем строятся башни;
- что означают ресурсы;
- какая цель игры.

---

# Файлы Stage 02.4.6

После анализа ZIP определён предварительный список файлов Stage 02.4.6.

---

# CORE FILES

---

## index.html

### Причина

Stage 02.4.6 затрагивает:
- HUD hierarchy;
- overlay layers;
- onboarding layers;
- safe-area wrappers;
- mobile overlay containers.

### Планируемые изменения

- tutorial root container;
- overlay containers;
- HUD wrapper structure;
- onboarding layers.

### Риск

LOW

---

## js/state.js

### Причина

Нужно хранить:
- tutorial state;
- FTUE flags;
- hint visibility;
- HUD compact state;
- camera scaling flags.

### Планируемые новые state блоки

- tutorialState;
- hudState;
- cameraState additions.

### Риск

MEDIUM

Потому что state используется почти всеми UI-модулями.

---

## js/game.js

### Причина

Stage 02.4.6 затрагивает:
- camera;
- zoom;
- pointer mapping;
- tutorial triggers;
- HUD refresh timing.

### Планируемые изменения

- camera scaling normalization;
- DPR normalization;
- zoom range update;
- tutorial progression triggers;
- gameplay event hooks.

### Риск

HIGH

Это центральный runtime файл проекта.

---

## js/systems.js

### Причина

Нужно интегрировать:
- tutorial progression;
- onboarding hooks;
- contextual gameplay notifications;
- wave CTA logic.

### Планируемые изменения

- first-build trigger;
- first-wave trigger;
- onboarding progression hooks;
- gameplay tutorial events.

### Риск

MEDIUM

---

# UI FILES

---

## js/ui/layout.js

### Главный файл Stage 02.4.6

### Причина

Здесь находятся:
- responsive схемы;
- panel positioning;
- compact mode;
- HUD generation;
- mobile layout logic.

### Планируемые изменения

- unified HUD zones;
- portrait/landscape redesign;
- gameplay-safe layout;
- compact HUD generation;
- safe-area normalization.

### Риск

VERY HIGH

Это core HUD architecture file.

---

## js/ui/controls.js

### Причина

Stage 02.4.6 полностью затрагивает:
- speed controls;
- zoom controls;
- build controls;
- contextual actions;
- bottom HUD;
- onboarding highlights.

### Планируемые изменения

- speed relocation;
- compact controls;
- contextual build interaction;
- button hierarchy;
- onboarding highlights.

### Риск

VERY HIGH

---

## js/ui/panels.js

### Причина

Тут находятся:
- wave panel;
- codex;
- menu;
- selected tower panel;
- game over panels.

### Планируемые изменения

- compact wave indicators;
- codex compact mode;
- onboarding overlays;
- readability improvements.

### Риск

HIGH

---

## js/ui/canvas_world.js

### Причина

Игроки плохо понимают:
- дорогу;
- маршрут врагов;
- базу;
- направление движения.

### Планируемые изменения

- clearer road rendering;
- path direction hints;
- spawn emphasis;
- base emphasis.

### Риск

LOW-MEDIUM

---

## js/ui/canvas_entities.js

### Причина

Игроки плохо понимают:
- атаки башен;
- попадания;
- урон;
- уничтожение врагов.

### Планируемые изменения

- projectile readability;
- hit feedback;
- enemy death feedback;
- target feedback.

### Риск

MEDIUM

---

## js/ui/notifications.js

### Причина

Нужно усилить:
- feedback;
- tutorial prompts;
- contextual warnings;
- gameplay CTA.

### Планируемые изменения

- tutorial notifications;
- contextual hints;
- stronger warnings.

### Риск

LOW

---

# Выбранная стратегия исполнения

После анализа ZIP выбран безопасный вариант исполнения.

Принято решение:
НЕ делать giant rewrite.

Причина:
слишком высокий риск регрессии.

---

# Новый workflow Stage 02.4.6

Stage 02.4.6 будет выполняться через PASSES.

Каждый PASS:
- имеет отдельный набор файлов;
- проходит ZIP validation;
- проходит QA;
- только потом начинается следующий PASS.

---

# PASS STRUCTURE

---

# PASS A — HUD REFACTOR

## Цель

Освободить gameplay-space и создать unified HUD architecture.

## Предварительные файлы PASS A

- index.html
- js/ui/layout.js
- js/ui/controls.js
- js/ui/panels.js

---

# PASS B — CAMERA & ZOOM

## Цель

Стабилизировать scaling и camera behavior.

## Предварительные файлы PASS B

- js/game.js
- js/ui/layout.js

---

# PASS C — GAMEPLAY READABILITY

## Цель

Сделать gameplay визуально понятным.

## Предварительные файлы PASS C

- js/ui/canvas_world.js
- js/ui/canvas_entities.js
- js/ui/notifications.js

---

# PASS D — FTUE FOUNDATION

## Цель

Создать onboarding architecture.

## Предварительные файлы PASS D

- js/state.js
- js/systems.js
- js/ui/controls.js
- js/ui/notifications.js

---

# Главные риски Stage 02.4.6

---

# HIGH RISK — layout.js

Если ошибиться:
- HUD исчезнет;
- панели налезут друг на друга;
- controls сломаются.

---

# HIGH RISK — game.js

Если ошибиться:
- zoom сломается;
- pointer mapping поплывёт;
- circles снова станут oval.

---

# HIGH RISK — controls.js

Если ошибиться:
- игрок потеряет gameplay flow;
- onboarding станет неудобным;
- controls начнут конфликтовать.

---

# Что НЕ входит в Stage 02.4.6

На этом этапе специально НЕ добавляются:

- новые башни;
- генераторы;
- технологии;
- новые враги;
- новые ресурсы;
- новые карты;
- economy expansion;
- tech tree.

---

# Причина

Главный bottleneck проекта сейчас —
не количество механик,
а понятность происходящего игроку.

---

# Главная цель Stage 02.4.6

Перевести проект из состояния:

“playable prototype”

в состояние:

“понятная и читаемая mobile tower defense игра”.

---

# Итог анализа Stage 02.4.6

После анализа актуального ZIP подтверждено:

Проект перешёл из стадии:
“core systems stabilization”

в стадию:
“UX architecture and gameplay communication”.

Это означает, что:
- gameplay foundation уже существует;
- теперь проекту нужна readability architecture;
- mobile-first UX;
- onboarding;
- gameplay communication layer;
- unified HUD system.