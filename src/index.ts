import scraper from './scraper';
import content from './content';
import hot from './hot';
import user from './user';

// Re-exporting main functionalities
export { scraper, content, hot, user };

// Exporting types for consumers
export type { ScraperOptions, ScraperResult } from './scraper';
export type { ArticleInput, ArticleContent, Comment } from './content';
export type { PttHotBoard } from './hot';
export type { PttArticleListItem, PttListPage } from './list';
export type { GoogleSearchResult } from './user';
