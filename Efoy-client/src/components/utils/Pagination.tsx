import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';


const Pagination = ({ currentPage, totalPages, onPageChange }: {currentPage: number, totalPages: number, onPageChange: (page: number) => void}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    } 
  };

  return (
    <div className="flex justify-between items-center space-x-4 mt-6 w-[600px]">
      <button
        onClick={handlePrevious}
        className={`flex items-center px-4 py-1 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition duration-200 ease-in-out ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="ml-1">Previous</span>
      </button>

      <span className="text-lg font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        className={`flex items-center px-4 py-1 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition duration-200 ease-in-out ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={currentPage === totalPages}
      >
        <span className="mr-1">Next</span>
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;

