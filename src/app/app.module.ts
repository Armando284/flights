import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightsComponent } from './components/flights/flights.component';

// Services
import { FlightService } from './services';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateFlightComponent } from './components/create-flight/create-flight.component';
import { BackButtonComponent } from './components/shared/back-button/back-button.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent,
    NotFoundComponent,
    CreateFlightComponent,
    BackButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    FlightService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
