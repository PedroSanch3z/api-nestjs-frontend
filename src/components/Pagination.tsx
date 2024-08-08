import React from 'react';

type PaginationProps = {
  currentPage: number;
  setPage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, setPage }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-4 py-2 mx-1 border rounded"
        onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
        disabled={currentPage <= 1}
      >
        Previo
      </button>
      <button
        className="px-4 py-2 mx-1 border rounded"
        onClick={() => setPage(prevPage => prevPage + 1)}
      >
        Siguiente
      </button>
    </div>
  );
};
