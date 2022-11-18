import { Directive } from '@angular/core';
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { Author } from '../../../../types/author';
import { PageItem } from '../../../../types/page';

const authorStringify = (author: PageItem<Author>) => `${author.attributes.firstName} ${author.attributes.lastName}`;

@Directive({
  selector: '[appAuthorHandler]',
  providers: [tuiItemsHandlersProvider<PageItem<Author>>({stringify: authorStringify})],
})
export class AuthorHandlerDirective {

  constructor() { }

}
