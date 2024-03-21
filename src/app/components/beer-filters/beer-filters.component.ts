import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-beer-filters',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    SliderModule,
    CheckboxModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './beer-filters.component.html',
  styleUrl: './beer-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerFiltersComponent {
  filtersEl = viewChild.required<ElementRef<HTMLElement>>('filters');

  sortOptions = signal([
    { label: 'Sort by name', value: 'name' },
    { label: 'Sort by alcohol', value: 'alcohol' },
  ]);

  nameFilter = new FormControl('');
  alcoholFilter = new FormControl<[number, number]>([0, 100]);
  favouritesFilter = new FormControl(false);
  sortControl = new FormControl('name');

  constructor(private element: ElementRef) {}

  toggleFilters() {
    const filtersEl = this.filtersEl().nativeElement;
    const comp = this.element.nativeElement;

    if (filtersEl.classList.contains('filters-open')) {
      filtersEl.classList.remove('filters-open');
      comp.classList.remove('box-shadow-bottom');
    } else {
      filtersEl.classList.add('filters-open');
      comp.classList.add('box-shadow-bottom');
    }
  }
}
