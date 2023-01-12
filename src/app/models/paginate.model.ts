import { Flight } from "./";

export interface PaginateFlights {
  page: number,
  perPage: number,
  prevPage: number | null,
  nextPage: number | null,
  total: number,
  totalPages: number,
  items: Flight[]
}
