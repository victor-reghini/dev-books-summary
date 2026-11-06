import { cleanCodeBook } from './clean-code/index.js';
import { designPatternsBook } from './design-patterns/index.js';

export const BOOKS_REGISTRY = [cleanCodeBook, designPatternsBook];

export function getBookById(bookId) {
  return BOOKS_REGISTRY.find((b) => b.id === bookId) || BOOKS_REGISTRY[0];
}

