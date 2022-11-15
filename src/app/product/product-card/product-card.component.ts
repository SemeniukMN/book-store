import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule} from '@taiga-ui/core';

export interface Book {
  name: string;
  author: string;
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
  imports: [CommonModule, TuiButtonModule],
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
