import CookieServices from "@/Services/CookieServices/CookieServices";
import { BASE_URL, RESULTS_URLS } from "@/Services/EndPoints/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

export const ResultsApiSlice = createApi({
  reducerPath: "results",
  tagTypes: ["Results"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, prepareHeaders: (headers) => {
      const token = CookieServices.get('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        toast("you must login first", { type: "error" });
      }
    },
  }),
  endpoints: (builder) => ({
    quizzesResults: builder.query({
      query: () => ({
        url: RESULTS_URLS.resultsList,
      }),
      providesTags: (result) => ['Results', ...result.map(({ _id }: any) => ({ type: 'Results', _id }))],
    }),
  }),
})
export const { useQuizzesResultsQuery } = ResultsApiSlice
