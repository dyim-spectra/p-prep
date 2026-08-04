# Decomposition Round Practice — Hospital Patient Triage Queue

**Prompt:** "Design a system for a hospital's patient triage queue. When patients arrive at an ER, they need to be assessed and seen by doctors based on urgency, not strictly first-come-first-served."

**Format:** 20 minutes, solo, minimal scaffolding.

---

## Actors & goals

| Actor | Primary goal |
|---|---|
| Hospital Admin | Checks patients in (adds them to the system with ailment/urgency), assigns a doctor by specialty |
| Doctor | Sees patients, updates status (pending / in progress / complete), has a specialty |
| Patient | *Data subject, not an interactive actor* — nothing in this design has patients touching a UI directly; everything about them is entered/updated by admin or doctor. (Worth confirming explicitly rather than leaving implicit — if there's a self-check-in kiosk, this changes.) |

## Entities

- **Doctor** — id, name, **specialty** *(added — the design referenced specialty-based assignment but the field was missing)*
- **Patient** — id, name, ailment, urgency rating, time admitted, **required specialty** *(added — derived from ailment, needed for the assignment operation to actually be possible)*
- **Queue** — id, doctor, patient, urgency, timestamp, status (complete / pending / in progress / won't do)

**Modeling decision:** `Queue` is a separate bridge entity between `Doctor` and `Patient`, since it's a one-to-many relationship that changes continuously as new patients arrive — same bridge-entity pattern used across every prior scenario.

**Consistency check worth naming as a technique:** when an operation is described as depending on a piece of data (here, "assign doctor based on specialty"), go back and confirm that field actually exists on the entity — easy to state in prose and forget to reflect in the schema under time pressure.

## Operations

**Writes:**
- Create a queue entry (admin checks in a patient, assesses urgency and ailment). Admin cannot queue new patients after a doctor has left for the day.
- Update queue ordering: a new patient with higher urgency bumps lower-urgency patients down.
- **Re-triage a waiting patient** *(added — see gap below)*: a patient's urgency can be manually re-assessed while still waiting, independent of any new arrival.
- Doctor updates a queue entry's status (in progress / complete / won't do).

**Reads:**
- Ordered list of patients to be seen, per doctor
- List of all patients currently in queue

## The gap: urgency was only reordered by new arrivals, not by time already waiting

The original pass modeled the core "urgency, not FIFO" mechanic correctly for new arrivals — but a real ER's core challenge isn't just "where does a new patient slot in," it's that **a waiting patient's condition can worsen while they sit in the queue**, independent of anyone new arriving. The original design had no mechanism for this.

**This is a different category of gap than the usual "did I model the non-happy path triggered by an actor's action"** — it's a *passive* state change: does anything need to update even when no actor explicitly acts? Same family as staleness/expiration logic from earlier technical rounds, just applied to a person instead of a sensor reading.

**Fix:** a periodic or manually-triggered re-assessment operation, plus (arguably) a maximum-wait-time flag that surfaces "this patient has been waiting an unusually long time regardless of their original urgency rating" — a real, common safety mechanism in actual triage software.

## UI notes

- **Admin flow:** check in patient → assess urgency + ailment → assign doctor by matching specialty.
- **Queue:** recalculated on check-in based on existing queue + new patient's urgency; doctor's view updates live on any change.
- **Doctor flow:** screen to mark a patient in progress / complete / won't-do; can decline/reassign a patient.
- **Notification system:** confirms new queue entries; notifies on cancellation or doctor reassignment.
- On completion, doctor marks the queue entry done and the system advances to the next patient automatically.

## Non-happy path: doctor leaves for the day (emergency)

1. Doctor cancels/rejects remaining assigned patients.
2. System identifies all patients previously assigned to that doctor who still need care.
3. Those patients are reassigned to other available doctors (ideally still matched by specialty).
4. Staff are notified of the reassignment so nothing silently falls through.

## Demo slice: a waiting patient's condition worsens mid-wait

1. Patient A is in queue with a moderate urgency rating, several patients ahead based on the original assessment.
2. A nurse/admin notices Patient A's condition has changed and triggers a re-triage.
3. Patient A's urgency rating updates — the queue recalculates ordering the same way it does for a new arrival, bumping A ahead of lower-urgency patients now waiting.
4. The assigned doctor's live queue view updates to reflect the new order — same live-update pattern as the doctor-leaves-for-the-day reassignment case, just triggered by a data change instead of an actor leaving.
5. **Frontend judgment call worth naming:** does the doctor's screen need an explicit visual cue that the order just changed (not just a silently reordered list), so a doctor mid-task doesn't miss that someone new just became more urgent than who they were about to see next?

---

## Running checklist across all rounds so far

1. **Actors** — named, including whether each is a truly interactive actor or just a data subject
2. **Core mechanic** — the specific verb/behavior the prompt describes, modeled explicitly, not designed around
3. **Concurrency** — write-time guards where the prompt implies "only one / avoid conflicting"
4. **Non-happy paths triggered by an actor's action** — cancel, reassign, decline
5. **Passive/time-based state changes** — does anything need to update even when no actor explicitly acts?
6. **Entity-operation consistency** — does every field an operation depends on actually exist on the entity as modeled?