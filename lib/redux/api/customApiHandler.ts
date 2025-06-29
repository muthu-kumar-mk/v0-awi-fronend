/* eslint-disable consistent-return */
import axios from 'axios';
import { errorMessage } from '@/utils/errorMessage';
import { successMessage } from '@/utils/successMessage';
import { getUserCred, loginCredentials, resetUserCred } from '@/utils/helper';

const BASE_URL = process.env.HOST_API_KEY || "https://api.example.com/";

let isRefreshing = false;
const refreshSubscribers: any = [];

// Configure axios defaults
axios.defaults.timeout = 30000; // 30 second timeout
axios.defaults.maxRedirects = 5;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const originalRequest = error?.config;

    if (getUserCred('userCred')) {
      if (status === 403) {
        resetUserCred();
        if (typeof window !== 'undefined') {
          window.location.pathname = '/login';
        }
      }

      if (status === 404) {
        isRefreshing = true;
        if (typeof window !== 'undefined') {
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
            .catch(() => {
              isRefreshing = false;
              resetUserCred();
              if (typeof window !== 'undefined') {
                window.location.pathname = '/login';
              }
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
          if (typeof window !== 'undefined') {
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
  refreshSubscribers.length = 0;
}

const customApiHandler =
  (): any =>
  async ({ url, method, body, params, needError, successCode }: any) => {
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
          return Promise.reject(error);
        }
      );

      const result = await axios({ 
        url: BASE_URL + url, 
        method, 
        data: body, 
        params,
        // Add retry logic for network errors
        retry: 3,
        retryDelay: 1000
      });
      
      successCode && result?.data?.statusCode === 200 && successMessage(successCode);

      return { data: result.data };
    } catch (error: any) {
      console.error("API Error:", error?.message || "Unknown error");
      
      // Check if it's a network error and retry
      if (error?.message === 'Network Error' && error.config && error.config.retry) {
        const retryCount = error.config.retry;
        if (retryCount > 0) {
          error.config.retry -= 1;
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(axios(error.config));
            }, error.config.retryDelay || 1000);
          });
        }
      }
      
      if (needError) {
        error?.response?.data?.response?.validationFailed
          ? errorMessage(error?.response?.data?.response?.validationErrors?.[0]?.value)
          : errorMessage(error?.response?.data?.response?.message || "An error occurred");
      }
      
      return { data: error?.response?.data || { error: true, message: error?.message } };
    }
  };

export default customApiHandler;