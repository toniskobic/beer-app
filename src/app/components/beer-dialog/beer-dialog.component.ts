import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Beer } from '../../models/beer.model';

@Component({
  selector: 'app-beer-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './beer-dialog.component.html',
  styleUrl: './beer-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerDialogComponent {
  beer = input.required<Beer>();

  visible = model.required<boolean>();
}
