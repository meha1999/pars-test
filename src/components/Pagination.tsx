const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center mt-4 space-x-2">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => onPageChange(i + 1)}
        className={`w-8 h-8 flex items-center justify-center rounded-full text-gray-600 bg-gray-200 transition ${
          currentPage === i + 1 ? "bg-blue-600 text-white font-bold" : ""
        }`}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

export default Pagination;
