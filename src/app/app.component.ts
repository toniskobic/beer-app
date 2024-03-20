import { BeerService } from './services/beer.service';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BeerListComponent } from './components/beer-list/beer-list.component';
import { Beer } from './models/beer.model';
import { SessionStorageKeys } from './constants/constants';
import { FooterComponent } from './components/footer/footer.component';
import { firstValueFrom, map } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { BeerFiltersComponent } from './components/beer-filters/beer-filters.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
})
export class AppComponent implements OnInit {
  scrollableEl = viewChild.required<ElementRef<HTMLElement>>('scrollable');

  beers = signal<Beer[]>([]);
  isScrolled = signal<boolean>(false);

  constructor(private beerService: BeerService) {}

  async ngOnInit() {
    this.scrollableEl().nativeElement.addEventListener('scroll', () => {
      this.isScrolled.set(this.scrollableEl().nativeElement.scrollTop > 0);
    });

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

  scrollToTop() {
    this.scrollableEl().nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
