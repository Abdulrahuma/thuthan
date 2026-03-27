import { FaExclamationTriangle, FaSync } from 'react-icons/fa';

const ErrorDisplay = ({ type }) => {
  const config = {
    error: { icon: 'text-red-500', bg: 'bg-red-100', title: 'Oops! Something went wrong' },
    warning: { icon: 'text-yellow-500', bg: 'bg-yellow-100', title: 'Notice' }
  };
  return config[type] || config.error;
};

const ErrorMessage = ({ message = 'Something went wrong', onRetry, type = 'error' }) => {
  const { icon, bg, title } = ErrorDisplay(type);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${bg}`}>
        <FaExclamationTriangle className={`text-4xl ${icon}`} />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      
      <p className="text-gray-600 text-center max-w-md mb-6">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <FaSync className="text-sm" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
