# Stage 0.3.4B1 — Repository Map Relationship Layer Architecture Design
# Practical Population Revision and Split Migration Contract

Status:
Practical architecture revision.

Relationship population has already begun inside:

docs/project/repository_cognition/repository_map/repository_map_03_relationships.yml

Current file status:
active bounded relationship population layer.

Future intended status:
index / policy / routing layer after split migration.

No runtime/source mutation allowed.
No Discovery mutation required.
No Repository Map population rollback implied.

━━━━━━━━━━━━━━━━━━━━
1. Purpose
━━━━━━━━━━━━━━━━━━━━

This stage defines the practical architecture contract for the Repository Map relationship layer.

The contract exists to:

* preserve already completed bounded relationship work;
* prevent relationship graph explosion;
* define practical topology pressure zones;
* prepare migration from one active 03 file into split relationship files;
* avoid repeating giant-YAML pressure previously encountered in the function layer;
* stabilize future relationship population discipline;
* preserve source-confirmed operational topology cognition.

This document is NOT:

* runtime authority;
* relationship population itself;
* generated dependency graph;
* parser output;
* complete call graph;
* autonomous architecture engine.

This document is:

bounded practical relationship topology contract
+
split migration contract.

━━━━━━━━━━━━━━━━━━━━
2. Current Transitional State
━━━━━━━━━━━━━━━━━━━━

Current physical state:

repository_map_03_relationships.yml

currently contains:

* relationship policy;
* relationship groups;
* admission rules;
* anti-entropy notes;
* actual bounded relationship records.

Therefore, repository_map_03_relationships.yml is NOT currently index-only.

Current role:

active bounded relationship population layer.

Future intended role:

relationship index / policy / router layer.

The existing relationship records are valid and should NOT be discarded.

They should later be migrated into split files according to practical topology pressure zones.

━━━━━━━━━━━━━━━━━━━━
3. Why Split Migration Is Needed
━━━━━━━━━━━━━━━━━━━━

Practical population proved that relationship records grow through different entropy zones.

Relationship topology does not grow cleanly by abstract entity type.

It grows by operational pressure:

* infrastructure links are stable;
* load-order links are stable;
* lifecycle bridges grow moderately;
* validation chains create helper-spam risk;
* UI callbacks create callback explosion risk;
* render relationships duplicate easily;
* mutation/state/coordinate relationships become unreadable fastest.

Therefore:

03 split architecture is NOT ontology split.

03 split architecture IS entropy-containment split.

Split boundaries are pressure-containment boundaries.

━━━━━━━━━━━━━━━━━━━━
4. Filesystem Visibility Recovery Era
━━━━━━━━━━━━━━━━━━━━

Practical Repository Map population revealed that relationship work could no longer safely continue using connector visibility alone.

As Repository Map complexity increased:

* connector filesystem visibility became unreliable;
* AI navigation confidence degraded;
* topology verification risk increased;
* split-layer synchronization risk increased;
* manual repository traversal became unsafe.

This operational pressure led to creation of:

* repository_manifest.yml
* scripts/generate_repository_manifest.py
* .github/workflows/update-repository-manifest.yml

These files were NOT introduced as generic automation tooling.

They were introduced as:

filesystem visibility recovery infrastructure.

This infrastructure restored:

* deterministic filesystem visibility;
* repository traversal trust;
* split-layer verification capability;
* bounded AI navigation support;
* source-confirmable repository structure awareness.

Practical relationship population became operationally safe only after filesystem visibility trust was restored.

Filesystem truth infrastructure therefore became prerequisite for continued Repository Map scalability.

━━━━━━━━━━━━━━━━━━━━
5. Repository Map Layer Model
━━━━━━━━━━━━━━━━━━━━

01_files
→ semantic file/entity inventory

02_functions / 02a–02g
→ operational function cognition

03_relationships
→ operational relationship topology

04_surfaces
→ UI / DOM / canvas / surface topology

05_risks_pressure
→ pressure and risk interpretation

06_evidence_refs
→ source verification and provenance anchors

07_hotspots
→ cross-pressure diagnostics

03_relationships connects existing semantic entities.

03 does not replace:

* source code;
* repository manifest;
* Discovery;
* function inventories;
* risk layer;
* surface layer.

━━━━━━━━━━━━━━━━━━━━
6. Core Doctrine
━━━━━━━━━━━━━━━━━━━━

calls != topology

A function call alone is NOT sufficient reason to create a relationship record.

Relationship records exist only when they improve operational visibility.

A relationship may be admitted only if it shows at least one:

* orchestration delegation;
* lifecycle transition;
* ownership boundary crossing;
* source/load-order dependency;
* runtime/surface bridge;
* validation decision path;
* render/non-ownership boundary;
* state mutation hotspot;
* modularization risk;
* pressure propagation.

Low-value runtime trivia must remain outside Repository Map.

━━━━━━━━━━━━━━━━━━━━
7. Relationship Groups vs Physical Files
━━━━━━━━━━━━━━━━━━━━

relationship_group
= semantic classification of a relationship record.

03a–03g split files
= physical storage and entropy-containment structure.

They are related but NOT identical concepts.

A relationship group defines meaning.

A split file defines storage boundary.

Preferred rule:

one major topology pressure zone = one split file.

However:

topology pressure zones may evolve independently.

Physical split boundaries may later adapt if practical population reveals safer containment structures.

━━━━━━━━━━━━━━━━━━━━
8. Practical Split Architecture
━━━━━━━━━━━━━━━━━━━━

Current state:

repository_map_03_relationships.yml
→ active bounded relationship population layer.

Future target structure:

repository_map_03_relationships.yml
→ index / policy / router / migration status

repository_map_03a_infrastructure_relationships.yml
→ filesystem truth automation + Repository Map internal lineage

repository_map_03b_runtime_load_order_relationships.yml
→ browser-global runtime bootstrap/load-order topology

repository_map_03c_runtime_lifecycle_relationships.yml
→ orchestration/lifecycle delegation topology

repository_map_03d_validation_relationships.yml
→ validation/build/placement topology

repository_map_03e_ui_callback_relationships.yml
→ UI callback/runtime dispatch topology

repository_map_03f_render_boundary_relationships.yml
→ render/non-ownership visualization topology

repository_map_03g_state_coordinate_hotspot_relationships.yml
→ coordinate mapping + mutation hotspot topology

This split architecture is pressure-oriented rather than ontology-oriented.

━━━━━━━━━━━━━━━━━━━━
9. Already Populated Relationship Groups
━━━━━━━━━━━━━━━━━━━━

The current monolith file already contains valid bounded records for:

filesystem_truth_infrastructure

Examples:

* workflow → generator
* generator → manifest

runtime_load_order

Examples:

* data → state
* state → extracted systems
* systems → UI layers
* UI layers → game

Important:

load-order topology expresses runtime bootstrap sequencing only.

It does NOT imply:

* ownership authority;
* lifecycle authority;
* orchestration ownership.

repository_map_function_split

Examples:

* 02_functions → 02a
* 02_functions → 02b
* 02_functions → 02c
* 02_functions → 02d
* 02_functions → 02e
* 02_functions → 02f
* 02_functions → 02g

runtime_lifecycle_bridges

Examples:

* startWave → createWave
* startWave → spawnEnemy

Lifecycle bridges prioritize:

orchestration delegation visibility
over local helper coordination visibility.

These records are valid and should later migrate into split files.

━━━━━━━━━━━━━━━━━━━━
10. Split Migration Plan
━━━━━━━━━━━━━━━━━━━━

Split migration should proceed through bounded operational passes.

Pass A:
Create split skeleton files only.

Allowed:

* create 03a–03g skeleton files;
* update 03 index/policy file;
* add split registry;
* preserve current records;
* do NOT move records yet.

Pass B:
Move infrastructure relationships.

Move into:

repository_map_03a_infrastructure_relationships.yml

Includes:

* workflow → generator
* generator → manifest
* Repository Map lineage relationships

Pass C:
Move runtime bootstrap/load-order relationships.

Move into:

repository_map_03b_runtime_load_order_relationships.yml

Includes:

* data → state
* state → extracted systems
* extracted systems → systems
* systems → UI layers
* UI layers → game

Pass D:
Move lifecycle bridge relationships.

Move into:

repository_map_03c_runtime_lifecycle_relationships.yml

Includes:

* startWave → createWave
* startWave → spawnEnemy

Pass E:
Convert repository_map_03_relationships.yml into index/router layer.

After migration this file should contain:

* meta;
* split registry;
* relationship_type_policy;
* admission rules;
* anti-entropy rules;
* migration status;
* topology doctrine;
* no operational relationship records except optional split references.

━━━━━━━━━━━━━━━━━━━━
11. Population Admission Rules
━━━━━━━━━━━━━━━━━━━━

A relationship may be added only if:

* source or evidence verification exists;
* operational value is clear;
* topology visibility improves;
* relationship is not parser output;
* ownership is not inferred from calls;
* relationship is not low-value runtime trivia;
* synchronization pressure remains acceptable.

A relationship SHOULD remain omitted if it is merely:

* helper call;
* local utility invocation;
* temporary variable mutation;
* same-domain trivial coordination;
* repeated render-loop invocation;
* low-level DOM write already covered by 04_surfaces;
* pressure interpretation better suited for 05_risks_pressure;
* hotspot aggregation better suited for 07_hotspots.

━━━━━━━━━━━━━━━━━━━━
12. Population Stop Rules
━━━━━━━━━━━━━━━━━━━━

Population MUST stop if:

* relationship growth resembles call graph output;
* helper chains expand without operational value;
* callback wiring becomes exhaustive;
* render relationships duplicate endlessly;
* mutation topology becomes unreadable;
* prose explanations accumulate;
* verification confidence weakens;
* synchronization pressure exceeds topology value.

When uncertain:

omit the relationship.

Do NOT force speculative edges into Repository Map.

━━━━━━━━━━━━━━━━━━━━
13. Relationship Record Schema
━━━━━━━━━━━━━━━━━━━━

Operational schema:

relationship_id:
relationship_group:
relationship_type:
source_ref:
target_ref:
semantic_strength:
operational_reason:
evidence_refs:

Optional:

source_layer:
target_layer:
population_priority:

operational_reason must remain:

* short;
* source-grounded;
* non-narrative;
* topology-oriented.

Recommended length:

3–12 words.

━━━━━━━━━━━━━━━━━━━━
14. Relationship Types
━━━━━━━━━━━━━━━━━━━━

Relationship groups define topology pressure zones.

Relationship types define edge semantics only.

Supported bounded types:

* calls
* bridges_to
* mutates
* reads
* renders
* depends_on_load_order
* calls_without_ownership
* visualizes_without_owning
* mutates_without_owning_shape
* provides_helper_for
* derived_from
* cross_verifies_with

New relationship types require vocab alignment before use.

━━━━━━━━━━━━━━━━━━━━
15. Runtime Authority Constraints
━━━━━━━━━━━━━━━━━━━━

Runtime/source files remain:

* execution truth;
* operational authority;
* synchronization authority.

repository_manifest.yml remains:

* filesystem truth authority.

Filesystem automation infrastructure remains:

* bounded verification substrate;
* repository visibility support layer;
* synchronization-support infrastructure.

Repository Map remains:

* interpretive topology layer;
* non-runtime-authoritative cognition infrastructure.

Discovery remains:

* investigation history;
* provenance archive;
* extraction history layer.

Discovery is NOT:

* operational truth;
* synchronization authority;
* runtime substrate.

Relationship population should verify directly against source/runtime files whenever possible.

━━━━━━━━━━━━━━━━━━━━
16. Branch / Main Safety Rule
━━━━━━━━━━━━━━━━━━━━

Important operational lesson:

Accepting a new main baseline without unmerged-artifact audit can preserve conceptual reasoning while losing physical files.

Before any:

* reset;
* rebase;
* branch cleanup;
* baseline replacement;
* synchronization against new main;

perform:

unmerged-artifact audit.

Required audit steps:

* compare old branch vs main;
* list changed files;
* identify unmerged stage documents;
* identify unmerged skeleton packages;
* identify unmerged architecture contracts;
* preserve required artifacts through cherry-pick, migration or recreation;
* only then accept new main baseline.

This rule was derived from practical operational loss risk encountered during Stage 0.3.4B1 evolution.

━━━━━━━━━━━━━━━━━━━━
17. Anti-Entropy Rules
━━━━━━━━━━━━━━━━━━━━

03 MUST avoid:

* graph explosion;
* call-graph drift;
* parser-dump behavior;
* duplicated inventories;
* prose accumulation;
* speculative topology;
* helper spam;
* callback explosion;
* render duplication;
* mutation graph overgrowth.

Every relationship must satisfy at least one:

* topology significance;
* orchestration significance;
* lifecycle significance;
* ownership significance;
* pressure significance;
* modularization significance.

Low-value runtime trivia MUST remain outside Repository Map.

━━━━━━━━━━━━━━━━━━━━
18. Operational Conclusion
━━━━━━━━━━━━━━━━━━━━

Stage 0.3.4B1 evolved from theoretical relationship ontology planning into practical operational topology architecture.

Current valid state:

repository_map_03_relationships.yml
= active bounded relationship population layer.

Future target state:

repository_map_03_relationships.yml
= relationship index / policy / router layer.

03a–03g
= operational split topology files.

The goal is NOT to discard current relationship work.

The goal is to migrate existing valid topology into safer entropy-contained physical structure before relationship growth becomes unmanageable.

Repository Map continues evolving as:

* bounded semantic cognition infrastructure;
* operational navigation substrate;
* topology-aware architectural scaffold;
* filesystem-visible verification-supported cognition layer;
* anti-entropy repository cognition system.
