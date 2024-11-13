"use client";
import HeaderFilters from "@/components/HeaderFilters";
import React, { useState, useMemo } from "react";
import {
  ALL_TAGS,
  ITEMS_PER_PAGE,
  sampleData,
  TAGS_PARAM,
} from "../configs/data";

import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import { TableBody } from "@/components/TableBody";
import TableHeader from "@/components/TableHeader";
import NewReportModal from "@/components/Modal";
import { SortConfig } from "@/types/interface";

interface TableComponentProps {
  searchParams: Record<string, string>;
}

const TableComponent: React.FC<TableComponentProps> = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "id",
    order: "asc",
  });
  const searchParams = useSearchParams();
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const tagsParam = searchParams.get(TAGS_PARAM);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const selectedTags = useMemo(() => {
    if (!tagsParam) return [];
    return tagsParam
      .split(",")
      .filter((tag): tag is string => Boolean(tag) && ALL_TAGS.includes(tag));
  }, [tagsParam]);

  const filteredData = useMemo(() => {
    let filtered = [...sampleData];

    if (selectedTags.length > 0) {
      filtered = filtered.filter((item) =>
        selectedTags.every((tag) => item.tags.includes(tag))
      );
    }

    if (searchText) {
      const lowercaseSearch = searchText.toLowerCase();
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(lowercaseSearch)
      );
    }

    if (sortConfig.field) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];
        const modifier = sortConfig.order === "asc" ? 1 : -1;

        return aValue > bValue ? modifier : -modifier;
      });
    }

    return filtered;
  }, [selectedTags, searchText, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  return (
    <div
      className={`p-4 min-h-screen transition-all flex flex-col items-center ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <HeaderFilters
        allTags={ALL_TAGS}
        searchText={searchText}
        darkMode={darkMode}
        setSearchText={setSearchText}
        setDarkMode={setDarkMode}
      />
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <TableHeader sortConfig={sortConfig} setSortConfig={setSortConfig} />
        <TableBody data={paginatedData} handleOpenModal={handleOpen} />
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <NewReportModal handleClose={handleClose} isOpen={isOpen} />
    </div>
  );
};

export default TableComponent;
