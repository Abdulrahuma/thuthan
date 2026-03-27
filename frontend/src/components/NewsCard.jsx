import { FaDownload, FaExternalLinkAlt, FaClock, FaCheck } from 'react-icons/fa';
import { format } from 'date-fns';
import { CATEGORY_COLORS } from '../utils/constants';

const CategoryBadge = ({ category }) => (
  <span className={`text-xs font-medium px-3 py-1 rounded-full border ${CATEGORY_COLORS[category] || CATEGORY_COLORS['Others']}`}>
    {category}
  </span>
);

const SourceBadge = ({ name }) => (
  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
    {name || 'News'}
  </span>
);

const DateDisplay = ({ date, format: dateFormat = 'MMM d, yyyy h:mm a' }) => (
  <span className="text-xs text-gray-500 flex items-center">
    <FaClock className="mr-1" />
    {format(new Date(date), dateFormat)}
  </span>
);

const SelectButton = ({ isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full transition-all duration-200 ${
      isSelected ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-primary-500 hover:text-white'
    }`}
  >
    <FaCheck className="text-xs" />
  </button>
);

const CardImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    loading="lazy"
  />
);

const ImageOverlay = () => (
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
);

const CompactCard = ({ article, isSelected, onToggleSelect }) => {
  const { title, url, image, publishedAt } = article;

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group" onClick={() => window.open(url, '_blank')}>
      {image && (
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
          <CardImage src={image} alt={title} />
        </div>
      )}
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <DateDisplay date={publishedAt} format="MMM d, h:mm a" />
          <SelectButton isSelected={isSelected} onClick={onToggleSelect} />
        </div>
      </div>
    </div>
  );
};

const FullCard = ({ article, isSelected, onToggleSelect }) => {
  const { title, description, url, image, publishedAt, source, category } = article;

  const handleOpenLink = () => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleSelect(article);
  };

  return (
    <div className="card card-hover group">
      {image && (
        <div className="relative h-48 overflow-hidden">
          <CardImage src={image} alt={title} />
          <ImageOverlay />
        </div>
      )}
      
      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={category} />
            <SourceBadge name={source?.name} />
          </div>
          <DateDisplay date={publishedAt} />
        </div>

        <h3 
          className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors cursor-pointer"
          onClick={handleOpenLink}
        >
          {title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={handleOpenLink}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Read More
            <FaExternalLinkAlt className="ml-2 text-xs" />
          </button>

          <button
            onClick={handleSelect}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              isSelected
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-primary-500 hover:text-white'
            }`}
          >
            <FaDownload className="text-xs" />
            <span>{isSelected ? 'Added' : 'Add to PDF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const NewsCard = ({ article, isSelected = false, onToggleSelect, variant = 'default' }) => {
  if (variant === 'compact') {
    return <CompactCard article={article} isSelected={isSelected} onToggleSelect={onToggleSelect} />;
  }
  return <FullCard article={article} isSelected={isSelected} onToggleSelect={onToggleSelect} />;
};

export default NewsCard;
