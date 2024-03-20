import { BeerService } from './services/beer.service';
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
import { FooterComponent } from './components/footer/footer.component';
import { firstValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, BeerListComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  beers = signal<Beer[]>([]);

  constructor(private beerService: BeerService) {}

  async ngOnInit() {
    const favourites = JSON.parse(
      sessionStorage.getItem(SessionStorageKeys.Favourites) || '[]'
    );

    const beers = await firstValueFrom(this.beerService.getBeers());

    if (favourites.length) {
      beers.forEach((beer) => {
        beer.favourite = favourites.includes(beer.id);
      });
    }

    this.beers.set(beers);
  }
}
