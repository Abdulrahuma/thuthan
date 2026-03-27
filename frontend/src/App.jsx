import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FloatingDownloadButton from './components/FloatingDownloadButton';
import ErrorMessage from './components/ErrorMessage';
import { useNews } from './hooks/useNews';
import { filterByCategory } from './utils/categoryFilter';
import { FaNewspaper, FaSun } from 'react-icons/fa';
import { ARTICLES_PER_PAGE } from './utils/constants';

function App() {
  const { articles, loading, error, refreshNews } = useNews();
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = filterByCategory(articles, activeCategory);
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  const toggleArticle = (article) => {
    setSelectedArticles(prev => {
      const exists = prev.some(a => a.url === article.url);
      if (exists) {
        return prev.filter(a => a.url !== article.url);
      }
      return [...prev, article];
    });
  };

  const changeCategory = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const refresh = () => {
    refreshNews();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={changeCategory}
        articles={filteredArticles}
        onRefresh={refresh}
        isRefreshing={loading}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <FaNewspaper className="text-primary-500" />
            <span>{articles.length} articles found</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaSun className="text-yellow-500" />
            <span>Last 24 hours</span>
          </div>
        </div>

        {error ? (
          <ErrorMessage message={error} onRetry={refresh} type="error" />
        ) : (
          <>
            <HeroSection
              articles={paginatedArticles}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={changePage}
              onToggleSelect={toggleArticle}
              selectedArticles={selectedArticles}
              loading={loading}
            />

            {filteredArticles.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaNewspaper className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No News Found</h3>
                <p className="text-gray-600">Try refreshing or check back later.</p>
              </div>
            )}
          </>
        )}

        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-2">
              <strong>Thuthan</strong> - Renewable Energy News Aggregator
            </p>
            <p className="text-gray-500">Built with React, Tailwind CSS, and powered by GNews API</p>
            <p className="mt-4 text-xs text-gray-400">Data sourced from Google News. For informational purposes only.</p>
          </div>
        </footer>
      </main>

      <FloatingDownloadButton selectedArticles={selectedArticles} />
    </div>
  );
}

export default App;
