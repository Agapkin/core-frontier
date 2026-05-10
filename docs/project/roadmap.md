# ROADMAP — CORE FRONTIER

## Текущий статус проекта

Проект прошёл стадию:
- технического canvas-прототипа,
- базового tower defense,
- первых игровых циклов,
- первых UX-итераций.

Сейчас CORE FRONTIER развивается как:
RTS / Tower Defense / Recovery Strategy hybrid.

Основной текущий фокус:
- UX,
- читаемость,
- интерфейс,
- управление,
- подготовка фундаментальной архитектуры.

---

# STAGE 01 — Первый рабочий прототип
## Статус: ЗАВЕРШЕН

### Реализовано
- GitHub Pages
- canvas
- базовая карта
- башни
- враги
- волны
- ресурсы
- HP базы

### Главный вывод
Нужны:
- карта,
- камера,
- маршрут врагов,
- нормальное строительство.

---

# STAGE 02 — Карта и игровой цикл

---

## STAGE 02.0 — Grid / Camera / Path
### Статус: ЗАВЕРШЕН

### Реализовано
- большая карта
- сетка
- drag камеры
- маршрут врагов
- база
- ограничение волн

### Вывод
Нужен полноценный UX строительства.

---

## STAGE 02.1 — Build UX Foundation
### Статус: ЗАВЕРШЕН

### Реализовано
- разделение tap / drag
- preview башни
- подсветка клеток
- feedback игроку
- попытка запрета строительства на дороге

### Вывод
Нужны:
- корректная проверка дороги,
- типы врагов,
- структура башен.

---

## STAGE 02.2 — Stabilization & Data Structures
### Статус: ЗАВЕРШЕН

### Реализовано
- запрет строительства на дороге
- enemy types
- tower types
- wave manager
- базовая data-driven структура

### Вывод
Нужны:
- баланс,
- скорость игры,
- статус волны.

---

## STAGE 02.3 — Balance & Wave UX
### Статус: ЗАВЕРШЕН

### Реализовано
- x1 / x2 / x3
- статус волны
- количество врагов
- более плотные волны
- первые попытки экономики

### Вывод
Нужны:
- Game Over,
- Retry,
- радиус башни,
- Codex,
- энергия,
- UI.

---

## STAGE 02.4 — Core Gameplay Stabilization
### Статус: ЗАВЕРШЕН

### Реализовано
- Game Over
- Full Restart
- Retry Wave
- checkpoint перед волной
- выбор башни
- радиус башни
- продажа башни
- Info / Codex
- сложность игры
- энергия
- ограничение строительства

### Главный вывод
Gameplay loop начал работать,
но:
- UX остаётся слабым,
- HUD конфликтует,
- Build UX неудобен,
- отсутствует zoom.

---

## STAGE 02.4.1 — Testing & UX Analysis
### Статус: ЗАВЕРШЕН

### Реализовано
- полноценное тестирование Stage 02.4
- фиксация UX-проблем
- анализ экономики
- анализ сложности
- анализ мобильного интерфейса
- анализ Retry Wave
- анализ Energy UX

### Главный вывод
Основная проблема проекта теперь:
НЕ механики,
а:
- интерфейс,
- читаемость,
- взаимодействие.

---

## STAGE 02.4.2 — UX / UI Overhaul
### Статус: В РАЗРАБОТКЕ

### Основные задачи

## Build Mode
- ghost tower
- preview
- confirm build
- cancel build
- valid / invalid cells

## Notification Layer
- floating notifications
- non-overlapping UI
- cleaner feedback

## Camera System
- zoom
- drag
- smooth scaling
- camera bounds

## HUD Refactor
- cleaner UI
- mobile UX
- panel separation
- better readability

## Energy UX
- warnings
- hints
- clearer limitation feedback

## Upgrade UX
- locked upgrades
- future upgrade paths
- requirements display

## Gameplay Readability
- cleaner overlays
- tower selection clarity
- enemy readability
- visual clarity

### Цель этапа
Превратить:
“набор механик”
в:
“удобный игровой опыт”.

---

# STAGE 02.5 — Recovery Economy & Infrastructure
## Статус: ПЛАНИРУЕТСЯ

### Планируется

## Инфраструктура
- генераторы энергии
- склады
- supply system
- обслуживание

## Recovery Economy
- обломки
- биомасса
- переработка
- salvage system

## Automation
- харвестеры
- сборщики
- транспорт ресурсов

## Развитие базы
- upgrade базы
- лимиты инфраструктуры
- производственные здания

### Главный смысл
Переход:
от wave-defense
к:
persistent RTS economy.

---

# STAGE 03 — Tech & Combat Expansion
## Статус: ПЛАНИРУЕТСЯ

### Башни
- anti-air
- heavy
- support
- slow
- energy
- repair

### Враги
- air units
- armored
- swarm
- heavy
- special enemies

### Технологии
- research tree
- unlock system
- specialization

### Карта
- resource nodes
- стратегические зоны
- контроль территории

---

# STAGE 04 — Strategic Layer
## Статус: ПЛАНИРУЕТСЯ

### Планируется
- глобальная карта
- persistence
- long-session gameplay
- развитие базы между миссиями
- сохранения
- meta progression

---

# STAGE 05 — Systems Expansion
## Статус: ДАЛЬНЯЯ ПЕРСПЕКТИВА

### Возможные направления
- фракции
- AI commanders
- procedural waves
- dynamic events
- weather system
- diplomacy
- multiplayer
- Web3 integration
- mod support

---

# Текущее архитектурное направление

Проект движется к:
```text
RTS + Tower Defense + Recovery Economy + Persistent Strategy

Главные текущие приоритеты

Сейчас

* UX
* интерфейс
* Build Mode
* camera system
* gameplay readability

Потом

* экономика
* инфраструктура
* технологии
* recovery gameplay

⸻

Общий вывод

CORE FRONTIER уже вышел за рамки:
“canvas tower defense prototype”.

Проект постепенно превращается в:

* системную стратегию,
* sandbox defense framework,
* RTS / TD hybrid architecture.

Следующий ключевой шаг:
не расширение контента,
а улучшение качества взаимодействия игрока с уже существующим ядром.