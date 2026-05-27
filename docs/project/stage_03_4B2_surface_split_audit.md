Stage 0.3.4B2 — Surface Split Audit

Repository Map Section 04 Split Crystallization

1. Purpose

This document captures the stabilized audit result for Repository Map section 04.

Section 04 is treated as:

Surface Topology / Surface Authority Layer

04 stores:

* runtime surface entities;
* DOM / canvas / CSS surface boundaries;
* surface authority boundaries;
* overlay boundaries;
* render sequencing visibility;
* source-grounded surface topology.

This document is:

* audit output;
* split crystallization artifact;
* bounded topology reference.

This document is NOT:

* mutation instruction;
* roadmap;
* runtime authority replacement;
* ontology system;
* raw reasoning archive.

⸻

2. Core Doctrine

04 must not duplicate:

* 02 function inventory;
* 03 relationship topology;
* 05 risk/pressure authority;
* 06 evidence routing authority.

04 stores:

* surface entities;
* surface authority boundaries;
* render/surface topology.

Runtime/source files remain authority.

Discovery may assist navigation/provenance only.

⸻

3. Final Split Decision

Repository Map 04 should split into:

repository_map_04_surfaces.yml
→ policy router / split registry
repository_map_04a_runtime_shell_surfaces.yml
repository_map_04b_dom_control_surfaces.yml
repository_map_04c_dom_panel_surfaces.yml
repository_map_04d_canvas_world_surfaces.yml
repository_map_04e_canvas_entity_surfaces.yml
repository_map_04f_canvas_hud_overlay_surfaces.yml
repository_map_04g_css_authority_surfaces.yml
repository_map_04h_render_sequence_surfaces.yml

The split follows semantic ownership boundaries rather than physical file mirroring.

04 split boundaries may diverge from physical source files where operationally justified.

⸻

4. 04a — Runtime Shell Surfaces

Domain:

* index.html shell;
* #topbar root;
* #game root;
* active inline CSS shell;
* runtime shell sequencing visibility.

Key rule:

index.html operates as browser runtime shell authority.

It does not own:

* gameplay logic;
* runtime state;
* rendering implementation;
* gameplay orchestration.

⸻

5. 04b — DOM Control Surfaces

Domain:

* bottom control panel;
* speed panel;
* zoom panel;
* build confirm panel;
* tower action panel;
* topbar chips.

Use:

surface_type: dom_panel
semantic_domain: dom_control_surface

Do not introduce:

surface_type: dom_control_surface

Callback/control wiring does not imply gameplay ownership.

⸻

6. 04c — DOM Panel Surfaces

Domain:

* menu panel;
* game-over DOM panel;
* DOM visibility synchronization;
* HUD text synchronization.

Key split rule:

panels.js belongs partially to:

* 04c DOM panel surfaces;
* 04f HUD overlay surfaces.

04c stores DOM panel and DOM synchronization topology only.

Canvas HUD overlays belong to 04f.

⸻

7. 04d — Canvas World Surfaces

Domain:

* map/grid;
* road/path/base;
* tower range overlay;
* build placement overlay;
* world render helpers.

Key rule:

visualization does not imply gameplay ownership.

drawBuildTile() visualizes placement validation but does not own validation logic.

⸻

8. 04e — Canvas Entity Surfaces

Domain:

* towers;
* enemies;
* selected tower highlight;
* target lines;
* HP bars.

04e represents render-only entity topology.

Do not infer:

* combat ownership;
* ECS architecture;
* render-engine ownership;
* gameplay subsystem authority.

⸻

9. 04f — Canvas HUD Overlay Surfaces

Domain:

* wave status overlay;
* selected tower info overlay;
* codex/info overlay;
* game-over dim overlay;
* notifications.

Use:

surface_type: notification_overlay
authority_type: lifecycle_authority

Notifications remain operationally distinct because they include:

* lifecycle behavior;
* queue behavior;
* render behavior.

⸻

10. 04g — CSS Authority Surfaces

Domain:

* active inline CSS;
* inactive css/style.css artifact;
* selector alignment pressure;
* responsive media-rule pressure.

Critical distinction:

active inline CSS
≠
inactive external CSS artifact

css/style.css exists but is not currently active because it is not linked from index.html.

Use for active inline CSS:

surface_type: inline_css
authority_type: active_css_authority
status: active_runtime

Use for inactive external CSS:

surface_type: external_css_artifact
authority_type: inactive_surface_artifact
status: inactive_runtime

⸻

11. 04h — Render Sequence Surfaces

Domain:

* update/render ordering;
* cross-surface render/update sequencing visibility;
* gameLoop() sequencing boundaries.

Do not introduce:

surface_type: render_sequence_surface

Use:

surface_type: canvas_surface
semantic_domain: render_sequence_surface
authority_type: lifecycle_authority

04h is not:

* render engine;
* scene manager;
* ECS subsystem;
* orchestration framework.

It represents bounded sequencing topology only.

⸻

12. Vocab Investigation Results

Approved / retained:

* notification_overlay;
* active_css_authority;
* inactive_surface_artifact.

Rejected / not added:

* dom_control_surface as surface type;
* render_sequence_surface as surface type;
* downstream mutation authority type variants.

Rule:

* surface_type defines broad surface category;
* semantic_domain defines specialized meaning.

⸻

13. Authority Type Discipline

Do not introduce:

authority_type: downstream_mutation_without_state_shape_ownership

Use instead:

* does_not_own;
* relationship refs;
* bounded surface notes.

Preferred authority types for 04:

* surface_authority;
* render_authority;
* helper_authority;
* lifecycle_authority;
* active_css_authority;
* inactive_surface_artifact;
* semantic_interpretation.

⸻

14. Evidence Gaps

Before 04 population, bounded 06 evidence expansion is required.

Missing source evidence ids:

evidence:source:css_style
evidence:source:ui_helpers
evidence:source:ui_layout
evidence:source:ui_notifications

04 population should not begin before these evidence gaps are resolved or explicitly deferred.

⸻

15. Required Record Shape

The current skeleton in repository_map_04_surfaces.yml is insufficient.

Recommended minimum shape:

surface_id:
surface_type:
semantic_domain:
status:
authority_type:
owner_refs: []
created_by_refs: []
updated_by_refs: []
rendered_by_refs: []
source_files: []
source_selectors: []
runtime_roots: []
function_refs: []
relationship_refs: []
evidence_refs: []
risk_refs: []
pressure_refs: []
does_not_own: []
notes: []

notes must remain bounded and operationally relevant.

Avoid prose accumulation and reasoning archival behavior inside records.

⸻

16. Anti-Entropy Rules

Do not store in 04:

* full CSS dumps;
* generated DOM snapshots;
* function inventory;
* call graph structures;
* relationship graph structures;
* gameplay ownership;
* speculative future systems;
* raw Discovery prose;
* refactor commands.

04 must remain:

* bounded;
* source-grounded;
* machine-readable;
* topology-oriented.

⸻

17. Recommended Execution Order

1. Finalize this audit artifact.
2. Perform 06-SURFACE-EVIDENCE1.
3. Convert repository_map_04_surfaces.yml into router / split registry.
4. Create empty split files 04a–04h.
5. Begin bounded surface population only after evidence and schema stabilization.

⸻

18. Final Classification

Status:

surface_split_audit_stabilized_repository_transfer_ready

⸻