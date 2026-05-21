# Repository Map Population Workflow

Stage: 0.3.4B
Scope: Local Repository Map cognition workflow protocol
Status: Active operational protocol

---

## 1. Source truth rule

Runtime/source code and actual runtime behavior remain absolute truth.

Repository Map is not runtime authority.
Discovery is not runtime authority.
AI-readable markup/comments are not runtime authority.

If Repository Map, Discovery, comments or AI-readable markup conflict with actual runtime/source behavior:

runtime/source wins.

---

## 2. Reality-first rule

Repository Map must describe current verified repository reality.

Do NOT:

- beautify architecture
- hide mixed responsibility
- rename overloaded files into clean architecture layers
- treat pressure as implementation
- treat future refactor candidates as existing systems
- treat helper as framework
- treat callback bridge as ownership
- treat render visualization as gameplay ownership
- normalize tower-specific code into generic object system

If the current system is mixed:
mark it as mixed.

If something is not implemented:
mark it as not implemented.

If something is future pressure:
mark it as pressure only.

---

## 3. Conflict resolution rule

If Repository Map, Discovery, AI-readable markup, comments or runtime assumptions conflict:

Do NOT silently normalize or rewrite understanding.

Required process:

1. Highlight the conflict.
2. Recheck actual runtime/source files.
3. If needed, inspect connected files deeper.
4. Determine where mismatch exists:
   - Repository Map
   - Discovery
   - AI markup/comments
   - current interpretation
5. Perform bounded correction pass.
6. Correct only the layer that is actually wrong.

Do NOT automatically rewrite all layers.

---

## 4. Cross-layer verification rule

Repository Map layers must not be treated as isolated truth containers.

When ambiguity, pressure, mismatch or uncertainty appears,
verification should cross-check:

- runtime/source files
- Discovery provenance/evidence
- neighboring Repository Map layers

No single layer is self-sufficient truth.

Runtime/source provides actual authority.
Discovery provides provenance and verification context.
Neighboring Repository Map layers may expose hidden contradictions or semantic drift.

If needed,
perform deeper reread before semantic stabilization.

Localize conflicts before correction.

Correction passes must remain bounded.

---

## 5. No Discovery prose copy rule

Discovery preserves:

- reasoning
- extraction
- provenance
- verification history

Repository Map preserves:

- compressed semantic topology
- bounded operational cognition

Do NOT copy long Discovery prose into Repository Map.

---

## 6. Split-package discipline

Each Repository Map file has a bounded role.

Examples:

- vocab = shared semantic language
- 01_files = file inventory
- 02_functions = function inventory
- 03_relationships = relationships
- 04_surfaces = DOM/CSS/canvas topology
- 05_risks_pressure = risks/pressure
- 06_evidence_refs = evidence anchors
- 07_hotspots = diagnostic telemetry

Do NOT collapse package into giant YAML.

---

## 7. Index synchronization rule

After any Repository Map layer changes status or scope,
repository_map_index.yml must be checked.

If needed, update:

- meta.status
- meta.scope
- layer_separation
- package_file_registry.status
- placeholders.package_status
- package_warnings

If no update is needed,
explicitly mention this in audit output.

---

## 8. Reference anchoring rule

If populated layers reference:

- risk_refs
- evidence_refs

those refs should either:

- have minimal anchor records
- or be explicitly treated as forward refs

Prefer minimal bounded anchors.

---

## 9. Direct-main workflow rule

Repository Map cognition-layer-only changes may be made directly on main when:

- changes stay inside:
  docs/project/repository_cognition/repository_map/
- runtime/source/gameplay files are untouched
- no structural moves are involved
- no GitHub Pages/runtime-impacting files are touched

Branch + PR + merge remains required for:

- runtime/source/gameplay changes
- structural moves/relocations
- dangerous broad mutations
- uncertain connector operations
- GitHub Pages/runtime-impacting changes

---

## 10. Commit discipline

Every commit should contain:

- short Russian title
- expanded Russian body

Expanded body should preserve:

- what changed
- why it changed
- what was intentionally NOT expanded
- runtime/source safety
- Discovery safety
- synchronization reasoning

Do NOT leave semantic reasoning only in chat reports.

Git history must preserve mutation lineage.

---

## 11. Standard audit cycle

Recommended Repository Map pass flow:

- preliminary reasoning
- bounded task
- repository execution
- reviewer audit
- source/runtime verification where needed
- Discovery cross-check where needed
- correction pass if needed
- index synchronization check
- final audit/report

---

## Limits

Do NOT:

- modify runtime/source files during Repository Map cognition-only passes
- modify Discovery files unless explicitly required
- introduce automation implicitly
- introduce generated snapshots implicitly
- expand into governance systems
- convert Repository Map into giant workflow philosophy archive
- copy large reasoning archives into Repository Map

---

## Index decision

repository_map_index.yml checked.

No update required.

Reason:
repository_map_population_workflow.md is an operational workflow protocol,
not a semantic topology layer inside Repository Map package structure.
