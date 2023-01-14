import { v4 } from 'uuid';
import { Flight, PaginateFlights } from "../models";

const randomCapacity = (): number => ~~(Math.random() * 100);

const range: number[] = new Array<number>(15).fill(0);
// console.log({ emptyFlights });
const flightsData: Flight[] = range.map(i => {
  return {
    code: v4(),
    capacity: randomCapacity(),
    constructionDate: new Date()
  }
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
    items: paginatedItems
  }
}

export const getFlightsPage = (page: number, perPage: number): Promise<PaginateFlights> => {
  return new Promise<PaginateFlights>((resolve, reject) => {
    setTimeout(() => {
      resolve(paginate(flightsData, page, perPage));
    }, 300);
  })
};
