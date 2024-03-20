import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Beer } from '../../models/beer.model';
import { RippleModule } from 'primeng/ripple';
import { SessionStorageKeys } from '../../constants/constants';
import { DialogModule } from 'primeng/dialog';
import { BeerDialogComponent } from '../beer-dialog/beer-dialog.component';

@Component({
  selector: 'app-beer-card',
  standalone: true,
  templateUrl: './beer-card.component.html',
  styleUrl: './beer-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    CommonModule,
    RippleModule,
    DialogModule,
    BeerDialogComponent,
  ],
})
export class BeerCardComponent {
  beer = input.required<Beer>();

  favouriteChange = output<boolean>();

  isDialogVisible = signal(false);

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

  dialogVisibleChange(visible: boolean) {
    this.isDialogVisible.set(visible);
  }
}
