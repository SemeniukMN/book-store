import { Directive } from '@angular/core';
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { Author } from '../../../types/author';
import { PageItem } from '../../../types/page';
import { authorStringify } from '../../../utils/author-stringify';

@Directive({
  selector: '[appAuthorHandler]',
  providers: [tuiItemsHandlersProvider<PageItem<Author>>({stringify: authorStringify})],
})
export class AuthorHandlerDirective {

  constructor() { }

}
