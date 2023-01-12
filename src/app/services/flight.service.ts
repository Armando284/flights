import { Injectable } from '@angular/core';
import { Flight, PaginateFlights } from '../models';
import { getFlightsPage } from '../data';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor() { }

  public getFlightsPage(page: number, perPage: number): Promise<PaginateFlights> {
    return getFlightsPage(page, perPage);
  }
}
