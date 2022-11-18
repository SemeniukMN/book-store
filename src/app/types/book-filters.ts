import { Author } from './author';
import { PageItem } from './page';

export interface BookFilters {
  genres?: string[];
  coverTypes?: string[];
  years?: number[];
  authors?: PageItem<Author>[];
}
