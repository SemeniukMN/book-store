import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AuthorService } from '../../../../services/author.service';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Author } from '../../../../types/author';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterService } from '../../../../services/filter.service';
import { PageItem } from '../../../../types/page';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnDestroy {

  form = new FormGroup({
    genres: new FormControl<string[]>([], {nonNullable: true}),
    coverTypes: new FormControl<string[]>([], {nonNullable: true}),
    years: new FormControl<number[]>([], {nonNullable: true}),
    authors: new FormControl<PageItem<Author>[]>([], {nonNullable: true})
  });
  genres: string[];
  coverTypes: string[];
  years: number[];
  authors$: Observable<PageItem<Author>[]>;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly authorService: AuthorService,
              private readonly filterService: FilterService) {
    this.years = this.getYears();
    this.genres = this.getGenres();
    this.coverTypes = this.getCoverTypes();
    this.authors$ = this.getAuthors();
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((filters) => {
      this.filterService.filterChange(filters);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  apply() {
    this.filterService.filter();
  }

  reset() {
    this.form.reset();
    this.filterService.filter();
  }

  private getYears(): number[] {
    const currentYear = new Date().getFullYear();
    return Array.from({length: 50}).map((_, index) => currentYear - index);
  }

  private getAuthors(): Observable<PageItem<Author>[]> {
    return this.authorService.find().pipe(
      map((page) => page.data)
    );
  }

  private getGenres(): string[] {
    return [
      'Детектив',
      'Драма',
      'Фантастика',
      'Приключения',
      'Роман',
      'Научная книга',
      'Фольклор',
      'Поэзия'
    ];
  }

  private getCoverTypes(): string[] {
    return [
      'Твердый переплет',
      'Мягкий переплет',
      'Твердая обложка',
      'Мягкая обложка'
    ];
  }
}
