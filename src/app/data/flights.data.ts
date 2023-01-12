import { v4 } from 'uuid';
import { Flight, PaginateFlights } from "../models";

const emptyFlights: Flight[] = new Array<Flight>(15);

const randomCapacity = (): number => ~~(Math.random() * 100);

const flightsData = emptyFlights.map(flight => {
  flight.code = v4();
  flight.capacity = randomCapacity();
  flight.constructionDate = new Date();
  return flight;
});

const paginate = (array: Flight[], page: number = 1, perPage: number = 10) => {
  const offset = (page - 1) * perPage,
    paginatedItems = array.slice(offset).slice(0, perPage),
    totalPages = Math.ceil(array.length / perPage);
  return {
    page,
    perPage,
    prevPage: page - 1 ? page - 1 : null,
    nextPage: totalPages > page ? page + 1 : null,
    total: array.length,
    totalPages,
    data: paginatedItems
  }
}

export const getFlightsPage = (page: number, perPage: number): PaginateFlights => paginate(flightsData, page, perPage);
