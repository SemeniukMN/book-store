import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../types/author';
import { authorStringify } from '../utils/author-stringify';
import { SinglePage } from '../types/page';

@Pipe({
  name: 'author',
  standalone: true
})
export class AuthorPipe implements PipeTransform {

  transform(value: SinglePage<Author>): string {
    return authorStringify(value.data);
  }

}
