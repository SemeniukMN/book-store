import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule} from '@taiga-ui/core';

export interface Book {
  title: string;
  author: string;
  year: number;
  genre: string;
  price: number;
  preview: string;
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

  @Input() book: Book = {
    author: 'Тереза дрисколл',
    genre: 'Драмма',
    preview: '',
    price: 2000,
    title: 'До самой смерти',
    year: 2002
  };

  constructor() { }

  ngOnInit(): void {
  }

}
