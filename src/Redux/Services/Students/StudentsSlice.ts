import CookieServices from "@/Services/CookieServices/CookieServices";
import { BASE_URL, STUDENTS_URLS } from "@/Services/EndPoints/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

export const StudentsApiSlice = createApi({
  reducerPath: "students",
  tagTypes: ["Students"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL,prepareHeaders: (headers) => {
    const token = CookieServices.get('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    } else {
      toast("you must login first", { type: "error" });
    }
  }, }),
  endpoints: (builder) => ({
    getTopFiveStudents: builder.query({
      query: () => ({
        url: STUDENTS_URLS.topFiveStudents,
      }),
      providesTags: (result) => ['Students', ...result.map(({ _id }: any) => ({ type: 'Students', _id }))],
    }),
    allStudentsWithoutGroups: builder.query({
      query: () => ({
        url: STUDENTS_URLS.allStudentsWithoutGroups,
      }),
      providesTags: (result) => ['Students', ...result.map(({ _id }: any) => ({ type: 'Students', _id }))],
    }),

    allStudents: builder.query({
      query: () => ({
        url: STUDENTS_URLS.allStudents,
      })
    }),

    studentDetails: builder.query({
      query: (id) => ({
        url: STUDENTS_URLS.StudentDetails(id),
      })
    }),
  }),
})
export const { useGetTopFiveStudentsQuery, useAllStudentsWithoutGroupsQuery, useAllStudentsQuery, useStudentDetailsQuery } = StudentsApiSlice
