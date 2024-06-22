import { BeerService } from './services/beer.service';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BeerListComponent } from './components/beer-list/beer-list.component';
import { Beer, BeerSort } from './models/beer.model';
import { SessionStorageKeys } from './constants/constants';
import { FooterComponent } from './components/footer/footer.component';
import { firstValueFrom } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { BeerFiltersComponent } from './components/beer-filters/beer-filters.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    BeerListComponent,
    FooterComponent,
    ButtonModule,
    RippleModule,
    TooltipModule,
    BeerFiltersComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  scrollableEl = viewChild.required<ElementRef<HTMLElement>>('scrollable');

  isScrolled = signal<boolean>(false);

  beers = signal<Beer[]>([]);
  name = signal<string>('');
  alcoholContent = signal<[number, number]>([0, 100]);
  showFavourites = signal<boolean>(false);
  sort = signal<BeerSort>(BeerSort.Name);

  computeFilters = () => {
    const beers = this.beers();
    const name = this.name().toLocaleUpperCase();
    const [abvMin, abvMax] = this.alcoholContent();
    const showFavourites = this.showFavourites();
    const sort = this.sort();

    const filtered = beers.filter(
      (b) =>
        b.name.toLocaleUpperCase().includes(name) &&
        b.abv >= abvMin &&
        b.abv <= abvMax &&
        (!showFavourites ? true : b.favourite === showFavourites)
    );

    return filtered.sort((a, b) => {
      return sort === BeerSort.Name
        ? a.name.localeCompare(b.name)
        : a.abv - b.abv;
    });
  };

  filteredBeers = computed<Beer[]>(this.computeFilters);

  constructor(private beerService: BeerService) {
  }

  async ngOnInit() {
    const scrollable = this.scrollableEl().nativeElement;

    scrollable.addEventListener('scroll', () => {
      this.isScrolled.set(scrollable.scrollTop > 0);
    });

    await this.getData();
  }

  scrollToTop() {
    this.scrollableEl().nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  favouriteChange({ id, favourite }: { id: number; favourite: boolean }) {
    const beers = this.beers().map((beer) => {
      return beer.id === id ? { ...beer, favourite } : beer;
    });

    this.beers.set(beers);
  }

  private async getData() {
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
