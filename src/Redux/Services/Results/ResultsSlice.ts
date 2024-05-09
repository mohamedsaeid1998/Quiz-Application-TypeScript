import CookieServices from "@/Services/CookieServices/CookieServices";
import { BASE_URL, RESULTS_URLS } from "@/Services/EndPoints/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ResultsApiSlice = createApi({
  reducerPath: "results",
  tagTypes: ["Results"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    quizzesResults: builder.query({
      query: () => ({
        url: RESULTS_URLS.resultsList,
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }

      }),
      providesTags: (result) => ['Results', ...result.map(({ _id }: any) => ({ type: 'Results', _id }))],
    }),
  }),
})
export const { useQuizzesResultsQuery } = ResultsApiSlice
