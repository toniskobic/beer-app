import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Beer, BeerDetails, beerMapper } from '../models/beer.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeerService {

  imagesAvailable = signal(true);

  constructor(private http: HttpClient) { }

  getBeers(limit = 25): Observable<Beer[]> {
    return this.http.get<BeerDetails[]>('assets/data/beers.json').pipe(
      map((beers) => {
        return beers.splice(0, limit).map(beerMapper);
      })
    );
  }
}
