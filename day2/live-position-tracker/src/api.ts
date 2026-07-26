export type Position = { 
    vehicleId: string;
    x: number;
    y: number;
    timestamp: number
};

export type TableProps = {
    vehicles: Position[],
    now: number,
    handleSelect: (id: string) => void,
    selectedId: string
}

export type RowProps = {
    vehicle: Position,
    now: number,
    handleSelect: (id: string) => void,
    selectedId: string
}

export type InputFilterProps = {
    handleInput: (id: string) => void,
    input: string,
}

export function subscribeToPositions(callback: (pos: Position) => void): () => void {
    return () => { };
}