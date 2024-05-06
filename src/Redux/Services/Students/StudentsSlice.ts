import CookieServices from "@/Services/CookieServices/CookieServices";
import { BASE_URL, STUDENTS_URLS } from "@/Services/EndPoints/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const StudentsApiSlice = createApi({
  reducerPath: "students",
  tagTypes: ["Students"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getTopFiveStudents: builder.query({
      query: () => ({
        url: STUDENTS_URLS.topFiveStudents,
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }
      }),
      providesTags: (result) => ['Students', ...result.map(({ _id }: any) => ({ type: 'Students', _id }))],
    }),
    allStudentsWithoutGroups: builder.query({
      query: () => ({
        url: STUDENTS_URLS.allStudentsWithoutGroups,
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }
      }),
      providesTags: (result) => ['Students', ...result.map(({ _id }: any) => ({ type: 'Students', _id }))],
    }),

    allStudents: builder.query({
      query: () => ({
        url: STUDENTS_URLS.allStudents,
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }
      })
    }),

    studentDetails: builder.query({
      query: (id) => ({
        url: STUDENTS_URLS.StudentDetails(id),
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }
      })
    }),
  }),
})
export const { useGetTopFiveStudentsQuery, useAllStudentsWithoutGroupsQuery, useAllStudentsQuery, useStudentDetailsQuery } = StudentsApiSlice
