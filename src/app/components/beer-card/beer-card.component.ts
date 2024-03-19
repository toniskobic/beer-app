import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Beer } from '../../models/beer.model';
import { RippleModule } from 'primeng/ripple';
import { SessionStorageKeys } from '../../constants/constants';

@Component({
  selector: 'app-beer-card',
  standalone: true,
  imports: [ButtonModule, CommonModule, RippleModule],
  templateUrl: './beer-card.component.html',
  styleUrl: './beer-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerCardComponent {
  beer = input.required<Beer>();

  favouriteChange = output<boolean>();

  toggleFavourite() {
    const { id, favourite } = this.beer();
    let favourites = JSON.parse(
      sessionStorage.getItem(SessionStorageKeys.Favourites) || '[]'
    );

    favourites = favourite
      ? favourites.filter((f: number) => f !== id)
      : [...favourites, id];

    sessionStorage.setItem(
      SessionStorageKeys.Favourites,
      JSON.stringify(favourites)
    );

    this.favouriteChange.emit(!favourite);
  }
}
