import { IFormError } from "@/InterFaces/AuthInterFaces";
import { IJoinQuizResponse, IQuizzesResponse, ISubmitQuizResponse } from "@/InterFaces/QuizzesInterFaces";
import CookieServices from "@/Services/CookieServices/CookieServices";
import { BASE_URL, QUIZZES_URLS } from "@/Services/EndPoints/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";


export const QuizzesApiSlice = createApi({
  reducerPath: "quizzes",
  tagTypes: ["Quizzes"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getFirstUpcomingQuizzes: builder.query({
      query: () => ({
        url: QUIZZES_URLS.upcomingQuizzes,
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }
      }),
      providesTags: (result) => ['Quizzes', ...result?.map(({ _id }: any) => ({ type: 'Quizzes', _id }))],
    }),
    completedQuizzes: builder.query({
      query: () => ({
        url: QUIZZES_URLS.completedQuizzes,
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }
      })
    }),
    createQuiz: builder.mutation({
      query: (data) => {
        return {
          url: QUIZZES_URLS.createQuiz,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${CookieServices.get("token")}`
          }
        }
      },
      invalidatesTags: ["Quizzes"],

      transformResponse: (response: IQuizzesResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }

    }),
    deleteQuiz: builder.mutation({
      query: (deleteItemId) => {
        return {
          url: QUIZZES_URLS.quizzesOperations(deleteItemId),
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookieServices.get("token")}`
          }
        }
      },
      invalidatesTags: ["Quizzes"],

      transformResponse: (response: IQuizzesResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }

    }),
    editQuiz: builder.mutation({
      query: (data) => {
        const { editItemId, ...bodyData } = data
        return {
          url: QUIZZES_URLS.quizzesOperations(editItemId),
          method: "PUT",
          body: bodyData,
          headers: {
            Authorization: `Bearer ${CookieServices.get("token")}`
          }
        }
      },
      invalidatesTags: ["Quizzes"],

      transformResponse: (response: IQuizzesResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }

    }),

    quizzesDetails: builder.query({
      query: (_id) => ({
        url: QUIZZES_URLS.quizzesOperations(_id),
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }
      }),
    }),


    //! ******************* Students Functions *******************
    joinQuiz: builder.mutation({
      query: (data) => {
        return {
          url: QUIZZES_URLS.joinQuiz,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${CookieServices.get("token")}`
          }
        }
      },
      invalidatesTags: ["Quizzes"],
      transformResponse: (response: IJoinQuizResponse) => {
        toast.success(response.message);
        return response as IJoinQuizResponse;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }

    }),
    submitQuiz: builder.mutation({
      query: (data) => {
        const { _id, ...bodyData } = data
        return {
          url: QUIZZES_URLS.finishQuiz(_id),
          method: "POST",
          body: bodyData,
          headers: {
            Authorization: `Bearer ${CookieServices.get("token")}`
          }
        }
      },
      invalidatesTags: ["Quizzes"],
      transformResponse: (response: ISubmitQuizResponse) => {
        toast.success(response.message);
        return response as ISubmitQuizResponse;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }

    }),
  }),
})
export const { useSubmitQuizMutation, useJoinQuizMutation, useGetFirstUpcomingQuizzesQuery, useCompletedQuizzesQuery, useCreateQuizMutation, useQuizzesDetailsQuery, useDeleteQuizMutation, useEditQuizMutation } = QuizzesApiSlice
