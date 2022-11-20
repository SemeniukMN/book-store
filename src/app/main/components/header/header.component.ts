import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  readonly back$: Observable<{title: string, url: string} | null>;

  constructor(readonly searchService: SearchService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
    this.back$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(this.route),
      map(() => {
        const routes = [];
        let route = this.route;
        while (route.firstChild) {
          const title = route.snapshot.data['title'];
          if (title) {
            routes.push({title, url: route.snapshot.url.reduce((acc, next) => `${acc}/${next.path}`, '/')});
          }
          route = route.firstChild;
        }
        return routes.length ? routes[routes.length - 2] : null;
      })
    );
  }

  ngOnInit(): void {
  }

}
