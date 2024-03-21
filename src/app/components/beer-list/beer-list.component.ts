import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { Beer } from '../../models/beer.model';
import { BeerCardComponent } from '../beer-card/beer-card.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-beer-list',
  standalone: true,
  imports: [
    BeerCardComponent,
    InputTextModule,
    ReactiveFormsModule,
    SliderModule,
    CheckboxModule,
    DropdownModule,
  ],
  templateUrl: './beer-list.component.html',
  styleUrl: './beer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerListComponent {
  sortOptions = signal([
    { label: 'Sort by name', value: 'name' },
    { label: 'Sort by alcohol', value: 'alcohol' },
  ]);

  beers = input.required<Beer[]>();

  favouriteChange = output<{ id: number; favourite: boolean }>();

  nameFilter = new FormControl('');
  alcoholFilter = new FormControl<[number, number]>([0, 100]);
  favouritesFilter = new FormControl(false);
  sortControl = new FormControl('name');

  onFavouriteChange(id: number, favourite: boolean) {
    this.favouriteChange.emit({ id, favourite });
  }
}
