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

---

# DEVELOPER REPORT — Stage 02.4.6-A
## HUD REFACTOR PASS

PASS A был выполнен после:
- анализа blind playtests;
- анализа mobile QA;
- анализа iPad/iPhone layout проблем;
- анализа gameplay-space conflicts;
- анализа Stage 02.4.5-A regression risks;
- анализа актуального ZIP репозитория.

PASS A стал первым этапом нового workflow:

stage
→ ZIP analysis
→ technical implementation map
→ PASS execution
→ validation
→ QA.

---

# Главная цель PASS A

PASS A НЕ добавлял новые механики.

Главная задача PASS A:

уменьшить HUD clutter и освободить gameplay-space.

---

# Что было проблемой до PASS A

До PASS A HUD представлял собой набор независимых панелей:

- wave panel;
- speed panel;
- zoom panel;
- build panel;
- action panel;
- topbar;
- codex;
- menu.

Эти панели:
- конкурировали за место;
- перекрывали gameplay;
- плохо работали на mobile;
- особенно конфликтовали в landscape.

Blind playtests также показали:
игроки не понимают:
- gameplay flow;
- кнопку волны;
- HUD;
- ресурсы;
- gameplay hierarchy.

---

# Что было выполнено в PASS A

---

# 1. Layered HUD Architecture

В index.html была подготовлена layered HUD architecture.

Добавлены:
- hud-root;
- overlay-root;
- tutorial-root.

Это создаёт foundation для:
- onboarding overlays;
- FTUE;
- tutorial layers;
- contextual highlights;
- gameplay overlays.

---

# 2. Unified HUD Zones

В layout.js была переработана HUD zone system.

Созданы:
- compact HUD zones;
- gameplay-safe layout zones;
- отдельные схемы portrait/landscape;
- compact wave HUD positioning.

---

# 3. Landscape Cleanup

В landscape mobile:
- speed controls перенесены вверх вправо;
- zoom controls отделены;
- action controls собраны справа;
- уменьшено перекрытие gameplay-space.

---

# 4. Compact Wave HUD

Большой wave panel был удалён.

Вместо него создан compact HUD:

- 🌊 wave
- 👾 enemies
- ⏩ speed

Это:
- уменьшает визуальный шум;
- освобождает экран;
- делает gameplay-area чище.

---

# 5. Build Panel Cleanup

Build confirm panel уменьшен.

Для compact mode:
- кнопки сокращены;
- footprint уменьшен;
- перекрытие gameplay-space снижено.

При этом:
существующий build flow сохранён,
чтобы не ломать уже рабочую механику.

---

# 6. Compact Codex

Codex был переработан:
- уменьшен;
- упрощён;
- стал более mobile-friendly.

Также в Codex появились первые gameplay hints:
- “Построй башни и защити базу”;
- “⚔ запускает волну врагов”.

Это первый шаг к gameplay communication layer.

---

# 7. Selected Tower Panel Cleanup

Tower panel уменьшен:
- меньше перекрывает карту;
- компактнее на mobile;
- меньше визуального шума.

---

# 8. Responsive HUD Improvements

Topbar:
- адаптирован под compact mode;
- ограничен по ширине в landscape;
- меньше конфликтует с gameplay-space.

---

# Что специально НЕ трогалось

PASS A специально НЕ затрагивал:

- camera math;
- worldToScreen;
- screenToWorld;
- zoom scaling;
- onboarding logic;
- tutorial progression;
- gameplay balance;
- новые механики.

Причина:
слишком высокий риск giant regression.

---

# Почему PASS A был разделён отдельно

Stage 02.4.6 оказался слишком большим для giant rewrite.

Поэтому проект перешёл на PASS architecture.

PASS A:
HUD cleanup.

PASS B:
camera & zoom.

PASS C:
gameplay readability.

PASS D:
FTUE foundation.

Это снижает:
- риск регрессии;
- потерю gameplay stability;
- повторные переписывания файлов.

---

# Главный инженерный вывод PASS A

Проект окончательно вышел из стадии:

“core systems stabilization”.

Теперь основной bottleneck проекта:
не gameplay logic,
а UX architecture.

Это означает, что:
- gameplay foundation уже существует;
- теперь проекту нужны:
  - gameplay communication;
  - onboarding;
  - readability;
  - visual hierarchy;
  - mobile UX polish.

---

# Новый workflow подтверждён

PASS A стал первым этапом,
выполненным через новый production workflow:

stage
→ ZIP analysis
→ technical implementation map
→ PASS execution
→ validation
→ QA
→ reports.

Это значительно уменьшило:
- хаотичные переписывания;
- потерю зависимостей;
- giant regressions;
- необходимость повторно выдавать файлы.

---

# Следующий этап после PASS A

После:
- ZIP validation;
- QA testing;
- mobile testing;

следующим этапом станет:

Stage 02.4.6-B — Camera & Zoom Refactor.

Потому что после очистки HUD
главным bottleneck остаётся:
- camera scaling;
- zoom behavior;
- distorted circles;
- gameplay visibility.

## QA + USER TEST + DEV CONCLUSION REPORT — STAGE 02.4.6 PASS A

Источник тестирования:
- iPad Safari
- iPhone Safari
- cold-user tests (2 пользователя без объяснений)

Статус:
CRITICAL REGRESSION

Итог:
PASS A признан нерабочим билдом.
После HUD/UI refactor игра потеряла стабильный interaction flow и стала частично неиграбельной.

---

# 1. QA REPORT — TECHNICAL TESTING

## 1.1 UI STATE COLLISION

Выявлены конфликты UI-состояний:

Одновременно отображаются:
- menu
- build mode
- action panel
- speed controls
- bottom HUD

Проблемы:
- интерфейс накладывается друг на друга
- панели не скрываются при смене режима
- отсутствует единый active state
- одновременно активны несколько interaction layers

Вывод:
Отсутствует полноценный UI State Manager.

---

## 1.2 INPUT FAILURE

Выявлены проблемы взаимодействия:
- часть кнопок перестала реагировать
- speed controls работают нестабильно
- при переключении скорости происходит перестройка HUD
- interaction flow становится непредсказуемым

На ряде экранов:
- работают только speed controls
- остальной HUD становится неактивным

---

## 1.3 MOBILE / TABLET BREAKAGE

Выявлены критические проблемы adaptive layout:

### iPad:
- HUD перекрывает карту
- build panel конфликтует с menu
- панели занимают игровое пространство

### iPhone:
- layout ломается полностью
- панели наслаиваются
- bottom HUD конфликтует с build controls
- speed panel перестраивает весь интерфейс
- часть элементов выходит за safe-area

---

## 1.4 CAMERA / MAP ISSUES

Проблемы:
- карта визуально “исчезает”
- HUD перекрывает игровое поле
- gameplay space сокращается
- build panel мешает обзору

Дополнительно:
- при zoom ellipse/range circles деформируются
- круги становятся овальными

---

## 1.5 GAMEPLAY UX ISSUES

Пользователь не понимает:
- как начать игру
- как вызвать волну
- что означают ресурсы
- что означают speed x1/x2/x3
- что означает дорога
- что необходимо защищать

Также выявлено:
- 🌊 плохо считывается как “запуск боя”
- пользователи воспринимают значок буквально как “вода/волна”

Рекомендуется:
- ⚔️
- ▶
- 👾
- BATTLE/START icon

---

# 2. USER TEST REPORT — FIRST CONTACT TESTING

Тестеры:
- User #1
- User #2

Условия:
Игрокам не объяснялись механики.
Устройства передавались без инструкций.

---

## 2.1 CORE LOOP НЕ СЧИТЫВАЕТСЯ

Пользователи не понимают:
- как начать игру
- как запускать бой
- зачем строить
- как развиваться
- что означают панели
- что означают цифры

---

## 2.2 ONBOARDING REQUIRED

Игроки напрямую предложили:
- tutorial
- стрелку на кнопку запуска боя
- обучение при первом запуске
- возможность повторного обучения

Вывод:
Без onboarding пользователь не понимает gameplay flow.

---

## 2.3 VISUAL READABILITY PROBLEM

Текущие placeholder башни воспринимаются как:
- квадраты
- стики
- непонятные объекты

Требуется:
- читаемый tower silhouette
- более понятный visual language

---

# 3. DEV CONCLUSION

Стратегия:
ZIP → analysis → implementation
улучшила:
- структурность
- документирование
- фиксацию стадий
- контроль regression

Однако проблема повторного переписывания кода сохранилась.

Причина:
Перед кодом отсутствует:
- architecture simulation
- interaction conflict analysis
- UI state mapping
- adaptive conflict testing

PASS A был реализован без:
- UI State Manager
- panel priority system
- interaction ownership system

---

# 4. ROOT CAUSE

Главная причина regression:

Отсутствие системы управления состояниями интерфейса.

Текущая система позволяет:
- одновременно активировать несколько UI modes
- конфликтовать interaction layers
- ломать adaptive layout

---

# 5. REQUIRED NEXT STEP

Следующая стадия:
02.4.6-A1 — UI State Recovery / Interaction Lock Fix

Приоритет:
CRITICAL

---

# 6. REQUIRED SYSTEMS

Необходимо внедрить:

- UI State Manager
  - IDLE
  - BUILD
  - MENU
  - CODEX
  - GAME_OVER

- interaction lock system
- panel priority system
- mobile safe-zone logic
- onboarding foundation
- adaptive conflict prevention

---

# 7. FINAL CONCLUSION

PASS A нельзя считать рабочим билдом.

Следующий шаг:
не продолжение gameplay,
а восстановление стабильности интерфейса и interaction architecture.

## TECHNICAL EXECUTION MAPPING — STAGE 02.4.6-A1
## SOURCE: LAST STABLE PRE-REGRESSION BUILD

Основа анализа:
- working gameplay build
- stable interaction flow
- рабочий gameplay loop
- regression произошёл после HUD refactor

---

# 1. CURRENT STABLE FOUNDATION

Последний стабильный билд уже содержит:

✅ zoom
✅ tower placement
✅ build restrictions
✅ wave system
✅ speed controls
✅ codex/menu
✅ retry/new game
✅ mobile gameplay
✅ tablet gameplay

Проблема не в gameplay logic.
Проблема в:
- interaction architecture
- adaptive HUD hierarchy
- UI state ownership

---

# 2. ROOT CAUSE ANALYSIS

Regression возник после попытки:
- одновременно перестроить HUD
- добавить adaptive behaviour
- вынести панели
- менять orientation logic

Без:
- UI state manager
- render priority
- panel ownership
- interaction locking

В результате:
- несколько интерфейсов активны одновременно
- элементы не знают кто главный
- adaptive layout ломает visibility
- interaction зоны пересекаются

---

# 3. MAIN TECHNICAL ERROR

Критическая ошибка:

HUD был изменён раньше,
чем была построена архитектура состояний интерфейса.

Фактически:
UI начал жить как независимые блоки,
а не как единая state machine.

---

# 4. REQUIRED ARCHITECTURE

Перед следующим кодом требуется:

## 4.1 UI STATE MANAGER

Ввести единое состояние интерфейса:

- IDLE
- BUILD_SELECT
- BUILD_CONFIRM
- MENU
- CODEX
- GAME_OVER
- WAVE_RUNNING

---

## 4.2 SINGLE ACTIVE MODE RULE

В каждый момент времени:
активен только один interaction mode.

Например:

MENU:
- блокирует build
- блокирует codex
- блокирует placement

BUILD_CONFIRM:
- блокирует menu
- блокирует codex
- блокирует camera gestures

---

## 4.3 PANEL PRIORITY SYSTEM

Приоритет интерфейсов:

1. GAME_OVER
2. MENU
3. BUILD_CONFIRM
4. CODEX
5. BASE HUD
6. SPEED PANEL

Нижние слои не могут перекрывать верхние.

---

## 4.4 MOBILE SAFE ZONES

Нужно ввести:
- safe margins
- orientation zones
- reserved HUD space

Запрещено:
- перекрывать карту bottom HUD
- накладывать speed panel на gameplay controls
- выводить несколько floating panels рядом

---

# 5. REQUIRED UX FIXES

## 5.1 BATTLE ICON

🌊 заменить.

Причина:
пользователь не считывает wave как бой.

Замена:
⚔️
▶
👾
BATTLE

---

## 5.2 FIRST CONTACT UX

Игроки не понимают:
- что защищать
- что такое дорога
- как начать

Требуется foundation onboarding system:

Минимум:
- стрелка на кнопку боя
- toast tutorial
- first-run hints

---

## 5.3 RESOURCE READABILITY

Игроки не понимают:
🌲 🪨 🥩 ⚡ ❤️

Требуется:
- tooltip
или
- codex onboarding
или
- short labels

---

# 6. CAMERA RULES

Запрещено:
- deform range circles
- ломать aspect ratio
- изменять circle geometry при zoom

Требуется:
- uniform scaling
- camera clamp
- zoom bounds

---

# 7. BUILD MODE RULES

Build mode должен иметь:

## BUILD_SELECT
игрок выбирает башню

## BUILD_PREVIEW
показывается ghost placement

## BUILD_CONFIRM
только confirm/cancel

В этот момент:
- menu hidden
- codex hidden
- unrelated HUD minimized

---

# 8. HUD DESIGN RULES

## DESKTOP/TABLET LANDSCAPE

RIGHT:
- speed
- utility buttons

BOTTOM:
- primary actions

TOP:
- resources

LEFT:
- contextual panels

---

## MOBILE PORTRAIT

TOP:
- compact resources

BOTTOM:
- only primary actions

FLOATING:
- temporary contextual windows only

Запрещено:
- постоянное наложение floating HUD
- overlapping button groups

---

# 9. IMPLEMENTATION STRATEGY

Следующий PASS:
НЕ visual redesign.

Следующий PASS:
interaction stabilization.

---

# 10. REQUIRED IMPLEMENTATION ORDER

PASS A1:
UI State Recovery

PASS A2:
HUD stabilization

PASS A3:
mobile safe-zones

PASS A4:
onboarding foundation

PASS A5:
visual readability

Только после этого:
новые gameplay systems.

---

# 11. FILE EXECUTION PLAN

Ожидаемые изменения:

- index.html
  HUD structure cleanup

- styles/ui.css
  safe-zones
  adaptive hierarchy
  panel priority

- js/uiState.js
  NEW
  state machine

- js/hud.js
  interaction ownership

- js/input.js
  mode locking

- js/camera.js
  zoom stabilization

---

# 12. FINAL TECHNICAL CONCLUSION

Regression подтвердил:
проект перешёл из стадии
“canvas prototype”
в стадию,
где требуется полноценная UI architecture.

Следующий этап —
не косметический UI pass,
а построение interaction framework.

## DEVELOPMENT STATUS REPORT — STAGE 02.4.6
## ARCHITECTURE STALL / RUNTIME COMPATIBILITY DISCOVERY

Во время выполнения Stage 02.4.6 проект столкнулся с критическим инженерным переходом.

Разработка существенно замедлилась из-за того, что проект вышел из стадии:
“изолированных файлов”.

Проект перешёл в стадию:
runtime dependency architecture.

---

# 1. ЧТО ПРОИЗОШЛО

Во время выполнения:
- PASS A (HUD REFACTOR)
- PASS A1 (UI STATE RECOVERY)

были произведены:
- изменения HUD;
- изменения index.html;
- изменения state architecture;
- попытки внедрения uiMode system;
- adaptive layout changes.

В результате:
часть runtime начала ожидать новую архитектуру,
а часть файлов продолжила использовать старую.

---

# 2. ПОЧЕМУ ПРОЕКТ ЗАБУКСОВАЛ

Основная проблема оказалась НЕ:
- HUD;
- camera;
- mobile layout.

Главная проблема:
runtime compatibility.

Проект уже содержит:
- связанные gameplay systems;
- связанные UI systems;
- state dependencies;
- camera dependencies;
- wave dependencies;
- runtime references между файлами.

Из-за этого:
полная замена одного файла
может ломать остальные системы.

---

# 3. ВАЖНОЕ ИНЖЕНЕРНОЕ ОТКРЫТИЕ

Ошибка была НЕ в том,
что файлы заменялись целиком.

Полная замена файлов допустима.

Ошибка была в том,
что новые версии файлов:
не сохраняли compatibility со старым runtime.

Например:
старые gameplay systems продолжали ожидать:
- старые uiState поля;
- старые camera flags;
- старые waveState структуры.

Однако новые файлы:
- удаляли;
- переименовывали;
- переписывали эти структуры.

---

# 4. ROOT CAUSE

Главный root cause Stage 02.4.6:

Попытка перейти к:
NEW ARCHITECTURE

без:
COMPATIBILITY LAYER.

---

# 5. ЧТО БЫЛО ПОНЯТО

Проект больше нельзя развивать через:
“полное переписывание логики”.

Теперь требуется:
- additive architecture;
- compatibility-safe migration;
- staged runtime evolution.

---

# 6. НОВОЕ ПРАВИЛО ПРОЕКТА

Разрешено:
- полностью заменять файлы.

НО:
новые файлы обязаны:
- сохранять старые runtime структуры;
- сохранять старые поля;
- сохранять старые зависимости;
- расширять архитектуру,
  а не уничтожать её.

---

# 7. ПОЧЕМУ ЭТО ВАЖНО

Проект уже перестал быть:
“набором независимых файлов”.

Теперь это:
единая runtime ecosystem.

Изменение:
- state.js
или
- camera
или
- ui systems

влияет:
на весь gameplay runtime.

---

# 8. ЧТО ДАЛ STAGE 02.4.6

Несмотря на regression,
Stage 02.4.6 дал крайне важные инженерные выводы:

Выявлены:
- UI state conflicts;
- HUD interaction conflicts;
- mobile safe-zone issues;
- onboarding problems;
- runtime dependency problems;
- migration architecture requirements.

---

# 9. ПОДТВЕРЖДЁННЫЕ UX ПРОБЛЕМЫ

Blind tests подтвердили:

Игроки не понимают:
- как начать игру;
- как вызвать бой;
- что означает 🌊;
- что означают ресурсы;
- что защищать;
- как устроен gameplay loop.

Также подтверждено:
необходим:
- onboarding;
- tutorial;
- gameplay communication layer.

---

# 10. НОВАЯ СТРАТЕГИЯ РАЗРАБОТКИ

Следующая стратегия:

1. ZIP ANALYSIS
2. DEPENDENCY ANALYSIS
3. RUNTIME MAPPING
4. COMPATIBILITY PLAN
5. SAFE PATCH PASS
6. QA
7. USER TESTS

Без giant rewrites.

---

# 11. ТЕКУЩЕЕ СОСТОЯНИЕ ПРОЕКТА

Проект находится в transitional architecture stage.

Это означает:
- gameplay foundation уже существует;
- теперь главная задача:
  стабилизировать runtime evolution.

---

# 12. FINAL CONCLUSION

Stage 02.4.6 стал не просто UI стадией.

Он стал:
точкой перехода проекта
из prototype-phase
в dependency-aware game architecture.

Именно поэтому:
разработка резко усложнилась,
а требования к совместимости
стали критически важными.