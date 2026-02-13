import axios, {
    type AxiosError,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
  } from "axios";
  
  function jwtInterceptor(): void {
    axios.interceptors.request.use(
      (req: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = window.localStorage.getItem("token");
        const hasToken = Boolean(token);
  
        if (hasToken && req.headers) {
          req.headers.Authorization = `Bearer ${token}`;
        }
  
        return req;
      }
    );
  
    axios.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        return response;
      },
      (error: AxiosError<{ error?: string }>) => {
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data?.error?.includes("Unauthorized")
        ) {
          window.localStorage.removeItem("token");
          window.location.replace("/");
        }
  
        return Promise.reject(error);
      }
    );
  }
  
  export default jwtInterceptor;
  