import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services';
import { Flight, PaginateFlights } from 'src/app/models';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {
  flights: Flight[] = [];
  page: number = 1;
  perPage: number = 10;

  constructor(private _flightsService: FlightService) { }

  ngOnInit() {
    this._flightsService.getFlightsPage(this.page, this.perPage).then((data: PaginateFlights) => {
      this.flights = data.items;
      console.log(this.flights);
    });
  }
}
