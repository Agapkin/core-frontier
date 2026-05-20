# Repository Map Discovery — Prompt / Workflow Operational Notes

## 1. Назначение документа

Этот документ фиксирует operational observations, возникшие во время Batch 01–08 repository discovery cycle.

Это НЕ:

- workflow redesign;
- governance proposal;
- automation rollout;
- autonomous agent plan;
- repository_map.yml proposal.

Документ фиксирует:

- executor-side workflow observations;
- prompt structure stabilization findings;
- mutation vs reasoning behavior patterns;
- artifact handoff observations;
- GitHub-as-shared-memory workflow findings.

---

## 2. Prompt structure stabilization

Repository operationally demonstrated that highly-structured prompts significantly stabilized execution quality.

Open-ended prompts consistently increased:

- reasoning drift;
- architecture invention;
- hidden normalization pressure;
- workflow ambiguity;
- mutation uncertainty.

Bounded structured prompts reduced this behavior.

Operationally stable structure emerged around patterns such as:

```text
Repository:
Task:
Purpose:
Target files:
Cross-check against:
Critical focus:
Do NOT:
Expected AFTER MUTATION:
Operational Report:
```

This structure improved:

- mutation boundary clarity;
- execution targeting;
- scope preservation;
- runtime-truth alignment;
- verification reliability;
- continuation continuity.

Repository operationally discovered that explicit negative constraints (`Do NOT`) became especially important.

Without them, executor behavior tended toward:

- overexpansion;
- premature redesign;
- speculative normalization;
- automation pressure.

---

## 3. Mutation vs reasoning drift

The repository operationally exposed a repeating executor tendency:

```text
reasoning expansion instead of bounded execution
```

This became more visible when:

- prompts were broad;
- repository scope was unclear;
- target files were not explicit;
- mutation boundaries were implicit;
- continuation state was missing.

Drift was significantly reduced by:

- explicit mutation targets;
- explicit audit-only labeling;
- explicit non-goals;
- bounded AFTER MUTATION reporting;
- runtime-truth reminders.

Operationally, audit-only passes behaved differently from mutation passes.

Audit-only passes stabilized:

- verification behavior;
- contradiction detection;
- cognition review;
- relationship analysis;
- hidden ambiguity exposure.

Mutation passes created higher risk of:

- overwrite drift;
- accidental normalization;
- truncation;
- architecture invention.

This produced an operational pattern:

```text
verification before mutation
```

rather than:

```text
reasoning-first rewriting
```

---

## 4. Continuation-state handling

Repository operationally confirmed that continuation-state reminders became critical once repository cognition grew.

Without explicit continuation-state preservation:

- previous findings drifted;
- already-verified interpretations were reopened;
- overwrite-from-memory risk increased;
- synchronization inconsistencies accumulated.

The following stabilization behaviors emerged:

### Fresh source reads

Repository operationally discovered:

```text
fresh reads reduce hallucinated continuity
```

This became especially important after:

- repository drift;
- partial truncation;
- interrupted mutation cycles;
- cross-branch coordination.

---

### Readback verification

Repository operationally confirmed that mutation reports alone were insufficient.

Readback verification became mandatory because:

- connector mutation success did not guarantee repository-state correctness;
- truncation could occur silently;
- synchronization-sensitive cognition files could partially fail.

Operational workflow therefore stabilized around:

```text
write → re-read → verify visibility
```

instead of:

```text
write → assume success
```

---

### Overwrite-from-memory risk

Repository operationally discovered:

```text
reconstruction-from-memory becomes dangerous after repository evolution
```

Reasons included:

- partial synchronization drift;
- branch divergence;
- evolving discovery semantics;
- hidden verification updates.

Therefore:

- fresh repository reads;
- bounded patching;
- explicit continuation-state reminders;

became operational safeguards.

---

## 5. GitHub as artifact-handoff layer

Repository operationally evolved GitHub into a shared cognition/artifact layer.

Operationally, GitHub functioned as:

- synchronization anchor;
- evidence persistence layer;
- inter-agent handoff layer;
- repository cognition memory.

Important artifacts included:

- discovery files;
- verification notes;
- correction states;
- stage documents;
- audit reports;
- closure artifacts.

Repository operationally discovered that artifact-mediated coordination appeared safer than direct autonomous mutation loops.

Reason:

Artifacts preserved:

- visible state;
- verification history;
- bounded context;
- contradiction visibility;
- synchronization checkpoints.

This reduced:

- hidden reasoning drift;
- invisible mutation chains;
- silent normalization;
- autonomous divergence.

---

### Connector limitations

Relocation testing operationally revealed an important limitation:

```text
connector create/delete != true git mv
```

This changed repository operational understanding of:

- relocation safety;
- cognition infrastructure risk;
- synchronization guarantees.

Repository operationally concluded that active cognition infrastructure should not be relocated through sequential create/delete mechanics.

---

## 6. Human steering observations

Repository operationally demonstrated that bounded human steering significantly stabilized workflow continuity.

Human interruption/scope correction repeatedly prevented:

- overengineering;
- premature abstraction;
- governance expansion;
- fake architecture normalization;
- automation-before-cognition rollout.

Strategic questioning frequently exposed:

- hidden runtime ambiguity;
- ownership inconsistencies;
- synchronization risks;
- connector limitations;
- cognition-pressure zones.

Human approval also stabilized:

- continuation order;
- mutation sequencing;
- audit timing;
- correction timing;
- workflow boundedness.

Repository operationally suggested that:

```text
bounded human steering is stabilizing infrastructure
```

rather than merely external supervision.

---

## 7. Future bounded automation observations

Repository operationally suggests that limited future automation may become useful only after repository cognition compression stabilizes.

Potential bounded future directions:

- drift verification assistance;
- bounded re-discovery verification;
- artifact synchronization checking;
- repository-map consistency checking;
- lightweight navigation regeneration.

However, the discovery cycle operationally demonstrated risks around:

- premature automation;
- incomplete cognition;
- synchronization-sensitive infrastructure;
- false architectural assumptions.

Therefore future automation, if any, should remain:

- bounded;
- verification-oriented;
- artifact-driven;
- runtime-truth-constrained;
- human-steered.

Repository operationally rejected the idea of:

```text
fully autonomous repository evolution
```

at the current cognition maturity stage.

---

## 8. Operational conclusion

Batch 01–08 repository discovery did not only map runtime/surface structure.

It also operationally stabilized:

- bounded cognition workflow;
- structured prompting discipline;
- verification-first execution;
- readback verification discipline;
- artifact-mediated synchronization;
- continuation-state handling;
- anti-overwrite behavior.

The repository therefore produced two parallel outputs:

1. repository runtime/surface cognition;
2. operational workflow cognition.

Both now act as evidence layers for future repository cognition/compression research.
