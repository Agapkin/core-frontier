# Stage 0.3.4B3 — практический цикл 05 → 07 → 08
## проверка hotspot-зоны и обнаружение ограничений Repository Map

---

## С чего начиналась задача

Изначально предполагалось,
что Repository Map уже содержит достаточно информации,
чтобы:

- найти hotspot;
- проверить runtime boundary;
- подготовить будущий split candidate;
- не уходить глубоко в исходный код.

Ожидалось,
что основная работа будет происходить через:

02
→ orchestration layer

03
→ relationship layer

04
→ surface/boundary layer

05
→ hotspot/risk layer

После чего можно будет перейти к:

07
→ verification

и затем:

08
→ decision candidates.

---

## Что произошло во время проверки

Во время проверки hotspot:

risk:input_camera_loop_density

стало видно,
что Repository Map не содержит полного runtime truth.

Карта позволяла:

- понять направление поиска;
- увидеть hotspot;
- увидеть часть связей;
- увидеть некоторые orchestration relationships.

Но карта НЕ позволяла гарантированно определить:

- полный список участвующих функций;
- полный dependency graph;
- полный runtime call flow;
- cross-file usage;
- все state dependencies;
- реальные source boundaries.

---

## Что пришлось делать вручную

После этого GPT пришлось перейти напрямую в:

js/game.js

и вручную:

- перечитывать runtime/source код;
- искать связанные функции;
- проверять вызовы;
- определять orchestration roots;
- искать coordinate boundaries;
- искать input/camera связи;
- проверять state access;
- определять external runtime calls.

То есть:

карта перестала быть достаточным источником проверки,
и начался прямой source audit.

---

## Что стало понятно про Repository Map

Во время проверки выяснилось:

Repository Map сейчас является:

- navigation layer;
- operational reasoning layer;
- hotspot discovery layer.

Но НЕ является:

- полным техническим индексом кода;
- полным dependency graph;
- полным runtime source catalog.

Из-за этого:

02/03/04
не могут пока использоваться
как единственное основание
для безопасного runtime split.

---

## Что произошло с 07

Изначально 07 предполагался как:

verification layer.

Но из-за отсутствия технического индексного слоя
07 начал выполнять дополнительную роль:

временного ручного source-boundary container.

Во время 07 пришлось вручную фиксировать:

- source boundaries;
- internal calls;
- external runtime calls;
- coordinate helpers;
- input/camera связи;
- orchestration roots;
- state access;
- map gaps.

Из-за этого 07 оказался значительно тяжелее,
чем предполагалось изначально.

Фактически:

07 стал первым контейнером,
который частично выполняет роль ручного mini-index слоя.

---

## Что было вынесено в 07

В 07 были зафиксированы:

- hotspot boundary;
- source verification route;
- source-level evidence;
- связанные runtime функции;
- orchestration boundary;
- map gaps;
- state access;
- mutation restrictions.

Также 07 впервые зафиксировал:

evidence:source:game

для hotspot-зоны.

---

## Что произошло после 07

После завершения 07 стало видно:

- split нельзя утверждать автоматически;
- dependency truth всё ещё неполный;
- runtime boundaries остаются спорными;
- карта требует дополнительного индексного слоя.

Из-за этого стало необходимо разделить:

verification layer
и
decision layer.

---

## Как появился 08

08 появился как отдельный слой,
который НЕ выполняет mutation,
а хранит:

- варианты split;
- риски;
- спорные зоны;
- последствия для карты;
- unresolved questions.

08 специально НЕ:

- режет код;
- утверждает split;
- выполняет refactor;
- создаёт execution plan.

То есть:

07
→ проверяет

08
→ рассматривает варианты решений

---

## Что было вынесено в 08

В 08 были вынесены:

- candidate split options;
- boundary split варианты;
- risk notes;
- unresolved dependency questions;
- map synchronization preview;
- ограничения для первого mutation pass.

Также отдельно было зафиксировано:

mutation_permission: false

и:

selected_option: none

чтобы 08 не воспринимался
как утверждённый refactor plan.

---

## Что было вынесено в debt register

Во время цикла были обнаружены отдельные долги:

- отсутствие generated code index;
- synchronization gaps между 07, 05 и 01;
- отсутствие automatic dependency extraction;
- отсутствие automatic map synchronization;
- необходимость vocab normalization.

Эти проблемы были вынесены отдельно,
чтобы не перегружать 07 и 08.

---

## Что важно не перепутать

Этот цикл НЕ привёл к runtime mutation.

Код не разрезался.

Runtime split НЕ утверждался.

Весь цикл являлся:

- operational verification;
- source audit;
- split preparation;
- boundary discovery;
- architecture limitation discovery.

---

## Главный результат цикла

Главным результатом стало не создание 07 или 08 само по себе.

Главным результатом стало обнаружение,
что Repository Map без технического индексного слоя
не может быть единственным основанием
для безопасного runtime split.

Также цикл впервые сформировал практическую цепочку:

05
→ hotspot/risk

07
→ source verification

08
→ decision candidates

без выполнения runtime mutation.