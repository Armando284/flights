import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from './components/flights/flights.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateFlightComponent } from './components/create-flight/create-flight.component';

const routes: Routes = [
  { path: 'flights/page/:page/perPage/:perPage', component: FlightsComponent },
  { path: '', redirectTo: 'flights/page/1/perPage/10', pathMatch: 'full' },
  { path: 'flights/create', component: CreateFlightComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
