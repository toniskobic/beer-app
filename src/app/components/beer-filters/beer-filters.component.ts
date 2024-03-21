import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { connect } from 'ngxtension/connect';
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
  favourites = model<boolean>();

  filtersEl = viewChild.required<ElementRef<HTMLElement>>('filters');

  sortOptions = signal([
    { label: 'Sort by name', value: 'name' },
    { label: 'Sort by alcohol', value: 'alcohol' },
  ]);

  nameFilter = new FormControl('', { nonNullable: true });
  alcoholFilter = new FormControl<[number, number]>([0, 100], {
    nonNullable: true,
  });
  favouritesFilter = new FormControl(false, { nonNullable: true });
  sortControl = new FormControl('name', { nonNullable: true });

  constructor(private element: ElementRef) {
    connect(this.favourites, this.favouritesFilter.valueChanges);
  }

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
