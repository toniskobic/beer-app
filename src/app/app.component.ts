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
import { SessionStorageKeys } from './constants/constants';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, HeaderComponent, BeerListComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  beers = signal<Beer[]>([]);

  ngOnInit(): void {
    const favourites = JSON.parse(
      sessionStorage.getItem(SessionStorageKeys.Favourites) || '[]'
    );

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
