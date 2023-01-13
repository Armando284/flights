import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services';
import { Flight, PaginateFlights } from 'src/app/models';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {
  private _page: number = 1;
  private _perPage: number = 10;
  flights: Flight[] = [];
  totalFlights: number = 0;
  totalPages: number = 1;

  constructor(private _flightsService: FlightService) { }

  ngOnInit() {
    this.loadFlights();
  }

  private loadFlights() {
    this._flightsService.getFlightsPage(this.page, this.perPage).then((data: PaginateFlights) => {
      this.flights = data.items;
      this.totalFlights = data.total;
      this.totalPages = data.totalPages;
      console.log(this.flights);
    });
  }

  private isValidPageChange(change: number = 1): boolean {
    const page = this._page + change;
    return (page > 0 && page <= this.totalPages);
  }

  set page(change: number) {
    if (!this.isValidPageChange(change)) return;
    this._page += change;
    console.log({ change, page: this._page });
    this.loadFlights();
  }

  get page(): number { return this._page; }

  set perPage(change: number) {
    this._perPage = change;
    this.loadFlights();
  }

  get perPage(): number { return this._perPage; }

  prevPag(): void {
    this.page = -1;
  }

  nextPag(): void {
    this.page = 1;
  }

  range(i: number): number[] {
    return Array(i).fill(0).map((x, i) => i + 1);
  }

  changeItemsPerPage(change: string): void {
    this.perPage = parseInt(change);
  }
}
