import { IFormError } from "@/InterFaces/AuthInterFaces";
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
        url: QUESTIONS_URLS.questionsOperations,
        headers: {
          Authorization: `Bearer ${CookieServices.get("token")}`
        }
      }),
      providesTags: (result) => ['Questions', ...result.map(({ _id }: any) => ({ type: 'Questions', _id }))],
    }),
    createQuestion: builder.mutation({
      query: (data) => {
        return {
          url: QUESTIONS_URLS.questionsOperations,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${CookieServices.get("token")}`
          }
        }
      },
      invalidatesTags: ["Questions"],

      transformResponse: (response: any) => {
        console.log(response);
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        console.log(error);
        toast.error(error?.data?.message);
        return error;
      }

    }),
  }),
})
export const { useAllQuestionsQuery,useCreateQuestionMutation } = QuestionsApiSlice
