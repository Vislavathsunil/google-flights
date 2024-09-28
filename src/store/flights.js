import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RAPID_KEY = import.meta.env.VITE_RAPID_API_FLIGHTS_KEY;

export const flightsApi = createApi({
  reducerPath: "flightsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sky-scrapper.p.rapidapi.com/",
    prepareHeaders: (header) => {
      header.set(
        "x-rapidapi-key",
        "022addd84emsh357be52740d83abp105b95jsn7d5d536dc3b7"
      );
      header.set("x-rapidapi-host", "sky-scrapper.p.rapidapi.com");
      return header;
    },
  }),

  // set of operation you want to perforom on  against your server.
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `/api/v1/flights/searchAirport?query=${params.cityName}&locale=en-US`,
    }),
    getFlightDetails: builder.query({
      query: (params) => {
        return params.returnDate.length != 0
          ? `/api/v2/flights/searchFlights?originSkyId=${params.originSkyId}&destinationSkyId=${params.destinationSkyId}&originEntityId=${params.originEntity}&destinationEntityId=${params.destinationEntity}&date=${params.startDate}&returnDate=${params.returnDate}&cabinClass=${params.cabin}&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US`
          : `/api/v2/flights/searchFlights?originSkyId=${params.originSkyId}&destinationSkyId=${params.destinationSkyId}&originEntityId=${params.originEntity}&destinationEntityId=${params.destinationEntity}&date=${params.startDate}&cabinClass=${params.cabin}&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US`;
      },
    }),
  }),
});

export const { useLazyGetSummaryQuery, useLazyGetFlightDetailsQuery } =
  flightsApi;
