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
import { map } from 'rxjs';
import { BeerSort } from './../../models/beer.model';

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
  name = model<string>();
  alcoholContent = model<[number, number]>([0, 100]);
  showFavourites = model<boolean>();
  sort = model<BeerSort>();

  filtersEl = viewChild.required<ElementRef<HTMLElement>>('filters');

  sortOptions = signal<{ label: string; value: BeerSort }[]>([
    { label: 'Sort by name', value: BeerSort.Name },
    { label: 'Sort by alcohol', value: BeerSort.Alcohol },
  ]);

  nameFilter = new FormControl('', { nonNullable: true });
  alcoholFilter = new FormControl<[number, number]>([0, 100], {
    nonNullable: true,
  });
  favouritesFilter = new FormControl(false, { nonNullable: true });
  sortControl = new FormControl<BeerSort>(BeerSort.Name, {
    nonNullable: true,
  });

  constructor(private element: ElementRef) {
    connect(this.name, this.nameFilter.valueChanges.pipe(map((v) => v.trim())));
    connect(this.showFavourites, this.favouritesFilter.valueChanges);
    connect(this.alcoholContent, this.alcoholFilter.valueChanges);
    connect(this.sort, this.sortControl.valueChanges);
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
