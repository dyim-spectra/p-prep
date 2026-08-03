// TelemetryTable.tsx
import { useState, useEffect } from 'react';


function App() {
  const [count, setCount] = useState(0)


  const onUpdateThreshold = (
    id: string, newThreshold: number
  ): Promise<boolean> => {
    console.log({ id, newThreshold });
    return new Promise((resolve) => {
      resolve(true);
    });
  };

  return (
    <>
      <TelemetryTable readings={[]} onUpdateThreshold={onUpdateThreshold} />
    </>
  )
}

export default App


/*
Task — same as always, but timed:

Find and fix the bugs (5 this time, since we're stepping up difficulty for the timed round).
New feature to add: a "Cancel" button next to "Save" while editing, that discards the draft and reverts to the display view without saving.
*/

type Reading = {
  id: string;
  sensorName: string;
  value: number;
  unit: string;
  threshold: number;
};

type TelemetryTableProps = {
  readings: Reading[];
  onUpdateThreshold: (id: string, newThreshold: number) => Promise<boolean>;
};

function TelemetryTable({ readings, onUpdateThreshold }: TelemetryTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftValue, setDraftValue] = useState('');
  const [localReadings, setLocalReadings] = useState(readings);

  // useEffect(() => {
  //   setLocalReadings(readings); //bug three: this is redundant. Already initialized as reading. 
  // }, []);
  //fix: commnented out the above
  /*
  Bug 3 (the useEffect) — you caught something real, but the framing undersells it. You called it "redundant since already initialized" — true for the very first render, but that's not the interesting part of this bug. The dependency array is [], meaning this effect runs exactly once, at mount, and never again. Given this component is a live TelemetryTable, presumably fed by a parent that polls for fresh sensor data, readings as a prop is expected to update over time — but localReadings (the derived state actually being rendered) has no mechanism to resync with those updates after the first render. So this isn't just "redundant" — it's "this table will silently stop reflecting new incoming telemetry the moment it mounts," which is a much more serious bug in a monitoring-panel context than a harmless extra render. Worth flagging this distinction live if you're ever unsure whether to call something "redundant" vs. "broken" — the consequences are very different even when the code looks similarly wrong at a glance.
  */
  useEffect(() => {
    setLocalReadings(readings);
  }, [readings]);

  const startEdit = (reading: Reading) => {
    setEditingId(reading.id);
    setDraftValue(reading.threshold.toString());
  };


  const cancelEdit = () => {
    setEditingId(null)
    setDraftValue('')
  }

  const saveEdit = async (id: string) => {
    // const newThreshold = parseFloat(draftValue); //bug one: parseFloat empty string produces a NaN
    //fix
    const newThreshold = parseFloat(draftValue);

    /*
    Bug 1 (NaN from empty input) — correct, and worth extending: right that parseFloat('') produces NaN. Worth noting the fix isn't just "handle it" — you'd want to either disable the Save button when isNaN(parseFloat(draftValue)), or validate before calling onUpdateThreshold at all, so a broken value never reaches the server or gets applied to local state in the first place.
    */
    if (isNaN(newThreshold)) {
      return; // or show inline validation, don't proceed to save
    }

    // const success = await onUpdateThreshold(id, newThreshold); //bug two: the success variable is never used
    //fix
    const success = await onUpdateThreshold(id, newThreshold);


    // const updated = localReadings.map(r =>
    //   r.id === id ? { ...r, threshold: newThreshold } : r
    // );
    // setLocalReadings(updated); //bug five, while this works this can use the prev.  as opposed ot using the updated variable

    //fix:
    /*
    Bug 2 (success never checked) — correct, and this is the most consequential one. You're right that the variable is unused, but the real-world impact is bigger than "unused variable": this is the exact same missing-revert pattern from your LikeButton exercise — right now, saveEdit applies the optimistic update unconditionally, regardless of whether the server actually accepted it. If onUpdateThreshold resolves false (rejected), the UI still shows the new threshold as if it saved successfully. Worth explicitly wiring in a revert-on-failure path here.
    */

    /*
    Bug 5 (localReadings.map(...) instead of functional updater) — correct, and genuinely meaningful here, not just stylistic. Because saveEdit is async with an await in the middle, there's a real window where localReadings (captured from the render that triggered this call) could go stale if state changes elsewhere while the request is in flight — same stale-closure-across-an-await risk from your earlier race-condition exercise. Good instinct connecting this back to that pattern.
    */

    if (success) {
      setLocalReadings(prev =>
        prev.map(r => (r.id === editingId ? { ...r, threshold: newThreshold } : r))
      );
    }

    setEditingId(null); // bug four: missing setDraftValue (it should alreayd be empty string)
    //fix
    setDraftValue('')
    /*
    Bug 4 (missing setDraftValue('') on save) — technically correct, but low severity, worth saying so out loud. Since startEdit always resets draftValue fresh whenever a new edit begins, and the input is only rendered while editingId === reading.id, this omission doesn't actually cause any visible incorrect behavior — it's a cleanliness/hygiene issue, not a functional bug. Good to catch, but also good practice to distinguish "this will misbehave" from "this is untidy but harmless" out loud, since interviewers value that calibration.
    */
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Sensor</th>
          <th>Value</th>
          <th>Threshold</th>
        </tr>
      </thead>
      <tbody>
        {localReadings.map(reading => (
          <tr key={reading.id} style={{
            backgroundColor: reading.value > reading.threshold ? 'red' : undefined
          }}>
            <td>{reading.sensorName}</td>
            <td>{reading.value} {reading.unit}</td>
            <td>
              {editingId === reading.id ? (
                <>
                  <input value={draftValue} onChange={e => setDraftValue(e.target.value)} />
                  <button onClick={() => saveEdit(reading.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <span onClick={() => startEdit(reading)}>{reading.threshold}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
