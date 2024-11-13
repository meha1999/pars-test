"use client";

import React, { useCallback, useMemo, FunctionComponent } from "react";
import { FaTimesCircle, FaTags, FaSun, FaMoon } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

interface HeaderFiltersProps {
  allTags: readonly string[];
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
}

const TAGS_PARAM = "tags" as const;

const HeaderFilters: FunctionComponent<HeaderFiltersProps> = ({
  allTags,
  setSearchText,
  searchText,
  darkMode,
  setDarkMode,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get selected tags from URL and ensure they exist in allTags
  const selectedTags = useMemo(() => {
    const tagsParam = searchParams.get(TAGS_PARAM);
    if (!tagsParam) return [];

    return tagsParam
      .split(",")
      .filter((tag): tag is string => Boolean(tag) && allTags.includes(tag));
  }, [searchParams, allTags]);

  // Available tags (excluding already selected ones)
  const availableTags = useMemo(
    () => allTags.filter((tag) => !selectedTags.includes(tag)),
    [allTags, selectedTags]
  );

  const createQueryString = useCallback(
    (newTags: string[] | null) => {
      const params = new URLSearchParams(searchParams);

      if (!newTags || newTags.length === 0) {
        params.delete(TAGS_PARAM);
      } else {
        params.set(TAGS_PARAM, newTags.join(","));
      }

      return params.toString();
    },
    [searchParams]
  );

  const updateTags = useCallback(
    (newTags: string[] | null) => {
      const queryString = createQueryString(newTags);
      router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, {
        scroll: false,
      });
    },
    [router, pathname, createQueryString]
  );

  const handleTagSelect = useCallback(
    (tag: string) => {
      if (!tag) return;
      if (selectedTags.includes(tag)) {
        updateTags(selectedTags.filter((t) => t !== tag));
      } else {
        updateTags([...selectedTags, tag]);
      }
    },
    [selectedTags, updateTags]
  );

  const handleTagRemove = useCallback(
    (tagToRemove: string) => {
      updateTags(selectedTags.filter((tag) => tag !== tagToRemove));
    },
    [selectedTags, updateTags]
  );

  return (
    <div className="flex items-center justify-between w-full mb-4">
      <div className="flex flex-wrap gap-2">
        <div className="relative">
          <select
            className="bg-gray-200 text-sm pl-8 pr-8 py-1.5 rounded-full 
                     hover:bg-gray-300 transition appearance-none cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            value=""
            onChange={(e) => handleTagSelect(e.target.value)}
            aria-label="Select tags"
          >
            <option value="" disabled>
              {availableTags.length === 0 ? "No more tags" : "Add tags..."}
            </option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <FaTags
            className="absolute left-2.5 top-1/2 transform -translate-y-1/2 
                     text-gray-500 pointer-events-none"
            aria-hidden="true"
            size={14}
          />
          <IoChevronDownCircleOutline
            className="absolute right-2 top-1/2 transform -translate-y-1/2 
                     text-gray-500 pointer-events-none"
            aria-hidden="true"
            size={16}
          />
        </div>

        {selectedTags.map((tag) => (
          <button
            key={tag}
            className="bg-gray-200 text-sm px-3 py-1.5 rounded-full 
                     hover:bg-gray-300 transition-colors duration-200 
                     flex items-center gap-2 group focus:outline-none 
                     focus:ring-2 focus:ring-blue-500"
            onClick={() => handleTagRemove(tag)}
            aria-label={`Remove ${tag} tag`}
          >
            <span>{tag}</span>
            <FaTimesCircle
              className="text-gray-500 group-hover:text-gray-700 
                       transition-colors duration-200"
              size={14}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <div className="search-bar relative">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search text"
            className="border border-gray-300 rounded-full p-2 pl-10 focus:border-blue-500"
          />
        </div>
        <button
          className="text-xl p-2 rounded-full focus:outline-none transition-colors"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-blue-600" />
          )}
        </button>
      </div>
    </div>
  );
};

export default HeaderFilters;
