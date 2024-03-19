import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-beer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beer-list.component.html',
  styleUrl: './beer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerListComponent {}
