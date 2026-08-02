# Decomposition Round Practice — Review Notes

**Format reminder:** ~1 hour, plain text editor, no diagramming tool. Open-ended, underspecified prompt. Goal isn't a finished solution — it's showing you can scope ambiguity: actors → goals → entities → operations → one demo slice, stating assumptions out loud as you go.

---

## Scenario 1: Shared Equipment Library

**Prompt:** "A team wants to track physical equipment (cameras, drones, tools, etc.) that members can check out and return."

### Actors & goals

| Actor | Primary goal |
|---|---|
| Admin | Add/remove inventory, track who has what and due dates (if any) |
| Team member (checker-out) | Check equipment out, check it back in |

### Entities

- **User** — the person checking things in/out
- **Inventory** — the equipment itself (camera, phone, drone, etc.)
- **CheckoutHistory** — one entity, not split into "active" vs. "history" tables

**Key decision + your reasoning:** single `CheckoutHistory` table with a nullable `returnedAt` field. `returnedAt IS NULL` = currently checked out. You chose this over two separate tables (active / historical) because expected checkout volume is small (team-scale, not enterprise-scale) — so the simplicity of one table outweighs the query-performance benefit a split table would give at large scale. Good instinct: **state the scale assumption that justifies the choice**, not just "which is theoretically better."

### Operations

**Writes:**
- Add / remove / update an inventory item
- Check out an item (create `CheckoutHistory` row)
- Check in an item (set `returnedAt`)

**Reads (easy to forget, but just as important):**
- What's currently checked out (system-wide)
- Who has item X right now
- What does user Y currently have checked out

**Technique to reuse:** explicitly separate *write* verbs from *read/query* verbs — the reads are often what an admin actually uses day-to-day, and they're easy to skip if you only think in terms of "actions."

### Demo slice: "a team member checks out an available drone"

Recommended full narration (frontend-weighted, since that's the actual round emphasis):

1. **List/grid view** shows each item with status (`Available` / `Checked out — due [date]`), so the user knows before clicking whether an item is even reachable.
2. **Detail view** on click — shows item specifics, "Check Out" button enabled since it's available.
3. **Before commit:** confirm who's checking out (from session, not re-entered), and since due dates are optional in this design, either a date picker or a skip option.
4. **On "Confirm Checkout":** optimistic update — flip the item's status in the UI immediately, disable the button, *before* the server responds. Waiting for a round-trip on every checkout would feel laggy.
5. **Underneath:** create a `CheckoutHistory` row (`itemId`, `userId`, `checkedOutAt`, `dueDate`, `returnedAt: null`). **Concurrency guard needed:** only allow the insert if no existing row for that `itemId` currently has `returnedAt IS NULL` — otherwise two people could "hold" the same physical item simultaneously.
6. **On rejection** (someone else grabbed it a beat earlier): revert the optimistic UI state, show a clear message ("This item was just checked out by someone else — refresh to see current availability").
7. **On success:** optimistic state is simply confirmed as real. Any other concurrent viewer (e.g., admin dashboard) needs a way to see this update too — polling or a live-update mechanism.

**Why this shape matters:** the strong version isn't "a row is created" — it's naming the concrete judgment calls (optimistic UI, concurrency race, revert path, cross-view consistency) with a brief reason for each.

---

## Scenario 2: Company Ride-Sharing / Carpool Matching

**Prompt:** "Employees at a company want to coordinate carpools for the daily commute — some are drivers with spare seats, some are riders looking for a ride."

### Actors & goals

| Actor | Primary goal |
|---|---|
| Driver | List themselves as available with seats/route; toggle availability |
| Rider | Find and book an available seat on a matching route |

### Entities

- **Driver** — name, address, max seats available, active/inactive flag
- **Rider** — name, address (used to sort available routes by proximity)
- **Rides** — the booking itself: driver + rider + confirmed date. (You correctly caught that "order" and "ride" could've meant two different things — pending-request vs. confirmed-booking — and explicitly simplified to "book = immediately confirmed" for v1, deferring an approval/pending state to later.)

**Key scoping decision + your reasoning:** matching isn't algorithmic distance-matching — it's rider-initiated selection from a proximity-sorted list, booked one week at a time (bounding the problem to roughly 52 bookings/rider/year rather than an open-ended matching engine). Good instinct: **bound an otherwise-infinite problem with a real-world cadence.**

### Operations

**Core:**
- Driver sign-up (name, address, seats)
- Driver availability toggle (active/inactive)
- Rider sign-up (name, address)
- Book a ride (populates `Rides`: rider, driver, address, confirmed date)

**Non-happy paths (the part worth reviewing most — these are the gaps that got surfaced under questioning):**

**1. Rider cancels a confirmed ride**
- Mark the `Rides` row `status: cancelled` rather than hard-deleting (keeps history for cancellation-rate tracking, same reasoning as keeping `CheckoutHistory` rows).
- Seat availability should be **computed** (total seats − confirmed, non-cancelled rides for that date), so a cancellation frees the seat automatically — no separate counter to keep in sync.
- Driver should be notified/see the freed seat — don't let it silently disappear from their view.

**2. Driver goes inactive with existing confirmed rides still on the books**
- Decision: **inactive only blocks new bookings** — it should *not* auto-cancel existing confirmed rides. Auto-cancelling could strand riders who were counting on the ride; silently ignoring the status change could mislead the driver into thinking they're off the hook.
- Instead: surface the conflict explicitly to the driver — "you have 3 upcoming confirmed rides; going inactive won't cancel them automatically. Cancel them yourself, or still honor them?"
- If the driver does cancel, notify the affected riders — same cascading-notification pattern as case 1.

**Reusable technique — the three-part check for any state-changing operation:**
1. What changes?
2. What other data becomes stale / needs recomputing as a result?
3. Who (which actor) needs to be told?

---

## General takeaways to carry into the real round

- **Actors first, but hypothesize — don't just ask "who exactly."** If the interviewer stays vague, state your best-guess actor list out loud and let them correct you, rather than repeatedly asking for clarification before you'll commit to anything.
- **State assumptions explicitly, especially scale assumptions.** "I'm choosing X because I don't expect volume to be large enough for Y to matter — if this were enterprise-scale, I'd reconsider" is a stronger answer than picking silently.
- **Separate reads from writes when listing operations.** The "obvious" write verbs are easy to list; the read/query operations (often what an actor actually uses most) are easy to forget.
- **For every entity, ask about its states, not just its fields.** ("Is checkout one entity with a status, or two entities?" / "Is 'order' the same as 'ride', or a different pending state?")
- **For every operation, ask what its undo/reverse case is, and what it cascades into.** Cancellation and status-changes-colliding-with-existing-commitments are the most commonly missed non-happy paths, in almost any domain.
- **When narrating a demo slice as a frontend candidate:** don't stop at "the API updates the database" — carry it through optimistic UI updates, concurrency edge cases, revert-on-failure paths, and cross-view consistency. That's the frontend-specific value-add in this round.