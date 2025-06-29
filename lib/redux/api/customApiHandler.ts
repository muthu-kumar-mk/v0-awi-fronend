/* eslint-disable consistent-return */
import axios from 'axios';
import { errorMessage } from '@/utils/errorMessage';
import { successMessage } from '@/utils/successMessage';
import { getUserCred, loginCredentials, resetUserCred } from '@/utils/helper';

const BASE_URL = process.env.HOST_API_KEY;

let isRefreshing = false;
const refreshSubscribers: any = [];

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const originalRequest = error?.config;
    // const errorCheckMessageForRedirection = error?.response?.data?.response?.message;

    if (getUserCred('userCred')) {
      if (status === 403) {
        resetUserCred();
        if (window && window.location) {
          resetUserCred();
          window.location.pathname = '/login';
        }
      }

      if (
        status === 404
        // && errorCheckMessageForRedirection === 'Invalid id provided.'
      ) {
        isRefreshing = true;
        if (window && window.location) {
          window.location.pathname = '/404';
        }
      }

      const getUserData = getUserCred('userCred');
      if (status === 401 && getUserData?.token) {
        if (!isRefreshing) {
          isRefreshing = true;
          axios
            .post(`${BASE_URL}core/api/auth/RefreshToken/`, {
              token: getUserData?.token,
              refreshToken: getUserData?.refreshToken,
            })
            .then((res: any) => {
              isRefreshing = false;
              const valueToRefresh = {
                ...getUserData,
                token: res?.data?.response?.token,
                refreshToken: res?.data?.response?.refreshToken,
              };
              loginCredentials('userCred', valueToRefresh);
              loginCredentials('warehouseIds', valueToRefresh);
              onRefreshes(res?.data?.response?.token);
            })
            .catch((e) => {
              //
            });
        } else if (
          status === 401 &&
          error?.response?.data?.response?.message === 'Invalid refresh token.'
        ) {
          let showMessage = false;
          resetUserCred();
          if (!showMessage) {
            !showMessage &&
              errorMessage("You've been logged out due to inactivity, please login again.");
            showMessage = true;
          }
          if (window && window.location) {
            resetUserCred();
            window.location.pathname = '/login';
            showMessage = false;
          }
        }

        const retryOrigReq = new Promise((resolve, reject) => {
          subscribeTokenRefresh((token: any) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axios(originalRequest));
          });
        });
        return retryOrigReq;
      }
    }
    return Promise.reject(error);
  }
);

function subscribeTokenRefresh(cb: any) {
  refreshSubscribers.push(cb);
}

function onRefreshes(token: any) {
  refreshSubscribers.map((cb: any) => cb(token));
}

const customApiHandler =
  (): any =>
  async ({ url, method, body, params, needError, successCode }: any) => {
    console.log("URL :", url)
    console.log(`${BASE_URL}${url}`)
    console.log("Body :", body)
    try {
      axios.interceptors.request.use(
        (config: any) => {
          const getUserData = getUserCred('userCred');
          if (getUserData && getUserData?.token) {
            config.headers.Authorization = `Bearer ${getUserData?.token}`;
          }
          return config;
        },
        (error: any) => {
          console.log("custom handler  Error :", error)
          Promise.reject(error);
        }
      );

      const result = await axios({ url: BASE_URL + url, method, data: body, params });
      successCode && result?.data?.statusCode === 200 && successMessage(successCode);

      return { data: result.data };
    } catch (error: any) {
      console.log("Error :", error)
      if (needError) {
        error?.response?.data?.response?.validationFailed
          ? errorMessage(error?.response?.data?.response?.validationErrors?.[0]?.value)
          : errorMessage(error?.response?.data?.response?.message);
      }
      return { data: error?.response?.data };
    }
  };
export default customApiHandler;
