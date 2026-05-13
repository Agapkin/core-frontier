# Stage 03 — Архитектура разработки и память проекта
## 1. Статус стадии
Stage 03 является отдельной meta-stage проекта CORE FRONTIER.
Stage 03 НЕ является:
- продолжением runtime gameplay chain;
- заменой Stage 02.4.6;
- признанием Stage 02.4.6 failure stage;
- задачей по переписыванию gameplay, HUD или UI.
Stage 03 является архитектурным контейнером для стабилизации системы разработки.
Главная цель Stage 03:
стабилизировать workflow разработки, организовать память проекта, подготовить AI-readable структуру и безопасно вернуть проект к runtime evolution.
---
## 2. Статус Stage 02.4.6
Stage 02.4.6:
- не завершена;
- не удалена;
- не отменена;
- не заменена;
- не считается failure stage.
Текущее состояние:
runtime-разработка временно приостановлена из-за выявленного architectural blocker.
После завершения Stage 03 проект должен вернуться к Stage 02.4.6 и продолжить runtime-разработку через безопасные compatibility-safe passes.
---
## 3. Причина появления Stage 03
Во время выполнения Stage 02.4.6 проект столкнулся не с локальной проблемой gameplay, HUD или UI, а с системной проблемой организации разработки.
Выявленные проблемы:
- рост количества файлов и зависимостей;
- ухудшение навигации по проекту;
- потеря устойчивого понимания runtime связей;
- ограничение памяти GPT;
- неудобство работы только через ZIP snapshots;
- отсутствие долговременной памяти проекта;
- отсутствие AI-readable структуры проекта;
- смешивание исторической документации и актуальных operational rules;
- риск массовых изменений без visibility зависимостей.
Главный вывод:
проблема Stage 02.4.6 была не только в HUD regression, а в runtime compatibility и управлении изменениями.
---
## 4. Архитектурный переход проекта
До Stage 03 проект развивался преимущественно через:
- ZIP snapshots;
- вставку кода в чат;
- ручной перенос изменений;
- локальное reasoning внутри GPT-чатов;
- исторические stage-файлы и отчёты.
Во время архитектурного переосмысления начался переход к новой модели:
от:
- ZIP-only workflow;
- ручного анализа фрагментов;
- неустойчивого chat memory;
- исторической документации без operational слоя;
к:
- repository-aware workflow;
- GitHub Runtime Layer;
- внешней памяти проекта;
- AI-readable структуре;
- safe-change protocol;
- branch-based runtime changes;
- controlled compatibility-safe passes.
---
## 5. GitHub Runtime Layer
Внутри GPT-инфраструктуры проекта был создан отдельный чат с подключением к GitHub-репозиторию.
Подключённый репозиторий:
core-frontier
Текущее состояние GitHub-чата:
- чат уже имеет доступ к репозиторию;
- GPT может просматривать структуру проекта;
- GPT может видеть файлы;
- GPT может анализировать зависимости;
- GPT может читать актуальное состояние runtime;
- проект больше не ограничен только ZIP snapshots.
Текущая роль GitHub-чата:
- runtime inspection layer;
- просмотр репозитория;
- анализ структуры проекта;
- проверка файлов и зависимостей.
Ограничения:
- окончательная роль GitHub-чата ещё не утверждена;
- workflow взаимодействия ещё формируется;
- правила runtime edits ещё не зафиксированы;
- memory architecture ещё не утверждена.
Важно:
GitHub Runtime Layer уже стал частью проекта, но должен быть официально встроен в workflow через Stage 03.
---
## 6. GitHub Runtime Layer — workflow и token usage
Во время обсуждения Stage 03 были сформированы предварительные правила взаимодействия с GitHub-чатом и repository-aware workflow.
### 6.1. GitHub-чат не расходует repository interaction постоянно
Сам факт нахождения внутри GitHub-чата не означает постоянное взаимодействие с репозиторием.
Обычное обсуждение:
- архитектуры;
- reasoning;
- stage-планирования;
- workflow;
- AI-readable структуры;
- safe-change protocol;
работает как обычный chat reasoning layer.
Repository interaction начинается только в момент:
- чтения файлов;
- анализа репозитория;
- просмотра структуры;
- изменения файлов;
- создания branch;
- commit/write operations.
Главный вывод:
reasoning внутри GitHub-чата сам по себе не считается постоянным repo interaction.
---
### 6.2. GitHub не “печатает код”
GitHub Runtime Layer работает не как ручной ввод текста.
Модель взаимодействия ближе к:
- read file;
- analyze;
- write file(path, content);
- apply patch.
Следовательно:
обсуждение и подготовка content внутри GPT не равно постоянной записи в GitHub.
---
### 6.3. Наиболее дорогие операции
Наиболее тяжёлые repository operations:
- массовое чтение repo;
- repeated repo analysis;
- giant runtime patches;
- многофайловые refactor passes;
- repeated read → rewrite cycles.
Менее тяжёлые операции:
- создание одного markdown-файла;
- запись готового stage;
- documentation-only updates.
---
### 6.4. Workflow для документации
Правильный подход:
1. reasoning и подготовка stage происходят вне GitHub Runtime Layer;
2. stage подготавливается как готовый markdown;
3. GitHub-чат используется только для:
   - создания файла;
   - commit;
   - repository placement.
Главный принцип:
GitHub Runtime Layer должен быть исполнителем готового payload, а не местом хаотичного переписывания документации.
---
### 6.5. Workflow для runtime-кода
Правильный подход:
1. GitHub-чат читает только нужные файлы;
2. GPT анализирует зависимости;
3. reasoning и обсуждение проходят отдельно;
4. после согласования выполняется controlled patch;
5. изменения вносятся маленькими compatibility-safe passes.
---
### 6.6. Главный operational вывод по GitHub Runtime Layer
Проект постепенно переходит:
от:
- ZIP-only workflow;
- хаотичного reasoning;
- giant passes;
к:
- repository-aware workflow;
- controlled repo interaction;
- AI-readable architecture;
- safe-change protocol;
- cluster-based runtime evolution.
Но:
GitHub Runtime Layer пока рассматривается как controlled inspection/execution layer, а не как автономный runtime refactor engine.
---
## 7. GPT chat architecture
Внутри GPT была создана новая организационная структура чатов.
### Эволюция разработки игры v1
Назначение:
полный архив развития проекта.
Содержит:
- идеи;
- код;
- тесты;
- reasoning;
- историю решений;
- gameplay evolution;
- runtime evolution;
- ошибки и исправления.
Статус:
Historical + Reference.
Использовать:
- для восстановления контекста;
- для анализа эволюции решений;
- для поиска причин прошлых изменений.
Не использовать:
- как единственный актуальный source of truth перед новым runtime изменением.
---
### Черновик разработки v1
Назначение:
рабочий reasoning layer.
Используется как:
- мозговой штурм;
- поток инженерных мыслей;
- обсуждение архитектуры разработки;
- поиск решений;
- временный reasoning layer.
Статус:
Active Draft Reasoning.
Использовать:
- для генерации решений;
- для анализа архитектурных вариантов;
- для поиска новых workflow.
Не использовать:
- как финальный operational document без snapshot фиксации.
---
### Заметки разработки v1
Назначение:
стабилизация ключевых выводов.
Используется как:
- фиксация выжимок;
- сохранение ключевых решений;
- snapshots важных мыслей;
- промежуточная стабилизация reasoning.
Статус:
Active Snapshot Layer.
Использовать:
- для переноса reasoning в stage-файлы;
- для сохранения кратких архитектурных решений;
- для подготовки long-term memory проекта.
---
### Будущее игры v1
Назначение:
отдельная ветка будущего развития проекта.
Содержит:
- монетизацию;
- платформы;
- публикацию;
- marketplace strategy;
- развитие проекта после завершения runtime разработки.
Статус:
Future Planning.
Использовать:
- для стратегических решений;
- для планирования продукта;
- для анализа публикации и платформ.
Не использовать:
- как источник текущих runtime rules.
---
## 8. Project Memory Architecture
Stage 03 должен определить долговременную память проекта внутри репозитория.
Предварительно memory layer должен покрывать:
- reasoning archive;
- GPT chat snapshots;
- stage history;
- architectural decisions;
- evolution logs;
- current operational rules;
- active runtime constraints;
- dependency knowledge;
- rollback decisions;
- safe-change history.
Цель memory architecture:
создать долговременный слой знаний, который не зависит только от текущего GPT-чата.
Memory layer должен решать проблемы:
- потери контекста;
- перегруза chat history;
- смешивания исторических решений и актуальных правил;
- повторного объяснения одних и тех же зависимостей;
- неустойчивого reasoning между задачами.
---
## 9. AI-readable structure
AI-readable structure остаётся подтверждённой задачей Stage 03.
На текущем этапе решение о формате ещё не финализировано.
Рассматриваются два подхода:
### 9.1. Вариант A — отдельная AI-папка
Возможная структура:
- current state;
- file registry;
- dependency map;
- runtime contracts;
- change protocol;
- test checklist;
- Codex task template;
- rollback protocol.
Плюсы:
- отдельный operational слой;
- быстрый вход GPT/Codex в проект;
- меньше шума в коде.
Минусы:
- появляется новая сущность;
- есть риск рассинхронизации с реальными файлами.
---
### 9.2. Вариант B — AI-readable разметка внутри существующих файлов
Подход:
добавлять карту файла для AI в начало кодовых файлов и карту документа для AI в начало markdown-документов.
Пример для code files:
    /*
    КАРТА ФАЙЛА ДЛЯ AI
    ФАЙЛ:
    РОЛЬ:
    СОДЕРЖИТ СЕКЦИИ:
    ГЛОБАЛЬНО ЗАВИСИТ ОТ:
    ГЛОБАЛЬНО МЕНЯЕТ:
    ИСПОЛЬЗУЕТСЯ В:
    RUNTIME-КОНТРАКТЫ:
    НЕЛЬЗЯ:
    БЕЗОПАСНО:
    */
Пример для doc files:
    <!--
    КАРТА ДОКУМЕНТА ДЛЯ AI
    НАЗНАЧЕНИЕ:
    СТАТУС:
    ИСПОЛЬЗОВАТЬ КОГДА:
    НЕ ИСПОЛЬЗОВАТЬ КАК:
    СВЯЗАННЫЕ ФАЙЛЫ:
    -->
Плюсы:
- сам репозиторий становится картой;
- меньше внешних файлов;
- зависимости видны рядом с кодом;
- GPT/Codex легче понимать ownership.
Минусы:
- увеличивается объём файлов;
- требуется аккуратное обновление комментариев;
- возможно устаревание разметки при изменении кода.
---
## 10. Предварительное решение по AI-readable markup
На текущий момент предпочтительный первый шаг:
не создавать отдельную папку AI сразу, а начать с AI-readable разметки существующих файлов.
Причина:
проекту сначала нужна навигация внутри текущей структуры, а не новая надстройка.
Главный принцип:
не плодить новые сущности до фиксации memory architecture и workflow.
AI-readable markup должен быть выполнен отдельным safe pass после утверждения Stage 03.
Правила первого AI-readable pass:
- код не менять;
- механику игры не трогать;
- script order не менять;
- переменные не переименовывать;
- функции не переносить;
- не делать refactor;
- добавлять только комментарии, карты файлов и карты секций.
---
## 10.1. Двухуровневая модель первичной AI-readable разметки
Первичная AI-readable разметка должна быть двухуровневой.
### Уровень 1 — карта файла
Добавляется в начало каждого крупного code file.
Назначение:
дать GPT/Codex быстрый ответ на вопросы:
- за что отвечает файл;
- какие секции содержит файл;
- чем файл владеет;
- что он только читает;
- что он изменяет;
- кем используется;
- какие runtime-контракты нельзя ломать;
- какие изменения безопасны.
Базовый шаблон:
    /*
    КАРТА ФАЙЛА ДЛЯ AI
    ФАЙЛ:
    РОЛЬ:
    СОДЕРЖИТ СЕКЦИИ:
    ВЛАДЕЕТ:
    ЧИТАЕТ:
    ИЗМЕНЯЕТ:
    ИСПОЛЬЗУЕТСЯ В:
    RUNTIME-КОНТРАКТЫ:
    НЕЛЬЗЯ:
    БЕЗОПАСНО:
    */
Правило языка:
описание и поля разметки — на русском;
технические имена переменных, функций и файлов — как в коде.
---
### Уровень 2 — карта секций
Добавляется внутри крупных файлов над логическими блоками.
Назначение:
помочь GPT/Codex не читать файл как сплошную простыню, а видеть subsystem boundaries.
Базовый шаблон:
    // ======================================================
    // СЕКЦИЯ: СИСТЕМА ВОЛН
    // ТЕКУЩЕЕ МЕСТО: js/systems.js
    // РОЛЬ: управляет жизненным циклом волн и появлением врагов
    // ЗАВИСИТ ОТ: waveState, enemies, enemyTypes
    // ИЗМЕНЯЕТ: waveState, enemies
    // БУДУЩИЙ ВЫНОС: js/systems/waves.js
    // НЕЛЬЗЯ: напрямую менять UI layout здесь
    // ======================================================
---
## 10.2. Правила оформления AI-readable комментариев
AI-readable комментарии должны быть:
- короткими;
- фактическими;
- не философскими;
- не историческими;
- не превращёнными в stage report;
- не вмешивающимися в исполняемую логику.
Запрещено:
- менять порядок функций ради комментариев;
- переносить код между секциями;
- переименовывать переменные;
- менять runtime logic;
- добавлять новые managers в pass разметки;
- смешивать comments-only markup с gameplay fixes;
- добавлять большие исторические рассуждения внутрь code files.
Разрешено:
- добавить карту файла в начало файла;
- добавить разделители секций;
- описать ownership;
- описать runtime-контракты;
- отметить dangerous dependencies;
- отметить safe modification zones;
- указать future split candidates.
Пример future split candidates:
    /*
    БУДУЩИЕ КАНДИДАТЫ НА ВЫНОС:
    - wave lifecycle может быть вынесен в отдельный wave_manager.js;
    - tower targeting может быть вынесен в tower_combat.js;
    - build confirmation flow может быть вынесен в ui/build_flow.js.
    ПРИМЕЧАНИЕ:
    Это только архитектурная заметка.
    В текущем pass ничего не выносить и не рефакторить.
    */
---
## 10.3. Comments-only первый проход
Первый AI-readable markup проход должен быть строго comments-only.
Цель:
сделать проект читаемым для AI без изменения runtime behavior.
Запрещено в первом проходе:
- любые изменения логики;
- изменения gameplay;
- исправления UI;
- исправления HUD;
- изменение поведения CSS;
- изменение index.html script order;
- изменение структуры data;
- изменение структуры state;
- перенос функций;
- переименование функций;
- создание новых runtime modules.
Разрешено в первом проходе:
- карта файла для AI;
- карта документа для AI;
- карты секций;
- ownership notes;
- dependency notes;
- runtime contract notes;
- future split candidates;
- заметки TODO только если они не требуют немедленного runtime изменения.
---
## 10.4. Стратегия кластерной AI-readable разметки
AI-readable markup не должен выполняться одним giant repo-wide pass.
Предварительная стратегия:
### Проход 1 — inspection репозитория
Цель:
- прочитать структуру проекта;
- определить dependency chain;
- определить runtime contracts;
- определить subsystem clusters.
Без изменения кода.
---
### Проход 2 — кластер состояния и данных
Файлы:
- js/data.js;
- js/state.js.
Цель:
описать:
- data ownership;
- global state ownership;
- runtime contracts;
- fields that must not be renamed;
- compatibility risks.
---
### Проход 3 — кластер игровых систем
Файлы:
- js/systems.js.
Цель:
описать:
- wave lifecycle;
- tower logic;
- enemy updates;
- resources/power/base interactions;
- gameplay mutations.
---
### Проход 4 — кластер интерфейса
Файлы:
- js/ui/helpers.js;
- js/ui/layout.js;
- js/ui/controls.js;
- js/ui/panels.js;
- js/ui/notifications.js.
Цель:
описать:
- HUD ownership;
- panel logic;
- controls;
- layout calculations;
- mobile interaction risks.
---
### Проход 5 — кластер canvas/render
Файлы:
- js/ui/canvas_world.js;
- js/ui/canvas_entities.js;
- js/game.js.
Цель:
описать:
- render loop;
- canvas world rendering;
- entity rendering;
- camera dependency;
- interaction between draw/update/UI refresh.
---
## 10.5. Связь AI-readable markup с architecture.md и Developer Report
Подтверждённая структура знаний проекта:
architecture.md:
- глобальная карта проекта;
- file structure index;
- runtime architecture layer;
- актуальная high-level архитектура.
Stage files:
- история изменений;
- reasoning;
- задачи;
- incidents;
- QA;
- developer reports;
- conclusions.
Code files:
- локальная AI-readable разметка;
- ownership;
- runtime contracts;
- local subsystem boundaries;
- dangerous dependencies.
Developer Report соответствующего Stage должен фиксировать:
- changed files;
- new dependencies;
- preserved contracts;
- new contracts;
- runtime risks;
- architecture impact;
- required architecture.md updates.
Главный принцип:
Stage хранит детали изменений.
architecture.md хранит актуальную карту проекта.
Код хранит локальные контракты.
---
## 11. Safe-change protocol
Stage 03 должен закрепить новый safe-change protocol.
Базовые правила:
- main должен оставаться рабочей версией;
- runtime changes выполняются только отдельными ветками;
- каждый pass должен иметь ограниченный scope;
- запрещены массовые изменения state + layout + controls + panels одновременно;
- запрещено удалять старые поля state без compatibility layer;
- запрещено менять script order без отдельного migration plan;
- запрещено совмещать redesign и logic change;
- любое переименование runtime-функции должно сопровождаться alias минимум на один stage;
- каждое изменение должно иметь rollback plan.
Максимальный обычный pass:
- 1 runtime file;
- 1 UI file;
- 1 documentation update.
Запрещённый pass:
- state.js + layout.js + controls.js + panels.js одновременно.
---
## 12. Runtime compatibility rules
Проект использует браузерную архитектуру через порядок script в index.html.
Критический принцип:
runtime зависит от глобальных переменных и функций.
Предварительный script dependency chain:
data.js → state.js → systems.js → ui/* → game.js
Из этого следует:
### Нельзя
- менять порядок script без dependency review;
- удалять глобальные переменные без migration layer;
- переименовывать state-поля без compatibility layer;
- заменять целиком state objects;
- делать refactor глобальной архитектуры внутри gameplay task;
- менять UI layout и runtime state одновременно без отдельного плана.
### Можно
- добавлять новые поля additive-only;
- создавать compatibility aliases;
- добавлять section comments;
- документировать ownership;
- вводить новые managers постепенно;
- выполнять small compatibility-safe patches.
---
## 13. Подэтапы Stage 03
Stage 03 является master-stage и должен разбиваться на безопасные подэтапы.
Предварительная структура:
### 03.A — GPT chat architecture
Цель:
зафиксировать роли чатов, reasoning flow, snapshots и правила переноса выводов в проект.
Результат:
понятная структура работы GPT-чатов.
---
### 03.B — GitHub Runtime Layer
Цель:
описать правила использования GitHub-чата, repository-aware reasoning и ограничения runtime edits.
Результат:
GitHub становится управляемым inspection layer, а не хаотичным каналом изменений.
---
### 03.C — Project Memory Architecture
Цель:
определить структуру долговременной памяти проекта внутри репозитория.
Результат:
появляется система хранения reasoning, snapshots, decisions, history и active rules.
---
### 03.D — AI-readable structure
Цель:
подготовить правила AI-readable markup или отдельной AI-обвязки.
Результат:
проект становится читаемым для GPT/Codex без необходимости каждый раз восстанавливать контекст из всей истории.
---
### 03.E — Safe-change protocol
Цель:
зафиксировать branch workflow, rollback logic, compatibility rules и test checklist.
Результат:
каждый runtime pass становится контролируемым и откатываемым.
---
### 03.F — Возвращение к Stage 02.4.6
Цель:
после стабилизации workflow вернуться к Stage 02.4.6.
Результат:
runtime development продолжается через compatibility-safe passes.
---
## 14. Что нельзя делать внутри Stage 03
Запрещено:
- превращать Stage 03 в бесконечную meta-разработку;
- переписывать runtime до завершения Stage 03;
- чинить HUD параллельно с архитектурой workflow;
- смешивать AI-readable markup с gameplay logic changes;
- менять naming convention проекта;
- создавать хаотичные новые папки без stage decision;
- делать Codex runtime edits до фиксации safe-change protocol;
- использовать исторические документы как актуальный source of truth без проверки статуса.
---
## 15. Что разрешено делать внутри Stage 03
Разрешено:
- фиксировать reasoning;
- создавать stage snapshots;
- описывать chat architecture;
- описывать GitHub Runtime Layer;
- проектировать memory architecture;
- проектировать AI-readable markup;
- проектировать safe-change protocol;
- добавлять documentation-only changes;
- готовить rules для будущего Codex/GPT workflow.
---
## 16. Naming convention
Проект должен сохранить текущий стиль именования.
Правильный файл Stage 03:
docs/project/stage_03.md
Не использовать без необходимости:
- длинные английские stage names;
- новые naming patterns;
- хаотичные пути;
- параллельные stage conventions.
Язык проекта:
русский.
Следовательно:
- stage descriptions;
- architectural notes;
- workflow explanations;
- commit descriptions;
должны сохранять русский язык проекта.
---
## 17. Operational output workflow
Для проекта CORE FRONTIER принят единый operational output формат.
Operational artifacts должны быть:
- отдельно читаемыми;
- отдельно копируемыми;
- визуально разделёнными;
- удобными для ручного переноса;
- пригодными для GitHub workflow;
- пригодными для GPT-to-GPT transfer.
Правильный порядок выдачи operational output:
1. Действие.
2. Полный путь файла.
3. Имя файла.
4. Единый block с полным содержимым файла.
5. Короткий commit.
6. Расширенный commit.
Правила:
- не смешивать reasoning и operational output;
- не вставлять commentary внутрь operational blocks;
- не дробить содержимое файла на несколько частей;
- не использовать continuation;
- не размазывать содержимое файла по нескольким ответам;
- все пояснения давать только вне operational blocks.
Если внутри markdown-файла нужно показать пример кода, а сам файл выдаётся единым markdown block, вложенные тройные code fences использовать нельзя.
Вместо этого использовать indented code blocks через четыре пробела.
Причина:
вложенные тройные code fences ломают внешний markdown block и copy-paste workflow.
---
## 18. Operational principle
Главный принцип Stage 03:
Сначала стабилизируем систему разработки.
Потом продолжаем runtime evolution проекта.
Stage 03 должен оставаться operational document.
Он должен:
- фиксировать направление;
- фиксировать архитектурный переход;
- фиксировать правила;
- фиксировать подэтапы;
- сохранять связь со Stage 02.4.6;
- подготавливать проект к безопасному продолжению.
Но Stage 03 не должен пытаться сразу реализовать всю идеальную AI-систему.
---
## 19. Текущий следующий шаг
После создания stage_03.md следующий безопасный шаг:
1. Не трогать runtime code.
2. Зафиксировать Stage 03 commit.
3. Создать отдельный pass для AI-readable markup.
4. Начать с documentation/comment-only изменений.
5. После этого определить memory architecture.
6. После этого формализовать safe-change protocol.
7. Только затем возвращаться к Stage 02.4.6 runtime work.
---
## 20. Commit policy для Stage 03
Короткий commit:
Добавить Stage 03 архитектуры разработки
Расширенный смысл commit:
- зафиксировать architectural blocker Stage 02.4.6;
- зафиксировать переход к repository-aware workflow;
- зафиксировать GitHub Runtime Layer;
- зафиксировать GPT chat architecture;
- зафиксировать memory architecture planning;
- зафиксировать AI-readable structure planning;
- зафиксировать safe-change protocol planning;
- зафиксировать правила возврата к Stage 02.4.6.
---
## 21. Итог Stage 03
Stage 03 фиксирует новый архитектурный виток разработки CORE FRONTIER.
Проект больше не должен развиваться только через накопление runtime patches.
Перед продолжением gameplay evolution необходимо создать управляемую систему разработки:
- где GPT понимает актуальный контекст;
- где GitHub используется как runtime inspection layer;
- где историческая документация отделена от active rules;
- где memory проекта хранится вне одного чата;
- где AI-readable структура помогает безопасно менять код;
- где каждый pass ограничен, проверяем и откатываем;
- где Stage 02.4.6 может быть продолжена без повторения regression pattern.
Финальный принцип:
Не переписывать игру хаотично.
Сначала построить рельсы.
Потом продолжить движение.