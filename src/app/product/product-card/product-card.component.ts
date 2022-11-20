import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { SinglePage } from '../../types/page';
import { Author } from '../../types/author';
import { AuthorPipe } from '../../pipes/author.pipe';

export interface Book extends BookAttributes {
  id: string;
}

export interface BookAttributes {
  description: string;
  coverType: string;
  pageCount: string;
  name: string;
  author: SinglePage<Author>;
  year: number;
  genre: string;
  price: number;
  preview: Image;
}

export interface Image {
  data: {
    id: number;
    attributes: {
      name: string;
      width: number;
      height: number;
      ext: string;
      mime: string;
      size: number;
      url: string;
    }
  };
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, RouterLink, AuthorPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {

  @Input() book?: Book;

  constructor() { }

  ngOnInit(): void {
  }

}
