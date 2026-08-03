# Decomposition Round Practice — Fleet Equipment Maintenance (Timed, Solo Run)

**Prompt:** "Design a system for tracking equipment maintenance across a fleet. Operations teams need to know which vehicles/equipment are due for scheduled maintenance, log completed work, and flag anything overdue."

**Format:** 20 minutes, solo, minimal scaffolding — closest simulation yet to the real round.

---

## Your answer

### Actors & goal
- **Actor:** those doing maintenance on the equipment/vehicles
- **Goal:** track vehicles and their maintenance needs

### Entities
- **Vehicle** — holds general info about the equipment/vehicle
- **Maintenance** — holds vehicle reference, next scheduled maintenance date, and completed date

### Operations
- Add a vehicle/equipment entity
- Enter the next scheduled maintenance date for a vehicle
- On completion: enter the completed date (marks the current `Maintenance` row done) and enter the *next* scheduled date (creates a new `Maintenance` row)

### Demo slice
- UI: a table of vehicles/equipment showing info + scheduled maintenance date
- "Overdue" flagging: backend queries all vehicles' current maintenance (`completedAt IS NULL`); if the scheduled date is before today, marks `overdue = true`
- UI highlights overdue vehicles in yellow based on that flag
- Sort/filter component, including a filter for "all overdue"
- Selecting a vehicle opens its full maintenance history

---

## What was strong

- **Correctly reused the "single entity, nullable completion field" pattern** from the equipment-checkout scenario, applied to a new domain without prompting — a new `Maintenance` row gets created on completion rather than mutating the old one, same shape as the earlier `CheckoutHistory` design.
- **"Overdue" modeled as a computed condition, not a separately-stored flag that could drift out of sync** — consistent with the computed-availability reasoning built up across earlier scenarios.
- **The history drill-down (select a vehicle → see past maintenance)** was added without being asked for — good product instinct, not just answering the literal prompt.

## Gaps flagged — worth mentioning, not just the happy path

**1. Actors were thinner than the prompt actually supports.**
The prompt itself implies at least two different relationships to the system: someone who *does* the physical maintenance work (logging completion) versus someone who *monitors* fleet status (scanning for overdue equipment, maybe assigning work — a dispatcher/fleet manager role). Only one actor was named. Worth asking: does the person checking a dashboard need a different view or permissions than the person completing the work?

**2. Where does "next maintenance date" come from?**
The answer had a technician manually typing an arbitrary next date. A more complete answer raises the question of whether there's a maintenance **interval** per vehicle/category (e.g., every 90 days) that auto-suggests the next date, which the technician then confirms or overrides — even just raising this as an open question shows deeper thinking, without needing to fully design it.

**3. No non-happy paths were raised at all.**
Nothing on: rescheduling a maintenance date before it's completed, a vehicle being decommissioned mid-cycle (what happens to its pending maintenance record?), or cancelling a scheduled maintenance entirely. Same category of gap as the ride-share scenario's driver-inactive/rider-cancels cases — worth self-prompting "what happens when someone needs to undo or change this?" without being asked.

**4. "Backend computes `overdue`" was stated, not justified.**
Given the earlier pattern of computing derived values client-side (e.g., `isStale` in the `VehicleDetailPanel` exercise), it's worth explicitly asking whether `overdue` needs to be computed server-side at all, or whether the frontend could derive it directly from the raw scheduled date. Either answer is defensible — but stating *why* (e.g., "backend, so every consumer of this data gets consistent overdue logic without duplicating it") is the reasoning that was strong in earlier rounds and missing here.

---

## Takeaway for next practice

The core mechanics — entity modeling, computed-vs-stored values, reusing patterns across unrelated domains — are fast and solid under time pressure now. The specific thing to self-check *without prompting*, right after a first pass on entities/operations and before declaring done:

1. **Are there actors implied by the prompt's own wording that I haven't named?**
2. **What are the undo/change/cancel operations for what I've just designed, and what do they cascade into?**

Both gaps here showed up specifically because there was less scaffolding pushing toward them — which is exactly the condition Tuesday will actually have.