import { CATEGORY_MAP } from './constants';

export const filterByCategory = (articles, category) => {
  if (category === 'all' || !category) {
    return articles;
  }
  
  const targetCategory = CATEGORY_MAP[category];
  if (!targetCategory) {
    return articles;
  }
  
  return articles.filter(article => article.category === targetCategory);
};
