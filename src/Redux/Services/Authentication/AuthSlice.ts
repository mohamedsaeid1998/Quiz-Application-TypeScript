import { toast } from 'react-toastify';
import { ILoginResponse, IFormError, IRegisterResponse, IForgetError, IForgetResponse, IResetPassResponse, IChangePassResponse } from '@/InterFaces/AuthInterFaces';
import CookieServices from '@/Services/CookieServices/CookieServices';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AUTH_URLS, BASE_URL } from '@/Services/EndPoints/EndPoints';
export const AuthenticationApiSlice = createApi({
  reducerPath: "auth",
  tagTypes: ["Authentication"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: AUTH_URLS.login,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ILoginResponse) => {
        const res = response.data;
        CookieServices.set('token', res.accessToken);
        CookieServices.set('role', JSON.stringify(res.profile));
        toast.success(response.message);
        return response;
      }, transformErrorResponse: (error: IFormError) => {
        toast.error(error.data.message);
        return error;
      }
    }),
    register: builder.mutation({
      query: (data) => ({
        url: AUTH_URLS.register,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: IRegisterResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error.data.message);
        return error;
      }
    }),
    forget: builder.mutation({
      query: (data) => ({
        url: AUTH_URLS.forgotPass,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: IForgetResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IForgetError) => {
        toast.error(error.data.message[0]);
        return error;
      }
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        delete data.confirmPassword;
        return {
          url: AUTH_URLS.resetPass,
          method: "POST",
          body: data
        }
      },
      transformResponse: (response: IResetPassResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        if (typeof error?.data?.message == "object") {
          toast.error(error?.data?.message[0]);
        } else {
          toast.error(error?.data?.message);
        }
        return error;
      }
    }),
    changePassword: builder.mutation({
      query: (data) => {
        delete data.confirmPassword;
        return {
          url: AUTH_URLS.changePass,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${CookieServices.get("token")}`
          }
        }
      },
      transformResponse: (response: IChangePassResponse) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error?.data?.message);
        return error;
      }
    })
  })
})
export const { useLoginMutation, useRegisterMutation, useForgetMutation, useResetPasswordMutation, useChangePasswordMutation } = AuthenticationApiSlice
