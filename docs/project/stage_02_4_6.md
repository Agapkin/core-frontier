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