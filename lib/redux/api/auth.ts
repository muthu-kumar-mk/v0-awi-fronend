import { api } from '@/lib/redux/api';
import { loginCredentials } from '@/utils/helper';

// Passing Tag arguments to builder api to use automatic re-fetching 😀
const tagInjection: any = api.enhanceEndpoints({ addTagTypes: ['UserProfile'] });

export const authApi = tagInjection.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query(body: any) {
        console.log(body)
        return {
          url: `core/api/auth/login/`,
          // url:`/api/auth/login`,
          method: 'post',
          body,
          needError: true,
          successCode: 1,
        };
      },
      invalidatesTags: ['UserProfile'],
      transformResponse: (res: any) => {
        console.log("Login response:", res)
        if (res?.statusCode === 200 && res?.response) {
          loginCredentials('userCred', res?.response);
          loginCredentials('warehouseIds', res?.response);
        }
        return res;
      },
    }),
    resetEmail: builder.mutation({
      query(body: any) {
        return {
          url: `core/api/auth/PasswordResetToken`,
          method: 'post',
          body,
        };
      },
      transformResponse: (res: any) => {
        return res;
      },
    }),
    reset: builder.mutation({
      query(body: any) {
        return {
          url: `core/api/auth/PasswordResetToken`,
          method: 'post',
          body,
          needError: true,
        };
      },
      transformResponse: (res: any) => {
        return res;
      },
    }),
    forgotPassword: builder.mutation({
      query(body: any) {
        return {
          url: `core/api/auth/ResetPassword`,
          body,
          method: 'post',
          needError: true,
          successCode: 2,
        };
      },
      transformResponse: (res: any) => {
        return res;
      },
    }),
    resendLink: builder.mutation({
      query(body: any) {
        return {
          url: `core/api/auth/ResendActivationMail`,
          body,
          method: 'post',
          needError: true,
          successCode: 3,
        };
      },
      transformResponse: (res: any) => {
        return res;
      },
    }),
    tokenValidate: builder.mutation({
      query(body: any) {
        return {
          url: `core/api/auth/ValidateToken`,
          body,
          method: 'post',
        };
      },
    }),
  }),
  overrideExisting: true,
});

// Export endpoints as hooks 😄
// auto-generated based on the defined endpoints.
export const {
  useLoginMutation,
  useResetEmailMutation,
  useResetMutation,
  useForgotPasswordMutation,
  useResendLinkMutation,
  useTokenValidateMutation,
} = authApi;