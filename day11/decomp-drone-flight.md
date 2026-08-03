# Decomposition Round Reference — Drone Flight Path Coordination

**Prompt:** "Design a system for coordinating drone flight paths to avoid collisions. An operations team manages multiple autonomous drones flying simultaneously in a shared airspace. They need to plan flight paths, detect potential conflicts before they happen, and respond if something goes wrong mid-flight."

**Note:** this is a model answer to *study*, not a substitute for attempting a fresh scenario cold — the reasoning muscle matters more than this specific content for Tuesday.

---

## Actors & goals

| Actor | Primary goal |
|---|---|
| Operations planner | Schedule flight paths for multiple drones ahead of time, without conflicts |
| Drone (the autonomous system itself) | Execute its assigned path, report position/status in real time |
| Operator/monitor | Watch live drone positions, get alerted to conflicts or deviations, intervene mid-flight |

Planner and monitor might be the same person or two different roles — assumed separate here since the prompt distinguishes "plan paths" from "respond if something goes wrong mid-flight" as different moments with different urgency.

## Entities

- **Drone** — id, name, current status (idle / in-flight / grounded)
- **FlightPlan** — droneId, sequence of waypoints (lat/lng/altitude + timestamp each), status (scheduled / active / completed / aborted)
- **PositionReport** — droneId, actual lat/lng/altitude, timestamp (live telemetry stream)
- **ConflictAlert** — droneIds involved, detected timestamp, resolved boolean/timestamp

**Key modeling decision:** `FlightPlan` (intended path) and `PositionReport` (actual, real-time position) are kept as separate entities — collision detection needs to compare planned-vs-actual and actual-vs-actual, not just planned-vs-planned once at scheduling time.

## Operations

**Writes:**
- Create/edit a `FlightPlan` before flight
- Stream `PositionReport`s during flight
- Mark a `ConflictAlert` resolved
- Abort/reroute a drone mid-flight

**Reads:**
- Pre-flight conflict detection: compare all active `FlightPlan`s against each other
- Mid-flight conflict detection: compare live `PositionReport`s against each other in real time (a separate detection pass from the pre-flight check)
- Query current status of all drones (monitor dashboard)

**Non-happy paths:**
- **A drone deviates from its planned path** — conflict detection needs to re-check against *actual* position, not just the original plan, since two drones' plans might never overlap but their real-time positions could still converge.
- **A drone loses connectivity mid-flight** (no `PositionReport` for N seconds) — treated like the staleness pattern from earlier exercises: a silent drone is its own alert condition, not an assumed-fine state.
- **A conflict is flagged, one drone reroutes — does the other auto-clear?** Leaning toward: automatic re-check after either plan changes, but the alert stays visible until a human explicitly resolves it, since silently auto-clearing a safety alert is the wrong default.

## Demo slice: "Two drones' live positions start converging mid-flight"

1. Both drones stream `PositionReport`s continuously (WebSocket-style, same pattern as the very first live-tracking exercise).
2. A process continuously checks pairwise distance between all active drones' latest positions.
3. The moment two drones come within a safety threshold, a `ConflictAlert` is created.
4. **Frontend:** this needs to be surfaced immediately and unmissably on the monitor's dashboard — not a subtle row-color change, but a persistent, hard-to-miss banner or audible alert, since this is safety-critical, not a routine status update.
5. **The operator needs an immediate action path** — at minimum, sending an abort/hold command to one or both drones. This command needs to be tracked (pending → acknowledged/failed), not fire-and-forget — same reasoning as the earlier command-acknowledgment systems design work: a safety command silently failing is far worse than a routine one failing.
6. Once resolved (drones diverge, or one is grounded), the alert can be marked resolved — but a human should confirm rather than auto-clearing purely on distance recovering, since a brief separation could recur seconds later.

**Why steps 4-5 matter most for a frontend-focused round:** that's where the actual engineering judgment sits for this role specifically — how something urgent gets surfaced so it's genuinely impossible to miss, and how a command sent in response gets tracked so nobody assumes it worked when it didn't.