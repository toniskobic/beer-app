import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Beer } from '../../models/beer.model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-beer-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beer-dialog.component.html',
  styleUrl: './beer-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerDialogComponent {
  private _config = inject(DynamicDialogConfig);
  private _beerService = inject(BeerService);

  beer = signal<Beer | undefined>(undefined);
  imagesAvailable = this._beerService.imagesAvailable;

  constructor() {
    this.beer.set(this._config.data.beer as Beer);
  }
}
