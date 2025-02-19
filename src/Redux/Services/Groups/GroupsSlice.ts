import { IFormError } from "@/InterFaces/AuthInterFaces";
import { IGroupResponse } from "@/InterFaces/GroupsInterFaces";
import CookieServices from "@/Services/CookieServices/CookieServices";
import { BASE_URL, GROUPS_URLS } from "@/Services/EndPoints/EndPoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";


export const GroupsApiSlice = createApi({
  reducerPath: "groups",
  tagTypes: ["Groups"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, prepareHeaders:(headers) =>{
      const token = CookieServices.get('token');
      if(token){
        headers.set('Authorization', `Bearer ${token}`);
      }else{
        toast("you must login first",{type:"error"});
      }
    },
  }),
  endpoints: (builder) => ({
    groupsList: builder.query({
      query: () => ({
        url: GROUPS_URLS.groupsList,
      }),
      providesTags: (result) => ['Groups', ...result.map(({ _id }: any) => ({ type: 'Groups', _id }))]
    }),
    createGroup: builder.mutation({
      query: (data) => {
        return {
          url: GROUPS_URLS.groupsList,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["Groups"],

      transformResponse: (response: IGroupResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }

    }),
    deleteGroup: builder.mutation({
      query: (data) => {
        return {
          url: GROUPS_URLS.UpdateOrDeleteGroup(data.deleteItemId),
          method: "DELETE",
          body: data,
        }
      },
      invalidatesTags: ["Groups"],

      transformResponse: (response: IGroupResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }
    }),

    editGroup: builder.mutation({
      query: (data) => {
        const { editItemId, ...bodyData } = data;
        return {
          url: GROUPS_URLS.UpdateOrDeleteGroup(editItemId),
          method: "PUT",
          body: bodyData,
        }
      },
      invalidatesTags: ["Groups"],

      transformResponse: (response: IGroupResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }

    }),

    getGroupById: builder.query({
      query: (_id) => ({
        url: GROUPS_URLS.UpdateOrDeleteGroup(_id),
      }),
    }),

  }),
})
export const { useCreateGroupMutation, useGroupsListQuery, useDeleteGroupMutation, useEditGroupMutation, useGetGroupByIdQuery } = GroupsApiSlice
