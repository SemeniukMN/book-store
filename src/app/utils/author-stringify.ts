import { PageItem } from '../types/page';
import { Author } from '../types/author';

export const authorStringify = (author: PageItem<Author>) => {
  return `${author.attributes.firstName} ${author.attributes.lastName}`;
};
