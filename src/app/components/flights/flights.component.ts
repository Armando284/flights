import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services';
import { Flight, PaginateFlights } from 'src/app/models';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent {
  private _page: number = 1;
  private _perPage: number = 10;
  flights: Flight[] = [];
  totalFlights: number = 0;
  totalPages: number = Infinity;

  constructor(
    private _flightsService: FlightService,
    private _location: Location,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._page = parseInt(localStorage.getItem('page') || '1');
    this._perPage = parseInt(localStorage.getItem('perPage') || '10');
    this.loadFlights();
  }

  private loadFlights() {
    this._flightsService
      .getFlightsPage(this.page, this.perPage)
      .then((data: PaginateFlights) => {
        this.flights = data.items;
        this.totalFlights = data.total;
        this.totalPages = data.totalPages;
        if (this.page > this.totalPages) this.page = 1;

      });
    this.makeUrl();
  }

  private isValidPage(page: number = 1): boolean {
    return page > 0 && page <= this.totalPages;
  }

  set page(page: number) {
    if (!this.isValidPage(page)) return;
    this._page = page;
    localStorage.setItem('page', page.toString());
    this.loadFlights();
  }

  get page(): number {
    return this._page;
  }

  set perPage(perPage: number) {
    this._perPage = perPage;
    localStorage.setItem('perPage', perPage.toString());
    this.loadFlights();
  }

  get perPage(): number {
    return this._perPage;
  }

  prevPag(): void {
    this.page = this.page - 1;
  }

  nextPag(): void {
    this.page = this.page + 1;
  }

  range(i: number): number[] {
    return Array(i)
      .fill(0)
      .map((x, i) => i + 1);
  }

  changeItemsPerPage(perPage: string): void {
    this.perPage = parseInt(perPage);
  }

  private makeUrl() {
    const url = this._router
      .createUrlTree([], {
        relativeTo: this._activatedRoute,
        queryParams: { page: this.page, perPage: this.perPage },
      })
      .toString();
    this._location.go(url);
  }
}
