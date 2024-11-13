"use client";
import React, { useState } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";

const data = [
  {
    name: "Foreign Bid Acquisition",
    tags: ["BEC", "Banking", "C50", "User account"],
    contain: "Link",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "RBFCU Banking Account Update",
    tags: ["BEC", "Banking", "CFO", "User account"],
    contain: "-",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "Bank of America Password Reset",
    tags: ["BEC", "Banking", "User account"],
    contain: "Link",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "National Bank of Greece Verification",
    tags: ["Banking", "CEO", "Data Protection"],
    contain: "-",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "Foreign Bid Acquisition",
    tags: ["Banking", "User account"],
    contain: "-",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "Foreign Bid Acquisition",
    tags: ["Banking", "User account"],
    contain: "-",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "Foreign Bid Acquisition",
    tags: ["Banking", "User account"],
    contain: "-",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "Foreign Bid Acquisition",
    tags: ["Banking", "User account"],
    contain: "Link,HTML",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "Foreign Bid Acquisition",
    tags: ["Banking", "User account"],
    contain: "-",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "Foreign Bid Acquisition",
    tags: ["Banking", "User account"],
    contain: "-",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "Foreign Bid Acquisition",
    tags: ["Banking", "User account"],
    contain: "-",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "Foreign Bid Acquisition",
    tags: ["Banking", "User account"],
    contain: "-",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "Foreign Bid Acquisition",
    tags: ["Banking", "User account"],
    contain: "-",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "Foreign Bid Acquisition",
    tags: ["Banking", "User account"],
    contain: "-",
    level: "Normal",
    date: "2023-03-10",
  },
  {
    name: "Foreign Bid Acquisition",
    tags: ["Banking", "User account"],
    contain: "-",
    level: "Normal",
    date: "2023-03-10",
  },
];

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination details
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Pagination controls
  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg w-full">
      <table className="w-full table-auto">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Name
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Tags
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Contain
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Level
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Date
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-3 text-gray-700">{row.name}</td>
              <td className="px-4 py-3 text-gray-700">
                {row.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs mr-2"
                  >
                    <BsCircleFill className="mr-1 text-xs" />
                    {tag}
                  </span>
                ))}
              </td>
              <td className="px-4 py-3 text-gray-700">{row.contain}</td>
              <td className="px-4 py-3 text-gray-700">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${
                    row.level === "Normal"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <BsCircleFill
                    className={`mr-1 text-xs ${
                      row.level === "Normal" ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  {row.level}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-700">{row.date}</td>
              <td className="px-4 py-3 text-gray-700">
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 rounded-md">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md">
                    Delete
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <BsThreeDotsVertical className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-gray-100 px-4 py-3 flex justify-between items-center border-t">
        <div>
          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 rounded-md ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <BsChevronLeft className="w-5 h-5" />
          </button>
          <span className="mx-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 rounded-md ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <BsChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
