# Decomposition Round Practice — Shared Conference Room Booking

**Prompt:** "Design a system for managing a shared conference room booking system. Employees at a company need to reserve conference rooms for meetings, and avoid double-booking."

**Format:** 20 minutes, solo, minimal scaffolding.

---

## Actors & goals

| Actor | Primary goal |
|---|---|
| Employee | Book a conference room for a meeting |
| Office Manager | Manage rooms and reservations — add rooms, reclaim rooms, clean up bookings |

## Entities

- **Employee** — id, name
- **Room** — id, location, name
- **ScheduledBooking** — room, employee, start time, end time, status (confirmed / cancelled / complete / rescheduled), created datetime

**Modeling decision:** bookings are a separate entity from `Room`, since a room can have many bookings across a date — same "bridge entity" pattern used in the equipment-checkout and fleet-maintenance scenarios.

## Operations

**Writes:**
- Create a booking
- Update a booking (employee reschedules, or manager blocks out a room for a full day)
- Cancel/decline a booking (manager reclaiming a room)

**Reads:**
- Given a room, return available time slots (existing bookings filtered out)
- Given a desired time slot, return which rooms are available at that time

## The core mechanic the prompt calls out explicitly: avoiding double-booking

The prompt's phrasing — *"avoid double-booking"* — is a specific signal, not incidental wording. Showing available time slots handles the **sequential** case (one person books, the next person sees an updated list) — it does nothing for the **concurrent** case: two employees viewing the same open slot and clicking "Book" within the same second.

**Fix: a concurrency guard at write time**, same pattern as the equipment-checkout system's insert guard — reject a new booking if any existing *confirmed* booking for that room has an overlapping time range:

```
Only allow the insert if:
  NOT EXISTS (
    a confirmed ScheduledBooking for this room
    where the new booking's [start, end) overlaps that booking's [start, end)
  )
```

**General rule worth carrying forward:** any prompt containing a word like *"avoid,"* *"prevent,"* or *"ensure only one"* is almost always signaling a concurrency requirement, not just a display/filtering feature — it needs an explicit write-time guard, not just a well-filtered read.

## UI notes

- **Employee flow:** pick a desired time slot → system returns available rooms for that slot → employee selects a room to book.
- **Manager flow:** view timeslot availability across all rooms; can bulk-block a room for a full day.
- **Notification system:** confirms a new booking; also notifies affected employees on cancellation/decline (e.g., when a manager reclaims a room).
- Cancelling or rescheduling a booking frees that slot back up for others.

## Non-happy path: manager reclaims a room, bumping existing bookings

- Manager needs a room for a full day (e.g., an all-hands).
- All existing confirmed bookings for that room/day get declined.
- Every affected employee is notified and needs to rebook elsewhere.

## Demo slice: manager reclaims a fully-booked room

1. Several employees have already booked a room across the day — each got a confirmation notification when they booked.
2. The manager needs the room for the full day and initiates a bulk reclaim.
3. **Frontend judgment call worth naming explicitly:** is this a single bulk operation, or does the UI show progress as each booking is individually cancelled and its owner notified? Given this affects multiple other people's calendars, I'd lean toward *not* purely optimistic — show a "declining N bookings..." in-progress state rather than instantly flipping everything to cancelled, since a partial failure (3 of 5 cancellations succeed, 2 fail) needs to be visible and distinguishable from full success, not silently swallowed.
4. Each affected employee receives a cancellation notification and needs to book a different room/slot.
5. The room's day is now fully blocked and no longer appears as available for that date.

---

## Takeaway checklist to run after any first pass, before declaring done

1. **Actors** — have I named everyone the prompt's own wording implies, not just the two most obvious roles?
2. **Core mechanic** — have I actually modeled the specific verb the prompt used ("avoid," "notify," "detect"), not just designed around it?
3. **Concurrency** — does this prompt imply "only one of X can happen"? If so, is there an explicit write-time guard, not just a well-filtered read?
4. **Non-happy paths** — what are the undo/cancel/reschedule operations, and who needs to be told when they happen?