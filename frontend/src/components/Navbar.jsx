import { useState, useEffect } from 'react';
import { FaLeaf, FaBars, FaTimes, FaDownload, FaSync, FaClock } from 'react-icons/fa';
import { generatePDF } from '../utils/pdfGenerator';
import { CATEGORY_MAP } from '../utils/constants';

const getCategoryList = () => {
  return Object.entries(CATEGORY_MAP).map(([id, label]) => ({ id, label }));
};

const formatDate = (date) => {
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatTime = (date) => {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

const DateTimeDisplay = ({ dateTime }) => (
  <div className="flex items-center space-x-4 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
    <div className="flex items-center space-x-2">
      <FaClock className="text-primary-500 text-sm" />
      <span className="text-sm font-medium text-gray-700">
        {formatDate(dateTime)}
      </span>
    </div>
    <div className="w-px h-4 bg-gray-300"></div>
    <div className="text-sm font-semibold text-primary-600 tabular-nums">
      {formatTime(dateTime)}
    </div>
  </div>
);

const CategoryButton = ({ id, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-primary-500 text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
    }`}
  >
    {label}
  </button>
);

const ActionButton = ({ onClick, disabled, variant, icon: Icon, label }) => {
  const styles = {
    download: 'bg-green-500 hover:bg-green-600',
    refresh: 'bg-blue-500 hover:bg-blue-600'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed ${styles[variant]}`}
    >
      <Icon className={`text-sm ${variant === 'refresh' && disabled ? 'animate-spin' : ''}`} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

const MobileMenu = ({ isOpen, categories, activeCategory, onCategoryChange, onDownload, onRefresh, articles, isRefreshing, dateTime }) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden py-4 border-t border-gray-200">
      <div className="flex items-center justify-center space-x-4 px-4 py-3 mb-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <FaClock className="text-primary-500 text-sm" />
          <span className="text-sm font-medium text-gray-700">{formatDate(dateTime)}</span>
        </div>
        <div className="w-px h-4 bg-gray-300"></div>
        <div className="text-sm font-semibold text-primary-600 tabular-nums">{formatTime(dateTime)}</div>
      </div>

      <div className="flex flex-col space-y-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium text-left transition-all ${
              activeCategory === cat.id ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      
      <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
        <ActionButton
          onClick={onDownload}
          disabled={articles.length === 0}
          variant="download"
          icon={FaDownload}
          label={`Download (${articles.length})`}
        />
        <ActionButton
          onClick={onRefresh}
          disabled={isRefreshing}
          variant="refresh"
          icon={FaSync}
          label={isRefreshing ? 'Loading...' : 'Refresh'}
        />
      </div>
    </div>
  );
};

const Navbar = ({ activeCategory, onCategoryChange, articles = [], onRefresh = null, isRefreshing = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const categories = getCategoryList();

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDownload = () => {
    if (articles.length > 0) {
      generatePDF(articles);
    }
  };

  const handleRefresh = () => {
    if (onRefresh && !isRefreshing) {
      onRefresh();
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
              <FaLeaf className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Thuthan</h1>
              <p className="text-xs text-gray-500">Renewable Energy News</p>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <DateTimeDisplay dateTime={dateTime} />
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {categories.map(cat => (
              <CategoryButton
                key={cat.id}
                id={cat.id}
                label={cat.label}
                isActive={activeCategory === cat.id}
                onClick={() => onCategoryChange(cat.id)}
              />
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <ActionButton
              onClick={handleDownload}
              disabled={articles.length === 0}
              variant="download"
              icon={FaDownload}
              label={`Download (${articles.length})`}
            />
            <ActionButton
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="refresh"
              icon={FaSync}
              label={isRefreshing ? 'Loading...' : 'Refresh'}
            />
          </div>

          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <MobileMenu
          isOpen={isMenuOpen}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={(id) => { onCategoryChange(id); setIsMenuOpen(false); }}
          onDownload={() => { handleDownload(); setIsMenuOpen(false); }}
          onRefresh={() => { handleRefresh(); setIsMenuOpen(false); }}
          articles={articles}
          isRefreshing={isRefreshing}
          dateTime={dateTime}
        />
      </div>
    </nav>
  );
};

export default Navbar;
