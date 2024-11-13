export interface TaskItem {
  id: string;
  name: string;
  description: string;
  tags: string[];
  date: string;
  contain: string;
  level: string;
}

export type SortOrder = "asc" | "desc";
export type SortConfig = {
  field: keyof TaskItem;
  order: SortOrder;
};

export interface DataItem {
  name: string;
  tags: string[];
  contain: string;
  level: number;
  date: string;
}
