import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-beer-filters',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    SliderModule,
    CheckboxModule,
    DropdownModule,
  ],
  templateUrl: './beer-filters.component.html',
  styleUrl: './beer-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerFiltersComponent {
  sortOptions = signal([
    { label: 'Sort by name', value: 'name' },
    { label: 'Sort by alcohol', value: 'alcohol' },
  ]);

  nameFilter = new FormControl('');
  alcoholFilter = new FormControl<[number, number]>([0, 100]);
  favouritesFilter = new FormControl(false);
  sortControl = new FormControl('name');
}
