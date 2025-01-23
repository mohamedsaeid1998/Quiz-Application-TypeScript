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
    allQuestions: builder.query({
      query: () => ({
        url: QUESTIONS_URLS.createQuestion,
      }),
      providesTags: (result) => ['Questions', ...result.map(({ _id }: any) => ({ type: 'Questions', _id }))],
    }),
    createQuestion: builder.mutation({
      query: (data) => {
        return {
          url: QUESTIONS_URLS.createQuestion,
          method: "POST",
          body: data,
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
      }),

    }),
    getQuestions: builder.query({
      query: (id) => ({
        url: QUESTIONS_URLS.examQuestions(id),
      }),

    }),

  }),
})
export const { useGetQuestionsQuery, useAllQuestionsQuery, useCreateQuestionMutation, useDeleteQuestionMutation, useEditQuestionMutation, useQuestionDetailsQuery } = QuestionsApiSlice
