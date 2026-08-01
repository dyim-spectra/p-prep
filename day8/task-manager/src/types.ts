export type Task = {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
  updatedAt: string;
};


export type TableProps = {
  vehicles: Task[];
  sortCol: keyof Task | null;
  sortOrderBy: 'asc' | 'desc' | null;
  handleSelect: (id: string) => void;
  handleOrder: (col: keyof Task) => void;
};

export type TableRowProps = {
  vehicle: Task;
  handleSelect: (id: string) => void;
};

export type SelectedProps = {
  vehicle: Task;
};

export type SearchProps = {
  search: string;
  handleChange: (str: string) => void;
}

export type FilterProps = {
  filter: 'completed' | 'incomplete' | 'all';
  handleFilter: (str: 'completed' | 'incomplete' | 'all') => void;
}