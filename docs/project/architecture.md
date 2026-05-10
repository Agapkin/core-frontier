# Архитектура проекта CORE FRONTIER

## Структура репозитория

```text
core-frontier/

README.md
index.html

css/
└── style.css

js/
└── game.js

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
    └── stage_02_4.md

Назначение файлов

README.md

Главное описание проекта: концепция, цель, технологии и общий план развития.

index.html

Главная точка запуска проекта.
Подключает:

* css/style.css
* js/game.js

css/style.css

Визуальное оформление страницы, HUD, кнопок и базового интерфейса.

js/game.js

Главная игровая логика текущего прототипа.

Сейчас содержит:

* карту
* сетку
* камеру
* дорогу врагов
* строительство башен
* запреты строительства
* выбор башни
* радиус башни
* продажу башни
* волны
* типы врагов
* скорость x1 / x2 / x3
* Game Over
* Restart
* базовую справку Info
* ресурсы
* HP базы
* основной игровой цикл

Документация

docs/design/mechanics.md

Описание игровых механик и базовых правил.

docs/project/roadmap.md

Дорожная карта проекта.

docs/project/stage_01.md

Первый рабочий прототип.

docs/project/stage_02.md

Карта, камера, сетка и маршрут врагов.

docs/project/stage_02_1.md

UX строительства: tap/drag, preview, подсветка клетки.

docs/project/stage_02_2.md

Стабилизация дороги, типов врагов, типов башен и wave manager.

docs/project/stage_02_3.md

Баланс, скорость игры x1/x2/x3 и статус волны.

docs/project/stage_02_4.md

Core Gameplay Stabilization: Game Over, Restart, выбор башни, радиус, продажа и Info.

Принципы архитектуры

1. Минимальный корень

В корне остаются только:

* README.md
* index.html
* основные папки проекта

2. Разделение по смыслу

* css/ — стили
* js/ — игровая логика
* docs/ — документация

3. Работа через этапы

Каждый крупный этап фиксируется отдельным stage_XX.md.

4. История через GitHub

Старые версии не сохраняются отдельными файлами.
История хранится через commits.

5. Подготовка к модульности

Пока вся логика находится в js/game.js, но файл структурируется секциями.

В будущем его можно будет разделить на:

* camera.js
* map.js
* towers.js
* enemies.js
* waves.js
* ui.js
* economy.js