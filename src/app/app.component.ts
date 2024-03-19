import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BeerListComponent } from './components/beer-list/beer-list.component';
import { Beer } from './models/beer.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BeerListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  beers = signal<Beer[]>([]);

  ngOnInit(): void {
    const favourites = JSON.parse(sessionStorage.getItem('favourites') || '[]');
    const beers: Beer[] = [
      {
        id: 1,
        name: 'Beer 1',
        description: 'This is the first beer',
        abv: 5.5,
        image_url: 'https://images.punkapi.com/v2/keg.png',
      },
      {
        id: 2,
        name: 'Beer 2',
        description: 'This is the second beer',
        abv: 6.0,
        image_url: 'https://images.punkapi.com/v2/keg.png',
      },
      {
        id: 3,
        name: 'Beer 3',
        description: 'This is the third beer',
        abv: 6.5,
        image_url: 'https://images.punkapi.com/v2/keg.png',
      },
    ];

    beers.forEach((beer) => {
      beer.favourite = favourites.includes(beer.id);
    });

    this.beers.set(beers);
  }
}
