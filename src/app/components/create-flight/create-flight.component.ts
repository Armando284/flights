import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 } from 'uuid';
import { FlightService } from 'src/app/services';
import { Flight } from 'src/app/models';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.scss']
})
export class CreateFlightComponent {
  flightForm!: FormGroup;

  constructor(
    private _flightService: FlightService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.flightForm = this.fb.group({
      code: [v4(), Validators.required],
      capacity: [0, [Validators.required, Validators.min(0)]],
      constructionDate: [Date.now(), [Validators.required, Validators.max(Date.now())]]
    });
  }

  get code(): string {
    return this.flightForm.value.code;
  }

  get capacity(): number {
    return this.flightForm.value.capacity;
  }

  get constructionDate(): Date {
    return this.flightForm.value.constructionDate;
  }

  private isValid(data: any): boolean {
    return data !== null && data !== undefined
  }

  onSubmit() {
    if (this.flightForm.invalid) return;
    if (![this.code, this.capacity, this.constructionDate].every(this.isValid)) return;
    const newFlight: Flight = {
      code: this.code,
      capacity: this.capacity,
      constructionDate: this.constructionDate,
    }
    this._flightService.createFlight(newFlight);
    this.flightForm.reset({
      code: v4(),
      capacity: 0,
      constructionDate: new Date(),
    });
  }
}
