import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import TagBadge from "./TagBadge";
import { TaskItem } from "@/types/interface";

export const TableBody: React.FC<{
  data: TaskItem[];
  handleOpenModal: () => void;
}> = ({ data, handleOpenModal }) => {
  const [popupIndex, setPopupIndex] = useState<number | null>(null);

  const handleOptionsClick = (index: number) => {
    setPopupIndex(popupIndex === index ? null : index); // Toggle popup visibility
  };

  const handleEditCard = () => {
    setPopupIndex(null);
    handleOpenModal();
  };

  return (
    <tbody>
      {data.map((row, index) => (
        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
          <td className="p-3 text-left">{row.name}</td>
          <td className="p-3 text-left">
            <div className="flex flex-wrap gap-1">
              {row.tags.map((tag, idx) => (
                <TagBadge key={idx} tag={tag} />
              ))}
            </div>
          </td>
          <td className="p-3 text-left">{row.contain}</td>
          <td className="p-3 text-left">{row.level}</td>
          <td className="p-3 text-left">{row.date}</td>
          <td className="p-3 flex justify-center relative">
            <button
              aria-label="More options"
              onClick={() => handleOptionsClick(index)}
            >
              <FaEllipsisV />
            </button>
            {popupIndex === index && (
              <div className="absolute top-0 right-0 mt-8 bg-white border rounded shadow-md z-10">
                <ul className="py-1">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleEditCard}
                  >
                    Edit
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => alert(`Preview item: ${row.name}`)}
                  >
                    Preview
                  </li>
                </ul>
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};
