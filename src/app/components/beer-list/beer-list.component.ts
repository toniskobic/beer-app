import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { Beer } from '../../models/beer.model';
import { BeerCardComponent } from '../beer-card/beer-card.component';

@Component({
  selector: 'app-beer-list',
  standalone: true,
  imports: [BeerCardComponent],
  templateUrl: './beer-list.component.html',
  styleUrl: './beer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerListComponent {
  beers = model.required<Beer[]>();

  onFavouriteChange(id: number, favourite: boolean) {
    const beers = this.beers().map((beer) =>
      beer.id === id ? { ...beer, favourite } : beer
    );
    this.beers.set(beers);
  }
}
