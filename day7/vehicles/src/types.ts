export type Vehicle = {
    id: string;
    name: string;
    status: "Idle" | "Driving" | "Charging";
    battery: number;
    latitude: number;
    longitude: number;
};

export type SearchProps = {
    search: string;
    handleChange: (s: string) => void;
}

export type VehicleTableProps = {
    vehicles: Vehicle[];
    sortBy: keyof Vehicle | null;
    sortDir: 'asc' | 'dsc' | null;
    handleSelect: (s: string) => void;
    handleSort: (by: keyof Vehicle) => void;
}

export type VehicleRowProps = {
    vehicle: Vehicle;
    handleSelect: (s: string) => void;
}


export type VehicleDetailsProps = {
    vehicle: Vehicle;
}