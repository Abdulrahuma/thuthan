import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import NewsCard from './NewsCard';

const PageButton = ({ children, isActive, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
      isActive
        ? 'bg-primary-500 text-white'
        : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
    }`}
  >
    {children}
  </button>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FaChevronLeft className="mr-2" />
        Previous
      </button>
      
      <div className="flex items-center space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <PageButton
            key={page}
            isActive={currentPage === page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <FaChevronRight className="ml-2" />
      </button>
    </div>
  );
};

const NewsGrid = ({ articles, selectedArticles, onToggleSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {articles.map((article, index) => (
      <NewsCard
        key={`${article.url}-${index}`}
        article={article}
        isSelected={selectedArticles.some(a => a.url === article.url)}
        onToggleSelect={onToggleSelect}
      />
    ))}
  </div>
);

const LoadingSkeleton = () => (
  <div className="mb-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="h-80 skeleton rounded-xl"></div>
      ))}
    </div>
  </div>
);

const HeroSection = ({ articles = [], currentPage, totalPages, onPageChange, onToggleSelect, selectedArticles = [], loading }) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <NewsGrid
        articles={articles}
        selectedArticles={selectedArticles}
        onToggleSelect={onToggleSelect}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default HeroSection;
