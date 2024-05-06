import { IFormError } from "@/InterFaces/AuthInterFaces";
import { IQuestionResponse } from "@/InterFaces/QuestionsInterFaces";
import CookieServices from "@/Services/CookieServices/CookieServices";
import { BASE_URL, QUESTIONS_URLS } from "@/Services/EndPoints/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

export const QuestionsApiSlice = createApi({
  reducerPath: "questions",
  tagTypes: ["Questions"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    allQuestions: builder.query({
      query: () => ({
        url: QUESTIONS_URLS.createQuestion,
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }
      }),
      providesTags: (result) => ['Questions', ...result.map(({ _id }: any) => ({ type: 'Questions', _id }))],
    }),
    createQuestion: builder.mutation({
      query: (data) => {
        return {
          url: QUESTIONS_URLS.createQuestion,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${CookieServices.get("token")}`
          }
        }
      },
      invalidatesTags: ["Questions"],

      transformResponse: (response: IQuestionResponse) => {
        toast.success(response?.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }

    }),

    deleteQuestion: builder.mutation({
      query: (id) => {
        return {
          url: QUESTIONS_URLS.questionOperations(id),
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookieServices.get("token")}`
          }
        }
      },
      invalidatesTags: ["Questions"],

      transformResponse: (response: IQuestionResponse) => {
        toast.success(response?.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }
    }),

    editQuestion: builder.mutation({
      query: (data) => {
        const { editItemId, ...bodyData } = data
        return {
          url: QUESTIONS_URLS.questionOperations(editItemId),
          method: "PUT",
          body: bodyData,
          headers: {
            Authorization: `Bearer ${CookieServices.get("token")}`
          }
        }
      },
      invalidatesTags: ["Questions"],

      transformResponse: (response: IQuestionResponse) => {
        toast.success(response?.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }

    }),
    
    questionDetails: builder.query({
      query: (id) => ({
        url: QUESTIONS_URLS.questionOperations(id),
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }
      }),

    }),
    getQuestions: builder.query({
      query: (id) => ({
        url: QUESTIONS_URLS.examQuestions(id),
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }
      }),

    }),

  }),
})
export const { useGetQuestionsQuery,useAllQuestionsQuery, useCreateQuestionMutation, useDeleteQuestionMutation,useEditQuestionMutation,useQuestionDetailsQuery } = QuestionsApiSlice
