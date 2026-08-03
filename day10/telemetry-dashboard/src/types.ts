// types.ts
export type Telemetry = {
  id: string;
  name: string;
  temperature: number;
  threshold: number;
  status: "Healthy" | "Warning" | "Critical";
  updatedAt: string;
};

export type SearchProps = {
  handleSearch: (str: string) => void;
  searchValue: string;
};


export type TableProps = {
  handleSelect: (str: string) => void;
  sensors: Telemetry[];
  handleSort: () => void;
  sortDir: 'asc' | 'desc' | null
};

export type TableRowProps = {
  handleSelect: (str: string) => void;
  sensor: Telemetry;
};

export type DetailsProps = {
  sensor: Telemetry;
  handleUpdateThreshold: (str: number) => void;
};

export type FilterProps = {
  handleFilter: (str: FilterProps['statusFilter']) => void;
  statusFilter: "Healthy" | "Warning" | "Critical" | "All"

};