import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Beer } from '../../models/beer.model';
import { RippleModule } from 'primeng/ripple';
import { SessionStorageKeys } from '../../constants/constants';
import { DialogService } from 'primeng/dynamicdialog';
import { BeerDialogComponent } from '../beer-dialog/beer-dialog.component';

@Component({
  selector: 'app-beer-card',
  standalone: true,
  imports: [ButtonModule, CommonModule, RippleModule, BeerDialogComponent],
  providers: [DialogService],
  templateUrl: './beer-card.component.html',
  styleUrl: './beer-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerCardComponent {
  private _dialogService = inject(DialogService);

  beer = input.required<Beer>();

  favouriteChange = output<boolean>();

  constructor() { }

  showDetails() {
    this._dialogService.open(BeerDialogComponent, {
      modal: true,
      styleClass: 'dialog',
      header: this.beer().name,
      data: { beer: this.beer() },
    });
  }

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
