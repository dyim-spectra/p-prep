# Decomposition Round Practice — On-Call Rotation Management (Timed, Solo Run)

**Prompt:** "Design a system for managing on-call rotations for an engineering team. Engineers take turns being 'on call' for a set period, and need to be notified when an incident comes in during their shift."

**Format:** 20 minutes, solo, minimal scaffolding.

---

## Your answer

### Actors & goals
- **Scheduler** — creates the schedule for engineers to be on call
- **Engineer** — the one being on call
- **Manager** — also an engineer, escalation point

### Entities
- **Engineer** — id, name, department, manager
- **UnavailableTimes** — engineer, start time, end time (kept separate from `Engineer` since this data arrives as-needed, not as a fixed attribute)
- **OnCallSchedules** — engineer, backup engineer, start time, end time, status (completed / scheduled / rescheduled)

### Operations
**Writes:**
- Create a schedule
- Update an on-call schedule (reschedule, mark completed)

**Reads:**
- Compare engineer's department, existing `OnCallSchedules`, and `UnavailableTimes` to build a new schedule
- View the schedule for all engineers

**Non-happy paths (included without prompting — good instinct):**
- Engineer marks themselves unavailable *before* their shift starts → schedule updates
- Engineer becomes unavailable *during* an active on-call shift → backup gets alerted

### Demo slice: engineer is on call and becomes unavailable mid-shift

1. Engineer is alerted to an upcoming on-call rotation ahead of time, and can view it on a schedule UI.
2. During the shift, the engineer unexpectedly becomes unavailable.
3. The backup engineer gets alerted, and can accept or decline standing in.
4. If the backup declines, their manager gets alerted next — escalation continues up the chain until someone accepts, up to the highest-level engineer if needed.

App consists of: a schedule UI, and an alert system that notifies backups/managers on any deviation from the schedule.

---

## The gap: the core mechanic from the prompt wasn't modeled

The prompt's actual central mechanic — *"need to be notified when an incident comes in during their shift"* — wasn't represented anywhere in the original pass. The demo slice covered a real and valuable non-happy path (engineer becomes unavailable), but skipped the more fundamental happy path: **something breaks → who's on call right now? → they get paged.**

**Lesson to carry forward:** a strong non-happy-path instinct shouldn't substitute for covering the central mechanic the prompt is actually pointing at. After a first pass, explicitly re-read the prompt's own wording and ask *"have I modeled the specific thing they described, or did I design around it?"*

## Added: the missing primary alert flow

### New entity
- **Incident** — id, description, severity, timestamp, status (open / acknowledged / resolved)

### New operations
- **Incident created** (from a monitoring system, or manually) → system queries `OnCallSchedules` for whoever is currently active → triggers a notification to that engineer.
- **Delivery/acknowledgment mechanism** — push notification, SMS, or phone call, escalating in urgency if unacknowledged.
- **Acknowledgment timeout escalation** — if the primary on-call engineer doesn't acknowledge within some timeout (asleep, phone dead — the more common real-world failure mode than an explicit "I'm unavailable" status change), the system automatically escalates to the backup, same chain as the "engineer becomes unavailable" path, but triggered by *silence* rather than an explicit status update.

**Why this connects back to earlier practice:** this is the same fire-and-forget vs. requires-acknowledgment-with-timeout distinction from the vehicle command-acknowledgment systems design work — just applied to paging a human instead of commanding a vehicle. Any time a system needs someone (or something) to *do* something in response to an event, the same question applies: how do you know it actually happened, and what's the fallback if it silently didn't?

## Takeaway for next practice

Two self-checks to run, unprompted, after a first pass:
1. **Have I named the actors implied by the prompt's own wording?**
2. **Have I actually modeled the core mechanic the prompt describes, not just the edge cases around it?**