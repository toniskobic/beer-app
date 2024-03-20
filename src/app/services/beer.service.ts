import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Beer, BeerDetails, beerMapper } from '../models/beer.model';
import { Observable, map } from 'rxjs';

const API_URL = environment.api;

type Params =
  | HttpParams
  | {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    };

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  private readonly beerUrl = 'beers';

  constructor(private http: HttpClient) {}

  getBeers(params?: Params): Observable<Beer[]> {
    return this.http
      .get<BeerDetails[]>(`${API_URL}/${this.beerUrl}`, { params })
      .pipe(map((beers) => beers.map(beerMapper)));
  }
}
