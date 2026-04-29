import axios from "axios";

class AxiosInterceptor {
  constructor(instanceConfig = {}) {
    // Initialize Axios instance with provided configuration
    this.axiosInstance = axios.create({
      ...instanceConfig,
    });

    // Add request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        config.headers = {
          "X-RapidAPI-Key": import.meta.env.VITE_X_RAPIDAPI_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_X_RAPIDAPI_HOST,
          "Content-Type": "application/json",
        };
        console.log(config);
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Bind instance methods for convenience
    this.get = this.axiosInstance.get.bind(this.axiosInstance);
    this.post = this.axiosInstance.post.bind(this.axiosInstance);
    this.put = this.axiosInstance.put.bind(this.axiosInstance);
    this.delete = this.axiosInstance.delete.bind(this.axiosInstance);
  }
}

// Export a pre-configured instance of AxiosInterceptor

export const client = new AxiosInterceptor({
  baseURL: import.meta.env.VITE_BASE_URL,
});
