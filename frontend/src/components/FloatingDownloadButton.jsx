import { FaFilePdf } from 'react-icons/fa';
import { generatePDF } from '../utils/pdfGenerator';

const FloatingDownloadButton = ({ selectedArticles }) => {
  const count = selectedArticles.length;
  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <button
        onClick={() => generatePDF(selectedArticles)}
        className="flex items-center space-x-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
      >
        <FaFilePdf className="text-2xl" />
        <div className="flex flex-col items-start">
          <span className="font-bold text-lg">Download PDF</span>
          <span className="text-sm opacity-90">{count} article{count > 1 ? 's' : ''} selected</span>
        </div>
      </button>

      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
          Click to generate PDF with selected news
        </div>
      </div>
    </div>
  );
};

export default FloatingDownloadButton;
