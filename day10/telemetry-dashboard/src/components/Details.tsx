import { memo, useEffect, useRef, useState } from "react"
import type { DetailsProps, Telemetry } from "../types"


const Details = memo(({ sensor, handleUpdateThreshold }: DetailsProps) => {
    const [updatedThreshold, setUpdatedThreshold] = useState<Telemetry['threshold']>(sensor.threshold);
    const isDirty = useRef(false)

    useEffect(() => {
        if (!isDirty.current) {
            setUpdatedThreshold(sensor.threshold)
        }
    }, [sensor.threshold])
    // console.log(sensor) //was used to test rendering

    const handleThresholdChange = (value: number) => {
        isDirty.current = true
        setUpdatedThreshold(value)
    }

    const handleSave = () => {
        isDirty.current = false
        handleUpdateThreshold(updatedThreshold)
    }

    return <div>
        <h3>{sensor.name}</h3>
        <ul>
            <li>{sensor.temperature}</li>
            <li>{sensor.threshold}</li>
            <li>{sensor.status}</li>
            <li>{sensor.updatedAt}</li>
        </ul>

        <label>Update Threshold:</label>
        <br />
        <input onChange={e => handleThresholdChange(Number(e.target.value))} value={updatedThreshold} type="number" id="threshold" name="threshold" />
        <button onClick={handleSave}>Save</button>
    </div>
})

export default Details