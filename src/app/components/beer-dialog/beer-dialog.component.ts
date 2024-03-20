import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Beer } from '../../models/beer.model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-beer-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beer-dialog.component.html',
  styleUrl: './beer-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerDialogComponent {
  beer = signal<Beer | undefined>(undefined);

  constructor(public config: DynamicDialogConfig) {
    this.beer.set(this.config.data.beer as Beer);
  }
}
