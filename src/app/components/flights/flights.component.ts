import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services';
import { Flight, PaginateFlights } from 'src/app/models';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent {
  page: number = 1;
  perPage: number = 10;
  flights: Flight[] = [];
  totalFlights: number = 0;
  totalPages: number = Infinity;

  constructor(
    private _flightsService: FlightService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.page = +(params.get('page') || '1');
      this.perPage = +(params.get('perPage') || '10');
      console.log(this.page, this.perPage);
      this.loadFlights();
    });

  }

  private loadFlights() {
    this._flightsService
      .getFlightsPage(this.page, this.perPage)
      .then((data: PaginateFlights) => {
        this.flights = data.items;
        this.totalFlights = data.total;
        this.totalPages = data.totalPages;
        if (!this.isValidPage(this.page) || !this.isValidPerPage(this.perPage)) {
          this._router.navigate(['bad-request']);
        }
      });
  }

  private isValidPage(page: number = 1): boolean {
    return page > 0 && page <= this.totalPages;
  }

  private isValidPerPage(perPage: number = 1): boolean {
    return perPage > 0 && perPage <= this.totalFlights;
  }

  private navigate() {
    this._router.navigate(['/flights', 'page', this.page, 'perPage', this.perPage]);
  }

  private updatePage(page: number): void {
    if (!this.isValidPage(page)) return
    this.page = page;
    this.navigate();
  }

  prevPag(): void {
    this.updatePage(this.page - 1);
  }

  nextPag(): void {
    this.updatePage(this.page + 1);
  }

  range(i: number): number[] {
    return Array(i)
      .fill(0)
      .map((x, i) => i + 1);
  }

  changeItemsPerPage(perPage: string): void {
    if (!this.isValidPerPage(+perPage)) return;
    this.perPage = +perPage;
    if (this.page > Math.ceil(this.totalFlights / this.perPage)) this.page = 1;
    this.navigate();
  }

  addFlights() {
    this._router.navigate(['/flights', 'create']);
  }
}
