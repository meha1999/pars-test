import { DataItem, SortConfig } from "@/types/interface";
import React, { useCallback } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";

const CustomTableHeaderCell: React.FC<{
  field: keyof DataItem;
  label: string;
  sortConfig: SortConfig;
  onSort: (field: keyof DataItem) => void;
}> = ({ field, label, sortConfig, onSort }) => (
  <th
    className="p-3 text-left font-medium cursor-pointer hover:text-blue-500 transition"
    onClick={() => onSort(field)}
  >
    {label}{" "}
    {sortConfig.field === field &&
      (sortConfig.order === "asc" ? (
        <FaSortUp className="inline-block ml-2" />
      ) : (
        <FaSortDown className="inline-block ml-2" />
      ))}
  </th>
);

const TableHeader: React.FC<{
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
}> = ({ sortConfig, setSortConfig }) => {
  const handleSort = useCallback(
    (field: keyof DataItem) => {
      setSortConfig((prev) => ({
        field,
        order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
      }));
    },
    [setSortConfig]
  );

  return (
    <thead className="bg-gray-200 text-sm text-gray-700">
      <tr>
        <CustomTableHeaderCell
          field="name"
          label="Name"
          sortConfig={sortConfig}
          onSort={handleSort}
        />
        <th className="p-3 text-left w-3/12">Tags</th>
        <th className="p-3 text-left w-2/12">Contain</th>
        <CustomTableHeaderCell
          field="level"
          label="Level"
          sortConfig={sortConfig}
          onSort={handleSort}
        />
        <CustomTableHeaderCell
          field="date"
          label="Date"
          sortConfig={sortConfig}
          onSort={handleSort}
        />
        <th className="p-3 text-center w-1/12">Options</th>
      </tr>
    </thead>
  );
};
export default TableHeader;
