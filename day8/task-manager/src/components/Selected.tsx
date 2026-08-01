import { memo } from "react";
import type { SelectedProps } from "../types";


const Selected = memo(({ vehicle }: SelectedProps) => {
    return (
        <ul>
            <li>{vehicle.title}</li>
            <li>{vehicle.description}</li>
            <li>{vehicle.priority}</li>
            <li>{`${vehicle.completed}`}</li>
            <li>{vehicle.updatedAt}</li>
        </ul>
    )
})

export default Selected;